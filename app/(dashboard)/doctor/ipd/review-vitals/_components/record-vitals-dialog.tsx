// app/ipd/doctor/review-vitals/_components/record-vitals-dialog.tsx
"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { HeartPulse, Info, Save, FileEdit, ArrowRight } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { AbnormalAlertRow } from "./abnormal-alert-row";
import { VitalsComparisonTable } from "./vitals-comparison-table";
import { calculateBMI, evaluateAbnormalAlerts } from "@/lib/doctor/ipd/vitals-validation";
import type { WardRoundPatient } from "@/types/doctor/ipd/ward-round-types";
import type { VitalRecordEntry } from "@/types/doctor/ipd/vitals-types";
import type { VitalsFormData } from "@/types/doctor/ipd/record-vitals-types";
import { PatientStatusBadge } from "../../ward-rounds/_components/patient-status-badge";

interface RecordVitalsDialogProps {
  patient: WardRoundPatient;
  previousVitals: VitalRecordEntry | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveDraft: (data: VitalsFormData) => void;
  onSaveVitals: (data: VitalsFormData) => void;
  onSaveAndContinue: (data: VitalsFormData) => void;
}

const initialFormData: VitalsFormData = {
  systolic: "", diastolic: "", pulse: "", respRate: "", temp: "", tempUnit: "°F", spo2: "",
  painScore: 0, height: "", weight: "", levelOfConsciousness: "Alert", oxygenSupport: "Room Air",
  oxygenFlowRate: "", bloodSugar: "", doctorRemarks: "",
};

