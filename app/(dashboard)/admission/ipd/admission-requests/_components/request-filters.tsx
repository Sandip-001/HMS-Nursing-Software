
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface RequestFiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  requestStatus: string;
  onRequestStatusChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  doctor: string;
  onDoctorChange: (v: string) => void;
  departments: string[];
  doctors: string[];
  onApply: () => void;
  onReset: () => void;
}

export function RequestFilters({
  searchQuery, onSearchChange,
  dateFrom, dateTo, onDateFromChange, onDateToChange,
  requestStatus, onRequestStatusChange,
  department, onDepartmentChange,
  doctor, onDoctorChange,
  departments, doctors,
  onApply, onReset,
}: RequestFiltersProps) {
  return (
    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Search Patient</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search by Name, UHID, MR No." className="pl-9" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Request Date</label>
        <div className="flex items-center gap-1.5">
          <Input type="date" value={dateFrom} onChange={(e) => onDateFromChange(e.target.value)} className="text-xs" />
          <span className="text-slate-300">-</span>
          <Input type="date" value={dateTo} onChange={(e) => onDateToChange(e.target.value)} className="text-xs" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Request Status</label>
        <Select value={requestStatus} onValueChange={onRequestStatusChange}>
          <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending Review">Pending Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
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
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Attending Doctor</label>
        <Select value={doctor} onValueChange={onDoctorChange}>
          <SelectTrigger><SelectValue placeholder="All Doctors" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            {doctors.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={onApply}>Apply Filters</Button>
        <Button variant="outline" className="flex-1" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}