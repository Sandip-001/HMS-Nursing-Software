
"use client";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { AssessmentCard } from "./assessment-card";
import { AssessmentField } from "./assessment-field";
import { MORSE_OPTIONS } from "@/lib/nurse/ipd/nursing-assessment-data";
import type { MorseFallScaleForm } from "@/types/nurse/ipd/nursing-assessment-types";

export function MorseFallScaleSection({
  form,
  onChange,
}: {
  form: MorseFallScaleForm;
  onChange: <K extends keyof MorseFallScaleForm>(key: K, value: MorseFallScaleForm[K]) => void;
}) {
  const total =
    Number(form.historyOfFalling) +
    Number(form.secondaryDiagnosis) +
    Number(form.ambulatoryAid) +
    Number(form.ivHeparinLock) +
    Number(form.gait) +
    Number(form.mentalStatus);

  const risk = total >= 45 ? "High Risk" : total >= 25 ? "Moderate Risk" : "Low Risk";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssessmentCard title="History of Falling">
          <AssessmentField label="Fall within present admission or immediate history">
            <Select value={form.historyOfFalling} onValueChange={(v) => onChange("historyOfFalling", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MORSE_OPTIONS.historyOfFalling.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Secondary Diagnosis">
          <AssessmentField label="More than one medical diagnosis on chart">
            <Select value={form.secondaryDiagnosis} onValueChange={(v) => onChange("secondaryDiagnosis", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MORSE_OPTIONS.secondaryDiagnosis.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Ambulatory Aid">
          <AssessmentField label="Type of walking assistance used">
            <Select value={form.ambulatoryAid} onValueChange={(v) => onChange("ambulatoryAid", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MORSE_OPTIONS.ambulatoryAid.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssessmentCard title="IV / Heparin Lock">
          <AssessmentField label="Intravenous therapy or access device">
            <Select value={form.ivHeparinLock} onValueChange={(v) => onChange("ivHeparinLock", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MORSE_OPTIONS.ivHeparinLock.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Gait / Transferring">
          <AssessmentField label="Quality of patient's walking pattern">
            <Select value={form.gait} onValueChange={(v) => onChange("gait", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MORSE_OPTIONS.gait.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Mental Status">
          <AssessmentField label="Awareness of own limitations">
            <Select value={form.mentalStatus} onValueChange={(v) => onChange("mentalStatus", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MORSE_OPTIONS.mentalStatus.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800">Morse Fall Scale Total Score</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-900">{total}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${total >= 45 ? "bg-red-100 text-red-700" : total >= 25 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
              {risk}
            </span>
          </div>
        </div>
        <p className="mt-1 text-xs text-slate-500">0-24: Low Risk · 25-44: Moderate Risk · 45+: High Risk.</p>
      </div>
    </div>
  );
}