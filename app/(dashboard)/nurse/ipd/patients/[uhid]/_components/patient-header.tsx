// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/patient-header.tsx
"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import type { NurseIpdPatient } from "@/types/nurse/ipd/nurse-ipd-types";
import { AcuityBadge } from "../../_components/nurse-ipd-badges";

export function PatientHeader({ patient, name, handleClick }: { patient: NurseIpdPatient, name:string, handleClick:()=> void }) {
  const router = useRouter();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <Button variant="outline" size="icon" onClick={handleClick} className="shrink-0"><ArrowLeft className="h-4 w-4" /></Button>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-md">
            {patient.patientName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">{patient.patientName}</h1>
              <AcuityBadge acuity={patient.acuity} />
              {patient.allergies.length > 0 && (
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">Allergy: {patient.allergies.join(", ")}</Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">{patient.age} years · {patient.gender} · Blood Group <span className="font-semibold">{patient.bloodGroup}</span></p>
            <p className="mt-1 text-xs text-slate-500">UHID: {patient.uhid} · {name}: {patient.ipdId} · {patient.ward} / {patient.room} / {patient.bed}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:gap-6">
          <Info label="Department" value={patient.department} />
          <Info label="Attending Doctor" value={patient.admittingDoctor} />
          <Info label="Admitted On" value={patient.admissionDateTime} />
          <Info label="Assigned Nurse" value={`${patient.assignedNurse} · ${patient.currentShift}`} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase text-slate-400">{label}</p>
      <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}