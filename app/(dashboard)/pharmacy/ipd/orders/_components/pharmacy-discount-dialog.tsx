// app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-discount-dialog.tsx
"use client";
import { useMemo, useState } from "react";
import { BadgePercent, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CURRENT_PHARMACY_STAFF } from "@/lib/pharmacy/ipd/pharmacy-ipd-order-data";

interface Props {
  netPayableBeforeDiscount: number;
  onCancel: () => void;
  onConfirm: (percentage: number, amount: number, reason: string) => void;
}

export function PharmacyDiscountDialog({ netPayableBeforeDiscount, onCancel, onConfirm }: Props) {
  const [percentage, setPercentage] = useState("");
  const [reason, setReason] = useState("");

  const numericPercentage = Number(percentage) || 0;
  const calculatedAmount = useMemo(
    () => Math.round((netPayableBeforeDiscount * numericPercentage) / 100 * 100) / 100,
    [netPayableBeforeDiscount, numericPercentage],
  );
  const invalid = numericPercentage <= 0 || numericPercentage > 100;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><BadgePercent className="h-5 w-5" /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Apply Discount</h3>
              <p className="mt-1 text-xs text-slate-500">Enter a discount percentage — the amount is calculated automatically.</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-[10px] uppercase text-slate-400">Amount Eligible for Discount</p>
            <p className="mt-1 text-lg font-bold text-slate-800">₹{netPayableBeforeDiscount.toFixed(2)}</p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Discount Percentage (%)</label>
            <div className="relative">
              <Input
                type="number"
                min={0}
                max={100}
                step="0.1"
                value={percentage}
                onChange={(event) => setPercentage(event.target.value)}
                placeholder="e.g. 5"
                className="pr-9"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">%</span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
            <p className="text-[10px] uppercase text-amber-700">Calculated Discount Amount</p>
            <p className="mt-1 text-2xl font-bold text-amber-700">− ₹{calculatedAmount.toFixed(2)}</p>
            <p className="mt-1 text-xs text-amber-600">Net payable after discount: ₹{Math.max(0, netPayableBeforeDiscount - calculatedAmount).toFixed(2)}</p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Reason for Discount</label>
            <Textarea rows={3} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Enter the reason for this discount..." />
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[10px] uppercase text-slate-400">Discount Authorized By</p>
            <p className="mt-1 text-sm font-bold text-slate-800">{CURRENT_PHARMACY_STAFF.name}</p>
            <p className="text-xs text-slate-500">{CURRENT_PHARMACY_STAFF.role} · {CURRENT_PHARMACY_STAFF.staffId}</p>
            <p className="mt-1 text-[10px] text-slate-400">Automatically filled from your staff profile.</p>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <p className="text-xs leading-5 text-emerald-800">This discount will be recorded permanently in the billing audit trail along with your name, role, and the percentage applied.</p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-100 bg-slate-50/60 p-5">
          <Button variant="outline" className="flex-1 bg-white" onClick={onCancel}>Cancel</Button>
          <Button
            className="flex-1 gap-2 bg-amber-600 hover:bg-amber-700"
            disabled={invalid || !reason.trim()}
            onClick={() => onConfirm(numericPercentage, calculatedAmount, reason.trim())}
          >
            <CheckCircle2 className="h-4 w-4" />Apply {numericPercentage || 0}% Discount
          </Button>
        </div>
      </div>
    </div>
  );
}