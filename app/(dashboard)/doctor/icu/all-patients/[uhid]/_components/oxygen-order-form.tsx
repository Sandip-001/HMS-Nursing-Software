// app/(dashboard)/doctor/icu/patients/[uhid]/_components/oxygen-order-form.tsx
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
import type { OxygenDevice, OxygenDeviceSettings, OxygenIndication, MonitoringFrequency, OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";
import { DEVICE_OPTIONS, FREQUENCY_OPTIONS, INDICATION_OPTIONS } from "@/lib/nurse/icu/oxygen-therapy-data";
import { OxygenDeviceFields } from "@/app/(dashboard)/nurse/icu/patients/[uhid]/_components/oxygen-device-fields";


export function OxygenOrderForm({
  uhid, icuBed, patientName, orderedBy, orderedByRole, onSubmit, onClose
}: {
  uhid: string;
  icuBed: string;
  patientName: string;
  orderedBy: string;
  orderedByRole: "Doctor" | "RMO";
  onSubmit: (order: OxygenOrder) => void;
  onClose: () => void;
}) {
  const [indication, setIndication] = useState<OxygenIndication>("Hypoxemia");
  const [indicationOther, setIndicationOther] = useState("");
  const [device, setDevice] = useState<OxygenDevice>("Nasal Cannula");
  const [deviceSettings, setDeviceSettings] = useState<Partial<OxygenDeviceSettings>>({ flowLpm: 2 });
  const [targetMin, setTargetMin] = useState("94");
  const [targetMax, setTargetMax] = useState("98");
  const [frequency, setFrequency] = useState<MonitoringFrequency>("Hourly");
  const [frequencyOther, setFrequencyOther] = useState("");
  const [durationType, setDurationType] = useState<"Until discontinued" | "Specific duration">("Until discontinued");
  const [durationValue, setDurationValue] = useState("");
  const [instructions, setInstructions] = useState("");

  function handleSubmit() {
    if (!targetMin || !targetMax) {
      toast.error("Target SpO₂ range is required.");
      return;
    }
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    const order: OxygenOrder = {
      id: `OXO-${Date.now()}`,
      uhid,
      icuBed,
      indication,
      indicationOther: indication === "Other" ? indicationOther : undefined,
      settings: { device, ...deviceSettings } as OxygenDeviceSettings,
      targetSpo2Min: Number(targetMin),
      targetSpo2Max: Number(targetMax),
      monitoringFrequency: frequency,
      monitoringFrequencyOther: frequency === "Other" ? frequencyOther : undefined,
      startDateTime: stamp,
      durationType,
      durationValue: durationType === "Specific duration" ? durationValue : undefined,
      specialInstructions: instructions || undefined,
      status: "Active",
      orderedBy,
      orderedByRole,
      orderedAt: stamp,
    };

    onSubmit(order);
    onClose()
    toast.success(`Oxygen Therapy order placed for ${patientName}.`);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-cyan-900"><Wind className="h-4 w-4" />New Medical Order — Oxygen Therapy</p>
        <p className="mt-1 text-xs text-cyan-700">{patientName} · {icuBed}</p>
      </div>

      {/* Indication */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Reason / Indication</Label>
        <RadioGroup value={indication} onValueChange={(v) => setIndication(v as OxygenIndication)} className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {INDICATION_OPTIONS.map((opt) => (
            <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-sm ${indication === opt ? "border-cyan-400 bg-cyan-50" : "border-slate-200"}`}>
              <RadioGroupItem value={opt} />{opt}
            </label>
          ))}
        </RadioGroup>
        {indication === "Other" && (
          <Input className="mt-3" value={indicationOther} onChange={(e) => setIndicationOther(e.target.value)} placeholder="Specify indication" />
        )}
      </div>

      {/* Delivery Device */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Delivery Device</Label>
        <Select value={device} onValueChange={(v) => { setDevice(v as OxygenDevice); setDeviceSettings({}); }}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>{DEVICE_OPTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>

        <div className="mt-4">
          <Label className="text-xs font-semibold text-slate-600">Oxygen Setting</Label>
          <div className="mt-2">
            <OxygenDeviceFields device={device} settings={deviceSettings} onChange={(patch) => setDeviceSettings((prev) => ({ ...prev, ...patch }))} />
          </div>
        </div>
      </div>

      {/* Target SpO2 */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
        <Label className="text-xs font-semibold text-emerald-800">Target SpO₂ (per hospital protocol & patient condition)</Label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-slate-500">Minimum (%)</Label>
            <Input type="number" className="mt-1" value={targetMin} onChange={(e) => setTargetMin(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Maximum (%)</Label>
            <Input type="number" className="mt-1" value={targetMax} onChange={(e) => setTargetMax(e.target.value)} />
          </div>
        </div>
        <p className="mt-2 text-xs text-emerald-700">Note: Use a lower target range for patients at risk of hypercapnic respiratory failure, per protocol.</p>
      </div>

      {/* Frequency */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Frequency / Monitoring</Label>
        <Select value={frequency} onValueChange={(v) => setFrequency(v as MonitoringFrequency)}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>{FREQUENCY_OPTIONS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
        </Select>
        {frequency === "Other" && (
          <Input className="mt-3" value={frequencyOther} onChange={(e) => setFrequencyOther(e.target.value)} placeholder="Specify monitoring schedule" />
        )}
      </div>

      {/* Duration */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Duration</Label>
        <RadioGroup value={durationType} onValueChange={(v) => setDurationType(v as typeof durationType)} className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="Until discontinued" />Until discontinued</label>
          <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="Specific duration" />Specific duration</label>
        </RadioGroup>
        {durationType === "Specific duration" && (
          <Input className="mt-3" value={durationValue} onChange={(e) => setDurationValue(e.target.value)} placeholder="e.g. 48 hours" />
        )}
      </div>

      {/* Special Instructions */}
      <div>
        <Label className="text-xs font-semibold text-slate-600">Special Instructions (Optional)</Label>
        <Textarea className="mt-2" value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={2} placeholder="Any additional instructions for nursing staff" />
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700" onClick={handleSubmit}><Wind className="h-4 w-4" />Place Order</Button>
      </div>
    </div>
  );
}