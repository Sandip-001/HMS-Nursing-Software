// app/(dashboard)/nurse/ipd/patients/_components/nurse-ipd-filters.tsx
"use client";
import { RefreshCcw, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { NurseIpdPatientFilters } from "@/types/nurse/ipd/nurse-ipd-types";

interface Props {
  filters: NurseIpdPatientFilters;
  results: number;
  wards: string[];
  shifts: string[];
  onChange: <K extends keyof NurseIpdPatientFilters>(key: K, value: NurseIpdPatientFilters[K]) => void;
  onReset: () => void;
}

export function NurseICUFilters({ filters, results, wards, shifts, onChange, onReset }: Props) {
  const active = Boolean(filters.search || filters.ward !== "All" || filters.acuity !== "All" || filters.shift !== "All");
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><SlidersHorizontal className="h-4 w-4" /></div>
          <div>
            <p className="text-sm font-bold text-slate-800">Search & Filter My Patients</p>
            <p className="text-xs text-slate-500">Filter by patient, ward, acuity, bed no</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active && <button type="button" onClick={onReset} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"><RefreshCcw className="h-3.5 w-3.5" />Reset</button>}
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{results} Results</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-10 pl-9" value={filters.search} onChange={(event) => onChange("search", event.target.value)} placeholder="Patient, UHID, ICU ID or bed no..." />
          </div>
          <Filter label="Ward" value={filters.ward} items={["All", ...wards]} onChange={(value) => onChange("ward", value)} />
          <Filter label="Acuity" value={filters.acuity} items={["All", "Stable", "Under Observation", "Critical"]} onChange={(value) => onChange("acuity", value as NurseIpdPatientFilters["acuity"])} />
        </div>
      </CardContent>
    </Card>
  );
}

function Filter({ label, value, items, onChange }: { label: string; value: string; items: string[]; onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 w-full"><SelectValue placeholder={label} /></SelectTrigger>
      <SelectContent>{items.map((item) => <SelectItem key={item} value={item}>{item === "All" ? `All ${label}s` : item}</SelectItem>)}</SelectContent>
    </Select>
  );
}