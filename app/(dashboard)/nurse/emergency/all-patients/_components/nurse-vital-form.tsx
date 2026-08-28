// app/(dashboard)/nurse/emergency/_components/nurse-vital-form.tsx
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VitalRecord } from "@/types/emergency/emergency-types";

export function NurseVitalForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (vital: Omit<VitalRecord, "id" | "date" | "dateTime" | "recordedBy" | "recordedByRole">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    bp: "",
    pulse: "",
    respRate: "",
    spo2: "",
    temp: "",
    pain: "",
  });

  const set = (key: keyof typeof form, value: string) => setForm((v) => ({ ...v, [key]: value }));

  function handleSubmit() {
    onSubmit({
      bp: form.bp,
      pulse: Number(form.pulse),
      respRate: Number(form.respRate),
      spo2: Number(form.spo2),
      temp: Number(form.temp),
      pain: Number(form.pain),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-800">Add New Vitals</p>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <Label className="text-xs text-slate-500">BP (mmHg)</Label>
          <Input value={form.bp} onChange={(e) => set("bp", e.target.value)} placeholder="120/80" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Pulse (/min)</Label>
          <Input value={form.pulse} onChange={(e) => set("pulse", e.target.value)} placeholder="72" type="number" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Resp Rate (/min)</Label>
          <Input value={form.respRate} onChange={(e) => set("respRate", e.target.value)} placeholder="18" type="number" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">SpO₂ (%)</Label>
          <Input value={form.spo2} onChange={(e) => set("spo2", e.target.value)} placeholder="98" type="number" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Temp (F)</Label>
          <Input value={form.temp} onChange={(e) => set("temp", e.target.value)} placeholder="98.6" type="number" step="0.1" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Pain (0-10)</Label>
          <Input value={form.pain} onChange={(e) => set("pain", e.target.value)} placeholder="2" type="number" />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>
          Save Vitals
        </Button>
      </div>
    </div>
  );
}