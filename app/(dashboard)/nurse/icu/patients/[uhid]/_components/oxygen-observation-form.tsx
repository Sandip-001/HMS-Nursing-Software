// app/(dashboard)/nurse/icu/patients/[uhid]/_components/oxygen-observation-form.tsx
"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { OxygenAdministration, OxygenObservation, OxygenOrder, OxygenResponse, PatientCondition } from "@/types/nurse/icu/oxygen-therapy-types";
import { CONDITION_OPTIONS, RESPONSE_OPTIONS } from "@/lib/nurse/icu/oxygen-therapy-data";
import { formatDeviceSettings } from "./oxygen-device-fields";

export function OxygenObservationForm({
  order, administration, patientName, nurseName, onSave, onClose,
}: {
  order: OxygenOrder;
  administration: OxygenAdministration;
  patientName: string;
  nurseName: string;
  onSave: (observation: OxygenObservation) => void;
  onClose: () => void;
}) {
  const [spo2, setSpo2] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [condition, setCondition] = useState<PatientCondition>("Comfortable");
  const [response, setResponse] = useState<OxygenResponse>("Stable");
  const [remarks, setRemarks] = useState("");
  const [notifyingDoctor, setNotifyingDoctor] = useState(false);

  const belowTarget = useMemo(() => {
    const val = Number(spo2);
    return spo2 !== "" && (val < order.targetSpo2Min || val > order.targetSpo2Max);
  }, [spo2, order.targetSpo2Min, order.targetSpo2Max]);

  function handleSave() {
    if (!spo2 || !respiratoryRate || !heartRate) {
      toast.error("SpO₂, respiratory rate, and heart rate are required.");
      return;
    }
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    const observation: OxygenObservation = {
      id: `OXOB-${Date.now()}`,
      orderId: order.id,
      uhid: order.uhid,
      administrationId: administration.id,
      spo2: Number(spo2),
      respiratoryRate: Number(respiratoryRate),
      heartRate: Number(heartRate),
      patientCondition: condition,
      oxygenResponse: response,
      remarks: remarks || undefined,
      recordedBy: nurseName,
      recordedAt: stamp,
      belowTarget,
      doctorNotified: belowTarget ? notifyingDoctor : undefined,
      doctorNotifiedAt: belowTarget && notifyingDoctor ? stamp : undefined,
      doctorNotifiedBy: belowTarget && notifyingDoctor ? nurseName : undefined,
      escalationNote: belowTarget && notifyingDoctor ? `Doctor informed at ${stamp.split(",")[1]?.trim()}.` : undefined,
    };

    onSave(observation);
    toast.success("Oxygen observation saved.");
    onClose();
  }

  return (
    <div className="space-y-5">
      {/* Patient + Active order context — auto-filled, not re-typed */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-800">{patientName}</p>
        <p className="text-xs text-slate-500">{order.icuBed}</p>
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/60 p-3">
          <p className="text-[10px] uppercase text-blue-500">Current Oxygen (Active Order)</p>
          <p className="mt-1 text-sm font-bold text-blue-900">{formatDeviceSettings(order.settings)}</p>
          <p className="text-xs text-blue-700">Target SpO₂: {order.targetSpo2Min}–{order.targetSpo2Max}%</p>
        </div>
      </div>

      {/* Patient Observation */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Patient Observation</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs text-slate-500">SpO₂ (%)</Label>
            <Input type="number" className="mt-1" value={spo2} onChange={(e) => setSpo2(e.target.value)} placeholder="95" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Resp. Rate (/min)</Label>
            <Input type="number" className="mt-1" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} placeholder="20" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Heart Rate (bpm)</Label>
            <Input type="number" className="mt-1" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} placeholder="88" />
          </div>
        </div>

        {belowTarget && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-red-800"><AlertTriangle className="h-4 w-4" />Below Prescribed Target</p>
            <p className="mt-1 text-xs text-red-700">Current SpO₂: {spo2}% · Target: {order.targetSpo2Min}–{order.targetSpo2Max}%</p>
            <p className="mt-2 text-xs font-semibold text-red-800">Review Required — follow hospital escalation protocol.</p>
            <div className="mt-3 flex items-center gap-2">
              <Button
                size="sm"
                variant={notifyingDoctor ? "default" : "outline"}
                className={notifyingDoctor ? "gap-1.5 bg-red-600 hover:bg-red-700" : "gap-1.5 border-red-300 text-red-700"}
                onClick={() => setNotifyingDoctor((v) => !v)}
              >
                <Bell className="h-3.5 w-3.5" />{notifyingDoctor ? "Doctor Will Be Notified" : "Notify Doctor"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Patient Condition */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Patient Condition</Label>
        <RadioGroup value={condition} onValueChange={(v) => setCondition(v as PatientCondition)} className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CONDITION_OPTIONS.map((opt) => (
            <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-sm ${condition === opt ? "border-cyan-400 bg-cyan-50" : "border-slate-200"}`}>
              <RadioGroupItem value={opt} />{opt}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Oxygen Response */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">Oxygen Response</Label>
        <RadioGroup value={response} onValueChange={(v) => setResponse(v as OxygenResponse)} className="mt-2 flex gap-3">
          {RESPONSE_OPTIONS.map((opt) => (
            <label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-sm ${response === opt ? "border-cyan-400 bg-cyan-50" : "border-slate-200"}`}>
              <RadioGroupItem value={opt} />{opt}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Remarks */}
      <div>
        <Label className="text-xs font-semibold text-slate-600">Remarks</Label>
        <Textarea className="mt-2" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={2} placeholder="e.g. Patient maintaining target saturation." />
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