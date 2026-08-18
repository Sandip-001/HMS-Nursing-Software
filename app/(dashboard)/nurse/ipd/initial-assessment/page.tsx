
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BED_OCCUPIED_PATIENTS } from "@/lib/nurse/ipd/bed-occupied-data";
import { getInitialAssessmentData } from "@/lib/nurse/ipd/initial-assessment-data";
import { PatientHeaderCard } from "./_components/patient-header-card";
import { AssessmentSectionCard } from "./_components/assessment-section-card";
import { PatientSummarySidebar } from "./_components/patient-summary-sidebar";
import { FieldLabel } from "./_components/field-label";
import { RiskToggleCard } from "./_components/risk-toggle-card";

export default function InitialAssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uhid = searchParams.get("uhid") ?? BED_OCCUPIED_PATIENTS[0].uhid;

  const patient = useMemo(
    () => BED_OCCUPIED_PATIENTS.find((p) => p.uhid === uhid) ?? BED_OCCUPIED_PATIENTS[0],
    [uhid]
  );
  const initialData = useMemo(() => getInitialAssessmentData(uhid), [uhid]);

  const [form, setForm] = useState(initialData);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSaveDraft() {
    toast.success("Initial assessment saved as draft");
  }

  function handleSaveAndProceed() {
    toast.success("Initial assessment saved");
    router.push(`/nurse/ipd/vital-recording?uhid=${patient.uhid}`);
  }

  function handleCancel() {
    router.push(`/nurse/ipd/bed-occupied?uhid=${patient.uhid}`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <PatientHeaderCard patient={patient} />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-lg font-semibold text-slate-800">Initial Assessment</h1>
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                  <Info className="h-4 w-4" />
                  Complete initial assessment within 2 hours of patient arrival in the ward.
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <FieldLabel label="Assessment Time" />
                  <Input
                    type="datetime-local"
                    value={form.assessmentTime}
                    onChange={(e) => updateField("assessmentTime", e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel label="Assessment By" />
                  <Select value={form.assessmentBy} onValueChange={(v) => updateField("assessmentBy", v)}>
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

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <AssessmentSectionCard title="Chief Complaint">
                <FieldLabel label="Chief Complaint / Reason For Admission *" />
                <Textarea
                  rows={5}
                  maxLength={500}
                  value={form.chiefComplaint}
                  onChange={(e) => updateField("chiefComplaint", e.target.value)}
                />
              </AssessmentSectionCard>

              <AssessmentSectionCard title="History">
                <FieldLabel label="History of Present Illness *" />
                <Textarea
                  rows={5}
                  maxLength={1000}
                  value={form.historyOfPresentIllness}
                  onChange={(e) => updateField("historyOfPresentIllness", e.target.value)}
                />

                <div className="mt-4 space-y-4">
                  <div>
                    <FieldLabel label="Past Medical History" />
                    <Input
                      value={form.pastMedicalHistory.join(", ")}
                      onChange={(e) => updateField("pastMedicalHistory", e.target.value.split(",").map((i) => i.trim()))}
                    />
                  </div>

                  <div>
                    <FieldLabel label="Past Surgical History" />
                    <Input
                      value={form.pastSurgicalHistory}
                      onChange={(e) => updateField("pastSurgicalHistory", e.target.value)}
                    />
                  </div>

                  <div>
                    <FieldLabel label="Allergies" />
                    <Input
                      value={form.allergies}
                      onChange={(e) => updateField("allergies", e.target.value)}
                    />
                  </div>
                </div>
              </AssessmentSectionCard>
            </div>

            <AssessmentSectionCard title="General Appearance">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <SelectField label="Consciousness" value={form.consciousness} onChange={(v) => updateField("consciousness", v)} options={["Alert", "Drowsy", "Unconscious"]} />
                <SelectField label="Orientation" value={form.orientation} onChange={(v) => updateField("orientation", v)} options={["Oriented", "Partially Oriented", "Disoriented"]} />
                <SelectField label="Build" value={form.build} onChange={(v) => updateField("build", v)} options={["Thin", "Moderate", "Obese"]} />
                <SelectField label="Nutrition" value={form.nutrition} onChange={(v) => updateField("nutrition", v)} options={["Normal", "Poor", "Good"]} />
                <SelectField label="Mobility" value={form.mobility} onChange={(v) => updateField("mobility", v)} options={["Ambulatory", "Assisted", "Bedridden"]} />
                <SelectField label="Language" value={form.language} onChange={(v) => updateField("language", v)} options={["English", "Hindi", "Other"]} />
              </div>
            </AssessmentSectionCard>

            <AssessmentSectionCard title="Risk Screening">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <RiskToggleCard title="Fall Risk" value={form.fallRisk} onChange={(v) => updateField("fallRisk", v)} />
                <RiskToggleCard title="Pressure Injury Risk" value={form.pressureInjuryRisk} onChange={(v) => updateField("pressureInjuryRisk", v)} />
                <RiskToggleCard title="DVT Risk" value={form.dvtRisk} onChange={(v) => updateField("dvtRisk", v)} danger />
                <RiskToggleCard title="Suicide Risk" value={form.suicideRisk} onChange={(v) => updateField("suicideRisk", v)} />
                <RiskToggleCard title="Isolation Required" value={form.isolationRequired} onChange={(v) => updateField("isolationRequired", v)} />
              </div>

              <div className="mt-4">
                <FieldLabel label="Immediate Nursing Concerns" />
                <Textarea
                  rows={4}
                  maxLength={500}
                  value={form.nursingConcerns}
                  onChange={(e) => updateField("nursingConcerns", e.target.value)}
                />
              </div>
            </AssessmentSectionCard>

            <AssessmentSectionCard title="Initial Assessment Summary">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryMiniCard label="Assessment Status" value={form.assessmentStatus} />
                <SummaryMiniCard label="Assessment Duration" value={form.assessmentDuration} />
                <SummaryMiniCard label="Reviewed By Doctor" value={form.reviewedByDoctor} />
                <SummaryMiniCard label="Next Step" value={form.nextStep} />
              </div>
            </AssessmentSectionCard>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveAndProceed}>
                Save & Proceed to Vitals Recording
              </Button>
            </div>
          </div>

          <PatientSummarySidebar patient={patient} />
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SummaryMiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}