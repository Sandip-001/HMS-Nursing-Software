// app/(dashboard)/admission/icu/all-patients/_components/icu-filters.tsx
"use client";
import { RefreshCcw, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { IcuFilters } from "@/types/admission-desk/icu/icu-types";
import { ICU_FLOORS, ADMISSION_TYPE_OPTIONS, ICU_STATUS_OPTIONS } from "@/lib/admission-desk/icu/icu-data";

const STATUS_OPTIONS = ["All", ...ICU_STATUS_OPTIONS] as const;
const ADMISSION_OPTIONS = ["All", ...ADMISSION_TYPE_OPTIONS] as const;
const FLOOR_OPTIONS = ["All", ...ICU_FLOORS] as const;

export function IcuFilters({ filters, results, onChange, onReset }: {
  filters: IcuFilters;
  results: number;
  onChange: <K extends keyof IcuFilters>(key: K, value: IcuFilters[K]) => void;
  onReset: () => void;
}) {
  const active = Boolean(filters.search || filters.status !== "All" || filters.admissionType !== "All" || filters.floor !== "All" || filters.dateFrom || filters.dateTo);
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><SlidersHorizontal className="h-4 w-4" /></div>
          <div>
            <p className="text-sm font-bold text-slate-800">Search & Filter ICU Patients</p>
            <p className="text-xs text-slate-500">Filter by patient, status, admission type, floor, or date range.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active && <button type="button" onClick={onReset} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"><RefreshCcw className="h-3.5 w-3.5" />Reset</button>}
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{results} Results</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-10 pl-9" value={filters.search} onChange={(e) => onChange("search", e.target.value)} placeholder="Patient name, UHID, or ICU ID..." />
          </div>
          <Select value={filters.status} onValueChange={(v) => onChange("status", v as IcuFilters["status"])}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>{STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s === "All" ? "All Statuses" : s}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.admissionType} onValueChange={(v) => onChange("admissionType", v as IcuFilters["admissionType"])}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Admission" /></SelectTrigger>
            <SelectContent>{ADMISSION_OPTIONS.map((a) => <SelectItem key={a} value={a}>{a === "All" ? "All Types" : a}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.floor} onValueChange={(v) => onChange("floor", v as IcuFilters["floor"])}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Floor" /></SelectTrigger>
            <SelectContent>{FLOOR_OPTIONS.map((f) => <SelectItem key={f} value={f}>{f === "All" ? "All Floors" : f}</SelectItem>)}</SelectContent>
          </Select>
          <Input type="date" className="h-10" value={filters.dateFrom} onChange={(e) => onChange("dateFrom", e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}