// app/(dashboard)/pharmacy/ipd/orders/_components/tab-billing.tsx
"use client";
import { useState } from "react";
import {
    Banknote, BadgePercent, CheckCircle2, CreditCard, IndianRupee, Landmark, PackageCheck, Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
    PharmacyIpdOrder, PharmacyPaymentMethod,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";
import {
    PHARMACY_IPD_DIRECT_PAYMENT_ENABLED, getBalanceDueValue, getDiscountTotalValue,
    getMedicinesGrossValue, getNetPayableValue, getReturnsTotalValue, getTotalPaidValue,
} from "@/lib/pharmacy/ipd/pharmacy-ipd-order-data";
import { BillSentBadge, PaymentBadge } from "./pharmacy-ipd-badges";
import { PharmacyPaymentDialog } from "./pharmacy-payment-dialog";
import { PharmacyDiscountDialog } from "./pharmacy-discount-dialog";

const methodIcon: Record<PharmacyPaymentMethod, React.ElementType> = {
    Cash: Banknote, UPI: Smartphone, Card: CreditCard, "Net Banking": Landmark,
};

interface Props {
    order: PharmacyIpdOrder;
    onAddPayments: (lines: Array<{ method: PharmacyPaymentMethod; amount: number }>) => void;
    onAddDiscount: (percentage: number, amount: number, reason: string) => void;
    onSendToBillingDept: () => void;
}

export function TabBilling({ order, onAddPayments, onAddDiscount, onSendToBillingDept }: Props) {
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [discountOpen, setDiscountOpen] = useState(false);

    const gross = getMedicinesGrossValue(order);
    const returns = getReturnsTotalValue(order);
    const discount = getDiscountTotalValue(order);
    const netPayable = getNetPayableValue(order);
    const totalPaid = getTotalPaidValue(order);
    const balanceDue = getBalanceDueValue(order);
    const billSent = Boolean(order.billSentToBillingDeptAt);

    const grossAfterReturns = gross - returns;

    return (
        <div className="space-y-5">
            {/* Summary */}
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Summary label="Medicines Gross Value" value={`₹${gross.toFixed(2)}`} />
                    <Summary label="Returns Deducted" value={`− ₹${returns.toFixed(2)}`} tone="amber" />
                    <Summary label="Discount Applied" value={`− ₹${discount.toFixed(2)}`} tone="amber" />
                    <Summary label="Net Payable" value={`₹${netPayable.toFixed(2)}`} tone="blue" emphasis />
                    <Summary label="Total Paid" value={`₹${totalPaid.toFixed(2)}`} tone="emerald" />
                    <Summary label="Balance Due" value={`₹${balanceDue.toFixed(2)}`} tone={balanceDue > 0 ? "red" : "emerald"} emphasis />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <PaymentBadge status={order.paymentStatus} />
                {billSent && <BillSentBadge />}
                {!PHARMACY_IPD_DIRECT_PAYMENT_ENABLED && (
                    <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-500">Direct payment disabled hospital-wide</Badge>
                )}
            </div>

            {/* Discounts */}
            <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><BadgePercent className="h-4 w-4 text-amber-600" />Discounts</p>
                    {PHARMACY_IPD_DIRECT_PAYMENT_ENABLED && balanceDue > 0 && (
                        <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50" onClick={() => setDiscountOpen(true)}>Add Discount</Button>
                    )}
                </div>
                <div className="mt-3 space-y-2">
                    {order.discounts.map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50/50 px-3 py-2">
                            <div>
                                <p className="text-sm font-medium text-slate-700">{entry.reason}</p>
                                <p className="text-xs text-slate-500">
                                    {entry.percentage}% discount · Given by {entry.givenBy} ({entry.givenByRole}) · {entry.givenOn}
                                </p>
                            </div>
                            <p className="text-sm font-bold text-amber-700">− ₹{entry.amount.toFixed(2)}</p>
                        </div>
                    ))}
                    {order.discounts.length === 0 && <p className="text-xs text-slate-400">No discounts applied to this order.</p>}
                </div>
            </div>

            {/* Payment ledger */}
            <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><IndianRupee className="h-4 w-4 text-emerald-600" />Payment History</p>
                    {PHARMACY_IPD_DIRECT_PAYMENT_ENABLED && balanceDue > 0 && !billSent && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setPaymentOpen(true)}>Collect Payment</Button>
                    )}
                </div>
                <div className="mt-3 space-y-2">
                    {order.payments.map((entry) => {
                        const Icon = methodIcon[entry.method];
                        return (
                            <div key={entry.id} className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/40 px-3 py-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm"><Icon className="h-4 w-4" /></div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{entry.method}{entry.reference ? ` · ${entry.reference}` : ""}</p>
                                        <p className="text-xs text-slate-500">Received by {entry.receivedBy} · {entry.receivedOn}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-emerald-700">₹{entry.amount.toFixed(2)}</p>
                            </div>
                        );
                    })}
                    {order.payments.length === 0 && <p className="text-xs text-slate-400">No payments have been received yet for this order.</p>}
                </div>
            </div>

            {/* Billing department action */}
            {!PHARMACY_IPD_DIRECT_PAYMENT_ENABLED && !billSent && (
                <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                    <p className="text-sm text-violet-800">Direct payment collection is disabled for this hospital. Deliver the medicines and forward the full bill to the IPD Billing Department.</p>
                    <Button disabled={netPayable <= 0} className="mt-3 gap-2 bg-violet-600 hover:bg-violet-700" onClick={onSendToBillingDept}>
                        <PackageCheck className="h-4 w-4" />Send Bill to Billing Dept. (₹{netPayable.toFixed(2)})
                    </Button>
                </div>
            )}

            {billSent && (
                <div className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm font-semibold text-violet-800">
                    <CheckCircle2 className="h-5 w-5" />Bill of ₹{netPayable.toFixed(2)} sent to IPD Billing Department on {order.billSentToBillingDeptAt}.
                </div>
            )}

            {order.paymentStatus === "Paid" && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                    <CheckCircle2 className="h-5 w-5" />Full payment of ₹{netPayable.toFixed(2)} has been collected.
                </div>
            )}

            {paymentOpen && (
                <PharmacyPaymentDialog
                    balanceDue={balanceDue}
                    onCancel={() => setPaymentOpen(false)}
                    onConfirm={(lines) => { onAddPayments(lines); setPaymentOpen(false); }}
                />
            )}
            {discountOpen && (
                <PharmacyDiscountDialog
                    netPayableBeforeDiscount={grossAfterReturns}
                    onCancel={() => setDiscountOpen(false)}
                    onConfirm={(percentage, amount, reason) => {
                        onAddDiscount(percentage, amount, reason);
                        setDiscountOpen(false);
                    }}
                />
            )}
        </div>
    );
}

function Summary({ label, value, tone, emphasis }: { label: string; value: string; tone?: "blue" | "amber" | "emerald" | "red"; emphasis?: boolean }) {
    const toneClass = tone === "amber" ? "text-amber-700" : tone === "emerald" ? "text-emerald-700" : tone === "red" ? "text-red-700" : tone === "blue" ? "text-blue-700" : "text-slate-800";
    return (
        <div className="rounded-lg bg-white/70 p-3 text-center">
            <p className="text-[10px] uppercase text-slate-500">{label}</p>
            <p className={`mt-1 font-bold ${emphasis ? "text-xl" : "text-base"} ${toneClass}`}>{value}</p>
        </div>
    );
}