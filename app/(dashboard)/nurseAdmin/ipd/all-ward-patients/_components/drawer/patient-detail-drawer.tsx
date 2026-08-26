// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/drawer/patient-detail-drawer.tsx
"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRightLeft, ClipboardCheck, ClipboardList, Droplets, HeartPulse, LogOut, Pill, User, UserCog, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PatientStatus, WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import type { DailyShiftAssignment } from "@/types/nurse-admin/ipd/nurse-admin-types";
import { PatientStatusBadge } from "../status-badges";
import { SectionPatientInfo } from "./section-patient-info";
import { SectionVitals } from "./section-vitals";
import { SectionMedicines } from "./section-medicines";
import { SectionProgressNotes } from "./section-progress-notes";
import { SectionFluidBalance } from "./section-fluid-balance";
import { SectionTreatmentPlan } from "./section-treatment-plan";
import { SectionShiftHandover } from "./section-shift-handover";
import { SectionAssignedNurses } from "./section-assigned-nurses";
import { SectionDischarge } from "./section-discharge";

type SectionKey = "info" | "vitals" | "medicines" | "notes" | "fluid" | "treatment" | "handover" | "nurses" | "discharge";

const NAV: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: "info", label: "Patient Info", icon: User },
  { key: "vitals", label: "Vitals", icon: HeartPulse },
  { key: "medicines", label: "Medicines", icon: Pill },
  { key: "notes", label: "Progress Notes", icon: ClipboardList },
  { key: "fluid", label: "Fluid Balance", icon: Droplets },
  { key: "treatment", label: "Treatment Plan", icon: ClipboardCheck },
  { key: "handover", label: "Shift Handover", icon: ArrowRightLeft },
  { key: "nurses", label: "Assigned Nurses", icon: UserCog },
  { key: "discharge", label: "Discharge", icon: LogOut },
];

export function PatientDetailDrawer({ patient, onClose, onPatientUpdate }: { patient: WardPatientFull | null; onClose: () => void; onPatientUpdate: (patient: WardPatientFull) => void }) {
  const [section, setSection] = useState<SectionKey>("info");

  const active = patient;

  function updateStatus(status: PatientStatus, reason?: string) {
    if (!active) return;
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const updated: WardPatientFull = {
      ...active, status, acuity: status === "Discharged" ? active.acuity : status,
      statusLog: [{ id: `S-${Date.now()}`, status, changedBy: "Admin (Nurse Manager)", changedAt: stamp, reason }, ...active.statusLog],
    };
    onPatientUpdate(updated);
    toast.success(status === "Critical" ? "Status set to Critical. Doctor notified immediately." : `Patient status updated to ${status}.`);
  }

  function updateAssignments(assignments: DailyShiftAssignment[]) {
    if (!active) return;
    onPatientUpdate({ ...active, assignments });
    toast.success("Nurse assignment updated.");
  }

  function sendToBilling() {
    if (!active || !active.discharge) return;
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const updated: WardPatientFull = {
      ...active, status: "Discharged",
      discharge: { ...active.discharge, nurseApprovedBy: "Admin (Nurse Manager)", nurseApprovedAt: stamp, sentToBillingAt: stamp },
      statusLog: [{ id: `S-${Date.now()}`, status: "Discharged", changedBy: "Admin (Nurse Manager)", changedAt: stamp }, ...active.statusLog],
    };
    onPatientUpdate(updated);
    toast.success(`${active.patientName} discharged. Bed ${active.bed} is now free for new booking.`);
  }

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-4xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white">{active.patientName.charAt(0)}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-800">{active.patientName}</h2>
                <PatientStatusBadge status={active.status} />
              </div>
              <p className="text-xs text-slate-500">{active.uhid} · {active.ward} · {active.room} · {active.bed}</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${section === key ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-5">
          {section === "info" && <SectionPatientInfo patient={active} onChangeStatus={updateStatus} />}
          {section === "vitals" && <SectionVitals vitals={active.vitals} />}
          {section === "medicines" && <SectionMedicines medicines={active.medicines} />}
          {section === "notes" && <SectionProgressNotes notes={active.progressNotes} />}
          {section === "fluid" && <SectionFluidBalance entries={active.fluidBalance} />}
          {section === "treatment" && <SectionTreatmentPlan plans={active.treatmentPlans} />}
          {section === "handover" && <SectionShiftHandover handovers={active.handovers} />}
          {section === "nurses" && <SectionAssignedNurses ward={active.ward} assignments={active.assignments} onUpdateAssignments={updateAssignments} />}
          {section === "discharge" && (
            <SectionDischarge
              patientName={active.patientName}
              bed={active.bed}
              ward={active.ward}
              discharge={active.discharge}
              alreadySent={active.status === "Discharged" && Boolean(active.discharge?.sentToBillingAt)}
              onSendToBilling={sendToBilling}
            />
          )}
        </div>
      </aside>
    </div>
  );
}