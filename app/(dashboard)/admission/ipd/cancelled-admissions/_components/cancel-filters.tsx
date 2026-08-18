
"use client";

import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface CancelFiltersProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  reason: string;
  onReasonChange: (v: string) => void;
  cancelledBy: string;
  onCancelledByChange: (v: string) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  departments: string[];
  reasons: string[];
  onExport: () => void;
}

export function CancelFilters({
  dateFrom, dateTo, onDateFromChange, onDateToChange,
  department, onDepartmentChange,
  reason, onReasonChange,
  cancelledBy, onCancelledByChange,
  searchQuery, onSearchChange,
  departments, reasons,
  onExport,
}: CancelFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="gap-2" onClick={onExport}>
          <Download className="h-4 w-4" /> Export
        </Button>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Date Range</label>
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
              {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Cancellation Reason</label>
          <Select value={reason} onValueChange={onReasonChange}>
            <SelectTrigger><SelectValue placeholder="All Reasons" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              {reasons.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Cancelled By</label>
          <Select value={cancelledBy} onValueChange={onCancelledByChange}>
            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Patient/Family">Patient/Family</SelectItem>
              <SelectItem value="Admission Desk">Admission Desk</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search patient name, UHID, Request ID..." className="pl-9" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}