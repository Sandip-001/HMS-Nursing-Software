// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/section-progress-notes.tsx
"use client";
import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { NoteRole, ProgressNote } from "@/types/emergency/emergency-types";
import { DateFilterBar } from "./date-filter-bar";

type AuthorFilter = "All" | NoteRole;
const roleTone: Record<NoteRole, string> = { Doctor: "bg-blue-50 text-blue-700", RMO: "bg-violet-50 text-violet-700", Nurse: "bg-emerald-50 text-emerald-700" };

export function SectionProgressNotes({ notes }: { notes: ProgressNote[] }) {
  const [authorFilter, setAuthorFilter] = useState<AuthorFilter>("All");
  const [date, setDate] = useState("");
  const filtered = useMemo(() => notes.filter((n) => (authorFilter === "All" || n.role === authorFilter) && (!date || n.date === date)), [notes, authorFilter, date]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardList className="h-4 w-4 text-blue-600" />Progress Notes</p>
        <p className="mt-1 text-xs text-slate-500">Doctor, RMO, and Nurse notes, listed date and time wise.</p>
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
    </div>
  );
}