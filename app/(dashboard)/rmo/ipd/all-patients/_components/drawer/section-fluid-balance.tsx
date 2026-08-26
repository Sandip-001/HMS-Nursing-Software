// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-fluid-balance.tsx
"use client";
import { useMemo, useState } from "react";
import { Droplets, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FluidBalanceEntry } from "@/types/rmo/ipd/rmo-types";
import { CURRENT_RMO } from "@/lib/rmo/ipd/rmo-data";
import { DateFilterBar } from "./date-filter-bar";

const INTAKE_ROUTES = ["IV", "Oral", "NG Tube"];
const OUTPUT_ROUTES = ["Urine", "Drain", "Vomitus", "Stool"];

export function SectionFluidBalance({ entries, onAddEntry }: { entries: FluidBalanceEntry[]; onAddEntry: (entry: FluidBalanceEntry) => void }) {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
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
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Droplets className="h-4 w-4 text-blue-500" />Fluid Balance Chart</p>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />Add Entry</Button>
        </div>
        <div className="mt-3"><DateFilterBar value={date} onChange={setDate} /></div>
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

      {open && <AddFluidDialog onCancel={() => setOpen(false)} onSave={(entry) => { onAddEntry(entry); setOpen(false); }} />}
    </div>
  );
}

function Summary({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className={`rounded-xl border p-4 text-center ${tone}`}><p className="text-[10px] uppercase opacity-80">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function AddFluidDialog({ onCancel, onSave }: { onCancel: () => void; onSave: (entry: FluidBalanceEntry) => void }) {
  const [direction, setDirection] = useState<"Intake" | "Output">("Intake");
  const [route, setRoute] = useState("IV");
  const [description, setDescription] = useState("");
  const [volume, setVolume] = useState("");
  const routes = direction === "Intake" ? INTAKE_ROUTES : OUTPUT_ROUTES;
  const valid = description.trim() && Number(volume) > 0;

  function handleSave() {
    const now = new Date();
    onSave({ id: `F-${Date.now()}`, date: now.toISOString().slice(0, 10), dateTime: now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }), direction, route, description: description.trim(), volumeMl: Number(volume), recordedBy: CURRENT_RMO.name });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h3 className="text-lg font-bold text-slate-800">Add Fluid Balance Entry</h3><Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button></div>
        <div className="space-y-4 p-5">
          <div><Label className="text-xs text-slate-500">Direction *</Label>
            <div className="mt-1 grid grid-cols-2 gap-2">{(["Intake", "Output"] as const).map((d) => <button key={d} onClick={() => { setDirection(d); setRoute(d === "Intake" ? "IV" : "Urine"); }} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${direction === d ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"}`}>{d}</button>)}</div>
          </div>
          <div><Label className="text-xs text-slate-500">Route *</Label><Select value={route} onValueChange={setRoute}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent>{routes.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs text-slate-500">Description *</Label><Input className="mt-1" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div><Label className="text-xs text-slate-500">Volume (ml) *</Label><Input className="mt-1" type="number" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
        </div>
        <div className="flex gap-3 border-t border-slate-100 p-5"><Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button><Button disabled={!valid} className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>Save Entry</Button></div>
      </div>
    </div>
  );
}