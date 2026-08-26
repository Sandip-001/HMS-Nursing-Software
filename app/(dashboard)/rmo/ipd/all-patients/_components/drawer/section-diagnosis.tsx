// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-diagnosis.tsx
"use client";
import { useMemo, useState } from "react";
import { ClipboardPlus, Plus, Search, Stethoscope, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DiagnosisEntry } from "@/types/rmo/ipd/rmo-types";
import { CURRENT_RMO, DIAGNOSIS_CATALOG } from "@/lib/rmo/ipd/rmo-data";

export function SectionDiagnosis({ diagnoses, onAddDiagnosis }: { diagnoses: DiagnosisEntry[]; onAddDiagnosis: (entry: DiagnosisEntry) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Stethoscope className="h-4 w-4 text-violet-600" />Diagnosis Details</p>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />Add Diagnosis</Button>
        </div>
        <p className="mt-1 text-xs text-slate-500">Most recent diagnosis is shown first. All entries remain in the patient's history.</p>
      </div>

      <div className="space-y-3">
        {diagnoses.map((diagnosis, index) => (
          <div key={diagnosis.id} className={`rounded-2xl border p-5 ${index === 0 ? "border-violet-200 bg-violet-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              {index === 0 && <Badge className="bg-violet-600 text-white">Current</Badge>}
              <Badge variant="outline" className={diagnosis.type === "Confirmed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : diagnosis.type === "Provisional" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 bg-slate-50 text-slate-600"}>{diagnosis.type}</Badge>
            </div>
            <h4 className="mt-2 text-base font-bold text-slate-800">{diagnosis.name} <span className="text-sm font-normal text-slate-400">({diagnosis.code})</span></h4>
            {diagnosis.notes && <p className="mt-1 text-sm text-slate-600">{diagnosis.notes}</p>}
            <p className="mt-2 text-xs text-slate-400">Added by {diagnosis.addedBy} on {diagnosis.addedAt}</p>
          </div>
        ))}
        {diagnoses.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No diagnosis recorded yet.</div>}
      </div>

      {open && <AddDiagnosisModal onCancel={() => setOpen(false)} onSave={(entry) => { onAddDiagnosis(entry); setOpen(false); }} />}
    </div>
  );
}

function AddDiagnosisModal({ onCancel, onSave }: { onCancel: () => void; onSave: (entry: DiagnosisEntry) => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ code: string; name: string } | null>(null);
  const [type, setType] = useState<DiagnosisEntry["type"]>("Provisional");
  const [notes, setNotes] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return DIAGNOSIS_CATALOG.slice(0, 6);
    const q = query.toLowerCase();
    return DIAGNOSIS_CATALOG.filter((d) => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q));
  }, [query]);

  function handleSave() {
    if (!selected) return;
    onSave({
      id: `DG-${Date.now()}`, name: selected.name, code: selected.code, type,
      addedBy: CURRENT_RMO.name, addedAt: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      notes: notes.trim() || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4"><h3 className="flex items-center gap-2 text-lg font-bold text-slate-800"><ClipboardPlus className="h-5 w-5 text-violet-600" />Add Diagnosis</h3><Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button></div>
        <div className="space-y-4 p-5">
          <div>
            <Label className="text-xs text-slate-500">Search Diagnosis (name or ICD code) *</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="pl-9" value={query} onChange={(e) => { setQuery(e.target.value); setSelected(null); }} placeholder="e.g. Sepsis, I20.8..." />
            </div>
            <div className="mt-2 max-h-48 space-y-1 overflow-y-auto rounded-lg border border-slate-100 p-1.5">
              {results.map((item) => (
                <button key={item.code} onClick={() => { setSelected(item); setQuery(item.name); }} className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm ${selected?.code === item.code ? "bg-violet-50 text-violet-700" : "hover:bg-slate-50 text-slate-700"}`}>
                  <span>{item.name}</span><span className="text-xs text-slate-400">{item.code}</span>
                </button>
              ))}
              {results.length === 0 && <p className="p-3 text-center text-xs text-slate-400">No matching diagnosis found.</p>}
            </div>
          </div>

          <div>
            <Label className="text-xs text-slate-500">Diagnosis Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as DiagnosisEntry["type"])}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{["Provisional", "Confirmed", "Differential"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div><Label className="text-xs text-slate-500">Clinical Notes (Optional)</Label><Textarea className="mt-1" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Supporting findings, rationale..." /></div>
        </div>
        <div className="flex gap-3 border-t border-slate-100 p-5"><Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button><Button disabled={!selected} className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>Save Diagnosis</Button></div>
      </div>
    </div>
  );
}