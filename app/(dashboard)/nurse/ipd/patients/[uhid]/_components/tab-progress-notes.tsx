// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/tab-progress-notes.tsx
"use client";
import { useMemo, useState } from "react";
import { ClipboardList, LockKeyhole, Plus, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { NoteRole, ProgressNote } from "@/types/nurse/ipd/nurse-ipd-types";
import { CURRENT_NURSE } from "@/lib/nurse/ipd/nurse-ipd-data";

type AuthorFilter = "All" | NoteRole;

export function TabProgressNotes({ notes, onAddNote }: { notes: ProgressNote[]; onAddNote: (note: ProgressNote) => void }) {
  const [authorFilter, setAuthorFilter] = useState<AuthorFilter>("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => notes.filter((note) => {
    const query = search.trim().toLowerCase();
    const matchesAuthor = authorFilter === "All" || note.role === authorFilter;
    const matchesSearch = !query || [note.title, note.author, note.noteText].join(" ").toLowerCase().includes(query);
    return matchesAuthor && matchesSearch;
  }), [notes, authorFilter, search]);

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardList className="h-4 w-4 text-blue-600" />Progress Notes</p>
              <p className="mt-1 text-xs text-slate-500">All signed entries remain immutable.</p>
            </div>
            <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />New Note</Button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." /></div>
            <Select value={authorFilter} onValueChange={(v) => setAuthorFilter(v as AuthorFilter)}>
              <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="All">All authors</SelectItem><SelectItem value="Doctor">Doctor</SelectItem><SelectItem value="Nurse">Nurse</SelectItem></SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map((note) => (
          <Card key={note.id} className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center gap-2"><Badge className={note.role === "Doctor" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}>{note.role.toUpperCase()}</Badge><Badge variant="outline">{note.category}</Badge><Badge variant="outline" className={note.priority === "Urgent" ? "border-red-200 text-red-600" : "border-slate-200 text-slate-500"}>{note.priority}</Badge></div>
              <h3 className="mt-2 text-base font-bold text-slate-800">{note.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{note.createdAt} · {note.author}</p>
              <p className="mt-3 text-sm text-slate-600">{note.noteText}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 border-t border-slate-100 pt-3"><LockKeyhole className="h-3.5 w-3.5" />{note.status}</p>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No progress notes found.</div>}
      </div>

      {open && <NewNoteDialog onCancel={() => setOpen(false)} onSave={(note) => { onAddNote(note); setOpen(false); }} />}
    </div>
  );
}

function NewNoteDialog({ onCancel, onSave }: { onCancel: () => void; onSave: (note: ProgressNote) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Nursing Update");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");
  const valid = title.trim() && subjective.trim() && assessment.trim() && plan.trim();

  function handleSave() {
    onSave({
      id: `PN-${Date.now()}`, uhid: "", title: title.trim(), author: CURRENT_NURSE.name, role: "Nurse",
      category, priority: "Routine", createdAt: `Just now · ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`,
      status: "Signed & Locked", subjective, objective, assessment, plan,
      noteText: `${subjective} ${objective} ${assessment} Plan: ${plan}`,
    });
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4"><h3 className="text-lg font-bold text-slate-800">New Nursing Progress Note</h3><Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button></div>
        <div className="space-y-4 p-5">
          <div><Label className="text-xs text-slate-500">Title *</Label><Input className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Afternoon Nursing Assessment" /></div>
          <div><Label className="text-xs text-slate-500">Category</Label>
            <Select value={category} onValueChange={setCategory}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent>{["Nursing Update", "Vitals", "Medication", "Handover", "General"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
          </div>
          <div><Label className="text-xs text-slate-500">Subjective *</Label><Textarea className="mt-1" rows={3} value={subjective} onChange={(e) => setSubjective(e.target.value)} /></div>
          <div><Label className="text-xs text-slate-500">Objective</Label><Textarea className="mt-1" rows={3} value={objective} onChange={(e) => setObjective(e.target.value)} /></div>
          <div><Label className="text-xs text-slate-500">Assessment *</Label><Textarea className="mt-1" rows={3} value={assessment} onChange={(e) => setAssessment(e.target.value)} /></div>
          <div><Label className="text-xs text-slate-500">Plan *</Label><Textarea className="mt-1" rows={3} value={plan} onChange={(e) => setPlan(e.target.value)} /></div>
        </div>
        <div className="flex gap-3 border-t border-slate-100 p-5"><Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button><Button disabled={!valid} className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>Save & Sign Note</Button></div>
      </div>
    </div>
  );
}