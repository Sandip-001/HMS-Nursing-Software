// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/drawer/section-progress-notes.tsx
"use client";
import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProgressNoteFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { DateFilterBar } from "./date-filter-bar";

export function SectionProgressNotes({ notes }: { notes: ProgressNoteFull[] }) {
  const [date, setDate] = useState("");
  const filtered = useMemo(() => date ? notes.filter((n) => n.date === date) : notes, [notes, date]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardList className="h-4 w-4 text-violet-600" />Progress Notes</p>
        <div className="mt-3"><DateFilterBar value={date} onChange={setDate} label="Filter notes by date" /></div>
      </div>

      <div className="space-y-3">
        {filtered.map((note) => (
          <div key={note.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={note.role === "Doctor" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}>{note.role.toUpperCase()}</Badge>
              <Badge variant="outline">{note.category}</Badge>
            </div>
            <h4 className="mt-2 text-base font-bold text-slate-800">{note.title}</h4>
            <p className="mt-1 text-xs text-slate-500">{note.createdAt} · {note.author}</p>
            <p className="mt-2 text-sm text-slate-600">{note.noteText}</p>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No progress notes found for this date.</div>}
      </div>
    </div>
  );
}