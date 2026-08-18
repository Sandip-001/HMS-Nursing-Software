
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AssessmentCard } from "./assessment-card";
import { AssessmentField } from "./assessment-field";
import { YesNoToggle } from "./yes-no-toggle";
import type { ComprehensiveAssessmentForm } from "@/types/nurse/ipd/nursing-assessment-types";

export function ComprehensiveAssessmentSection({
  form,
  onChange,
}: {
  form: ComprehensiveAssessmentForm;
  onChange: <K extends keyof ComprehensiveAssessmentForm>(key: K, value: ComprehensiveAssessmentForm[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AssessmentCard title="Health Perception / Patient Statement">
          <div className="space-y-4">
            <AssessmentField label="Patient's Understanding of Health">
              <Select value={form.patientUnderstandingOfHealth} onValueChange={(v) => onChange("patientUnderstandingOfHealth", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Understands">Understands</SelectItem>
                  <SelectItem value="Partially Understands">Partially Understands</SelectItem>
                  <SelectItem value="Does Not Understand">Does Not Understand</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Patient's Goal">
              <Textarea rows={3} maxLength={500} value={form.patientGoal} onChange={(e) => onChange("patientGoal", e.target.value)} />
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Neuro / Cognitive Status">
          <div className="space-y-4">
            <AssessmentField label="Level of Consciousness">
              <Select value={form.levelOfConsciousness} onValueChange={(v) => onChange("levelOfConsciousness", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alert">Alert</SelectItem>
                  <SelectItem value="Drowsy">Drowsy</SelectItem>
                  <SelectItem value="Unconscious">Unconscious</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">Orientation</label>
              <div className="flex gap-4 text-sm text-slate-700">
                <label className="flex items-center gap-1.5">
                  <Checkbox checked={form.orientedTime} onCheckedChange={(v) => onChange("orientedTime", Boolean(v))} /> Time
                </label>
                <label className="flex items-center gap-1.5">
                  <Checkbox checked={form.orientedPlace} onCheckedChange={(v) => onChange("orientedPlace", Boolean(v))} /> Place
                </label>
                <label className="flex items-center gap-1.5">
                  <Checkbox checked={form.orientedPerson} onCheckedChange={(v) => onChange("orientedPerson", Boolean(v))} /> Person
                </label>
              </div>
            </div>

            <AssessmentField label="Cognitive Status">
              <Select value={form.cognitiveStatus} onValueChange={(v) => onChange("cognitiveStatus", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cooperative">Cooperative</SelectItem>
                  <SelectItem value="Confused">Confused</SelectItem>
                  <SelectItem value="Agitated">Agitated</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Respiratory">
          <div className="space-y-4">
            <AssessmentField label="Breathing Pattern">
              <Select value={form.breathingPattern} onValueChange={(v) => onChange("breathingPattern", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Irregular">Irregular</SelectItem>
                  <SelectItem value="Labored">Labored</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <YesNoToggle label="Use of Accessory Muscles" value={form.useOfAccessoryMuscles} onChange={(v) => onChange("useOfAccessoryMuscles", v)} />

            <AssessmentField label="Breath Sounds">
              <Select value={form.breathSounds} onValueChange={(v) => onChange("breathSounds", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clear">Clear</SelectItem>
                  <SelectItem value="Wheezing">Wheezing</SelectItem>
                  <SelectItem value="Crackles">Crackles</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <AssessmentCard title="Cardiovascular">
          <div className="space-y-4">
            <AssessmentField label="Heart Sounds">
              <Select value={form.heartSounds} onValueChange={(v) => onChange("heartSounds", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="S1 S2 Normal">S1 S2 Normal</SelectItem>
                  <SelectItem value="Murmur">Murmur</SelectItem>
                  <SelectItem value="Irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Peripheral Pulses">
              <Select value={form.peripheralPulses} onValueChange={(v) => onChange("peripheralPulses", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Weak">Weak</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Capillary Refill">
              <Select value={form.capillaryRefill} onValueChange={(v) => onChange("capillaryRefill", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="< 2 sec">{"< 2 sec"}</SelectItem>
                  <SelectItem value="> 2 sec">{"> 2 sec"}</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Gastrointestinal">
          <div className="space-y-4">
            <AssessmentField label="Appetite">
              <Select value={form.appetite} onValueChange={(v) => onChange("appetite", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <YesNoToggle label="Nausea / Vomiting" value={form.nauseaVomiting} onChange={(v) => onChange("nauseaVomiting", v)} />

            <AssessmentField label="Last Bowel Movement">
              <Input type="datetime-local" value={form.lastBowelMovement} onChange={(e) => onChange("lastBowelMovement", e.target.value)} />
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Genitourinary">
          <div className="space-y-4">
            <AssessmentField label="Urine Output">
              <Select value={form.urineOutput} onValueChange={(v) => onChange("urineOutput", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Adequate">Adequate</SelectItem>
                  <SelectItem value="Reduced">Reduced</SelectItem>
                  <SelectItem value="Anuric">Anuric</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Urinary Pattern">
              <Select value={form.urinaryPattern} onValueChange={(v) => onChange("urinaryPattern", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Frequency">Frequency</SelectItem>
                  <SelectItem value="Retention">Retention</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <YesNoToggle label="Catheter" value={form.catheter} onChange={(v) => onChange("catheter", v)} />
          </div>
        </AssessmentCard>

        <AssessmentCard title="Skin / Integumentary">
          <div className="space-y-4">
            <AssessmentField label="Skin Condition">
              <Select value={form.skinCondition} onValueChange={(v) => onChange("skinCondition", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Intact">Intact</SelectItem>
                  <SelectItem value="Dry">Dry</SelectItem>
                  <SelectItem value="Broken">Broken</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <YesNoToggle label="Pressure Area" value={form.pressureArea} onChange={(v) => onChange("pressureArea", v)} />
          </div>
        </AssessmentCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AssessmentCard title="Mobility / Activity">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AssessmentField label="Mobility Level">
              <Select value={form.mobilityLevel} onValueChange={(v) => onChange("mobilityLevel", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Independent">Independent</SelectItem>
                  <SelectItem value="Ambulatory with Assistance">Ambulatory with Assistance</SelectItem>
                  <SelectItem value="Bedridden">Bedridden</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Assistive Device">
              <Select value={form.assistiveDevice} onValueChange={(v) => onChange("assistiveDevice", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Walker">Walker</SelectItem>
                  <SelectItem value="Cane">Cane</SelectItem>
                  <SelectItem value="Wheelchair">Wheelchair</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Activity Tolerance">
              <Select value={form.activityTolerance} onValueChange={(v) => onChange("activityTolerance", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tolerated Well">Tolerated Well</SelectItem>
                  <SelectItem value="Fatigue Noted">Fatigue Noted</SelectItem>
                  <SelectItem value="Not Tolerated">Not Tolerated</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>

        <AssessmentCard title="Psychosocial">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AssessmentField label="Mood / Affect">
              <Select value={form.moodAffect} onValueChange={(v) => onChange("moodAffect", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Calm">Calm</SelectItem>
                  <SelectItem value="Anxious">Anxious</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Anxiety Level">
              <Select value={form.anxietyLevel} onValueChange={(v) => onChange("anxietyLevel", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Mild">Mild</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>

            <AssessmentField label="Support System">
              <Select value={form.supportSystem} onValueChange={(v) => onChange("supportSystem", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Friends">Friends</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </AssessmentField>
          </div>
        </AssessmentCard>
      </div>

      <AssessmentCard title="Nursing Diagnosis / Problem List (if any)">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AssessmentField label="Nursing Diagnosis">
            <Input
              value={form.nursingDiagnosis.join(", ")}
              onChange={(e) => onChange("nursingDiagnosis", e.target.value.split(",").map((i) => i.trim()))}
            />
          </AssessmentField>

          <AssessmentField label="Nursing Interventions Initiated">
            <Textarea rows={3} maxLength={500} value={form.nursingInterventions} onChange={(e) => onChange("nursingInterventions", e.target.value)} />
          </AssessmentField>
        </div>
      </AssessmentCard>
    </div>
  );
}