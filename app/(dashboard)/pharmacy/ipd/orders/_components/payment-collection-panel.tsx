
"use client";

import { Banknote, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaymentMode } from "@/types/pharmacy/ipd/pharmacy-order-types";

export function PaymentCollectionPanel({
  totalAmount,
  selectedMode,
  onSelectMode,
  onSubmit,
}: {
  totalAmount: number;
  selectedMode: PaymentMode | null;
  onSelectMode: (mode: PaymentMode) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-800">Collect Payment from Patient</p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onSelectMode("Cash")}
          className={`flex items-center gap-3 rounded-xl border-2 p-3 transition ${
            selectedMode === "Cash" ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Banknote className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold text-slate-800">Cash</span>
        </button>

        <button
          onClick={() => onSelectMode("UPI")}
          className={`flex items-center gap-3 rounded-xl border-2 p-3 transition ${
            selectedMode === "UPI" ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-200"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <QrCode className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold text-slate-800">UPI</span>
        </button>
      </div>

      <Button
        className="mt-4 w-full gap-2 bg-blue-600 hover:bg-blue-700"
        disabled={!selectedMode}
        onClick={onSubmit}
      >
        Submit Payment of ₹{totalAmount} & Deliver Medicine
      </Button>
    </div>
  );
}