// app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-payment-dialog.tsx
"use client";
import { useMemo, useState } from "react";
import {
  Banknote, CheckCircle2, CreditCard, IndianRupee, Landmark, Plus, ShieldCheck, Smartphone, Trash2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PharmacyPaymentMethod } from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";

interface SplitLine {
  id: string;
  method: PharmacyPaymentMethod;
  amount: string;
}

interface Props {
  balanceDue: number;
  onCancel: () => void;
  onConfirm: (lines: Array<{ method: PharmacyPaymentMethod; amount: number }>) => void;
}

const methodMeta: Record<PharmacyPaymentMethod, { icon: React.ElementType; tone: string }> = {
  Cash: { icon: Banknote, tone: "bg-emerald-100 text-emerald-600" },
  UPI: { icon: Smartphone, tone: "bg-violet-100 text-violet-600" },
  Card: { icon: CreditCard, tone: "bg-blue-100 text-blue-600" },
  "Net Banking": { icon: Landmark, tone: "bg-amber-100 text-amber-600" },
};

export function PharmacyPaymentDialog({ balanceDue, onCancel, onConfirm }: Props) {
  const [lines, setLines] = useState<SplitLine[]>([{ id: "L1", method: "Cash", amount: "" }]);

  const totalEntered = useMemo(() => lines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0), [lines]);
  const remaining = Math.max(0, balanceDue - totalEntered);
  const overpaid = totalEntered > balanceDue;

  function addLine() {
    setLines((previous) => [...previous, { id: `L${previous.length + 1}-${Date.now()}`, method: "Cash", amount: "" }]);
  }

  function removeLine(id: string) {
    setLines((previous) => previous.filter((line) => line.id !== id));
  }

  function updateLine(id: string, patch: Partial<SplitLine>) {
    setLines((previous) => previous.map((line) => line.id === id ? { ...line, ...patch } : line));
  }

  function fillRemaining() {
    setLines((previous) => previous.map((line, index) => index === previous.length - 1 ? { ...line, amount: String(remaining + (Number(line.amount) || 0)) } : line));
  }

  function handleConfirm() {
    const validLines = lines
      .map((line) => ({ method: line.method, amount: Number(line.amount) || 0 }))
      .filter((line) => line.amount > 0);
    if (validLines.length === 0) return;
    onConfirm(validLines);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50 via-cyan-50 to-white px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><IndianRupee className="h-5 w-5" /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Collect Pharmacy Payment</h3>
              <p className="mt-1 text-xs text-slate-500">Split the amount across cash, UPI, card or net banking as the patient party pays.</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><p className="text-[10px] uppercase text-blue-700">Balance Due</p><p className="mt-1 text-xl font-bold text-slate-800">₹{balanceDue.toFixed(2)}</p></div>
              <div><p className="text-[10px] uppercase text-blue-700">Entered Now</p><p className="mt-1 text-xl font-bold text-slate-800">₹{totalEntered.toFixed(2)}</p></div>
              <div><p className="text-[10px] uppercase text-blue-700">{overpaid ? "Excess" : "Remaining"}</p><p className={`mt-1 text-xl font-bold ${overpaid ? "text-red-600" : "text-amber-600"}`}>₹{overpaid ? (totalEntered - balanceDue).toFixed(2) : remaining.toFixed(2)}</p></div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">Payment Split</p>
              <Button variant="outline" size="sm" onClick={fillRemaining} disabled={remaining <= 0}>Fill remaining ₹{remaining.toFixed(2)}</Button>
            </div>

            {lines.map((line) => {
              const Icon = methodMeta[line.method].icon;
              return (
                <div key={line.id} className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${methodMeta[line.method].tone}`}><Icon className="h-4 w-4" /></div>
                  <div className="grid flex-1 grid-cols-2 gap-2">
                    <select
                      value={line.method}
                      onChange={(event) => updateLine(line.id, { method: event.target.value as PharmacyPaymentMethod })}
                      className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm"
                    >
                      {(["Cash", "UPI", "Card", "Net Banking"] as PharmacyPaymentMethod[]).map((method) => <option key={method} value={method}>{method}</option>)}
                    </select>
                    <Input type="number" min={0} placeholder="Amount" value={line.amount} onChange={(event) => updateLine(line.id, { amount: event.target.value })} className="h-9" />
                  </div>
                  {lines.length > 1 && (
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-600" onClick={() => removeLine(line.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}

            <Button variant="outline" className="w-full gap-2 border-dashed" onClick={addLine}>
              <Plus className="h-4 w-4" />Add another payment method
            </Button>
          </div>

          {overpaid && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              Entered amount exceeds the balance due. Reduce one of the split amounts before confirming.
            </p>
          )}
          {!overpaid && remaining > 0 && totalEntered > 0 && (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
              This is a partial payment. ₹{remaining.toFixed(2)} will remain due — the patient party can pay this on a future date.
            </p>
          )}

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <p className="text-xs leading-5 text-emerald-800">Each entry is recorded separately in the payment ledger with method, amount, date, and the receiving staff member.</p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-100 bg-slate-50/60 p-5">
          <Button variant="outline" className="flex-1 bg-white" onClick={onCancel}>Cancel</Button>
          <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700" disabled={totalEntered <= 0 || overpaid} onClick={handleConfirm}>
            <CheckCircle2 className="h-4 w-4" />Confirm Payment{totalEntered > 0 ? ` (₹${totalEntered.toFixed(2)})` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}