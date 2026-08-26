// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-progress-notes.tsx
"use client";
import { useMemo, useState } from "react";
import { ClipboardList, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { NoteRole, ProgressNote } from "@/types/rmo/ipd/rmo-types";
import { CURRENT_RMO } from "@/lib/rmo/ipd/rmo-data";
import { DateFilterBar } from "./date-filter-bar";

type AuthorFilter = "All" | NoteRole;
const roleTone: Record<NoteRole, string> = { Doctor: "bg-blue-50 text-blue-700", RMO: "bg-violet-50 text-violet-700", Nurse: "bg-emerald-50 text-emerald-700" };

export function SectionProgressNotes({ notes, onAddNote }: { notes: ProgressNote[]; onAddNote: (note: ProgressNote) => void }) {
  const [authorFilter, setAuthorFilter] = useState<AuthorFilter>("All");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => notes.filter((n) => (authorFilter === "All" || n.role === authorFilter) && (!date || n.date === date)), [notes, authorFilter, date]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardList className="h-4 w-4 text-blue-600" />Progress Notes</p>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />New Note</Button>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <DateFilterBar value={date} onChange={setDate} />
          <Select value={authorFilter} onValueChange={(v) => setAuthorFilter(v as AuthorFilter)}>
            <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="All">All Authors</SelectItem><SelectItem value="Doctor">Doctor</SelectItem><SelectItem value="RMO">RMO</SelectItem><SelectItem value="Nurse">Nurse</SelectItem></SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((note) => (
          <div key={note.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-2"><Badge className={roleTone[note.role]}>{note.role.toUpperCase()}</Badge><Badge variant="outline">{note.category}</Badge></div>
            <h4 className="mt-2 text-base font-bold text-slate-800">{note.title}</h4>
            <p className="mt-1 text-xs text-slate-500">{note.createdAt} · {note.author}</p>
            <p className="mt-2 text-sm text-slate-600">{note.noteText}</p>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No progress notes found.</div>}
      </div>

      {open && <NewNoteModal onCancel={() => setOpen(false)} onSave={(note) => { onAddNote(note); setOpen(false); }} />}
    </div>
  );
}

function NewNoteModal({ onCancel, onSave }: { onCancel: () => void; onSave: (note: ProgressNote) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("RMO Review");
  const [noteText, setNoteText] = useState("");
  const valid = title.trim() && noteText.trim();

  function handleSave() {
    const now = new Date();
    onSave({
      id: `PN-${Date.now()}`, date: now.toISOString().slice(0, 10), title: title.trim(), author: CURRENT_RMO.name, role: "RMO",
      category, createdAt: `Today · ${now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`, noteText: noteText.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h3 className="text-lg font-bold text-slate-800">New Progress Note</h3><Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button></div>
        <div className="space-y-4 p-5">
          <div><Label className="text-xs text-slate-500">Title *</Label><Input className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. RMO Evening Review" /></div>
          <div><Label className="text-xs text-slate-500">Category</Label>
            <Select value={category} onValueChange={setCategory}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent>{["RMO Review", "Doctor Round", "Nursing Update", "General"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
          </div>
          <div><Label className="text-xs text-slate-500">Note *</Label><Textarea className="mt-1" rows={4} value={noteText} onChange={(e) => setNoteText(e.target.value)} /></div>
        </div>
        <div className="flex gap-3 border-t border-slate-100 p-5"><Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button><Button disabled={!valid} className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>Save & Sign Note</Button></div>
      </div>
    </div>
  );
}