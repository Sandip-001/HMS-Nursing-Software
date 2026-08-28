// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/section-registration.tsx
import { BedDouble, Hash, PhoneCall, ShieldAlert, Siren, Stethoscope, User, UserCog, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EmergencyPatient } from "@/types/emergency/emergency-types";
import { EmergencyStatusBadge } from "../emergency-badges";

export function SectionRegistration({ patient }: { patient: EmergencyPatient }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-lg font-bold text-white">{(patient.patientName || "U").charAt(0)}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">{patient.patientName || "Unidentified Patient"}</h3>
                <EmergencyStatusBadge status={patient.status} />
                {patient.allergies.length > 0 && <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">Allergy: {patient.allergies.join(", ")}</Badge>}
              </div>
              <p className="mt-1 text-sm text-slate-500">{patient.age ? `${patient.age} yrs` : "Age unknown"} · {patient.gender} · {patient.uhid}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <InfoTile icon={<Hash className="h-4 w-4" />} label="Emergency No." value={patient.emergencyNumber} />
          <InfoTile icon={<BedDouble className="h-4 w-4" />} label="Bed / Bay" value={patient.bedOrBay} />
          <InfoTile icon={<Stethoscope className="h-4 w-4" />} label="Attending Doctor" value={patient.attendingDoctor} />
          <InfoTile icon={<UserCog className="h-4 w-4" />} label="Assigned RMO" value={patient.assignedRmo} />
          <InfoTile icon={<UserRound className="h-4 w-4" />} label="Assigned Nurse" value={patient.assignedNurse} />
          <InfoTile icon={<PhoneCall className="h-4 w-4" />} label="Contact" value={patient.mobileNumber || "—"} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Attendant" value={patient.attendantName || "—"} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Registered By" value={`${patient.registeredBy} · ${patient.registeredAt}`} />
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-amber-800"><Siren className="h-4 w-4" />Current Condition</p>
        <p className="mt-2 text-sm text-slate-700">{patient.currentCondition}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-3 text-sm font-bold text-slate-800">Emergency Intake Details</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoTile icon={<Siren className="h-4 w-4" />} label="Arrival Mode" value={patient.arrivalMode} />
          <InfoTile icon={<ShieldAlert className="h-4 w-4" />} label="Incident / Reason" value={patient.incidentType} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Brought By" value={patient.broughtBy || "—"} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Referred From" value={patient.referredFrom || "—"} />
        </div>
      </div>

      {patient.police.caseType !== "None" && (
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-red-800"><ShieldAlert className="h-4 w-4" />Medico-Legal Case: {patient.police.caseType}</p>
          <p className="mt-2 text-xs text-slate-500">See the Shift Handover & Police section for full notification details.</p>
        </div>
      )}
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
      <p className="flex items-center gap-1.5 text-[10px] uppercase text-slate-400">{icon}{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}