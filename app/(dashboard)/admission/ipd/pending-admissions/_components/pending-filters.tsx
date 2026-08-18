
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PENDING_DEPARTMENTS, ATTENDING_DOCTORS } from "@/lib/pending-admission-data";

interface PendingFiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  currentStep: string;
  onCurrentStepChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  priority: string;
  onPriorityChange: (v: string) => void;
  doctor: string;
  onDoctorChange: (v: string) => void;
}

export function PendingFilters({
  searchQuery, onSearchChange,
  dateFrom, dateTo, onDateFromChange, onDateToChange,
  currentStep, onCurrentStepChange,
  department, onDepartmentChange,
  priority, onPriorityChange,
  doctor, onDoctorChange,
}: PendingFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Admission Date</label>
        <div className="flex items-center gap-1.5">
          <Input type="date" value={dateFrom} onChange={(e) => onDateFromChange(e.target.value)} className="text-xs" />
          <span className="text-slate-300">-</span>
          <Input type="date" value={dateTo} onChange={(e) => onDateToChange(e.target.value)} className="text-xs" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Current Step</label>
        <Select value={currentStep} onValueChange={onCurrentStepChange}>
          <SelectTrigger><SelectValue placeholder="All Steps" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Steps</SelectItem>
            <SelectItem value="Awaiting Package & Payment">Awaiting Package & Payment</SelectItem>
            <SelectItem value="Awaiting Bed Allocation">Awaiting Bed Allocation</SelectItem>
            <SelectItem value="Awaiting Review & Confirm">Awaiting Review & Confirm</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Department</label>
        <Select value={department} onValueChange={onDepartmentChange}>
          <SelectTrigger><SelectValue placeholder="All Departments" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {PENDING_DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Priority</label>
        <Select value={priority} onValueChange={onPriorityChange}>
          <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Attending Doctor</label>
        <Select value={doctor} onValueChange={onDoctorChange}>
          <SelectTrigger><SelectValue placeholder="All Doctors" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            {ATTENDING_DOCTORS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}