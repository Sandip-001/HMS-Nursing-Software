// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/drawer/section-fluid-balance.tsx
"use client";
import { useMemo, useState } from "react";
import { Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { FluidBalanceFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { DateFilterBar } from "./date-filter-bar";

export function SectionFluidBalance({ entries }: { entries: FluidBalanceFull[] }) {
  const [date, setDate] = useState("");
  const filtered = useMemo(() => date ? entries.filter((e) => e.date === date) : entries, [entries, date]);
  const totalIntake = filtered.filter((e) => e.direction === "Intake").reduce((sum, e) => sum + e.volumeMl, 0);
  const totalOutput = filtered.filter((e) => e.direction === "Output").reduce((sum, e) => sum + e.volumeMl, 0);
  const net = totalIntake - totalOutput;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Summary label="Total Intake" value={`${totalIntake} ml`} tone="border-blue-200 bg-blue-50 text-blue-700" />
        <Summary label="Total Output" value={`${totalOutput} ml`} tone="border-amber-200 bg-amber-50 text-amber-700" />
        <Summary label="Net Balance" value={`${net >= 0 ? "+" : ""}${net} ml`} tone={net >= 0 ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Droplets className="h-4 w-4 text-blue-500" />Fluid Balance Chart</p>
        <div className="mt-3"><DateFilterBar value={date} onChange={setDate} label="Filter by date" /></div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400"><th className="py-2 pr-4">Date / Time</th><th className="pr-4">Direction</th><th className="pr-4">Route</th><th className="pr-4">Description</th><th className="pr-4">Volume</th><th>Recorded By</th></tr></thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-slate-700">{entry.dateTime}</td>
                  <td className="pr-4"><Badge variant="outline" className={entry.direction === "Intake" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-amber-200 bg-amber-50 text-amber-700"}>{entry.direction}</Badge></td>
                  <td className="pr-4 text-slate-600">{entry.route}</td>
                  <td className="pr-4 text-slate-600">{entry.description}</td>
                  <td className="pr-4 font-semibold text-slate-800">{entry.volumeMl} ml</td>
                  <td className="text-slate-500">{entry.recordedBy}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-slate-400">No fluid balance entries found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className={`rounded-xl border p-4 text-center ${tone}`}><p className="text-[10px] uppercase opacity-80">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}