export function RecordVitalsDialog({
  patient, previousVitals, open, onOpenChange, onSaveDraft, onSaveVitals, onSaveAndContinue,
}: RecordVitalsDialogProps) {
  const [formData, setFormData] = useState<VitalsFormData>(initialFormData);

  const bmi = useMemo(() => calculateBMI(formData.height, formData.weight), [formData.height, formData.weight]);
  const alerts = useMemo(() => evaluateAbnormalAlerts(formData), [formData]);
  const recordedOn = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  function updateField<K extends keyof VitalsFormData>(key: K, value: VitalsFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function isValid() {
    return formData.systolic && formData.diastolic && formData.pulse && formData.respRate && formData.temp && formData.spo2;
  }

  function handleSaveVitals() {
    if (!isValid()) {
      toast.error("Please fill all required vital signs marked with *");
      return;
    }
    console.log("Save vitals:", { uhid: patient.uhid, ...formData });
    onSaveVitals(formData);
    toast.success("Vitals saved successfully");
    onOpenChange(false);
    setFormData(initialFormData);
  }

  function handleSaveDraft() {
    console.log("Save vitals as draft:", { uhid: patient.uhid, ...formData });
    onSaveDraft(formData);
    toast.success("Vitals saved as draft");
    onOpenChange(false);
  }

  function handleSaveAndContinue() {
    if (!isValid()) {
      toast.error("Please fill all required vital signs marked with *");
      return;
    }
    console.log("Save vitals & continue to Review Lab Results:", { uhid: patient.uhid, ...formData });
    onSaveAndContinue(formData);
    onOpenChange(false);
    setFormData(initialFormData);
  }

  const initials = patient.patientName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[95vw] !max-w-[980px] max-h-[92vh] flex flex-col gap-0 overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-4 sm:px-6">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
            <HeartPulse className="h-5 w-5 text-blue-600" /> Record Patient Vitals
          </DialogTitle>
        </DialogHeader>

        {/* Patient info strip */}
        <div className="shrink-0 border-b border-slate-100 px-5 py-3 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
                {initials}
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  {patient.patientName} <PatientStatusBadge status={patient.status} />
                </p>
                <p className="text-xs text-slate-400">{patient.age} Y / {patient.gender} · UHID: {patient.uhid}</p>
                <p className="text-xs text-slate-400">IPD: {patient.ipdId} · Bed: {patient.wardRoomBed.split("/").pop()?.trim()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <MiniInfo label="Ward / Room / Bed" value={patient.wardRoomBed} />
              <MiniInfo label="Department" value={patient.department} />
              <MiniInfo label="Recorded By" value={patient.admittingDoctor} />
              <MiniInfo label="Recorded On" value={recordedOn} />
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
            {/* Left: form */}
            <div className="min-w-0 space-y-5">
              <FormSection title="Vital Signs">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Label className="text-xs">Blood Pressure (mmHg) *</Label>
                    <div className="mt-1 flex items-center gap-1.5">
                      <div className="flex-1">
                        <p className="mb-1 text-[10px] text-slate-400">Systolic</p>
                        <Input value={formData.systolic} onChange={(e) => updateField("systolic", e.target.value)} placeholder="120" />
                      </div>
                      <span className="mt-4 text-slate-300">/</span>
                      <div className="flex-1">
                        <p className="mb-1 text-[10px] text-slate-400">Diastolic</p>
                        <Input value={formData.diastolic} onChange={(e) => updateField("diastolic", e.target.value)} placeholder="80" />
                      </div>
                    </div>
                  </div>
                  <FieldInput label="Pulse Rate (bpm) *" value={formData.pulse} onChange={(v) => updateField("pulse", v)} placeholder="78" />
                  <FieldInput label="Respiratory Rate (/min) *" value={formData.respRate} onChange={(v) => updateField("respRate", v)} placeholder="18" />
                  <div>
                    <Label className="text-xs">Temperature *</Label>
                    <div className="mt-1 flex gap-1.5">
                      <Input className="flex-1" value={formData.temp} onChange={(e) => updateField("temp", e.target.value)} placeholder="98.4" />
                      <Select value={formData.tempUnit} onValueChange={(v) => updateField("tempUnit", v as "°F" | "°C")}>
                        <SelectTrigger className="w-16"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="°F">°F</SelectItem>
                          <SelectItem value="°C">°C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FieldInput label="SpO2 (%) *" value={formData.spo2} onChange={(v) => updateField("spo2", v)} placeholder="98" />
                  <div>
                    <Label className="flex items-center gap-1 text-xs">
                      Pain Score (NRS) * <Info className="h-3 w-3 text-slate-300" />
                    </Label>
                    <div className="mt-2.5 flex items-center gap-3">
                      <span className="text-xs text-slate-400">0</span>
                      <Slider
                        value={[formData.painScore]}
                        onValueChange={([v]) => updateField("painScore", v)}
                        max={10}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-slate-400">10</span>
                      <Input className="w-14 text-center" value={formData.painScore} readOnly />
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Anthropometric Measurements">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <FieldInput label="Height (cm)" value={formData.height} onChange={(v) => updateField("height", v)} placeholder="172" />
                  <FieldInput label="Weight (kg)" value={formData.weight} onChange={(v) => updateField("weight", v)} placeholder="72.5" />
                  <div>
                    <Label className="text-xs">BMI (kg/m²)</Label>
                    <div className="mt-1 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                      <span className="text-sm font-medium text-slate-700">{bmi}</span>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600">Auto Calculated</span>
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Additional Monitoring">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <Label className="text-xs">Level Of Consciousness</Label>
                    <Select value={formData.levelOfConsciousness} onValueChange={(v) => updateField("levelOfConsciousness", v)}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alert">Alert</SelectItem>
                        <SelectItem value="Verbal">Verbal</SelectItem>
                        <SelectItem value="Pain">Pain</SelectItem>
                        <SelectItem value="Unresponsive">Unresponsive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Oxygen Support</Label>
                    <Select value={formData.oxygenSupport} onValueChange={(v) => updateField("oxygenSupport", v)}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Room Air">Room Air</SelectItem>
                        <SelectItem value="Nasal Cannula">Nasal Cannula</SelectItem>
                        <SelectItem value="Face Mask">Face Mask</SelectItem>
                        <SelectItem value="Ventilator">Ventilator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FieldInput label="Oxygen Flow Rate (L/min)" value={formData.oxygenFlowRate} onChange={(v) => updateField("oxygenFlowRate", v)} placeholder="2" />
                  <FieldInput label="Blood Sugar (mg/dL)" optional value={formData.bloodSugar} onChange={(v) => updateField("bloodSugar", v)} placeholder="124" />
                </div>
              </FormSection>

              <FormSection title="Doctor Remarks">
                <Textarea
                  rows={3}
                  maxLength={1000}
                  placeholder="Enter remarks..."
                  value={formData.doctorRemarks}
                  onChange={(e) => updateField("doctorRemarks", e.target.value)}
                />
                <p className="mt-1 text-right text-xs text-slate-400">{formData.doctorRemarks.length}/1000</p>
              </FormSection>
            </div>

            {/* Right: alerts + comparison */}
            <div className="space-y-5">
              <FormSection title="Abnormal Value Alerts">
                <div className="space-y-2">
                  {alerts.map((a) => <AbnormalAlertRow key={a.label} alert={a} />)}
                </div>
              </FormSection>

              <FormSection title="Previous Vitals Comparison">
                <VitalsComparisonTable previous={previousVitals} current={formData} />
              </FormSection>

              <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <p className="text-xs leading-snug text-blue-700">
                  All fields marked with * are required. Enter values and click Save Vitals to record.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-between sm:px-6">
          <Button variant="outline" className="gap-2" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="gap-2" onClick={handleSaveDraft}>
              <FileEdit className="h-4 w-4" /> Save Draft
            </Button>
            <Button variant="outline" className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50" onClick={handleSaveVitals}>
              <Save className="h-4 w-4" /> Save Vitals
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleSaveAndContinue}>
              Save & Continue To Diagnosis Update <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-slate-800">{title}</p>
      {children}
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder, optional }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; optional?: boolean }) {
  return (
    <div>
      <Label className="text-xs">{label}{optional && <span className="ml-1 text-slate-300">Optional</span>}</Label>
      <Input className="mt-1" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="whitespace-nowrap text-xs font-semibold text-slate-700">{value}</p>
    </div>
  );
}