// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/date-filter-bar.tsx
"use client";
import { CalendarDays, X } from "lucide-react";

export function DateFilterBar({ value, onChange, label = "Filter by date" }: { value: string; onChange: (value: string) => void; label?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <CalendarDays className="h-4 w-4 shrink-0 text-blue-600" />
      <span className="shrink-0 text-xs font-medium text-slate-500">{label}</span>
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} className="ml-auto rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" />
      {value && <button type="button" onClick={() => onChange("")} className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"><X className="h-3.5 w-3.5" /></button>}
    </div>
  );
}