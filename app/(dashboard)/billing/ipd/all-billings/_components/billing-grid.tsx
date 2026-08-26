// app/(dashboard)/billing/ipd/_components/billing-grid.tsx
"use client";
import { Eye, MapPin, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BillingPatient } from "@/types/billing/ipd/billing-types";
import { computeBilling, formatCurrency } from "@/lib/billing/ipd/billing-calculations";
import { BillingStatusBadge } from "./billing-badges";

export function BillingGrid({ patients, onView }: { patients: BillingPatient[]; onView: (patient: BillingPatient) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {patients.map((patient) => {
        const computed = computeBilling(patient);
        return (
          <Card key={patient.uhid} className="overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">{patient.patientName.charAt(0)}</div>
                  <div><p className="font-bold text-slate-800">{patient.patientName}</p><p className="text-xs text-slate-400">{patient.uhid}</p></div>
                </div>
                <BillingStatusBadge status={computed.status} />
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-3">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Stethoscope className="h-3.5 w-3.5 text-violet-600" />{patient.admittingDoctor}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-3 w-3" />{patient.ward} · {patient.room} · {patient.bed}</p>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-slate-100 p-2.5 text-center"><p className="text-[9px] uppercase text-slate-400">Net Payable</p><p className="mt-1 text-sm font-bold text-slate-800">{formatCurrency(computed.netPayable)}</p></div>
                <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-2.5 text-center"><p className="text-[9px] uppercase text-emerald-500">Collected</p><p className="mt-1 text-sm font-bold text-emerald-700">{formatCurrency(computed.totalCollected)}</p></div>
                <div className="rounded-lg border border-red-100 bg-red-50/40 p-2.5 text-center"><p className="text-[9px] uppercase text-red-500">Due</p><p className="mt-1 text-sm font-bold text-red-700">{formatCurrency(computed.dueAmount)}</p></div>
              </div>

              <Button className="mt-4 w-full gap-2 border-blue-200 text-blue-700" variant="outline" onClick={() => onView(patient)}><Eye className="h-4 w-4" />View Details</Button>
            </CardContent>
          </Card>
        );
      })}
      {patients.length === 0 && <div className="col-span-full py-16 text-center text-sm text-slate-400">No bills match the selected filters.</div>}
    </div>
  );
}