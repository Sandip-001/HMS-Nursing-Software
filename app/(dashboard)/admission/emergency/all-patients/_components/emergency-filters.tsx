// app/(dashboard)/admission-desk/emergency/all-patients/_components/emergency-filters.tsx
"use client";
import { RefreshCcw, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EmergencyFilters as EmergencyFiltersState } from "@/types/emergency/emergency-types";
import { EMERGENCY_STATUS_OPTIONS, INCIDENT_TYPE_OPTIONS } from "@/lib/emergency/emergency-data";

interface Props {
  filters: EmergencyFiltersState;
  results: number;
  onChange: <K extends keyof EmergencyFiltersState>(key: K, value: EmergencyFiltersState[K]) => void;
  onReset: () => void;
}

export function AllEmergencyFilters({ filters, results, onChange, onReset }: Props) {
  const active = Boolean(filters.search || filters.status !== "All" || filters.incidentType !== "All");
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-red-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600"><SlidersHorizontal className="h-4 w-4" /></div>
          <div>
            <p className="text-sm font-bold text-slate-800">Search & Filter Emergency Patients</p>
            <p className="text-xs text-slate-500">Filter by patient, UHID, status, or incident type.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active && <button type="button" onClick={onReset} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"><RefreshCcw className="h-3.5 w-3.5" />Reset</button>}
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">{results} Results</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-10 pl-9" value={filters.search} onChange={(event) => onChange("search", event.target.value)} placeholder="Patient, UHID, or Emergency No..." />
          </div>
          <Select value={filters.status} onValueChange={(value) => onChange("status", value as EmergencyFiltersState["status"])}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>{["All", ...EMERGENCY_STATUS_OPTIONS].map((item) => <SelectItem key={item} value={item}>{item === "All" ? "All Statuses" : item}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.incidentType} onValueChange={(value) => onChange("incidentType", value as EmergencyFiltersState["incidentType"])}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Incident" /></SelectTrigger>
            <SelectContent>{["All", ...INCIDENT_TYPE_OPTIONS].map((item) => <SelectItem key={item} value={item}>{item === "All" ? "All Incidents" : item}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}