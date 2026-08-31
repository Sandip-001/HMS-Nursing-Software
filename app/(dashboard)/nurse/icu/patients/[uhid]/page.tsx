// app/(dashboard)/nurse/icu/patients/[uhid]/page.tsx
"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  DischargeSummaryForm, EmarDose, FluidBalanceEntry, ProgressNote, ShiftHandoverEntry, TreatmentPlanItem, VitalRecord,
} from "@/types/nurse/ipd/nurse-ipd-types";
import type { VentilationRecord } from "@/types/nurse/icu/nurse-icu-types";
import type { OxygenAdministration, OxygenObservation, OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";
import {
  getEmarForPatient, getFluidBalanceForPatient, getNursePatientByUhid, getProgressNotesForPatient,
  getShiftHandoversForPatient, getTreatmentPlanForPatient, getVitalsForPatient,
  getVentilationForPatient,
} from "@/lib/nurse/icu/nurse-icu-data";
import { getActiveOxygenOrder, getOxygenOrderHistory, getActiveAdministration, getOxygenObservations } from "@/lib/nurse/icu/oxygen-therapy-data";

import { TabOverview } from "../../../ipd/patients/[uhid]/_components/tab-overview";
import { TabVitals } from "../../../ipd/patients/[uhid]/_components/tab-vitals";
import { TabEmar } from "../../../ipd/patients/[uhid]/_components/tab-emar";
import { TabProgressNotes } from "../../../ipd/patients/[uhid]/_components/tab-progress-notes";
import { TabFluidBalance } from "../../../ipd/patients/[uhid]/_components/tab-fluid-balance";
import { TabTreatmentPlan } from "../../../ipd/patients/[uhid]/_components/tab-treatment-plan";
import { TabShiftHandover } from "../../../ipd/patients/[uhid]/_components/tab-shift-handover";
import { TabDischarge } from "../../../ipd/patients/[uhid]/_components/tab-discharge";
import { PatientHeader } from "../../../ipd/patients/[uhid]/_components/patient-header";
import { TabVentilation } from "./_components/tab-ventilation";
import { TabOxygenTherapy } from "./_components/tab-oxygen-therapy";
import { CURRENT_NURSE } from "@/lib/nurse/icu/nurse-icu-data";
import { getActiveVentilatorAdministration, getActiveVentilatorOrder, getVentilatorObservations, getVentilatorOrderHistory } from "@/lib/nurse/icu/ventilation-data";
import { VentilatorAdministration, VentilatorObservation } from "@/types/nurse/icu/ventilation-types";

export default function NurseIcuPatientDetailPage() {
    const router = useRouter();
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
  const [ventilationRecords, setVentilationRecords] = useState<VentilationRecord[]>(() => getVentilationForPatient(patient.uhid));

  // Oxygen Therapy state
  const activeOrder = getActiveOxygenOrder(patient.uhid);
  const orderHistory = getOxygenOrderHistory(patient.uhid);
  const [administration, setAdministration] = useState<OxygenAdministration | undefined>(() => getActiveAdministration(patient.uhid));
  const [observations, setObservations] = useState<OxygenObservation[]>(() => getOxygenObservations(patient.uhid));


   // Ventilation state
  const activeVentOrder = getActiveVentilatorOrder(patient.uhid);
  const ventOrderHistory = getVentilatorOrderHistory(patient.uhid);
  const [ventAdministration, setVentAdministration] = useState<VentilatorAdministration | undefined>(() => getActiveVentilatorAdministration(patient.uhid));
  const [ventObservations, setVentObservations] = useState<VentilatorObservation[]>(() => getVentilatorObservations(patient.uhid));

  function handleConfirmVentSetup(admin: VentilatorAdministration) {
    setVentAdministration(admin);
    toast.success("Ventilator setup confirmed.");
  }
  function handleSaveVentObservation(obs: VentilatorObservation) {
    setVentObservations((prev) => [obs, ...prev]);
  }

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

  // Oxygen handlers
  function handleStartOxygen(admin: OxygenAdministration) {
    setAdministration(admin);
    toast.success("Oxygen therapy started.");
  }
  function handleSaveObservation(obs: OxygenObservation) {
    setObservations((prev) => [obs, ...prev]);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] space-y-5">
        <PatientHeader patient={patient} name={"ICU ID"} handleClick={() => router.push("/nurse/icu/patients")} />

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start overflow-x-auto rounded-none border-b border-slate-200 bg-transparent p-0">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Overview</TabsTrigger>
            <TabsTrigger value="vitals" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Vitals Monitoring</TabsTrigger>
            <TabsTrigger value="ventilation" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Ventilation</TabsTrigger>
            <TabsTrigger value="oxygen" className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600">Oxygen Therapy</TabsTrigger>
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
            <TabsContent value="ventilation" className="mt-0">
              <TabVentilation
                patientName={patient.patientName}
                nurseName={CURRENT_NURSE.name}
                activeOrder={activeVentOrder}
                orderHistory={ventOrderHistory}
                administration={ventAdministration}
                observations={ventObservations}
                onConfirmSetup={handleConfirmVentSetup}
                onSaveObservation={handleSaveVentObservation}
              />
            </TabsContent>
            <TabsContent value="oxygen" className="mt-0">
              <TabOxygenTherapy
                patientName={patient.patientName}
                nurseName={CURRENT_NURSE.name}
                activeOrder={activeOrder}
                orderHistory={orderHistory}
                administration={administration}
                observations={observations}
                onStartOxygen={handleStartOxygen}
                onSaveObservation={handleSaveObservation}
              />
            </TabsContent>
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