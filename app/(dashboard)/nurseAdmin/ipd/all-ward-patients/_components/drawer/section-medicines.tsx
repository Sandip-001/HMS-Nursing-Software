// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/drawer/section-medicines.tsx
"use client";
import { useMemo, useState } from "react";
import { PackageX, Pill, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MedicineDoseFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { DateFilterBar } from "./date-filter-bar";
import { DoseStatusBadge } from "../status-badges";

export function SectionMedicines({ medicines }: { medicines: MedicineDoseFull[] }) {
  const [date, setDate] = useState("");
  const filtered = useMemo(() => date ? medicines.filter((m) => m.date === date) : medicines, [medicines, date]);
  const outOfStock = filtered.filter((m) => m.status === "Out of Stock");

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Pill className="h-4 w-4 text-blue-600" />Medicine Orders & Administration</p>
        <p className="mt-1 text-xs text-slate-500">Includes pharmacy delivery time, nurse administration time, and out-of-stock alerts.</p>
        <div className="mt-3"><DateFilterBar value={date} onChange={setDate} label="Filter medicines by date" /></div>
      </div>

      {outOfStock.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-red-800"><PackageX className="h-4 w-4" />{outOfStock.length} medicine(s) out of stock</p>
          <div className="mt-2 flex flex-wrap gap-2">{outOfStock.map((m) => <Badge key={m.id} variant="outline" className="border-red-200 bg-white text-red-700">{m.medicineName} · {m.date}</Badge>)}</div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-3 text-sm font-bold text-slate-800">Medicine Log</p>
        <div className="space-y-3">
          {filtered.map((dose) => (
            <div key={dose.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-800">{dose.medicineName} <span className="text-xs font-normal text-slate-400">({dose.strength})</span></p>
                  <p className="text-xs text-slate-500">{dose.route} · {dose.slot} · Scheduled {dose.scheduledTime} · {dose.date}</p>
                </div>
                <DoseStatusBadge status={dose.status} />
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                {dose.deliveredFromPharmacyAt && <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5 text-cyan-600" />Delivered by pharmacy: {dose.deliveredFromPharmacyAt}</span>}
                {dose.givenBy && <span>Given by <span className="font-medium text-slate-700">{dose.givenBy}</span> at {dose.givenAt}</span>}
                {dose.outOfStockRemark && <span className="font-medium text-red-600">{dose.outOfStockRemark}</span>}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-slate-400">No medicine records found for this date.</p>}
        </div>
      </div>
    </div>
  );
}