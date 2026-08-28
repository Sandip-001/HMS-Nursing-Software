// app/(dashboard)/nurse/emergency/_components/nurse-patient-details-drawer.tsx
"use client";
import { useState } from "react";
import { Activity, ClipboardList, FileText, FlaskConical, HeartPulse, Pill, Plus, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RmoEmergencyPatient } from "@/types/emergency/rmo-emergency-types";
import { EmergencyStatusBadge } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-badges";
import { SectionRegistration } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-registration";
import { SectionVitals } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-vitals";
import { SectionDiagnosis } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-diagnosis";
import { SectionMedicines } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-medicines";
import { SectionLabReports } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-lab-reports";
import { SectionProgressNotes } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-progress-notes";
import { SectionAssignedNurses } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-assigned-nurses";
import { SectionHandoverPolice } from "@/app/(dashboard)/admission/emergency/all-patients/_components/drawer/section-handover-police";
import { ProgressNote, VitalRecord } from "@/types/emergency/emergency-types";
import { NurseMedicineAdministerDrawer } from "./nurse-medicine-administer-drawer";
import { NurseTreatmentFollowDrawer } from "./nurse-treatment-follow-drawer";
import { NurseVitalForm } from "./nurse-vital-form";
import { NurseProgressNoteForm } from "./nurse-progress-note-form";

type SectionKey = "registration" | "vitals" | "diagnosis" | "medicines" | "labs" | "notes" | "treatment" | "nurses" | "handover";

const NAV: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: "registration", label: "Registration", icon: FileText },
  { key: "vitals", label: "Vitals", icon: HeartPulse },
  { key: "diagnosis", label: "Diagnosis", icon: Stethoscope },
  { key: "medicines", label: "Medicines", icon: Pill },
  { key: "labs", label: "Labs", icon: FlaskConical },
  { key: "notes", label: "Progress Notes", icon: ClipboardList },
  { key: "treatment", label: "Treatment", icon: Activity },
  { key: "nurses", label: "Nurses", icon: ClipboardList },
  { key: "handover", label: "Handover", icon: ClipboardList },
];

