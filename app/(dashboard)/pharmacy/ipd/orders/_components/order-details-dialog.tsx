// app/pharmacy/ipd/_components/order-details-dialog.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
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
  PharmacyMedicineItem,
  PharmacyOrder,
} from "@/types/pharmacy/ipd/pharmacy-order-types";

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: PharmacyOrder | null;
  onOrderUpdate: (order: PharmacyOrder) => void;
}

export function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
  onOrderUpdate,
}: OrderDetailsDialogProps) {
  const [medicines, setMedicines] = useState<PharmacyMedicineItem[]>([]);
  const [paymentMode, setPaymentMode] = useState<PaymentMode | null>(null);

  useEffect(() => {
    setMedicines(order?.medicines ?? []);
    setPaymentMode(null);
  }, [order]);

  const excludedCount = useMemo(
    () => medicines.filter((medicine) => medicine.stockAvailable === 0).length,
    [medicines],
  );

  const totalAmount = useMemo(() => {
    return medicines.reduce((sum, medicine) => {
      const isOutOfStock = medicine.stockAvailable === 0;

      const isPartialStock =
        medicine.stockAvailable > 0 &&
        medicine.stockAvailable < medicine.orderedQty;

      const billableQuantity = isOutOfStock
        ? 0
        : isPartialStock
          ? medicine.includeAvailableStockOnly
            ? medicine.stockAvailable
            : 0
          : medicine.orderedQty;

      return sum + billableQuantity * medicine.pricePerUnit;
    }, 0);
  }, [medicines]);

  if (!order) {
    return null;
  }

  const selectedOrder: PharmacyOrder = order;

  function handleIncludeAvailableStock(medicineId: string) {
    setMedicines((previous) =>
      previous.map((medicine) =>
        medicine.id === medicineId
          ? {
              ...medicine,
              includeAvailableStockOnly: !medicine.includeAvailableStockOnly,
            }
          : medicine,
      ),
    );
  }

  function handleSubmitPayment() {
    if (!paymentMode) {
      toast.error("Please select a payment mode");
      return;
    }

    if (totalAmount <= 0) {
      toast.error("No medicine quantity is available for billing");
      return;
    }

    console.log("Payment collected:", {
      orderId: selectedOrder.orderId,
      mode: paymentMode,
      amount: totalAmount,
    });

    const updatedOrder: PharmacyOrder = {
      ...selectedOrder,
      medicines,
      status: "Medicine Delivered & Payment Received",
    };

    onOrderUpdate(updatedOrder);

    toast.success(
      `Payment of ₹${totalAmount.toFixed(
        2,
      )} received via ${paymentMode}. Medicines delivered.`,
    );

    onOpenChange(false);
  }

  function handleMedicineDeliveredWithoutPayment() {
    if (totalAmount <= 0) {
      toast.error("No medicine quantity is available for delivery");
      return;
    }

    console.log("Sent to IPD billing department:", {
      orderId: selectedOrder.orderId,
      amount: totalAmount,
    });

    const updatedOrder: PharmacyOrder = {
      ...selectedOrder,
      medicines,
      status: "Medicine Delivered & Billing Updated",
    };

    onOrderUpdate(updatedOrder);

    toast.success(
      "Medicines delivered. Billing has been sent to the IPD Billing Department.",
    );

    onOpenChange(false);
  }

  const isDelivered =
    selectedOrder.status === "Medicine Delivered & Payment Received" ||
    selectedOrder.status === "Medicine Delivered & Billing Updated";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[94vw] max-h-[90vh] !max-w-[1040px] overflow-y-auto p-0 sm:!w-[90vw] sm:rounded-2xl">
        <DialogHeader className="sticky top-0 z-10 border-b border-slate-100 bg-white px-4 py-3 sm:px-5 sm:py-4">
          <DialogTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800 sm:text-base">
            <PackageCheck className="h-5 w-5 shrink-0 text-blue-600" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5">
          <OrderDetailsHeader order={selectedOrder} />

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

          {isDelivered ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {selectedOrder.status}
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
                This hospital&apos;s IPD billing is managed by the Billing
                Department. Deliver the available medicines and the bill will be
                sent automatically.
              </p>

              <Button
                disabled={totalAmount <= 0}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleMedicineDeliveredWithoutPayment}
              >
                <PackageCheck className="h-4 w-4" />
                Medicine Delivered
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
