// app/(dashboard)/doctor/ipd/patients/[uhid]/_components/patient-header.tsx
"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import type { NurseIpdPatient } from "@/types/nurse/ipd/nurse-ipd-types";
import { AcuityBadge } from "@/app/(dashboard)/nurse/ipd/patients/_components/nurse-ipd-badges";
import type { PatientStatus } from "@/types/doctor/icu/doctor-icu-types";

export function PatientHeader({ 
  status, 
  patient, 
  name, 
  handleClick, 
  onStatuschange 
}: { 
  status: PatientStatus; 
  patient: NurseIpdPatient; 
  name: string; 
  handleClick: () => void; 
  onStatuschange: (status: PatientStatus) => void; 
}) {
  const router = useRouter();

  // Status badge colors
  const getStatusBadgeClass = (status: PatientStatus) => {
    switch (status) {
      case "Stable":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Under Observation":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "Discharge":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Follow Up OPD":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Shifted to Ward":
        return "bg-cyan-100 text-cyan-700 border-cyan-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <Button variant="outline" size="icon" onClick={handleClick} className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-md">
            {patient.patientName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">{patient.patientName}</h1>
              {/* Display current status */}
              <Badge className={`border ${getStatusBadgeClass(status)}`}>
                {status}
              </Badge>
              {patient.allergies.length > 0 && (
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                  Allergy: {patient.allergies.join(", ")}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {patient.age} years · {patient.gender} · Blood Group <span className="font-semibold">{patient.bloodGroup}</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              UHID: {patient.uhid} · {name}: {patient.ipdId} · {patient.ward} / {patient.room} / {patient.bed}
            </p>
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