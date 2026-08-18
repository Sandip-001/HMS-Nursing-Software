
"use client";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { AssessmentCard } from "./assessment-card";
import { AssessmentField } from "./assessment-field";
import { BRADEN_OPTIONS } from "@/lib/nurse/ipd/nursing-assessment-data";
import type { BradenScaleForm } from "@/types/nurse/ipd/nursing-assessment-types";

export function BradenScaleSection({
  form,
  onChange,
}: {
  form: BradenScaleForm;
  onChange: <K extends keyof BradenScaleForm>(key: K, value: BradenScaleForm[K]) => void;
}) {
  const total =
    Number(form.sensoryPerception) +
    Number(form.moisture) +
    Number(form.activity) +
    Number(form.mobility) +
    Number(form.nutrition) +
    Number(form.frictionShear);

  const risk = total <= 9 ? "Severe Risk" : total <= 12 ? "High Risk" : total <= 14 ? "Moderate Risk" : total <= 18 ? "Mild Risk" : "No Risk";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssessmentCard title="Sensory Perception">
          <AssessmentField label="Ability to respond meaningfully to pressure-related discomfort">
            <Select value={form.sensoryPerception} onValueChange={(v) => onChange("sensoryPerception", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BRADEN_OPTIONS.sensoryPerception.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Moisture">
          <AssessmentField label="Degree to which skin is exposed to moisture">
            <Select value={form.moisture} onValueChange={(v) => onChange("moisture", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BRADEN_OPTIONS.moisture.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Activity">
          <AssessmentField label="Degree of physical activity">
            <Select value={form.activity} onValueChange={(v) => onChange("activity", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BRADEN_OPTIONS.activity.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssessmentCard title="Mobility">
          <AssessmentField label="Ability to change and control body position">
            <Select value={form.mobility} onValueChange={(v) => onChange("mobility", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BRADEN_OPTIONS.mobility.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Nutrition">
          <AssessmentField label="Usual food intake pattern">
            <Select value={form.nutrition} onValueChange={(v) => onChange("nutrition", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BRADEN_OPTIONS.nutrition.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>

        <AssessmentCard title="Friction and Shear">
          <AssessmentField label="Ability to move without sliding against sheets">
            <Select value={form.frictionShear} onValueChange={(v) => onChange("frictionShear", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BRADEN_OPTIONS.frictionShear.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AssessmentField>
        </AssessmentCard>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800">Braden Scale Total Score</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-900">{total}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${total <= 12 ? "bg-red-100 text-red-700" : total <= 18 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
              {risk}
            </span>
          </div>
        </div>
        <p className="mt-1 text-xs text-slate-500">Score range: 6-23. Lower scores indicate higher pressure injury risk.</p>
      </div>
    </div>
  );
}