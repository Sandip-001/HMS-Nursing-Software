// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/drawer/section-vitals.tsx
"use client";
import { useMemo, useState } from "react";
import { HeartPulse, Stethoscope, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VitalRecordFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { DateFilterBar } from "./date-filter-bar";

export function SectionVitals({ vitals }: { vitals: VitalRecordFull[] }) {
  const [date, setDate] = useState("");
  const filtered = useMemo(() => date ? vitals.filter((v) => v.date === date) : vitals, [vitals, date]);
  const latest = vitals[0];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><HeartPulse className="h-4 w-4 text-red-500" />Latest Vitals</p>
        {latest ? (
          <>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
              <Vital label="BP" value={latest.bp} unit="mmHg" />
              <Vital label="Pulse" value={String(latest.pulse)} unit="/min" />
              <Vital label="Temp" value={String(latest.temp)} unit="°F" />
              <Vital label="RR" value={String(latest.respRate)} unit="/min" />
              <Vital label="SpO₂" value={String(latest.spo2)} unit="%" />
              <Vital label="Pain" value={String(latest.pain)} unit="/10" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Recorded {latest.dateTime} by {latest.recordedBy} ({latest.recordedByRole})</p>
          </>
        ) : <p className="mt-3 text-sm text-slate-400">No vitals recorded yet.</p>}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800">Vitals History (Doctor & Nurse Entries)</p>
        </div>
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
                  <td className="text-slate-500">
                    <span className="flex items-center gap-1">{v.recordedByRole === "Doctor" ? <Stethoscope className="h-3 w-3 text-blue-500" /> : <UserRound className="h-3 w-3 text-emerald-500" />}{v.recordedBy}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={8} className="py-6 text-center text-slate-400">No vitals found for this date.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Vital({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p>
    </div>
  );
}