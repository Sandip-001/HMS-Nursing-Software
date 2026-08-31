// app/(dashboard)/admission/icu/all-patients/_components/icu-grid.tsx
"use client";
import { Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IcuPatient } from "@/types/admission-desk/icu/icu-types";
import { IcuStatusBadge, AdmissionTypeBadge } from "./icu-badges";

export function IcuGrid({ patients, onView }: { patients: IcuPatient[]; onView: (patient: IcuPatient) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {patients.map((patient) => (
        <Card key={patient.icuId} className="overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">{patient.patientName.charAt(0)}</div>
                <div><p className="font-bold text-slate-800">{patient.patientName}</p><p className="text-xs text-slate-400">{patient.uhid}</p></div>
              </div>
              <IcuStatusBadge status={patient.status} />
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Heart className="h-3.5 w-3.5 text-blue-600" />{patient.ward} · {patient.bed}</p>
              <p className="mt-1 text-xs text-slate-500">{patient.floor} · {patient.icuId}</p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <AdmissionTypeBadge type={patient.admissionType} />
              <p className="text-xs text-slate-500">Dr. {patient.assignedDoctor}</p>
            </div>

            <Button className="mt-4 w-full gap-2" variant="outline" onClick={() => onView(patient)}><Eye className="h-4 w-4" />View Details</Button>
          </CardContent>
        </Card>
      ))}
      {patients.length === 0 && <div className="col-span-full py-16 text-center text-sm text-slate-400">No ICU patients match the selected filters.</div>}
    </div>
  );
}