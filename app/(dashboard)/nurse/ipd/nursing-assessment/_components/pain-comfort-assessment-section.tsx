
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { AssessmentCard } from "./assessment-card";
import { AssessmentField } from "./assessment-field";
import { YesNoToggle } from "./yes-no-toggle";
import type { PainComfortAssessmentForm } from "@/types/nurse/ipd/nursing-assessment-types";

export function PainComfortAssessmentSection({
  form,
  onChange,
}: {
  form: PainComfortAssessmentForm;
  onChange: <K extends keyof PainComfortAssessmentForm>(key: K, value: PainComfortAssessmentForm[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssessmentCard title="Pain Status">
          <div className="space-y-4">
            <YesNoToggle label="Pain Present" value={form.painPresent} onChange={(v) => onChange("painPresent", v)} />

            <AssessmentField label="Pain Location">
              <Input value={form.painLocation} onChange={(e) => onChange("painLocation", e.target.value)} />
            </AssessmentField>

            <AssessmentField label="Pain Intensity (0-10 NRS)">
              <Select value={form.painIntensity} onValueChange={(v) => onChange("painIntensity", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => i.toString()).map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Pain Characteristics">
          <div className="space-y-4">
            <AssessmentField label="Pain Character">
              <Select value={form.painCharacter} onValueChange={(v) => onChange("painCharacter", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sharp">Sharp</SelectItem>
                  <SelectItem value="Dull">Dull</SelectItem>
                  <SelectItem value="Burning">Burning</SelectItem>
                  <SelectItem value="Throbbing">Throbbing</SelectItem>
                  <SelectItem value="Cramping">Cramping</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Pain Onset">
              <Select value={form.painOnset} onValueChange={(v) => onChange("painOnset", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sudden">Sudden</SelectItem>
                  <SelectItem value="Gradual">Gradual</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Pain Duration">
              <Select value={form.painDuration} onValueChange={(v) => onChange("painDuration", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Constant">Constant</SelectItem>
                  <SelectItem value="Intermittent">Intermittent</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Contributing Factors">
          <div className="space-y-4">
            <AssessmentField label="Aggravating Factors">
              <Input value={form.aggravatingFactors} onChange={(e) => onChange("aggravatingFactors", e.target.value)} />
            </AssessmentField>

            <AssessmentField label="Relieving Factors">
              <Input value={form.relievingFactors} onChange={(e) => onChange("relievingFactors", e.target.value)} />
            </AssessmentField>

            <AssessmentField label="Non-Verbal Pain Indicators">
              <Input value={form.nonVerbalPainIndicators} onChange={(e) => onChange("nonVerbalPainIndicators", e.target.value)} />
            </AssessmentField>
          </div>
        </AssessmentCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssessmentCard title="Pain Management">
          <div className="space-y-4">
            <AssessmentField label="Current Analgesia">
              <Input value={form.currentAnalgesia} onChange={(e) => onChange("currentAnalgesia", e.target.value)} />
            </AssessmentField>

            <AssessmentField label="Analgesia Effectiveness">
              <Select value={form.analgesiaEffectiveness} onValueChange={(v) => onChange("analgesiaEffectiveness", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Effective">Effective</SelectItem>
                  <SelectItem value="Partially Effective">Partially Effective</SelectItem>
                  <SelectItem value="Not Effective">Not Effective</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Comfort Status">
          <div className="space-y-4">
            <AssessmentField label="Sleep Quality">
              <Select value={form.sleepQuality} onValueChange={(v) => onChange("sleepQuality", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Disturbed">Disturbed</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Patient Satisfaction with Pain Control">
              <Select value={form.patientSatisfactionWithPainControl} onValueChange={(v) => onChange("patientSatisfactionWithPainControl", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Satisfied">Satisfied</SelectItem>
                  <SelectItem value="Somewhat Satisfied">Somewhat Satisfied</SelectItem>
                  <SelectItem value="Not Satisfied">Not Satisfied</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Follow-up">
          <div className="space-y-4">
            <YesNoToggle label="Reassessment Required" value={form.reassessmentRequired} onChange={(v) => onChange("reassessmentRequired", v)} />
          </div>
        </AssessmentCard>
      </div>

      <AssessmentCard title="Comfort Measures Provided">
        <Textarea rows={3} maxLength={500} value={form.comfortMeasuresProvided} onChange={(e) => onChange("comfortMeasuresProvided", e.target.value)} />
      </AssessmentCard>
    </div>
  );
}