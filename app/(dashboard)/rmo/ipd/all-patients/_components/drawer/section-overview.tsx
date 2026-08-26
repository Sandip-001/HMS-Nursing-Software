// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-overview.tsx
import { BedDouble, CheckCircle2, Clock3, HeartPulse, PhoneCall, PackageX, Pill, ShieldAlert, Stethoscope, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RmoPatient } from "@/types/rmo/ipd/rmo-types";
import { PatientStatusBadge } from "../rmo-badges";

export function SectionOverview({ patient }: { patient: RmoPatient }) {
  const latestVitals = patient.vitals[0];
  const given = patient.doses.filter((d) => d.status === "Given");
  const notGiven = patient.doses.filter((d) => d.status === "Not Given" || d.status === "Pending");
  const outOfStock = patient.doses.filter((d) => d.status === "Out of Stock");
  const latestDiagnosis = patient.diagnoses[0];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white">{patient.patientName.charAt(0)}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">{patient.patientName}</h3>
                <PatientStatusBadge status={patient.status} />
                {patient.allergies.length > 0 && <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700"><ShieldAlert className="mr-1 h-3 w-3" />{patient.allergies.join(", ")}</Badge>}
              </div>
              <p className="mt-1 text-sm text-slate-500">{patient.age} yrs · {patient.gender} · {patient.bloodGroup} · {patient.uhid}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <InfoTile icon={<BedDouble className="h-4 w-4" />} label="Bed / Ward" value={`${patient.bed} · ${patient.ward}`} />
          <InfoTile icon={<Stethoscope className="h-4 w-4" />} label="Attending Doctor" value={patient.attendingDoctor} />
          <InfoTile icon={<User className="h-4 w-4" />} label="RMO Assigned" value={patient.rmoAssigned} />
          <InfoTile icon={<Clock3 className="h-4 w-4" />} label="Admitted On" value={patient.admissionDateTime} />
          <InfoTile icon={<PhoneCall className="h-4 w-4" />} label="Contact" value={patient.contactNumber} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Guardian" value={patient.guardianName ?? "—"} />
        </div>
      </div>

      <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-5">
        <p className="text-[10px] uppercase text-violet-500">Current Diagnosis</p>
        {latestDiagnosis ? (
          <>
            <p className="mt-1 text-base font-bold text-slate-800">{latestDiagnosis.name} <span className="font-normal text-violet-600">({latestDiagnosis.code})</span></p>
            <p className="mt-1 text-xs text-slate-500">{latestDiagnosis.type} · Added by {latestDiagnosis.addedBy} on {latestDiagnosis.addedAt}</p>
          </>
        ) : <p className="mt-1 text-sm text-slate-400">No diagnosis recorded yet.</p>}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><HeartPulse className="h-4 w-4 text-red-500" />Latest Vitals</p>
        {latestVitals ? (
          <>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
              <Vital label="BP" value={latestVitals.bp} unit="mmHg" />
              <Vital label="Pulse" value={String(latestVitals.pulse)} unit="/min" />
              <Vital label="Temp" value={String(latestVitals.temp)} unit="°F" />
              <Vital label="RR" value={String(latestVitals.respRate)} unit="/min" />
              <Vital label="SpO₂" value={String(latestVitals.spo2)} unit="%" />
              <Vital label="Pain" value={String(latestVitals.pain)} unit="/10" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Recorded {latestVitals.dateTime} by {latestVitals.recordedBy} ({latestVitals.recordedByRole})</p>
          </>
        ) : <p className="mt-3 text-sm text-slate-400">No vitals recorded yet.</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card tone="emerald" icon={<CheckCircle2 className="h-4 w-4" />} title={`Given (${given.length})`}>
          {given.slice(0, 4).map((d) => <Row key={d.id} title={d.medicineName} subtitle={`${d.slot} · ${d.givenAt}`} />)}
          {given.length === 0 && <Empty text="No doses given yet." />}
        </Card>
        <Card tone="amber" icon={<Pill className="h-4 w-4" />} title={`Not Given / Pending (${notGiven.length})`}>
          {notGiven.slice(0, 4).map((d) => <Row key={d.id} title={d.medicineName} subtitle={`${d.slot} · ${d.scheduledTime}`} />)}
          {notGiven.length === 0 && <Empty text="All scheduled doses up to date." />}
        </Card>
        <Card tone="rose" icon={<PackageX className="h-4 w-4" />} title={`Out of Stock (${outOfStock.length})`}>
          {outOfStock.map((d) => <Row key={d.id} title={d.medicineName} subtitle={d.outOfStockRemark ?? "Awaiting pharmacy stock"} />)}
          {outOfStock.length === 0 && <Empty text="No stock issues currently." />}
        </Card>
      </div>
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
function Vital({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p>
    </div>
  );
}
function Card({ tone, icon, title, children }: { tone: "emerald" | "amber" | "rose"; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const toneMap = { emerald: "border-emerald-200 bg-emerald-50/30 text-emerald-800", amber: "border-amber-200 bg-amber-50/30 text-amber-800", rose: "border-red-200 bg-red-50/30 text-red-800" };
  return (
    <div className={`rounded-2xl border p-5 ${toneMap[tone]}`}>
      <p className="flex items-center gap-2 text-sm font-bold">{icon}{title}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}
function Row({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="rounded-lg border border-white/60 bg-white p-2.5"><p className="text-sm font-medium text-slate-800">{title}</p><p className="text-xs text-slate-500">{subtitle}</p></div>;
}
function Empty({ text }: { text: string }) {
  return <p className="text-xs text-slate-400">{text}</p>;
}