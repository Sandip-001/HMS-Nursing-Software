// app/(dashboard)/billing/ipd/_components/drawer/section-payments.tsx
"use client";
import { useMemo, useState } from "react";
import { Banknote, User, Wallet } from "lucide-react";
import type { PaymentRecord } from "@/types/billing/ipd/billing-types";
import { formatCurrency } from "@/lib/billing/ipd/billing-calculations";
import { DateFilterBar } from "./date-filter-bar";
import { PaymentMethodBadge } from "../billing-badges";

export function SectionPayments({ payments }: { payments: PaymentRecord[] }) {
  const [date, setDate] = useState("");
  const filtered = useMemo(() => date ? payments.filter((p) => p.date === date) : payments, [payments, date]);
  const totalCollected = filtered.reduce((sum, p) => sum + p.totalAmount, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Wallet className="h-4 w-4 text-emerald-600" />Payment History</p>
        <p className="mt-1 text-xs text-slate-500">Every payment collected, split by method, with the paying party and collecting staff member.</p>
        <div className="mt-3"><DateFilterBar value={date} onChange={setDate} label="Filter payments by date" /></div>
      </div>

      {filtered.length > 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
          <p className="text-[10px] uppercase text-emerald-500">{date ? "Collected on Selected Date" : "Total Collected (All Time)"}</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{formatCurrency(totalCollected)}</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((payment) => (
          <div key={payment.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><Banknote className="h-4 w-4" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{payment.partyName} <span className="text-xs font-normal text-slate-400">({payment.relationToPatient})</span></p>
                  <p className="text-xs text-slate-400">{payment.dateTime}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-emerald-700">{formatCurrency(payment.totalAmount)}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {payment.methods.map((split, index) => (
                <div key={index} className="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-1.5">
                  <PaymentMethodBadge method={split.method} />
                  <span className="text-sm font-semibold text-slate-700">{formatCurrency(split.amount)}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400"><User className="h-3 w-3" />Collected by {payment.collectedBy}</p>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No payments recorded for this date.</div>}
      </div>
    </div>
  );
}