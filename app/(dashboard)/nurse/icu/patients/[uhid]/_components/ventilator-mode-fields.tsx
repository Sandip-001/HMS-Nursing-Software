// app/(dashboard)/nurse/icu/patients/[uhid]/_components/ventilator-mode-fields.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VentilatorMode } from "@/types/nurse/icu/ventilation-types";

export function VentilatorModeFields({ mode, settings, onChange }: {
  mode: VentilatorMode;
  settings: Record<string, number | string>;
  onChange: (patch: Record<string, number | string>) => void;
}) {
  const s = settings;

  const set = (key: string, value: number | string) => onChange({ ...settings, [key]: value });

  if (mode === "Volume Control") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-500">Tidal Volume (mL)</Label>
          <Input type="number" className="mt-1" value={s.tidalVolumeMl ?? ""} onChange={(e) => set("tidalVolumeMl", Number(e.target.value))} placeholder="450" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Respiratory Rate (/min)</Label>
          <Input type="number" className="mt-1" value={s.respiratoryRate ?? ""} onChange={(e) => set("respiratoryRate", Number(e.target.value))} placeholder="18" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">FiO₂ (%)</Label>
          <Input type="number" className="mt-1" value={s.fiO2Percent ?? ""} onChange={(e) => set("fiO2Percent", Number(e.target.value))} placeholder="40" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">PEEP (cmH₂O)</Label>
          <Input type="number" className="mt-1" value={s.peepCmH2O ?? ""} onChange={(e) => set("peepCmH2O", Number(e.target.value))} placeholder="5" />
        </div>
      </div>
    );
  }

  if (mode === "Pressure Control") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-500">Inspiratory Pressure (cmH₂O)</Label>
          <Input type="number" className="mt-1" value={s.inspiratoryPressureCmH2O ?? ""} onChange={(e) => set("inspiratoryPressureCmH2O", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Respiratory Rate (/min)</Label>
          <Input type="number" className="mt-1" value={s.respiratoryRate ?? ""} onChange={(e) => set("respiratoryRate", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">FiO₂ (%)</Label>
          <Input type="number" className="mt-1" value={s.fiO2Percent ?? ""} onChange={(e) => set("fiO2Percent", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">PEEP (cmH₂O)</Label>
          <Input type="number" className="mt-1" value={s.peepCmH2O ?? ""} onChange={(e) => set("peepCmH2O", Number(e.target.value))} />
        </div>
      </div>
    );
  }

  if (mode === "SIMV" || mode === "PSV") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-500">Pressure Support (cmH₂O)</Label>
          <Input type="number" className="mt-1" value={s.pressureSupportCmH2O ?? ""} onChange={(e) => set("pressureSupportCmH2O", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Backup Rate (/min)</Label>
          <Input type="number" className="mt-1" value={s.backupRate ?? ""} onChange={(e) => set("backupRate", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">FiO₂ (%)</Label>
          <Input type="number" className="mt-1" value={s.fiO2Percent ?? ""} onChange={(e) => set("fiO2Percent", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">PEEP (cmH₂O)</Label>
          <Input type="number" className="mt-1" value={s.peepCmH2O ?? ""} onChange={(e) => set("peepCmH2O", Number(e.target.value))} />
        </div>
      </div>
    );
  }

  if (mode === "BiPAP" || mode === "CPAP") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-500">IPAP (cmH₂O)</Label>
          <Input type="number" className="mt-1" value={s.ipapCmH2O ?? ""} onChange={(e) => set("ipapCmH2O", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">EPAP (cmH₂O)</Label>
          <Input type="number" className="mt-1" value={s.epapCmH2O ?? ""} onChange={(e) => set("epapCmH2O", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">FiO₂ (%)</Label>
          <Input type="number" className="mt-1" value={s.fiO2Percent ?? ""} onChange={(e) => set("fiO2Percent", Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Backup Rate (/min)</Label>
          <Input type="number" className="mt-1" value={s.backupRate ?? ""} onChange={(e) => set("backupRate", Number(e.target.value))} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Label className="text-xs text-slate-500">Mode-Specific Settings (JSON-like)</Label>
      <Input className="mt-1" value={JSON.stringify(settings, null, 2)} onChange={(e) => { try { onChange(JSON.parse(e.target.value)); } catch {} }} placeholder='{"key": "value"}' />
    </div>
  );
}

export function formatVentilatorSettings(mode: VentilatorMode, settings: Record<string, number | string>): string {
  const parts: string[] = [];
  if ("tidalVolumeMl" in settings) parts.push(`VT ${settings.tidalVolumeMl} mL`);
  if ("respiratoryRate" in settings) parts.push(`RR ${settings.respiratoryRate}/min`);
  if ("fiO2Percent" in settings) parts.push(`FiO₂ ${settings.fiO2Percent}%`);
  if ("peepCmH2O" in settings) parts.push(`PEEP ${settings.peepCmH2O} cmH₂O`);
  if ("inspiratoryPressureCmH2O" in settings) parts.push(`IP ${settings.inspiratoryPressureCmH2O} cmH₂O`);
  if ("pressureSupportCmH2O" in settings) parts.push(`PS ${settings.pressureSupportCmH2O} cmH₂O`);
  if ("ipapCmH2O" in settings) parts.push(`IPAP ${settings.ipapCmH2O} cmH₂O`);
  if ("epapCmH2O" in settings) parts.push(`EPAP ${settings.epapCmH2O} cmH₂O`);
  if ("backupRate" in settings) parts.push(`Backup ${settings.backupRate}/min`);
  return parts.join(" · ") || "Settings not specified";
}