// app/(dashboard)/admission-desk/emergency/new-registration/page.tsx
"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMERGENCY_PATIENTS, POLICE_CASE_INCIDENTS, findExistingPatientByMobile, generateEmergencyNumber, generateUhid } from "@/lib/emergency/emergency-data";
import type { EmergencyPatient, PoliceCaseType } from "@/types/emergency/emergency-types";
import { UhidLookupCard } from "./_components/uhid-lookup-card";
import { PatientIdentitySection, EmergencyIntakeSection, type RegistrationFormState } from "./_components/registration-form-fields";
import { PoliceNoticeBanner } from "./_components/police-notice-banner";
import { RegistrationSuccessCard } from "./_components/registration-success-card";
import { EmergencyDetailDrawer } from "../all-patients/_components/drawer/emergency-detail-drawer";

const initialForm: RegistrationFormState = {
  patientName: "", dateOfBirth: "", age: "", mobileNumber: "", attendantName: "", gender: "Male",
  aadharNumber: "", ayushmanCardNumber: "", emergencyContactNumber: "", address: "",
  arrivalMode: "Ambulance", referredFrom: "", incidentType: "Chest Pain", broughtBy: "",
};

function calculateAge(dob: string): string {
  if (!dob) return "";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age >= 0 ? String(age) : "";
}

function resolvePoliceCaseType(incidentType: string): PoliceCaseType {
  if (incidentType === "Accident (RTA)") return "Accident";
  if (incidentType === "Assault / Murder Attempt") return "Murder / Assault";
  if (incidentType === "Suicide Attempt") return "Suicide";
  return "None";
}

export default function NewEmergencyRegistrationPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegistrationFormState>(initialForm);
  const [mobileForLookup, setMobileForLookup] = useState("");
  const [lookupState, setLookupState] = useState<"idle" | "found" | "new">("idle");
  const [resolvedUhid, setResolvedUhid] = useState("");
  const [resolvedPatientName, setResolvedPatientName] = useState<string | undefined>();
  const [isExistingPatient, setIsExistingPatient] = useState(false);
  const [registered, setRegistered] = useState<EmergencyPatient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<EmergencyPatient | null>(null);

  const requiresPolice = useMemo(() => POLICE_CASE_INCIDENTS.has(form.incidentType), [form.incidentType]);

  function updateField<K extends keyof RegistrationFormState>(key: K, value: RegistrationFormState[K]) {
    setForm((previous) => {
      const next = { ...previous, [key]: value };
      if (key === "dateOfBirth") next.age = calculateAge(String(value));
      return next;
    });
  }

  function handleUhidLookup() {
    if (!mobileForLookup.trim()) {
      toast.error("Enter a mobile number to check.");
      return;
    }
    const existing = findExistingPatientByMobile(mobileForLookup);
    if (existing) {
      setLookupState("found");
      setResolvedUhid(existing.uhid);
      setResolvedPatientName(existing.patientName);
      setIsExistingPatient(true);
      updateField("mobileNumber", mobileForLookup);
      if (existing.patientName) updateField("patientName", existing.patientName);
    } else {
      const newUhid = generateUhid();
      setLookupState("new");
      setResolvedUhid(newUhid);
      setIsExistingPatient(false);
      updateField("mobileNumber", mobileForLookup);
    }
  }

  function handleRegister() {
    const emergencyNumber = generateEmergencyNumber();
    const uhid = resolvedUhid || generateUhid();
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const policeCaseType = resolvePoliceCaseType(form.incidentType);

    const newPatient: EmergencyPatient = {
      emergencyNumber, uhid, isExistingPatient,
      patientName: form.patientName || undefined, dateOfBirth: form.dateOfBirth || undefined,
      age: form.age ? Number(form.age) : undefined, gender: form.gender,
      mobileNumber: form.mobileNumber || undefined, attendantName: form.attendantName || undefined,
      aadharNumber: form.aadharNumber || undefined, ayushmanCardNumber: form.ayushmanCardNumber || undefined,
      emergencyContactNumber: form.emergencyContactNumber || undefined, address: form.address || undefined,
      arrivalMode: form.arrivalMode, referredFrom: form.referredFrom || undefined, incidentType: form.incidentType,
      broughtBy: form.broughtBy || undefined, policeInformationNeeded: requiresPolice,
      registeredAt: stamp, registeredBy: "Front Desk - Admission",
      status: "Under Observation", currentCondition: "Awaiting initial assessment by RMO / Doctor.",
      attendingDoctor: "Unassigned", assignedRmo: "Unassigned", assignedNurse: "Unassigned", bedOrBay: "Triage Area",
      allergies: [], vitals: [], diagnoses: [], doses: [], labReports: [], progressNotes: [], treatmentPlans: [],
      assignedNurses: [], handovers: [],
      statusLog: [{ id: `S-${Date.now()}`, status: "Under Observation", changedBy: "Front Desk - Admission", changedAt: stamp }],
      police: { caseType: policeCaseType, nearestPoliceStation: requiresPolice ? "Sector 14 Police Station" : "", informed: false },
    };

    EMERGENCY_PATIENTS.unshift(newPatient);
    setRegistered(newPatient);
    toast.success(`Patient registered. Emergency No: ${emergencyNumber}`);
  }

  function resetForm() {
    setForm(initialForm);
    setMobileForLookup("");
    setLookupState("idle");
    setResolvedUhid("");
    setResolvedPatientName(undefined);
    setIsExistingPatient(false);
    setRegistered(null);
  }

  if (registered) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1400px]">
          <RegistrationSuccessCard
            emergencyNumber={registered.emergencyNumber}
            uhid={registered.uhid}
            isExistingPatient={registered.isExistingPatient}
            onRegisterAnother={resetForm}
            onViewPatient={() => setViewingPatient(registered)}
          />
        </div>
        <EmergencyDetailDrawer patient={viewingPatient} onClose={() => setViewingPatient(null)} onPatientUpdate={setViewingPatient} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1100px] space-y-6">
        <header className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => router.push("/admission/emergency/all-patients")}><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <div className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-red-600" />
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">New Emergency Registration</h1>
            </div>
            <p className="mt-1 text-sm text-slate-500">Quick intake — most fields can be completed later once the patient is stabilized.</p>
          </div>
        </header>

        <UhidLookupCard
          mobile={mobileForLookup}
          onMobileChange={setMobileForLookup}
          onLookup={handleUhidLookup}
          lookupState={lookupState}
          resolvedUhid={resolvedUhid}
          resolvedPatientName={resolvedPatientName}
        />

        <PatientIdentitySection form={form} onChange={updateField} />
        <EmergencyIntakeSection form={form} onChange={updateField} />

        {requiresPolice && <PoliceNoticeBanner incidentType={form.incidentType} />}

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.push("/admission/emergency/all-patients")}>Cancel</Button>
          <Button className="gap-2 bg-red-600 hover:bg-red-700" onClick={handleRegister}>Register Patient</Button>
        </div>
      </div>
    </div>
  );
}