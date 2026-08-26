// app/(dashboard)/billing/ipd/_components/drawer/collect-payment-modal.tsx
"use client";
import { useMemo, useState } from "react";
import { AlertCircle, Banknote, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PaymentMethod, PaymentMethodSplit, PaymentRecord } from "@/types/billing/ipd/billing-types";
import { formatCurrency } from "@/lib/billing/ipd/billing-calculations";

const METHODS: PaymentMethod[] = ["Cash", "Card", "UPI", "Net Banking"];

interface Props {
  dueAmount: number;
  onCancel: () => void;
  onCollect: (payment: PaymentRecord) => void;
}

interface DraftSplit { id: string; method: PaymentMethod; amount: string }

export function CollectPaymentModal({ dueAmount, onCancel, onCollect }: Props) {
  const [partyName, setPartyName] = useState("");
  const [relation, setRelation] = useState("Self");
  const [collectedBy, setCollectedBy] = useState("Billing Desk");
  const [splits, setSplits] = useState<DraftSplit[]>([{ id: "s1", method: "Cash", amount: "" }]);

  const totalEntered = useMemo(() => splits.reduce((sum, s) => sum + (Number(s.amount) || 0), 0), [splits]);
  const remainingAfter = Math.max(0, dueAmount - totalEntered);
  const exceedsDue = totalEntered > dueAmount;
  const valid = partyName.trim() && totalEntered > 0 && !exceedsDue && splits.every((s) => s.method && Number(s.amount) >= 0);

  function addSplit() {
    const usedMethods = splits.map((s) => s.method);
    const nextMethod = METHODS.find((m) => !usedMethods.includes(m)) ?? "Cash";
    setSplits((previous) => [...previous, { id: `s${Date.now()}`, method: nextMethod, amount: "" }]);
  }
  function updateSplit(id: string, patch: Partial<DraftSplit>) {
    setSplits((previous) => previous.map((s) => s.id === id ? { ...s, ...patch } : s));
  }
  function removeSplit(id: string) {
    setSplits((previous) => previous.length > 1 ? previous.filter((s) => s.id !== id) : previous);
  }

  function handleCollect() {
    if (!valid) return;
    const stamp = new Date();
    const dateIso = stamp.toISOString().slice(0, 10);
    const dateTime = stamp.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const methods: PaymentMethodSplit[] = splits.filter((s) => Number(s.amount) > 0).map((s) => ({ method: s.method, amount: Number(s.amount) }));
    onCollect({
      id: `P-${Date.now()}`, date: dateIso, dateTime, partyName: partyName.trim(), relationToPatient: relation,
      totalAmount: totalEntered, methods, collectedBy,
    });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><Banknote className="h-4 w-4" /></div>
            <h3 className="text-lg font-bold text-slate-800">Collect Payment</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-xl border border-red-200 bg-red-50/60 p-3 text-center">
            <p className="text-[10px] uppercase text-red-500">Current Due Amount</p>
            <p className="mt-1 text-2xl font-bold text-red-700">{formatCurrency(dueAmount)}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div><Label className="text-xs text-slate-500">Paid By (Party Name) *</Label><Input className="mt-1" value={partyName} onChange={(e) => setPartyName(e.target.value)} placeholder="e.g. Suresh Sharma" /></div>
            <div><Label className="text-xs text-slate-500">Relation to Patient</Label>
              <Select value={relation} onValueChange={setRelation}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{["Self", "Spouse", "Son", "Daughter", "Brother", "Sister", "Other Relative"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-slate-500">Collected By</Label>
            <Input className="mt-1" value={collectedBy} onChange={(e) => setCollectedBy(e.target.value)} />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-xs text-slate-500">Payment Split by Method *</Label>
              <Button size="sm" variant="outline" className="h-7 gap-1 px-2 text-xs" onClick={addSplit} disabled={splits.length >= METHODS.length}><Plus className="h-3.5 w-3.5" />Add Method</Button>
            </div>
            <div className="space-y-2">
              {splits.map((split) => (
                <div key={split.id} className="flex items-center gap-2">
                  <Select value={split.method} onValueChange={(value) => updateSplit(split.id, { method: value as PaymentMethod })}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>{METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input type="number" placeholder="Amount" className="flex-1" value={split.amount} onChange={(e) => updateSplit(split.id, { amount: e.target.value })} />
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={() => removeSplit(split.id)} disabled={splits.length === 1}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Total Entered</span><span className="font-bold text-slate-800">{formatCurrency(totalEntered)}</span></div>
            <div className="mt-1 flex items-center justify-between text-sm"><span className="text-slate-500">Remaining Due After This Payment</span><span className={`font-bold ${remainingAfter > 0 ? "text-red-600" : "text-emerald-600"}`}>{formatCurrency(remainingAfter)}</span></div>
          </div>

          {exceedsDue && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700"><AlertCircle className="h-4 w-4 shrink-0" />Entered amount exceeds the due amount. Please adjust the split.</div>
          )}
        </div>

        <div className="flex gap-3 border-t border-slate-100 p-5">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button disabled={!valid} className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handleCollect}><Banknote className="h-4 w-4" />Collect {formatCurrency(totalEntered)}</Button>
        </div>
      </div>
    </div>
  );
}