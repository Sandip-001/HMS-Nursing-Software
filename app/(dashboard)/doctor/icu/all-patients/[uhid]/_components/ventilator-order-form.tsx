// app/(dashboard)/doctor/icu/patients/[uhid]/_components/ventilator-order-form.tsx
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { AirwayType, VentilatorMode, VentilatorOrder, VentilationType, WeaningPlan } from "@/types/nurse/icu/ventilation-types";
import { AIRWAY_TYPE_OPTIONS, VENTILATION_TYPE_OPTIONS, VENTILATOR_MODE_OPTIONS, WEANING_PLAN_OPTIONS } from "@/lib/nurse/icu/ventilation-data";
import { VentilatorModeFields } from "@/app/(dashboard)/nurse/icu/patients/[uhid]/_components/ventilator-mode-fields";


export function VentilatorOrderForm({
  uhid, icuBed, patientName, orderedBy, orderedByRole, onSubmit, onClose,
}: {
  uhid: string;
  icuBed: string;
  patientName: string;
  orderedBy: string;
  orderedByRole: "Doctor" | "RMO";
  onSubmit: (order: VentilatorOrder) => void;
  onClose: () => void;
}) {
  const [ventType, setVentType] = useState<VentilationType>("Invasive Mechanical Ventilation");
  const [airwayType, setAirwayType] = useState<AirwayType>("Endotracheal tube");
  const [airwayDetails, setAirwayDetails] = useState("");
  const [ventilatorName, setVentilatorName] = useState("");
  const [mode, setMode] = useState<VentilatorMode>("Volume Control");
  const [settings, setSettings] = useState<Record<string, number | string>>({});
  const [oxygenationTarget, setOxygenationTarget] = useState("");
  const [ventilationTarget, setVentilationTarget] = useState("");
  const [instructions, setInstructions] = useState("");
  const [monitoringFreq, setMonitoringFreq] = useState("");
  const [weaningPlan, setWeaningPlan] = useState<WeaningPlan>("Continue current support");
  const [weaningPlanOther, setWeaningPlanOther] = useState("");

  function handleSubmit() {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const order: VentilatorOrder = {
      id: `VO-${Date.now()}`,
      uhid,
      icuBed,
      ventilationType: ventType,
      airwayType: ventType === "Invasive Mechanical Ventilation" ? airwayType : "None",
      airwayDetails: ventType === "Invasive Mechanical Ventilation" ? airwayDetails : undefined,
      ventilatorName: ventilatorName || undefined,
      mode,
      prescribedSettings: settings,
      oxygenationTarget: oxygenationTarget || undefined,
      ventilationTarget: ventilationTarget || undefined,
      specialInstructions: instructions || undefined,
      monitoringFrequency: monitoringFreq || undefined,
      weaningPlan,
      weaningPlanOther: weaningPlan === "Other" ? weaningPlanOther : undefined,
      status: "Active",
      orderedBy,
      orderedByRole,
      orderedAt: stamp,
    };
    onSubmit(order);
    onClose()
    toast.success(`Mechanical Ventilation order placed for ${patientName}.`);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-cyan-900"><Wind className="h-4 w-4" />New Medical Order — Mechanical Ventilation</p>
        <p className="mt-1 text-xs text-cyan-700">{patientName} · {icuBed}</p>
      </div>

      {/* Ventilation Type */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Ventilation Type</Label>
        <RadioGroup value={ventType} onValueChange={(v) => setVentType(v as VentilationType)} className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {VENTILATION_TYPE_OPTIONS.map((opt) => (
            <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-sm ${ventType === opt ? "border-cyan-400 bg-cyan-50" : "border-slate-200"}`}>
              <RadioGroupItem value={opt} />{opt}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Airway (if invasive) */}
      {ventType === "Invasive Mechanical Ventilation" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <Label className="text-xs font-semibold text-slate-600">Airway</Label>
          <Select value={airwayType} onValueChange={(v) => setAirwayType(v as AirwayType)}>
            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
            <SelectContent>{AIRWAY_TYPE_OPTIONS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
          </Select>
          <Input className="mt-3" value={airwayDetails} onChange={(e) => setAirwayDetails(e.target.value)} placeholder="e.g. Size 7.5, depth 22 cm at lips" />
        </div>
      )}

      {/* Ventilator Name */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Ventilator (optional)</Label>
        <Input className="mt-2" value={ventilatorName} onChange={(e) => setVentilatorName(e.target.value)} placeholder="e.g. Ventilator-ICU-03" />
      </div>

      {/* Mode */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Mode</Label>
        <Select value={mode} onValueChange={(v) => { setMode(v as VentilatorMode); setSettings({}); }}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>{VENTILATOR_MODE_OPTIONS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
        </Select>
        <div className="mt-4">
          <Label className="text-xs font-semibold text-slate-600">Prescribed Settings</Label>
          <div className="mt-2">
            <VentilatorModeFields mode={mode} settings={settings} onChange={setSettings} />
          </div>
        </div>
      </div>

      {/* Clinical Targets */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
        <Label className="text-xs font-semibold text-emerald-800">Clinical Targets / Instructions</Label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Input value={oxygenationTarget} onChange={(e) => setOxygenationTarget(e.target.value)} placeholder="Oxygenation target (e.g. SpO2 94-98%)" />
          <Input value={ventilationTarget} onChange={(e) => setVentilationTarget(e.target.value)} placeholder="Ventilation target (e.g. pCO2 35-45 mmHg)" />
        </div>
        <Textarea className="mt-3" value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={2} placeholder="Special instructions (e.g. weaning plan, monitoring frequency)" />
        <Input className="mt-3" value={monitoringFreq} onChange={(e) => setMonitoringFreq(e.target.value)} placeholder="Monitoring frequency (e.g. Hourly, Continuous)" />
      </div>

      {/* Weaning Plan */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Weaning / Respiratory Plan</Label>
        <Select value={weaningPlan} onValueChange={(v) => setWeaningPlan(v as WeaningPlan)}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>{WEANING_PLAN_OPTIONS.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
        </Select>
        {weaningPlan === "Other" && (
          <Input className="mt-3" value={weaningPlanOther} onChange={(e) => setWeaningPlanOther(e.target.value)} placeholder="Specify plan" />
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700" onClick={handleSubmit}><Wind className="h-4 w-4" />Place Order</Button>
      </div>
    </div>
  );
}