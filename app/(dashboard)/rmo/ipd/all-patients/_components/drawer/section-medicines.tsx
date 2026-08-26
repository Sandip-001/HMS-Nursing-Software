// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-medicines.tsx
"use client";
import { useMemo, useState } from "react";
import { ClipboardList, PackageX, Pill, Plus, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MedicineDose, MedicineOrder } from "@/types/rmo/ipd/rmo-types";
import { DateFilterBar } from "./date-filter-bar";
import { DoseStatusBadge } from "../rmo-badges";
import { AddMedicineModal } from "./add-medicine-modal";

export function SectionMedicines({ doses, orders, onAddOrder }: { doses: MedicineDose[]; orders: MedicineOrder[]; onAddOrder: (order: MedicineOrder, generatedDoses: MedicineDose[]) => void }) {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const todayIso = new Date().toISOString().slice(0, 10);
  const filtered = useMemo(() => date ? doses.filter((d) => d.date === date) : doses, [doses, date]);
  const outOfStock = filtered.filter((d) => d.status === "Out of Stock");

  const groupedByDate = useMemo(() => {
    const map = new Map<string, MedicineDose[]>();
    filtered.forEach((d) => { const rows = map.get(d.date) ?? []; rows.push(d); map.set(d.date, rows); });
    return Array.from(map.entries()).sort((a, b) => {
      if (a[0] === todayIso) return -1;
      if (b[0] === todayIso) return 1;
      return a[0].localeCompare(b[0]);
    });
  }, [filtered, todayIso]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Pill className="h-4 w-4 text-blue-600" />Medicine Orders & Administration</p>
          <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"><Plus className="h-4 w-4" />Add Medicine</button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <DateFilterBar value={date} onChange={setDate} label="Filter medicines by date" />
          {date && <span className="text-xs text-slate-500">Showing {groupedByDate.length} date{groupedByDate.length !== 1 ? "s" : ""}</span>}
        </div>
      </div>

      {outOfStock.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-red-800"><PackageX className="h-4 w-4" />{outOfStock.length} medicine(s) out of stock</p>
          <div className="mt-2 flex flex-wrap gap-2">{outOfStock.map((d) => <Badge key={d.id} variant="outline" className="border-red-200 bg-white text-red-700">{d.medicineName} · {d.date}</Badge>)}</div>
        </div>
      )}

      <div className="space-y-4">
        {groupedByDate.map(([groupDate, rows]) => {
          const isToday = groupDate === todayIso;
          return (
            <div key={groupDate} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-800">
                  {isToday ? "Today" : new Date(`${groupDate}T12:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
                  {isToday && <Badge variant="outline" className="ml-2 border-blue-200 bg-blue-50 text-blue-700">Today</Badge>}
                </p>
                <span className="text-xs text-slate-500">{rows.length} dose{rows.length !== 1 ? "s" : ""}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400">
                      <th className="py-2 pr-4">Medicine</th>
                      <th className="pr-4">Slot</th>
                      <th className="pr-4">Scheduled Time</th>
                      <th className="pr-4">Status</th>
                      <th className="pr-4">Pharmacy Delivery</th>
                      <th className="pr-4">Given By</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((dose) => (
                      <tr key={dose.id} className="border-b border-slate-100 last:border-0">
                        <td className="py-2.5 pr-4">
                          <p className="font-medium text-slate-800">{dose.medicineName}</p>
                          <p className="text-xs text-slate-400">{dose.strength} · {dose.route}</p>
                        </td>
                        <td className="pr-4"><Badge variant="outline" className="border-slate-200 bg-white text-slate-600">{dose.slot}</Badge></td>
                        <td className="pr-4 text-slate-600">{dose.scheduledTime}</td>
                        <td className="pr-4"><DoseStatusBadge status={dose.status} /></td>
                        <td className="pr-4 text-slate-600">{dose.deliveredFromPharmacyAt ? <span className="flex items-center gap-1"><Truck className="h-3 w-3 text-cyan-600" />{dose.deliveredFromPharmacyAt}</span> : "—"}</td>
                        <td className="pr-4 text-slate-600">{dose.givenBy ? `${dose.givenBy} at ${dose.givenAt}` : "—"}</td>
                        <td className="text-slate-500">{dose.outOfStockRemark ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        {groupedByDate.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No medicine records found{date ? ` for ${date}` : ""}.</div>}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardList className="h-4 w-4 text-violet-600" />Active Medicine Orders (Queue)</p>
        <div className="mt-3 space-y-2">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">{order.medicineName}</p>
                <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">{order.durationDays} days</Badge>
              </div>
              <p className="mt-1 text-xs text-slate-500">{order.dose} · {order.frequency} · {order.instructions}</p>
              <p className="mt-1 text-xs text-slate-400">Started {order.startDate} · Ordered by {order.orderedBy}</p>
            </div>
          ))}
          {orders.length === 0 && <p className="py-4 text-center text-sm text-slate-400">No active medicine orders.</p>}
        </div>
      </div>

      {open && <AddMedicineModal onCancel={() => setOpen(false)} onSave={(order, generatedDoses) => { onAddOrder(order, generatedDoses); setOpen(false); }} />}
    </div>
  );
}