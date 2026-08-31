// app/(dashboard)/nurse/ipd/patients/_components/nurseAdmin-icu-patients-grid.tsx
"use client";
import { Eye, MapPin, Stethoscope, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { NurseIpdPatient } from "@/types/nurse/ipd/nurse-ipd-types";
import { getEmarForPatient } from "@/lib/nurse/ipd/nurse-ipd-data";
import { AcuityBadge } from "@/app/(dashboard)/nurse/ipd/patients/_components/nurse-ipd-badges";

export function NurseAdminICUPatientsGrid({
  patients,
  onView,
  onAssignNurse,
}: {
  patients: NurseIpdPatient[];
  onView: (patient: NurseIpdPatient) => void;
  onAssignNurse: (patient: NurseIpdPatient) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {patients.map((patient) => {
        const pending = getEmarForPatient(patient.uhid).filter((dose) => dose.status === "Pending").length;
        return (
          <Card key={patient.uhid} className="overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">
                    {patient.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{patient.patientName}</p>
                    <p className="text-xs text-slate-400">{patient.uhid}</p>
                  </div>
                </div>
                <AcuityBadge acuity={patient.acuity} />
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-3">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Stethoscope className="h-3.5 w-3.5 text-violet-600" />{patient.admittingDoctor}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-3 w-3" />{patient.ward} · {patient.room} · {patient.bed}</p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-100 p-3">
                  <p className="text-[10px] uppercase text-slate-400">Diagnosis</p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-700">{patient.currentDiagnosis}</p>
                </div>
                <div className="rounded-lg border border-slate-100 p-3">
                  <p className="text-[10px] uppercase text-slate-400">Pending Doses</p>
                  <p className={`mt-1 text-sm font-bold ${pending > 0 ? "text-amber-600" : "text-emerald-600"}`}>{pending}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button className="flex-1 border-emerald-200 text-emerald-700" variant="outline" onClick={() => onAssignNurse(patient)}>
                  <UserPlus className="mr-2 h-4 w-4" />Assign Nurse
                </Button>
                <Button className="flex-1 border-blue-200 text-blue-700" variant="outline" onClick={() => onView(patient)}>
                  <Eye className="mr-2 h-4 w-4" />View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
      {patients.length === 0 && <div className="col-span-full py-16 text-center text-sm text-slate-400">No patients match the selected filters.</div>}
    </div>
  );
}