// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/drawer/section-patient-info.tsx
"use client";
import { useState } from "react";
import { AlertTriangle, BedDouble, CheckCircle2, Clock3, Eye, PhoneCall, ShieldAlert, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PatientStatus, WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { PatientStatusBadge } from "../status-badges";

const STATUS_OPTIONS: { status: PatientStatus; icon: React.ElementType; tone: string }[] = [
  { status: "Stable", icon: CheckCircle2, tone: "border-emerald-300 text-emerald-700 hover:bg-emerald-50" },
  { status: "Under Observation", icon: Eye, tone: "border-amber-300 text-amber-700 hover:bg-amber-50" },
  { status: "Critical", icon: AlertTriangle, tone: "border-red-300 text-red-700 hover:bg-red-50" },
];

export function SectionPatientInfo({ patient, onChangeStatus }: { patient: WardPatientFull; onChangeStatus: (status: PatientStatus, reason?: string) => void }) {
  const [pendingStatus, setPendingStatus] = useState<PatientStatus | null>(null);
  const [reason, setReason] = useState("");
  const isDischarged = patient.status === "Discharged";

  function confirmStatus() {
    if (!pendingStatus) return;
    onChangeStatus(pendingStatus, reason.trim() || undefined);
    setPendingStatus(null);
    setReason("");
  }

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
          <InfoTile icon={<User className="h-4 w-4" />} label="Attending Doctor" value={patient.admittingDoctor} />
          <InfoTile icon={<Clock3 className="h-4 w-4" />} label="Admitted On" value={patient.admissionDateTime} />
          <InfoTile icon={<PhoneCall className="h-4 w-4" />} label="Contact" value={patient.contactNumber} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Guardian" value={patient.guardianName ?? "—"} />
          <InfoTile icon={<BedDouble className="h-4 w-4" />} label="Room" value={patient.room} />
        </div>

        <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/60 p-3">
          <p className="text-[10px] uppercase text-violet-500">Current Diagnosis</p>
          <p className="mt-0.5 text-sm font-bold text-slate-800">{patient.currentDiagnosis} <span className="font-normal text-violet-600">({patient.diagnosisCode})</span></p>
        </div>
      </div>

      {!isDischarged && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-bold text-slate-800">Update Patient Status</p>
          <p className="mt-1 text-xs text-slate-500">Discharge status can only be set from the Discharge section by the doctor.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {STATUS_OPTIONS.map(({ status, icon: Icon, tone }) => (
              <Button key={status} variant="outline" disabled={patient.status === status} className={`gap-2 ${tone}`} onClick={() => setPendingStatus(status)}>
                <Icon className="h-4 w-4" />{status}
              </Button>
            ))}
          </div>

          {pendingStatus && (
            <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
              <p className="text-sm font-semibold text-blue-800">
                {pendingStatus === "Critical" ? "Mark patient as Critical and notify doctor immediately?" : `Change status to "${pendingStatus}"?`}
              </p>
              {pendingStatus === "Critical" && <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600"><AlertTriangle className="h-3.5 w-3.5" />The attending doctor will be notified instantly.</p>}
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason / notes (optional)" rows={2} className="mt-2 w-full rounded-lg border border-slate-200 p-2 text-sm" />
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setPendingStatus(null); setReason(""); }}>Cancel</Button>
                <Button size="sm" className={pendingStatus === "Critical" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} onClick={confirmStatus}>
                  Confirm {pendingStatus === "Critical" && "& Notify Doctor"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-3 text-sm font-bold text-slate-800">Status Change History</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400"><th className="py-2 pr-4">Date / Time</th><th className="pr-4">Status</th><th className="pr-4">Changed By</th><th>Reason</th></tr></thead>
            <tbody>
              {patient.statusLog.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-slate-700">{log.changedAt}</td>
                  <td className="pr-4"><PatientStatusBadge status={log.status} /></td>
                  <td className="pr-4 text-slate-600">{log.changedBy}</td>
                  <td className="text-slate-500">{log.reason ?? "—"}</td>
                </tr>
              ))}
              {patient.statusLog.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-slate-400">No status changes recorded.</td></tr>}
            </tbody>
          </table>
        </div>
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