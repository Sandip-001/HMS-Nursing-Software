// app/(dashboard)/nurse/ipd/patients/[uhid]/page.tsx
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  DischargeSummaryForm, EmarDose, FluidBalanceEntry, ProgressNote, ShiftHandoverEntry, TreatmentPlanItem, VitalRecord,
} from "@/types/nurse/ipd/nurse-ipd-types";
import {
  getEmarForPatient, getFluidBalanceForPatient, getNursePatientByUhid, getProgressNotesForPatient,
  getShiftHandoversForPatient, getTreatmentPlanForPatient, getVitalsForPatient,
} from "@/lib/nurse/ipd/nurse-ipd-data";
import { PatientHeader } from "./_components/patient-header";
import { TabOverview } from "./_components/tab-overview";
import { TabVitals } from "./_components/tab-vitals";
import { TabEmar } from "./_components/tab-emar";
import { TabProgressNotes } from "./_components/tab-progress-notes";
import { TabFluidBalance } from "./_components/tab-fluid-balance";
import { TabTreatmentPlan } from "./_components/tab-treatment-plan";
import { TabShiftHandover } from "./_components/tab-shift-handover";
import { TabDischarge } from "./_components/tab-discharge";

export default function NursePatientDetailPage() {
  const params = useParams();
  const uhid = params.uhid as string;
  const patient = getNursePatientByUhid(uhid);

  const [tab, setTab] = useState("overview");
  const [vitals, setVitals] = useState<VitalRecord[]>(() => getVitalsForPatient(patient.uhid));
  const [doses, setDoses] = useState<EmarDose[]>(() => getEmarForPatient(patient.uhid));
  const [notes, setNotes] = useState<ProgressNote[]>(() => getProgressNotesForPatient(patient.uhid));
  const [fluidEntries, setFluidEntries] = useState<FluidBalanceEntry[]>(() => getFluidBalanceForPatient(patient.uhid));
  const [plans, setPlans] = useState<TreatmentPlanItem[]>(() => getTreatmentPlanForPatient(patient.uhid));
  const [handovers, setHandovers] = useState<ShiftHandoverEntry[]>(() => getShiftHandoversForPatient(patient.uhid));

  function addVital(vital: VitalRecord) {
    setVitals((previous) => [vital, ...previous]);
    toast.success("Vitals recorded successfully.");
  }
  function updateDose(dose: EmarDose) {
    setDoses((previous) => previous.map((item) => item.id === dose.id ? dose : item));
    toast.success(`${dose.medicineName} (${dose.slot}) marked as ${dose.status}.`);
  }
  function addNote(note: ProgressNote) {
    setNotes((previous) => [{ ...note, uhid: patient.uhid }, ...previous]);
    toast.success("Progress note saved and signed.");
  }
  function addFluidEntry(entry: FluidBalanceEntry) {
    setFluidEntries((previous) => [entry, ...previous]);
    toast.success("Fluid balance entry recorded.");
  }
  function toggleFollow(plan: TreatmentPlanItem) {
    setPlans((previous) => previous.map((item) => item.id === plan.id ? plan : item));
    toast.success(`Treatment plan marked as ${plan.followStatus}.`);
  }
  function handleHandover(entry: ShiftHandoverEntry) {
    setHandovers((previous) => [entry, ...previous]);
    toast.success(`Patient handed over to ${entry.toNurse}.`);
  }
  function handleDischarge(form: DischargeSummaryForm) {
    console.log("Discharge summary submitted:", { uhid: patient.uhid, ...form });
    toast.success(`${patient.patientName} discharged successfully.`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] space-y-5">
        <PatientHeader patient={patient} />

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start overflow-x-auto rounded-none border-b border-slate-200 bg-transparent p-0">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Overview</TabsTrigger>
            <TabsTrigger value="vitals" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Vitals Monitoring</TabsTrigger>
            <TabsTrigger value="emar" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Orders & eMAR</TabsTrigger>
            <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Progress Notes</TabsTrigger>
            <TabsTrigger value="fluid" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Fluid Balance</TabsTrigger>
            <TabsTrigger value="treatment" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Treatment Plan</TabsTrigger>
            <TabsTrigger value="handover" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Shift Handover</TabsTrigger>
            <TabsTrigger value="discharge" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Discharge</TabsTrigger>
          </TabsList>

          <div className="mt-5">
            <TabsContent value="overview" className="mt-0"><TabOverview patient={patient} onNext={() => setTab("vitals")} /></TabsContent>
            <TabsContent value="vitals" className="mt-0"><TabVitals vitals={vitals} onAddVital={addVital} /></TabsContent>
            <TabsContent value="emar" className="mt-0"><TabEmar doses={doses} onUpdateDose={updateDose} /></TabsContent>
            <TabsContent value="notes" className="mt-0"><TabProgressNotes notes={notes} onAddNote={addNote} /></TabsContent>
            <TabsContent value="fluid" className="mt-0"><TabFluidBalance entries={fluidEntries} onAddEntry={addFluidEntry} /></TabsContent>
            <TabsContent value="treatment" className="mt-0"><TabTreatmentPlan plans={plans} onToggleFollow={toggleFollow} /></TabsContent>
            <TabsContent value="handover" className="mt-0"><TabShiftHandover handovers={handovers} onHandover={handleHandover} /></TabsContent>
            <TabsContent value="discharge" className="mt-0"><TabDischarge patientName={patient.patientName} onDischarge={handleDischarge} /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}