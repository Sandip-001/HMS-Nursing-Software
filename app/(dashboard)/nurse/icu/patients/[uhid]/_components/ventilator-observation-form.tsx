// app/(dashboard)/nurse/icu/patients/[uhid]/_components/ventilator-observation-form.tsx
"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { VentilatorAdministration, VentilatorObservation, VentilatorOrder, PatientVentStatus } from "@/types/nurse/icu/ventilation-types";
import { PATIENT_VENT_STATUS_OPTIONS } from "@/lib/nurse/icu/ventilation-data";
import { VentilatorModeFields, formatVentilatorSettings } from "./ventilator-mode-fields";

export function VentilatorObservationForm({
  order, administration, patientName, nurseName, onSave, onClose,
}: {
  order: VentilatorOrder;
  administration: VentilatorAdministration;
  patientName: string;
  nurseName: string;
  onSave: (observation: VentilatorObservation) => void;
  onClose: () => void;
}) {
  const [ventSettings, setVentSettings] = useState<Record<string, number | string>>(administration.actualSettings);
  const [spo2, setSpo2] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [patientStatus, setPatientStatus] = useState<PatientVentStatus>("Stable");
  const [remarks, setRemarks] = useState("");

  const hasDifference = useMemo(() => {
    return Object.keys(order.prescribedSettings).some((key) => {
      const prescribed = order.prescribedSettings[key];
      const observed = ventSettings[key];
      return prescribed !== observed;
    });
  }, [ventSettings, order.prescribedSettings]);

  const [escalationReason, setEscalationReason] = useState<"Doctor order changed" | "Temporary clinical instruction" | "Device/clinical issue" | "Other">("Temporary clinical instruction");
  const [notifyingDoctor, setNotifyingDoctor] = useState(false);

  function handleSave() {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const observation: VentilatorObservation = {
      id: `VOB-${Date.now()}`,
      orderId: order.id,
      uhid: order.uhid,
      administrationId: administration.id,
      ventilatorParameters: ventSettings,
      spo2: spo2 ? Number(spo2) : undefined,
      respiratoryRate: respiratoryRate ? Number(respiratoryRate) : undefined,
      heartRate: heartRate ? Number(heartRate) : undefined,
      bloodPressureSystolic: bpSystolic ? Number(bpSystolic) : undefined,
      bloodPressureDiastolic: bpDiastolic ? Number(bpDiastolic) : undefined,
      patientStatus,
      remarks: remarks || undefined,
      recordedBy: nurseName,
      recordedAt: stamp,
      hasDifference,
      differenceNote: hasDifference ? `Ordered: ${formatVentilatorSettings(order.mode, order.prescribedSettings)} · Observed: ${formatVentilatorSettings(order.mode, ventSettings)}` : undefined,
      doctorNotified: hasDifference ? notifyingDoctor : undefined,
      doctorNotifiedAt: hasDifference && notifyingDoctor ? stamp : undefined,
      doctorNotifiedBy: hasDifference && notifyingDoctor ? nurseName : undefined,
      escalationReason: hasDifference ? escalationReason : undefined,
    };
    onSave(observation);
    toast.success("Ventilator observation saved.");
    onClose();
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-800">{patientName}</p>
        <p className="text-xs text-slate-500">{order.icuBed}</p>
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/60 p-3">
          <p className="text-[10px] uppercase text-blue-500">Current Ventilator Order</p>
          <p className="mt-1 text-sm font-bold text-blue-900">{order.mode}</p>
          <p className="text-xs text-blue-700">{formatVentilatorSettings(order.mode, order.prescribedSettings)}</p>
        </div>
      </div>

      {/* Actual Ventilator Settings */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Actual Ventilator Settings / Readings</p>
        <VentilatorModeFields mode={order.mode} settings={ventSettings} onChange={setVentSettings} />
      </div>

      {hasDifference && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-red-800"><AlertTriangle className="h-4 w-4" />Ventilator Setting Difference</p>
          <p className="mt-1 text-xs text-red-700">Ordered: {formatVentilatorSettings(order.mode, order.prescribedSettings)} · Observed: {formatVentilatorSettings(order.mode, ventSettings)}</p>
          <div className="mt-3">
            <Label className="text-xs text-slate-500">Reason / Action</Label>
            <Select value={escalationReason} onValueChange={(v) => setEscalationReason(v as typeof escalationReason)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Doctor order changed">Doctor order changed</SelectItem>
                <SelectItem value="Temporary clinical instruction">Temporary clinical instruction</SelectItem>
                <SelectItem value="Device/clinical issue">Device/clinical issue</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button size="sm" variant={notifyingDoctor ? "default" : "outline"} className={notifyingDoctor ? "gap-1.5 bg-red-600 hover:bg-red-700" : "gap-1.5 border-red-300 text-red-700"} onClick={() => setNotifyingDoctor((v) => !v)}>
              <Bell className="h-3.5 w-3.5" />{notifyingDoctor ? "Doctor Will Be Notified" : "Notify Doctor"}
            </Button>
          </div>
        </div>
      )}

      {/* Patient Parameters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Patient Parameters</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <Label className="text-xs text-slate-500">SpO₂ (%)</Label>
            <Input type="number" className="mt-1" value={spo2} onChange={(e) => setSpo2(e.target.value)} placeholder="96" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">RR (/min)</Label>
            <Input type="number" className="mt-1" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} placeholder="19" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">HR (bpm)</Label>
            <Input type="number" className="mt-1" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} placeholder="110" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">BP Systolic</Label>
            <Input type="number" className="mt-1" value={bpSystolic} onChange={(e) => setBpSystolic(e.target.value)} placeholder="105" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">BP Diastolic</Label>
            <Input type="number" className="mt-1" value={bpDiastolic} onChange={(e) => setBpDiastolic(e.target.value)} placeholder="65" />
          </div>
        </div>
      </div>

      {/* Patient Status */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Patient-Ventilator Status</Label>
        <RadioGroup value={patientStatus} onValueChange={(v) => setPatientStatus(v as PatientVentStatus)} className="mt-2 flex gap-3">
          {PATIENT_VENT_STATUS_OPTIONS.map((opt) => (
            <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-sm ${patientStatus === opt ? "border-cyan-400 bg-cyan-50" : "border-slate-200"}`}>
              <RadioGroupItem value={opt} />{opt}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Remarks */}
      <div>
        <Label className="text-xs font-semibold text-slate-600">Remarks</Label>
        <Textarea className="mt-2" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={2} placeholder="e.g. No obvious respiratory distress." />
      </div>

      <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
        Date & Time: <span className="font-semibold text-slate-700">Auto-generated on save</span> · Recorded By: <span className="font-semibold text-slate-700">{nurseName}</span>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="gap-2 bg-cyan-600 hover:bg-cyan-700" onClick={handleSave}><Save className="h-4 w-4" />Save Observation</Button>
      </div>
    </div>
  );
}