export function NursePatientDetailsDrawer({ patient, onClose, onUpdate }: { patient: RmoEmergencyPatient | null; onClose: () => void; onUpdate: (patient: RmoEmergencyPatient) => void }) {
  const [section, setSection] = useState<SectionKey>("registration");
  const [administeringMed, setAdministeringMed] = useState<{ medicineId: string; medicineName: string; instructions: string } | null>(null);
  const [updatingTreatment, setUpdatingTreatment] = useState<{ planId: string; title: string; currentStatus: "Following" | "Not Following" } | null>(null);
  const [addingVital, setAddingVital] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  if (!patient) return null;
  const active = patient;

  function handleMedicineAdminister(medicineId: string, givenAt: string) {
    const updatedDoses = active.doses.map((d) =>
      d.id === medicineId ? { ...d, status: "Given" as const, givenBy: "Nurse", givenAt } : d,
    );
    onUpdate({ ...active, doses: updatedDoses });
    setAdministeringMed(null);
  }

  function handleTreatmentFollow(planId: string, followStatus: "Following" | "Not Following") {
    const updatedPlans = active.treatmentPlans.map((t) =>
      t.id === planId ? { ...t, followStatus } : t,
    );
    onUpdate({ ...active, treatmentPlans: updatedPlans });
    setUpdatingTreatment(null);
  }

  function handleAddVital(vital: Omit<VitalRecord, "id" | "date" | "dateTime" | "recordedBy" | "recordedByRole">) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const date = new Date().toISOString().slice(0, 10);
    const newVital: VitalRecord = {
      ...vital,
      id: `V-${Date.now()}`,
      date,
      dateTime: stamp,
      recordedBy: "Nurse",
      recordedByRole: "Nurse" as const,
    };
    onUpdate({ ...active, vitals: [newVital, ...active.vitals] });
    setAddingVital(false);
  }

  function handleAddNote(note: Omit<ProgressNote, "id" | "date" | "createdAt" | "author" | "role">) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const date = new Date().toISOString().slice(0, 10);
    const newNote: ProgressNote = {
      ...note,
      id: `PN-${Date.now()}`,
      date,
      createdAt: stamp,
      author: "Nurse",
      role: "Nurse" as const,
    };
    onUpdate({ ...active, progressNotes: [newNote, ...active.progressNotes] });
    setAddingNote(false);
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-5xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 font-bold text-white">
              {(active.patientName || "U").charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-800">{active.patientName || "Unidentified Patient"}</h2>
                <EmergencyStatusBadge status={active.status} />
              </div>
              <p className="text-xs text-slate-500">{active.uhid} · {active.emergencyNumber} · {active.bedOrBay}</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                section === key ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-5">
          {section === "registration" && <SectionRegistration patient={active} />}
          {section === "vitals" && (
            <>
              <SectionAction title="Vitals History" onClick={() => setAddingVital(true)} />
              <SectionVitals vitals={active.vitals} />
            </>
          )}
          {section === "diagnosis" && <SectionDiagnosis diagnoses={active.diagnoses} />}
          {section === "medicines" && (
            <div>
              <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                <p className="text-sm font-bold text-emerald-900">Medicine Administration</p>
                <p className="text-xs text-slate-500">Update status for each dose as you administer</p>
              </div>
              <SectionMedicines
                doses={active.doses}
                onUpdateStatus={(medicineId, medicineName, instructions) =>
                  setAdministeringMed({ medicineId, medicineName, instructions })
                }
              />
            </div>
          )}
          {section === "labs" && <SectionLabReports reports={active.labReports} />}
          {section === "notes" && (
            <>
              <SectionAction title="Progress Notes" onClick={() => setAddingNote(true)} />
              <SectionProgressNotes notes={active.progressNotes} />
            </>
          )}
          {section === "treatment" && (
            <div>
              <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50/50 p-3">
                <p className="text-sm font-bold text-blue-900">Treatment Plans (Doctor/RMO Orders)</p>
                <p className="text-xs text-slate-500">Mark if you are following each plan</p>
              </div>
              <div className="space-y-3">
                {active.treatmentPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-xl border p-4 ${
                      plan.followStatus === "Following" ? "border-emerald-200 bg-emerald-50/20" : "border-amber-200 bg-amber-50/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800">{plan.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{plan.description}</p>
                        <p className="mt-2 text-xs text-slate-400">
                          Ordered by {plan.orderedBy} ({plan.orderedByRole}) on {plan.orderedOn}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={plan.followStatus === "Following" ? "outline" : "default"}
                        className={plan.followStatus === "Following" ? "border-emerald-300 text-emerald-700" : "bg-emerald-600 hover:bg-emerald-700"}
                        onClick={() => setUpdatingTreatment({ planId: plan.id, title: plan.title, currentStatus: plan.followStatus })}
                      >
                        {plan.followStatus === "Following" ? "Following" : "Mark Following"}
                      </Button>
                    </div>
                  </div>
                ))}
                {active.treatmentPlans.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
                    No treatment plans ordered by doctor/RMO yet.
                  </div>
                )}
              </div>
            </div>
          )}
          {section === "nurses" && <SectionAssignedNurses assignments={active.assignedNurses} />}
          {section === "handover" && <SectionHandoverPolice handovers={active.handovers} police={active.police} onInformPolice={() => undefined} />}
        </div>
      </aside>

      {/* Medicine Administration Modal */}
      {administeringMed && (
        <NurseMedicineAdministerDrawer
          medicineId={administeringMed.medicineId}
          medicineName={administeringMed.medicineName}
          instructions={administeringMed.instructions}
          onClose={() => setAdministeringMed(null)}
          onAdminister={handleMedicineAdminister}
        />
      )}

      {/* Treatment Follow Status Modal */}
      {updatingTreatment && (
        <NurseTreatmentFollowDrawer
          planId={updatingTreatment.planId}
          title={updatingTreatment.title}
          currentStatus={updatingTreatment.currentStatus}
          onClose={() => setUpdatingTreatment(null)}
          onUpdate={handleTreatmentFollow}
        />
      )}

      {/* Add Vitals Modal */}
      {addingVital && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setAddingVital(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-emerald-200 bg-white p-5 shadow-2xl">
            <NurseVitalForm onSubmit={handleAddVital} onClose={() => setAddingVital(false)} />
          </div>
        </div>
      )}

      {/* Add Progress Note Modal */}
      {addingNote && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setAddingNote(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-emerald-200 bg-white p-5 shadow-2xl">
            <NurseProgressNoteForm onSubmit={handleAddNote} onClose={() => setAddingNote(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function SectionAction({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
      <p className="text-sm font-bold text-emerald-900">{title}</p>
      <Button size="sm" className="gap-1 bg-emerald-600 hover:bg-emerald-700" onClick={onClick}>
        <Plus className="h-4 w-4" />
        Add New
      </Button>
    </div>
  );
}