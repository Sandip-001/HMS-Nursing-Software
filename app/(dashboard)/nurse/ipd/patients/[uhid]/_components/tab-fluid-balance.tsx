// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/tab-fluid-balance.tsx
"use client";
import { useMemo, useState } from "react";
import { Droplets, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FluidBalanceEntry, FluidDirection, FluidRoute } from "@/types/nurse/ipd/nurse-ipd-types";
import { CURRENT_NURSE } from "@/lib/nurse/ipd/nurse-ipd-data";

const INTAKE_ROUTES: FluidRoute[] = ["IV", "Oral", "NG Tube"];
const OUTPUT_ROUTES: FluidRoute[] = ["Urine", "Drain", "Vomitus", "Stool"];

export function TabFluidBalance({ entries, onAddEntry }: { entries: FluidBalanceEntry[]; onAddEntry: (entry: FluidBalanceEntry) => void }) {
  const [open, setOpen] = useState(false);
  const { totalIntake, totalOutput } = useMemo(() => ({
    totalIntake: entries.filter((e) => e.direction === "Intake").reduce((sum, e) => sum + e.volumeMl, 0),
    totalOutput: entries.filter((e) => e.direction === "Output").reduce((sum, e) => sum + e.volumeMl, 0),
  }), [entries]);
  const netBalance = totalIntake - totalOutput;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Summary label="Total Intake" value={`${totalIntake} ml`} tone="blue" />
        <Summary label="Total Output" value={`${totalOutput} ml`} tone="amber" />
        <Summary label="Net Balance" value={`${netBalance >= 0 ? "+" : ""}${netBalance} ml`} tone={netBalance >= 0 ? "emerald" : "rose"} />
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Droplets className="h-4 w-4 text-blue-500" />Fluid Balance Chart</p>
            <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />Add Entry</Button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead><tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400"><th className="py-2 pr-4">Date / Time</th><th className="pr-4">Direction</th><th className="pr-4">Route</th><th className="pr-4">Description</th><th className="pr-4">Volume</th><th>Recorded By</th></tr></thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-slate-700">{entry.dateTime}</td>
                    <td className="pr-4"><Badge variant="outline" className={entry.direction === "Intake" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-amber-200 bg-amber-50 text-amber-700"}>{entry.direction}</Badge></td>
                    <td className="pr-4 text-slate-600">{entry.route}</td>
                    <td className="pr-4 text-slate-600">{entry.description}</td>
                    <td className="pr-4 font-semibold text-slate-800">{entry.volumeMl} ml</td>
                    <td className="text-slate-500">{entry.recordedBy}</td>
                  </tr>
                ))}
                {entries.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-slate-400">No fluid balance entries recorded yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {open && <AddFluidDialog onCancel={() => setOpen(false)} onSave={(entry) => { onAddEntry(entry); setOpen(false); }} />}
    </div>
  );
}

function Summary({ label, value, tone }: { label: string; value: string; tone: "blue" | "amber" | "emerald" | "rose" }) {
  const toneClass = { blue: "text-blue-700 bg-blue-50 border-blue-200", amber: "text-amber-700 bg-amber-50 border-amber-200", emerald: "text-emerald-700 bg-emerald-50 border-emerald-200", rose: "text-rose-700 bg-rose-50 border-rose-200" }[tone];
  return <div className={`rounded-xl border p-4 text-center ${toneClass}`}><p className="text-[10px] uppercase opacity-80">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function AddFluidDialog({ onCancel, onSave }: { onCancel: () => void; onSave: (entry: FluidBalanceEntry) => void }) {
  const [direction, setDirection] = useState<FluidDirection>("Intake");
  const [route, setRoute] = useState<FluidRoute>("IV");
  const [description, setDescription] = useState("");
  const [volume, setVolume] = useState("");
  const routes = direction === "Intake" ? INTAKE_ROUTES : OUTPUT_ROUTES;
  const valid = description.trim() && Number(volume) > 0;

  function handleSave() {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    onSave({ id: `F-${Date.now()}`, dateTime: stamp, direction, route, description: description.trim(), volumeMl: Number(volume), recordedBy: CURRENT_NURSE.name });
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h3 className="text-lg font-bold text-slate-800">Add Fluid Balance Entry</h3><Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button></div>
        <div className="space-y-4 p-5">
          <div><Label className="text-xs text-slate-500">Direction *</Label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {(["Intake", "Output"] as FluidDirection[]).map((d) => <button key={d} onClick={() => { setDirection(d); setRoute(d === "Intake" ? "IV" : "Urine"); }} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${direction === d ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"}`}>{d}</button>)}
            </div>
          </div>
          <div><Label className="text-xs text-slate-500">Route *</Label>
            <Select value={route} onValueChange={(v) => setRoute(v as FluidRoute)}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent>{routes.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
          </div>
          <div><Label className="text-xs text-slate-500">Description *</Label><Input className="mt-1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. NS 500ml infusion, morning void" /></div>
          <div><Label className="text-xs text-slate-500">Volume (ml) *</Label><Input className="mt-1" type="number" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
        </div>
        <div className="flex gap-3 border-t border-slate-100 p-5"><Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button><Button disabled={!valid} className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>Save Entry</Button></div>
      </div>
    </div>
  );
}