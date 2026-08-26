// app/(dashboard)/pharmacy/ipd/orders/_components/tab-audit.tsx
"use client";
import { FileClock } from "lucide-react";
import type { PharmacyIpdOrder } from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";

interface AuditEvent { label: string; detail: string; timestamp: string; }

export function TabAudit({ order }: { order: PharmacyIpdOrder }) {
  const events: AuditEvent[] = [];

  order.medicines.forEach((medicine) => {
    medicine.dailyLogs.forEach((log) => {
      if (log.deliveredAt) events.push({ label: `${medicine.medicineName} — ${log.status}`, detail: `${log.slot} dose · ${log.date} · by ${log.deliveredBy ?? "—"}`, timestamp: log.deliveredAt });
      if (log.doctorNotifiedAt) events.push({ label: `${medicine.medicineName} — Doctor notified`, detail: `${log.slot} dose · ${log.date} · out of stock`, timestamp: log.doctorNotifiedAt });
    });
  });

  order.returns.forEach((entry) => events.push({ label: `Return: ${entry.medicineName}`, detail: `Qty ${entry.returnedQty} · by ${entry.returnedByName} (${entry.returnedBy})`, timestamp: entry.returnDate }));
  order.discounts.forEach((entry) => events.push({ label: `Discount applied — ₹${entry.amount.toFixed(2)}`, detail: `${entry.reason} · by ${entry.givenBy} (${entry.givenByRole})`, timestamp: entry.givenOn }));
  order.payments.forEach((entry) => events.push({ label: `Payment received — ₹${entry.amount.toFixed(2)} (${entry.method})`, detail: `Received by ${entry.receivedBy}${entry.reference ? ` · Ref ${entry.reference}` : ""}`, timestamp: entry.receivedOn }));
  if (order.billSentToBillingDeptAt) events.push({ label: "Bill sent to IPD Billing Department", detail: "Direct payment disabled hospital-wide", timestamp: order.billSentToBillingDeptAt });

  const sorted = events.sort((a, b) => new Date(b.timestamp.replace(",", "")).getTime() - new Date(a.timestamp.replace(",", "")).getTime());

  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><FileClock className="h-4 w-4 text-slate-500" />Full Order Audit Trail</p>
      <div className="space-y-2">
        {sorted.map((event, index) => (
          <div key={index} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800">{event.label}</p>
              <p className="text-xs text-slate-500">{event.detail}</p>
            </div>
            <p className="shrink-0 text-xs text-slate-400">{event.timestamp}</p>
          </div>
        ))}
        {sorted.length === 0 && <p className="text-xs text-slate-400">No audit events recorded yet.</p>}
      </div>
    </div>
  );
}