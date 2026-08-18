
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PatientHeaderCard } from "../initial-assessment/_components/patient-header-card";
import { PatientSummarySidebar } from "../initial-assessment/_components/patient-summary-sidebar";
import { BED_OCCUPIED_PATIENTS } from "@/lib/nurse/ipd/bed-occupied-data";
import {
  DEFAULT_BRADEN_SCALE,
  DEFAULT_COMPREHENSIVE_ASSESSMENT,
  DEFAULT_MORSE_FALL_SCALE,
  DEFAULT_PAIN_COMFORT_ASSESSMENT,
} from "@/lib/nurse/ipd/nursing-assessment-data";
import { ComprehensiveAssessmentSection } from "./_components/comprehensive-assessment-section";
import { PainComfortAssessmentSection } from "./_components/pain-comfort-assessment-section";
import { BradenScaleSection } from "./_components/braden-scale-section";
import { MorseFallScaleSection } from "./_components/morse-fall-scale-section";

const TABS = ["Comprehensive Assessment", "Pain & Comfort Assessment", "Braden Scale", "Morse Fall Scale"] as const;
type Tab = (typeof TABS)[number];

export default function NursingAssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uhid = searchParams.get("uhid") ?? BED_OCCUPIED_PATIENTS[0].uhid;

  const patient = useMemo(
    () => BED_OCCUPIED_PATIENTS.find((p) => p.uhid === uhid) ?? BED_OCCUPIED_PATIENTS[0],
    [uhid]
  );

  const [activeTab, setActiveTab] = useState<Tab>("Comprehensive Assessment");
  const [assessmentTime, setAssessmentTime] = useState("2024-05-20T12:40");
  const [assessedBy, setAssessedBy] = useState("Neha Singh (Staff Nurse)");

  const [comprehensiveForm, setComprehensiveForm] = useState(DEFAULT_COMPREHENSIVE_ASSESSMENT);
  const [painComfortForm, setPainComfortForm] = useState(DEFAULT_PAIN_COMFORT_ASSESSMENT);
  const [bradenForm, setBradenForm] = useState(DEFAULT_BRADEN_SCALE);
  const [morseForm, setMorseForm] = useState(DEFAULT_MORSE_FALL_SCALE);

  function updateComprehensive<K extends keyof typeof comprehensiveForm>(key: K, value: (typeof comprehensiveForm)[K]) {
    setComprehensiveForm((prev) => ({ ...prev, [key]: value }));
  }

  function updatePainComfort<K extends keyof typeof painComfortForm>(key: K, value: (typeof painComfortForm)[K]) {
    setPainComfortForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateBraden<K extends keyof typeof bradenForm>(key: K, value: (typeof bradenForm)[K]) {
    setBradenForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateMorse<K extends keyof typeof morseForm>(key: K, value: (typeof morseForm)[K]) {
    setMorseForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCancel() {
    router.push(`/nurse/ipd/vital-recording?uhid=${patient.uhid}`);
  }

  function handleSaveDraft() {
    toast.success("Nursing assessment saved as draft");
  }

  function handleSaveAndProceed() {
    console.log("Nursing assessment saved:", {
      uhid: patient.uhid,
      assessmentTime,
      assessedBy,
      comprehensiveForm,
      painComfortForm,
      bradenForm,
      morseForm,
    });
    toast.success("Nursing assessment saved");
    router.push(`/nurse/ipd/doctor-order-review?uhid=${patient.uhid}`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <PatientHeaderCard patient={patient} />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.18fr_0.82fr] xl:items-start">
          <div className="space-y-5 xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-lg font-semibold text-slate-800">Nursing Assessment</h1>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">Assessment Time</label>
                    <Input type="datetime-local" value={assessmentTime} onChange={(e) => setAssessmentTime(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">Assessed By</label>
                    <Select value={assessedBy} onValueChange={setAssessedBy}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Neha Singh (Staff Nurse)">Neha Singh (Staff Nurse)</SelectItem>
                        <SelectItem value="Priyanka Das (Staff Nurse)">Priyanka Das (Staff Nurse)</SelectItem>
                        <SelectItem value="Anjali Mehta (Staff Nurse)">Anjali Mehta (Staff Nurse)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex gap-1 overflow-x-auto border-b border-slate-100">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                <Info className="h-4 w-4 shrink-0" />
                {activeTab === "Comprehensive Assessment" && "Perform a systematic nursing assessment and document the patient's physical, psychological, and functional status."}
                {activeTab === "Pain & Comfort Assessment" && "Assess pain characteristics and comfort status to guide pain management interventions."}
                {activeTab === "Braden Scale" && "Assess pressure injury risk based on six clinical subscales."}
                {activeTab === "Morse Fall Scale" && "Assess patient's fall risk based on six clinical fall risk factors."}
              </div>

              {activeTab === "Comprehensive Assessment" && (
                <ComprehensiveAssessmentSection form={comprehensiveForm} onChange={updateComprehensive} />
              )}
              {activeTab === "Pain & Comfort Assessment" && (
                <PainComfortAssessmentSection form={painComfortForm} onChange={updatePainComfort} />
              )}
              {activeTab === "Braden Scale" && (
                <BradenScaleSection form={bradenForm} onChange={updateBraden} />
              )}
              {activeTab === "Morse Fall Scale" && (
                <MorseFallScaleSection form={morseForm} onChange={updateMorse} />
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveAndProceed}>
                Save & Proceed to Doctor Order Review
              </Button>
            </div>
          </div>

          <div className="min-w-0 space-y-5">
            <PatientSummarySidebar patient={patient} />
          </div>
        </div>
      </div>
    </div>
  );
}