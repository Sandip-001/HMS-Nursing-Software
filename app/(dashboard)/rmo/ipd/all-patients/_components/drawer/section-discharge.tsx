// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-discharge.tsx
"use client";
import { useState } from "react";
import { CheckCircle2, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { DischargeForm } from "@/types/rmo/ipd/rmo-types";
import { CURRENT_RMO } from "@/lib/rmo/ipd/rmo-data";

export function SectionDischarge({ discharge, onDischarge }: { discharge?: DischargeForm; onDischarge: (form: DischargeForm) => void }) {
  const [open, setOpen] = useState(false);

  if (discharge) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-emerald-800"><CheckCircle2 className="h-4 w-4" />Patient Discharged</p>
        <p className="mt-2 text-sm text-slate-700">{discharge.finalDiagnosis}</p>
        <p className="mt-1 text-xs text-slate-500">Discharged by {discharge.dischargedBy} on {discharge.dischargedAt}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><LogOut className="h-4 w-4 text-red-600" />Discharge Patient</p>
        <p className="mt-1 text-xs text-slate-500">RMO can initiate discharge with current condition and instructions.</p>
        <Button className="mt-3 gap-2 bg-red-600 hover:bg-red-700" onClick={() => setOpen(true)}><LogOut className="h-4 w-4" />Initiate Discharge</Button>
      </div>

      {open && <DischargeModal onCancel={() => setOpen(false)} onSave={(form) => { onDischarge(form); setOpen(false); }} />}
    </div>
  );
}

function DischargeModal({ onCancel, onSave }: { onCancel: () => void; onSave: (form: DischargeForm) => void }) {
  const [currentCondition, setCurrentCondition] = useState("");
  const [finalDiagnosis, setFinalDiagnosis] = useState("");
  const [dischargeInstructions, setDischargeInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const valid = currentCondition.trim() && finalDiagnosis.trim() && dischargeInstructions.trim() && followUpDate;

  function handleSave() {
    const now = new Date();
    onSave({
      currentCondition: currentCondition.trim(), finalDiagnosis: finalDiagnosis.trim(), dischargeInstructions: dischargeInstructions.trim(),
      followUpDate, dischargedBy: CURRENT_RMO.name, dischargedAt: now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h3 className="text-lg font-bold text-slate-800">Initiate Discharge</h3><Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button></div>
        <div className="space-y-4 p-5">
          <div><Label className="text-xs text-slate-500">Current Condition *</Label><Textarea className="mt-1" rows={2} value={currentCondition} onChange={(e) => setCurrentCondition(e.target.value)} /></div>
          <div><Label className="text-xs text-slate-500">Final Diagnosis *</Label><Input className="mt-1" value={finalDiagnosis} onChange={(e) => setFinalDiagnosis(e.target.value)} /></div>
          <div><Label className="text-xs text-slate-500">Discharge Instructions *</Label><Textarea className="mt-1" rows={2} value={dischargeInstructions} onChange={(e) => setDischargeInstructions(e.target.value)} /></div>
          <div><Label className="text-xs text-slate-500">Follow-up Date *</Label><Input type="date" className="mt-1" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} /></div>
        </div>
        <div className="flex gap-3 border-t border-slate-100 p-5"><Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button><Button disabled={!valid} className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleSave}>Discharge Patient</Button></div>
      </div>
    </div>
  );
}