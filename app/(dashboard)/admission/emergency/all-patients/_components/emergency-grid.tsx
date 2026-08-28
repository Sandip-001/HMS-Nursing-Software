// app/(dashboard)/admission-desk/emergency/all-patients/_components/emergency-grid.tsx
"use client";
import { BedDouble, Eye, ShieldAlert, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EmergencyPatient } from "@/types/emergency/emergency-types";
import { EmergencyStatusBadge } from "./emergency-badges";

export function EmergencyGrid({ patients, onView }: { patients: EmergencyPatient[]; onView: (patient: EmergencyPatient) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {patients.map((patient) => (
        <Card key={patient.emergencyNumber} className="overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 font-bold text-white">{(patient.patientName || "U").charAt(0)}</div>
                <div><p className="font-bold text-slate-800">{patient.patientName || "Unidentified"}</p><p className="text-xs text-slate-400">{patient.uhid}</p></div>
              </div>
              <EmergencyStatusBadge status={patient.status} />
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Stethoscope className="h-3.5 w-3.5 text-violet-600" />{patient.attendingDoctor}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><BedDouble className="h-3 w-3" />{patient.bedOrBay} · {patient.emergencyNumber}</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-100 p-3"><p className="text-[10px] uppercase text-slate-400">Incident</p><p className="mt-1 truncate text-sm font-bold text-slate-700">{patient.incidentType}</p></div>
              <div className="rounded-lg border border-slate-100 p-3"><p className="text-[10px] uppercase text-slate-400">Arrival</p><p className="mt-1 truncate text-sm font-bold text-slate-700">{patient.arrivalMode}</p></div>
            </div>

            {patient.police.caseType !== "None" && (
              <Badge variant="outline" className="mt-3 gap-1 border-red-200 bg-red-50 text-red-700"><ShieldAlert className="h-3 w-3" />Police Case: {patient.police.caseType}</Badge>
            )}

            <Button className="mt-4 w-full gap-2 border-red-200 text-red-700" variant="outline" onClick={() => onView(patient)}><Eye className="h-4 w-4" />View Details</Button>
          </CardContent>
        </Card>
      ))}
      {patients.length === 0 && <div className="col-span-full py-16 text-center text-sm text-slate-400">No emergency patients match the selected filters.</div>}
    </div>
  );
}