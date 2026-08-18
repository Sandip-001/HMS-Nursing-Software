
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Activity,
  Brain,
  Droplet,
  Gauge,
  Heart,
  HeartPulse,
  Info,
  Pill,
  Ruler,
  Thermometer,
  Weight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PatientHeaderCard } from "../initial-assessment/_components/patient-header-card";
import { PatientSummarySidebar } from "../initial-assessment/_components/patient-summary-sidebar";
import { BED_OCCUPIED_PATIENTS } from "@/lib/nurse/ipd/bed-occupied-data";
import { getDefaultVitalForm, getVitalHistory } from "@/lib/nurse/ipd/vital-recording-data";
import { VitalInputCard } from "./_components/vital-input-card";
import { BPInputCard } from "./_components/bp-input-card";
import { VitalsHistoryTable } from "./_components/vitals-history-table";
import { VitalsTrendCard } from "./_components/vitals-trend-card";
import type { VitalHistoryItem } from "@/types/nurse/ipd/vital-recording-types";

export default function VitalRecordingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uhid = searchParams.get("uhid") ?? BED_OCCUPIED_PATIENTS[0].uhid;

  const patient = useMemo(
    () => BED_OCCUPIED_PATIENTS.find((p) => p.uhid === uhid) ?? BED_OCCUPIED_PATIENTS[0],
    [uhid]
  );

  const [form, setForm] = useState(getDefaultVitalForm(uhid));
  const [history, setHistory] = useState<VitalHistoryItem[]>(getVitalHistory(uhid));

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSaveDraft() {
    toast.success("Vitals draft saved");
  }

  function handleSaveVitals() {
    const newItem: VitalHistoryItem = {
      id: `VH-${Date.now()}`,
      dateTime: new Date(form.recordTime).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: form.temperature,
      pulse: form.pulse,
      respiratoryRate: form.respiratoryRate,
      bloodPressure: `${form.bloodPressureSystolic}/${form.bloodPressureDiastolic}`,
      spo2: form.spo2,
      painScore: form.painScore,
      recordedBy: form.recordedBy.replace(" (Staff Nurse)", ""),
    };

    setHistory((prev) => [newItem, ...prev]);
    toast.success("Vitals saved in recent vitals history");
  }

  function handleSaveAndProceed() {
    handleSaveVitals();
    router.push(`/nurse/ipd/nursing-assessment?uhid=${patient.uhid}`);
  }

  function handleViewHistory(item: VitalHistoryItem) {
    toast.info(`Viewing vitals recorded on ${item.dateTime}`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <PatientHeaderCard patient={patient} />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.18fr_0.82fr] xl:items-start">
          <div className="space-y-5 xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-slate-800">Record Vitals</h1>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                    <Info className="h-4 w-4" />
                    Record accurate vital signs of the patient. All fields marked with * are mandatory.
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">Recorded By</label>
                    <Select value={form.recordedBy} onValueChange={(v) => updateField("recordedBy", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Neha Singh (Staff Nurse)">Neha Singh (Staff Nurse)</SelectItem>
                        <SelectItem value="Priyanka Das (Staff Nurse)">Priyanka Das (Staff Nurse)</SelectItem>
                        <SelectItem value="Anjali Mehta (Staff Nurse)">Anjali Mehta (Staff Nurse)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">Record Time</label>
                    <Input
                      type="datetime-local"
                      value={form.recordTime}
                      onChange={(e) => updateField("recordTime", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <VitalInputCard icon={<Thermometer className="h-4 w-4" />} label="Temperature *" value={form.temperature} onChange={(v) => updateField("temperature", v)} unit="°F" />
                <VitalInputCard icon={<Heart className="h-4 w-4" />} label="Pulse Rate *" value={form.pulse} onChange={(v) => updateField("pulse", v)} unit="/min" />
                <VitalInputCard icon={<Activity className="h-4 w-4" />} label="Respiratory Rate" value={form.respiratoryRate} onChange={(v) => updateField("respiratoryRate", v)} unit="/min" />
                <BPInputCard
                  systolic={form.bloodPressureSystolic}
                  diastolic={form.bloodPressureDiastolic}
                  onSystolicChange={(v) => updateField("bloodPressureSystolic", v)}
                  onDiastolicChange={(v) => updateField("bloodPressureDiastolic", v)}
                />

                <VitalInputCard icon={<Droplet className="h-4 w-4" />} label="SpO₂ *" value={form.spo2} onChange={(v) => updateField("spo2", v)} unit="%" />
                <VitalInputCard icon={<Gauge className="h-4 w-4" />} label="Pain Score" value={form.painScore} onChange={(v) => updateField("painScore", v)} unit="/10" />
                <VitalInputCard icon={<Pill className="h-4 w-4" />} label="Blood Sugar" value={form.bloodSugar} onChange={(v) => updateField("bloodSugar", v)} unit="mg/dl" />
                <VitalInputCard icon={<Ruler className="h-4 w-4" />} label="Height" value={form.height} onChange={(v) => updateField("height", v)} unit="cm" />

                <VitalInputCard icon={<Weight className="h-4 w-4" />} label="Weight" value={form.weight} onChange={(v) => updateField("weight", v)} unit="kg" />
                <VitalInputCard icon={<Gauge className="h-4 w-4" />} label="BMI (Auto)" value={form.bmi} onChange={(v) => updateField("bmi", v)} unit="kg/m²" />
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-violet-600" />
                    <label className="text-xs font-semibold text-slate-600">Level of Consciousness</label>
                  </div>
                  <Select value={form.consciousness} onValueChange={(v) => updateField("consciousness", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alert">Alert</SelectItem>
                      <SelectItem value="Drowsy">Drowsy</SelectItem>
                      <SelectItem value="Unconscious">Unconscious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <HeartPulse className="h-4 w-4 text-violet-600" />
                    <label className="text-xs font-semibold text-slate-600">Oxygen Therapy</label>
                  </div>
                  <Select value={form.oxygenTherapy} onValueChange={(v) => updateField("oxygenTherapy", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Nasal Cannula">Nasal Cannula</SelectItem>
                      <SelectItem value="Mask Support">Mask Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Remarks (Optional)</label>
                <Textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Enter remarks"
                  value={form.remarks}
                  onChange={(e) => updateField("remarks", e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Recent Vitals History</h2>
                <Button variant="outline" className="gap-2 text-blue-600">
                  View Trends
                </Button>
              </div>

              <VitalsHistoryTable items={history} onView={handleViewHistory} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => router.push(`/nurse/ipd/initial-assessment?uhid=${patient.uhid}`)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700" onClick={handleSaveVitals}>
                Save Vitals
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveAndProceed}>
                Save & Proceed to Nursing Assessment
              </Button>
            </div>
          </div>

          <div className="min-w-0 space-y-5">
            <PatientSummarySidebar patient={patient} />
            <VitalsTrendCard />
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-slate-800">Alerts</p>
              <div className="space-y-2">
                {["Drug Allergy: Penicillin", "Fall Risk: Low", "Diabetic: Yes"].map((alert) => (
                  <div key={alert} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}