// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-vitals.tsx
"use client";
import { useMemo, useState } from "react";
import { HeartPulse, Plus, Stethoscope, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VitalRecord } from "@/types/rmo/ipd/rmo-types";
import { CURRENT_RMO } from "@/lib/rmo/ipd/rmo-data";
import { DateFilterBar } from "./date-filter-bar";

export function SectionVitals({ vitals, onAddVital }: { vitals: VitalRecord[]; onAddVital: (vital: VitalRecord) => void }) {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => date ? vitals.filter((v) => v.date === date) : vitals, [vitals, date]);
  const latest = vitals[0];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><HeartPulse className="h-4 w-4 text-red-500" />Latest Vitals</p>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />Add Vitals</Button>
        </div>
        {latest ? (
          <>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              <Vital label="BP" value={latest.bp} unit="mmHg" />
              <Vital label="Pulse" value={String(latest.pulse)} unit="/min" />
              <Vital label="Temp" value={String(latest.temp)} unit="°F" />
              <Vital label="RR" value={String(latest.respRate)} unit="/min" />
              <Vital label="SpO₂" value={String(latest.spo2)} unit="%" />
              <Vital label="Pain" value={String(latest.pain)} unit="/10" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Recorded {latest.dateTime} by {latest.recordedBy}</p>
          </>
        ) : <p className="mt-4 text-sm text-slate-400">No vitals recorded yet.</p>}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-3 text-sm font-bold text-slate-800">Vitals History (Doctor, RMO & Nurse Entries)</p>
        <DateFilterBar value={date} onChange={setDate} />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400"><th className="py-2 pr-4">Date / Time</th><th className="pr-4">BP</th><th className="pr-4">Pulse</th><th className="pr-4">RR</th><th className="pr-4">SpO₂</th><th className="pr-4">Temp</th><th className="pr-4">Pain</th><th>Recorded By</th></tr></thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-slate-700">{v.dateTime}</td>
                  <td className="pr-4 text-slate-600">{v.bp}</td>
                  <td className="pr-4 text-slate-600">{v.pulse}</td>
                  <td className="pr-4 text-slate-600">{v.respRate}</td>
                  <td className="pr-4 text-slate-600">{v.spo2}%</td>
                  <td className="pr-4 text-slate-600">{v.temp}°F</td>
                  <td className="pr-4 text-slate-600">{v.pain}/10</td>
                  <td className="text-slate-500"><span className="flex items-center gap-1">{v.recordedByRole === "Nurse" ? <UserRound className="h-3 w-3 text-emerald-500" /> : <Stethoscope className="h-3 w-3 text-blue-500" />}{v.recordedBy}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={8} className="py-6 text-center text-slate-400">No vitals found for this date.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {open && <AddVitalDialog onCancel={() => setOpen(false)} onSave={(vital) => { onAddVital(vital); setOpen(false); }} />}
    </div>
  );
}

function Vital({ label, value, unit }: { label: string; value: string; unit: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center"><p className="text-[10px] text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-800">{value} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p></div>;
}

function AddVitalDialog({ onCancel, onSave }: { onCancel: () => void; onSave: (vital: VitalRecord) => void }) {
  const [systolic, setSystolic] = useState(""); const [diastolic, setDiastolic] = useState(""); const [pulse, setPulse] = useState("");
  const [respRate, setRespRate] = useState(""); const [spo2, setSpo2] = useState(""); const [temp, setTemp] = useState(""); const [pain, setPain] = useState("");
  const valid = systolic && diastolic && pulse && respRate && spo2 && temp && pain;

  function handleSave() {
    const now = new Date();
    const dateIso = now.toISOString().slice(0, 10);
    const stamp = now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    onSave({
      id: `V-${Date.now()}`, date: dateIso, dateTime: stamp, bp: `${systolic}/${diastolic}`,
      pulse: Number(pulse), respRate: Number(respRate), spo2: Number(spo2), temp: Number(temp), pain: Number(pain),
      recordedBy: CURRENT_RMO.name, recordedByRole: "RMO",
    });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h3 className="text-lg font-bold text-slate-800">Add New Vitals</h3><Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button></div>
        <div className="grid grid-cols-2 gap-3 p-5">
          <Field label="Systolic BP (mmHg)"><Input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} /></Field>
          <Field label="Diastolic BP (mmHg)"><Input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} /></Field>
          <Field label="Pulse (/min)"><Input type="number" value={pulse} onChange={(e) => setPulse(e.target.value)} /></Field>
          <Field label="Resp. Rate (/min)"><Input type="number" value={respRate} onChange={(e) => setRespRate(e.target.value)} /></Field>
          <Field label="SpO₂ (%)"><Input type="number" value={spo2} onChange={(e) => setSpo2(e.target.value)} /></Field>
          <Field label="Temperature (°F)"><Input type="number" step="0.1" value={temp} onChange={(e) => setTemp(e.target.value)} /></Field>
          <Field label="Pain Score (0-10)"><Input type="number" min={0} max={10} value={pain} onChange={(e) => setPain(e.target.value)} /></Field>
        </div>
        <div className="flex gap-3 border-t border-slate-100 p-5"><Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button><Button className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={!valid} onClick={handleSave}>Save Vitals</Button></div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label className="text-xs text-slate-500">{label}</Label><div className="mt-1">{children}</div></div>;
}