// app/(dashboard)/nurse-admin/ipd/beds/_components/beds-filters.tsx
"use client";
import { RefreshCcw, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BedStatus } from "@/types/nurse-admin/ipd/ward-detail-types";

export interface BedFiltersState {
  search: string;
  ward: "All" | string;
  room: "All" | string;
  status: "All" | BedStatus;
}

interface Props {
  filters: BedFiltersState;
  results: number;
  wards: string[];
  rooms: string[];
  onChange: <K extends keyof BedFiltersState>(key: K, value: BedFiltersState[K]) => void;
  onReset: () => void;
}

export function BedsFilters({ filters, results, wards, rooms, onChange, onReset }: Props) {
  const active = Boolean(filters.search || filters.ward !== "All" || filters.room !== "All" || filters.status !== "All");
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><SlidersHorizontal className="h-4 w-4" /></div>
          <div>
            <p className="text-sm font-bold text-slate-800">Search & Filter Beds</p>
            <p className="text-xs text-slate-500">Filter by bed/patient, ward, room, or occupancy status.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {active && <button type="button" onClick={onReset} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"><RefreshCcw className="h-3.5 w-3.5" />Reset</button>}
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{results} Beds</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="h-10 pl-9" value={filters.search} onChange={(event) => onChange("search", event.target.value)} placeholder="Bed ID or patient name..." />
          </div>
          <Select value={filters.ward} onValueChange={(value) => onChange("ward", value)}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Ward" /></SelectTrigger>
            <SelectContent>{["All", ...wards].map((item) => <SelectItem key={item} value={item}>{item === "All" ? "All Wards" : item}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.room} onValueChange={(value) => onChange("room", value)}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Room" /></SelectTrigger>
            <SelectContent>{["All", ...rooms].map((item) => <SelectItem key={item} value={item}>{item === "All" ? "All Rooms" : item}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(value) => onChange("status", value as BedFiltersState["status"])}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>{["All", "Available", "Occupied", "Reserved", "Maintenance"].map((item) => <SelectItem key={item} value={item}>{item === "All" ? "All Statuses" : item}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}