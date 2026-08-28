// app/(dashboard)/admission-desk/emergency/_components/drawer/emergency-detail-drawer.tsx
"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRightLeft, ClipboardList, FileText, FlaskConical, HeartPulse, Pill, Stethoscope, UserCog, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmergencyPatient } from "@/types/emergency/emergency-types";
import { EmergencyStatusBadge } from "../emergency-badges";
import { SectionRegistration } from "./section-registration";
import { SectionVitals } from "./section-vitals";
import { SectionDiagnosis } from "./section-diagnosis";
import { SectionMedicines } from "./section-medicines";
import { SectionLabReports } from "./section-lab-reports";
import { SectionProgressNotes } from "./section-progress-notes";
import { SectionTreatmentPlan } from "./section-treatment-plan";
import { SectionAssignedNurses } from "./section-assigned-nurses";
import { SectionHandoverPolice } from "./section-handover-police";

type SectionKey = "registration" | "vitals" | "diagnosis" | "medicines" | "labs" | "notes" | "treatment" | "nurses" | "handover";

const NAV: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: "registration", label: "Registration", icon: FileText },
  { key: "vitals", label: "Vitals", icon: HeartPulse },
  { key: "diagnosis", label: "Diagnosis", icon: Stethoscope },
  { key: "medicines", label: "Medicines", icon: Pill },
  { key: "labs", label: "Lab Reports", icon: FlaskConical },
  { key: "notes", label: "Progress Notes", icon: ClipboardList },
  { key: "treatment", label: "Treatment Plan", icon: ClipboardList },
  { key: "nurses", label: "Assigned Nurses", icon: UserCog },
  { key: "handover", label: "Handover & Police", icon: ArrowRightLeft },
];

export function EmergencyDetailDrawer({ patient, onClose, onPatientUpdate }: { patient: EmergencyPatient | null; onClose: () => void; onPatientUpdate: (patient: EmergencyPatient) => void }) {
  const [section, setSection] = useState<SectionKey>("registration");

  if (!patient) return null;
  const active = patient;

  function informPolice(firNumber: string, remarks: string) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const updated = {
      ...active,
      police: { ...active.police, informed: true, informedAt: stamp, informedBy: "Front Desk - Admission", firNumber: firNumber || undefined, remarks: remarks || active.police.remarks },
    } as EmergencyPatient;
    onPatientUpdate(updated);
    toast.success(`${active.police.nearestPoliceStation} has been informed.`);
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-4xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 font-bold text-white">{(active.patientName || "U").charAt(0)}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-800">{active.patientName || "Unidentified Patient"}</h2>
                <EmergencyStatusBadge status={active.status} />
              </div>
              <p className="text-xs text-slate-500">{active.uhid} · {active.emergencyNumber} · {active.bedOrBay}</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setSection(key)} className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${section === key ? "bg-red-50 text-red-700" : "text-slate-500 hover:bg-slate-50"}`}>
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-5">
          {section === "registration" && <SectionRegistration patient={active} />}
          {section === "vitals" && <SectionVitals vitals={active.vitals} />}
          {section === "diagnosis" && <SectionDiagnosis diagnoses={active.diagnoses} />}
          {section === "medicines" && <SectionMedicines doses={active.doses} />}
          {section === "labs" && <SectionLabReports reports={active.labReports} />}
          {section === "notes" && <SectionProgressNotes notes={active.progressNotes} />}
          {section === "treatment" && <SectionTreatmentPlan plans={active.treatmentPlans} />}
          {section === "nurses" && <SectionAssignedNurses assignments={active.assignedNurses} />}
          {section === "handover" && <SectionHandoverPolice handovers={active.handovers} police={active.police} onInformPolice={informPolice} />}
        </div>
      </aside>
    </div>
  );
}