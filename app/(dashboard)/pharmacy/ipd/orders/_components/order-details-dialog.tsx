// app/pharmacy/ipd/_components/order-details-dialog.tsx
"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PackageCheck } from "lucide-react";
import { OrderDetailsHeader } from "./order-details-header";
import { OrderMedicinesTable } from "./order-medicines-table";
import { BillSummaryCard } from "./bill-summary-card";
import { PaymentCollectionPanel } from "./payment-collection-panel";
import { PHARMACY_BILLING_ENABLED } from "@/lib/pharmacy/ipd/pharmacy-order-data";
import type {
  PaymentMode,
  PharmacyOrder,
} from "@/types/pharmacy/ipd/pharmacy-order-types";

export function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
  onOrderUpdate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: PharmacyOrder | null;
  onOrderUpdate: (order: PharmacyOrder) => void;
}) {
  const [medicines, setMedicines] = useState(order?.medicines ?? []);
  const [paymentMode, setPaymentMode] = useState<PaymentMode | null>(null);

  useMemo(() => {
    setMedicines(order?.medicines ?? []);
    setPaymentMode(null);
  }, [order]);

  if (!order) return null;

  function handleIncludeAvailableStock(medicineId: string) {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === medicineId
          ? {
              ...med,
              includeAvailableStockOnly: !med.includeAvailableStockOnly,
            }
          : med,
      ),
    );
  }

  const excludedCount = medicines.filter((m) => m.stockAvailable === 0).length;

  const totalAmount = medicines.reduce((sum, med) => {
    const isOutOfStock = med.stockAvailable === 0;
    const isPartial =
      med.stockAvailable > 0 && med.stockAvailable < med.orderedQty;
    const billableQty = isOutOfStock
      ? 0
      : isPartial
        ? med.includeAvailableStockOnly
          ? med.stockAvailable
          : 0
        : med.orderedQty;
    return sum + billableQty * med.pricePerUnit;
  }, 0);

  function handleSubmitPayment() {
    console.log("Payment collected:", {
      orderId: order.orderId,
      mode: paymentMode,
      amount: totalAmount,
    });
    onOrderUpdate({
      ...order,
      medicines,
      status: "Medicine Delivered & Payment Received",
    });
    toast.success(
      `Payment of ₹${totalAmount} received via ${paymentMode}. Medicine delivered.`,
    );
    onOpenChange(false);
  }

  function handleMedicineDeliveredWithoutPayment() {
    console.log("Sent to billing department:", {
      orderId: order.orderId,
      amount: totalAmount,
    });
    onOrderUpdate({
      ...order,
      medicines,
      status: "Medicine Delivered & Billing Updated",
    });
    toast.success(
      "Medicine delivered. Billing sent to IPD billing department.",
    );
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[94vw] sm:!w-[90vw] !max-w-[1040px] max-h-[90vh] overflow-y-auto p-0 sm:rounded-2xl">
        <DialogHeader className="sticky top-0 z-10 border-b border-slate-100 bg-white px-4 py-3 sm:px-5 sm:py-4">
          <DialogTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800 sm:text-base">
            <PackageCheck className="h-5 w-5 shrink-0 text-blue-600" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5">
          <OrderDetailsHeader order={order} />

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-800">
              Medicines Ordered
            </p>
            <OrderMedicinesTable
              medicines={medicines}
              onIncludeAvailableStock={handleIncludeAvailableStock}
            />
          </div>

          <BillSummaryCard
            totalAmount={totalAmount}
            excludedCount={excludedCount}
          />

          {order.status.startsWith("Medicine Delivered") ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {order.status}
            </div>
          ) : PHARMACY_BILLING_ENABLED ? (
            <PaymentCollectionPanel
              totalAmount={totalAmount}
              selectedMode={paymentMode}
              onSelectMode={setPaymentMode}
              onSubmit={handleSubmitPayment}
            />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="mb-3 text-sm text-slate-600">
                This hospital's billing is managed by the IPD Billing
                Department. Deliver the medicine and the bill will be sent
                automatically.
              </p>
              <Button
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleMedicineDeliveredWithoutPayment}
              >
                <PackageCheck className="h-4 w-4" /> Medicine Delivered
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
