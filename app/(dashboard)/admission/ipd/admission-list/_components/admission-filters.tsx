// app/ipd/admission-list/_components/admission-filters.tsx
"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS } from "@/lib/admission-list-data";

interface AdmissionFiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  admissionIdQuery: string;
  onAdmissionIdChange: (v: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  onMoreFilters?: () => void;
}

export function AdmissionFilters({
  searchQuery, onSearchChange,
  admissionIdQuery, onAdmissionIdChange,
  dateFrom, dateTo, onDateFromChange, onDateToChange,
  department, onDepartmentChange,
  status, onStatusChange,
  onMoreFilters,
}: AdmissionFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Search Patient</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by UHID, Name, Mobile, MR No."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Admission ID</label>
        <Input
          placeholder="Enter Admission ID"
          value={admissionIdQuery}
          onChange={(e) => onAdmissionIdChange(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Admission Date</label>
        <div className="flex items-center gap-1.5">
          <Input type="date" value={dateFrom} onChange={(e) => onDateFromChange(e.target.value)} className="text-xs" />
          <span className="text-slate-300">-</span>
          <Input type="date" value={dateTo} onChange={(e) => onDateToChange(e.target.value)} className="text-xs" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Department</label>
        <Select value={department} onValueChange={onDepartmentChange}>
          <SelectTrigger><SelectValue placeholder="All Departments" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Admission Status</label>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Discharged">Discharged</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="shrink-0" onClick={onMoreFilters} title="More Filters">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}