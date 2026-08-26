// app/(dashboard)/nurse-admin/ipd/beds/_components/bed-unit-card.tsx
"use client";
import { useState } from "react";
import { BedSingle, Stethoscope, User, Wrench } from "lucide-react";
import type { BedInfo, WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { PatientStatusBadge } from "../../all-ward-patients/_components/status-badges";

const statusStyle: Record<BedInfo["status"], { card: string; iconBg: string; icon: string; label: string }> = {
  Available: { card: "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400", iconBg: "bg-emerald-100", icon: "text-emerald-600", label: "text-emerald-700" },
  Occupied: { card: "border-blue-200 bg-blue-50/50 hover:border-blue-400", iconBg: "bg-blue-100", icon: "text-blue-600", label: "text-blue-700" },
  Reserved: { card: "border-amber-200 bg-amber-50/50 hover:border-amber-400", iconBg: "bg-amber-100", icon: "text-amber-600", label: "text-amber-700" },
  Maintenance: { card: "border-slate-300 bg-slate-100/70 hover:border-slate-400", iconBg: "bg-slate-200", icon: "text-slate-500", label: "text-slate-500" },
};

export function BedUnitCard({ bed, patient, onOpenPatient }: { bed: BedInfo; patient?: WardPatientFull; onOpenPatient: (patient: WardPatientFull) => void }) {
  const [hovered, setHovered] = useState(false);
  const style = statusStyle[bed.status];

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button
        onClick={() => patient && onOpenPatient(patient)}
        disabled={!patient}
        className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 p-4 shadow-sm transition ${style.card} ${patient ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.iconBg}`}>
          {bed.status === "Maintenance" ? <Wrench className={`h-5 w-5 ${style.icon}`} /> : <BedSingle className={`h-5 w-5 ${style.icon}`} />}
        </div>
        <p className="text-sm font-bold text-slate-800">{bed.bedLabel}</p>
        <p className={`text-[10px] font-semibold uppercase ${style.label}`}>{bed.status}</p>
        {patient && <p className="max-w-full truncate text-xs font-medium text-slate-600">{patient.patientName}</p>}
      </button>

      {hovered && patient && (
        <div className="absolute left-1/2 top-full z-30 mt-2 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">{patient.patientName.charAt(0)}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">{patient.patientName}</p>
              <p className="text-xs text-slate-400">{patient.uhid}</p>
            </div>
          </div>
          <div className="mt-2"><PatientStatusBadge status={patient.status} /></div>
          <div className="mt-3 space-y-1.5 text-xs text-slate-500">
            <p className="flex items-center gap-1.5"><User className="h-3 w-3" />{patient.age} yrs · {patient.gender}</p>
            <p className="flex items-center gap-1.5"><Stethoscope className="h-3 w-3" />{patient.admittingDoctor}</p>
          </div>
          <div className="mt-2 rounded-lg bg-slate-50 p-2">
            <p className="text-[10px] uppercase text-slate-400">Diagnosis</p>
            <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">{patient.currentDiagnosis}</p>
          </div>
          <p className="mt-2 text-center text-[10px] text-blue-500">Click bed to view full details</p>
        </div>
      )}

      {hovered && bed.status === "Reserved" && !patient && (
        <div className="absolute left-1/2 top-full z-30 mt-2 w-52 -translate-x-1/2 rounded-xl border border-amber-200 bg-white p-3 text-center shadow-xl">
          <p className="text-xs font-semibold text-amber-700">Reserved for upcoming admission</p>
        </div>
      )}

      {hovered && bed.status === "Maintenance" && (
        <div className="absolute left-1/2 top-full z-30 mt-2 w-52 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-center shadow-xl">
          <p className="text-xs font-semibold text-slate-500">Bed under maintenance / cleaning</p>
        </div>
      )}
    </div>
  );
}