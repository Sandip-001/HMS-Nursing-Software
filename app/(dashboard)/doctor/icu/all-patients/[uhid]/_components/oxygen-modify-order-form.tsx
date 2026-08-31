// app/(dashboard)/doctor/icu/patients/[uhid]/_components/oxygen-modify-order-form.tsx
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { History, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OxygenDevice, OxygenDeviceSettings, OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";
import { DEVICE_OPTIONS } from "@/lib/nurse/icu/oxygen-therapy-data";
import { formatDeviceSettings, OxygenDeviceFields } from "@/app/(dashboard)/nurse/icu/patients/[uhid]/_components/oxygen-device-fields";


export function OxygenModifyOrderForm({
  currentOrder, orderedBy, orderedByRole, onSubmit, onCancel,
}: {
  currentOrder: OxygenOrder;
  orderedBy: string;
  orderedByRole: "Doctor" | "RMO";
  onSubmit: (newOrder: OxygenOrder, discontinueReason?: string) => void;
  onCancel: () => void;
}) {
  const [device, setDevice] = useState<OxygenDevice>(currentOrder.settings.device);
  const [deviceSettings, setDeviceSettings] = useState<Partial<OxygenDeviceSettings>>(currentOrder.settings);
  const [targetMin, setTargetMin] = useState(String(currentOrder.targetSpo2Min));
  const [targetMax, setTargetMax] = useState(String(currentOrder.targetSpo2Max));
  const [reason, setReason] = useState("");

  function handleSubmit() {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    const newOrder: OxygenOrder = {
      ...currentOrder,
      id: `OXO-${Date.now()}`,
      settings: { device, ...deviceSettings } as OxygenDeviceSettings,
      targetSpo2Min: Number(targetMin),
      targetSpo2Max: Number(targetMax),
      status: "Active",
      orderedBy,
      orderedByRole,
      orderedAt: stamp,
      startDateTime: stamp,
      supersedes: currentOrder.id,
    };

    onSubmit(newOrder, reason || undefined);
    toast.success("Oxygen order modified. Previous order preserved in history.");
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-amber-900"><Wind className="h-4 w-4" />Modify Oxygen Order</p>
        <p className="mt-1 text-xs text-amber-700">The current order will be preserved in history — not overwritten.</p>
      </div>

      {/* Current order (read-only reference) */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase text-slate-400">Current Order</p>
        <p className="mt-1 text-sm font-bold text-slate-700">{formatDeviceSettings(currentOrder.settings)}</p>
        <p className="text-xs text-slate-500">Target SpO₂: {currentOrder.targetSpo2Min}–{currentOrder.targetSpo2Max}% · Ordered by {currentOrder.orderedBy}</p>
      </div>

      {/* New settings */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Label className="text-xs font-semibold text-slate-600">New Delivery Device</Label>
        <Select value={device} onValueChange={(v) => { setDevice(v as OxygenDevice); setDeviceSettings({}); }}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>{DEVICE_OPTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>
        <div className="mt-4">
          <Label className="text-xs font-semibold text-slate-600">New Oxygen Setting</Label>
          <div className="mt-2">
            <OxygenDeviceFields device={device} settings={deviceSettings} onChange={(patch) => setDeviceSettings((prev) => ({ ...prev, ...patch }))} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
        <Label className="text-xs font-semibold text-emerald-800">New Target SpO₂</Label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Input type="number" value={targetMin} onChange={(e) => setTargetMin(e.target.value)} placeholder="Min %" />
          <Input type="number" value={targetMax} onChange={(e) => setTargetMax(e.target.value)} placeholder="Max %" />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-slate-600">Reason for Change (Optional)</Label>
        <Input className="mt-2" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. SpO2 below target, escalating support" />
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button className="gap-2 bg-amber-600 hover:bg-amber-700" onClick={handleSubmit}><History className="h-4 w-4" />Confirm Modification</Button>
      </div>
    </div>
  );
}