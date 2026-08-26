// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/tab-discharge.tsx
"use client";
import { useState } from "react";
import { CheckCircle2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { DischargeSummaryForm } from "@/types/nurse/ipd/nurse-ipd-types";
import { CURRENT_NURSE } from "@/lib/nurse/ipd/nurse-ipd-data";

export function TabDischarge({ patientName, onDischarge }: { patientName: string; onDischarge: (form: DischargeSummaryForm) => void }) {
  const [condition, setCondition] = useState("");
  const [vitalsStable, setVitalsStable] = useState(false);
  const [woundStatus, setWoundStatus] = useState("");
  const [medsHandedOver, setMedsHandedOver] = useState(false);
  const [belongingsReturned, setBelongingsReturned] = useState(false);
  const [educationGiven, setEducationGiven] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const valid = condition.trim() && followUp.trim();

  function handleSubmit() {
    if (!valid) return;
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    onDischarge({
      patientConditionOnDischarge: condition.trim(), vitalsStableAtDischarge: vitalsStable, woundStatus: woundStatus.trim(),
      medicationsHandedOver: medsHandedOver, belongingsReturned, patientEducationGiven: educationGiven,
      followUpInstructions: followUp.trim(), dischargedBy: CURRENT_NURSE.name, dischargeDateTime: stamp, additionalNotes: additionalNotes.trim() || undefined,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="border-emerald-200 bg-emerald-50/40">
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <CheckCircle2 className="h-14 w-14 text-emerald-500" />
          <h3 className="text-xl font-bold text-slate-800">Discharge Recorded Successfully</h3>
          <p className="text-sm text-slate-600">Nursing discharge summary for <span className="font-semibold">{patientName}</span> has been completed and saved.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><LogOut className="h-4 w-4 text-red-600" />Nursing Discharge Summary</p>
          <p className="mt-1 text-xs text-slate-500">Complete this checklist before discharging the patient from the ward.</p>

          <div className="mt-4 space-y-4">
            <div><Label className="text-xs text-slate-500">Patient Condition on Discharge *</Label><Textarea className="mt-1" rows={3} value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Describe the patient's condition at time of discharge..." /></div>
            <div><Label className="text-xs text-slate-500">Wound / Surgical Site Status (if applicable)</Label><Textarea className="mt-1" rows={2} value={woundStatus} onChange={(e) => setWoundStatus(e.target.value)} placeholder="e.g. Clean and dry, sutures intact" /></div>
            <div><Label className="text-xs text-slate-500">Follow-up Instructions *</Label><Textarea className="mt-1" rows={2} value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="Follow-up date, medications, precautions..." /></div>

            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <CheckRow label="Vitals stable at discharge" checked={vitalsStable} onChange={setVitalsStable} />
              <CheckRow label="Medications handed over to patient/family" checked={medsHandedOver} onChange={setMedsHandedOver} />
              <CheckRow label="Patient belongings returned" checked={belongingsReturned} onChange={setBelongingsReturned} />
              <CheckRow label="Patient/family education given" checked={educationGiven} onChange={setEducationGiven} />
            </div>

            <div><Label className="text-xs text-slate-500">Additional Notes (Optional)</Label><Textarea className="mt-1" rows={2} value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} /></div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">Discharged by: <span className="font-semibold text-slate-700">{CURRENT_NURSE.name}</span></div>

            <Button disabled={!valid} className="w-full gap-2 bg-red-600 hover:bg-red-700" onClick={handleSubmit}><LogOut className="h-4 w-4" />Discharge Patient</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return <label className="flex items-center gap-2 text-sm text-slate-700"><Checkbox checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} />{label}</label>;
}