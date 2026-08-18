
import { Badge } from "@/components/ui/badge";
import { BedOccupiedPatient } from "@/types/nurse/ipd/bed-occupied-types";

export function PatientHeaderCard({ patient }: { patient: BedOccupiedPatient }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
            {patient.patientName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()}
          </span>
          <div>
            <p className="flex flex-wrap items-center gap-2 text-base font-semibold text-slate-800">
              {patient.patientName}
              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Stable</Badge>
            </p>
            <p className="text-sm text-slate-500">
              {patient.age} Y / {patient.gender} · Blood Group: {patient.bloodGroup}
            </p>
            <p className="text-xs text-slate-400">
              UHID: {patient.uhid} · Admission ID: {patient.admissionId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <InfoBlock label="Ward / Room / Bed" value={`${patient.ward} / ${patient.room} / ${patient.bed}`} />
          <InfoBlock label="Department" value={patient.department} />
          <InfoBlock label="Admitting Doctor" value={patient.admittingDoctor} />
          <InfoBlock label="Admission Date & Time" value={patient.occupiedOn} />
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}