
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface BedFiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  wardType: string;
  onWardTypeChange: (v: string) => void;
  floor: string;
  onFloorChange: (v: string) => void;
  bedType: string;
  onBedTypeChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  departments: string[];
  wardTypes: string[];
  floors: string[];
  bedTypes: string[];
  onApply: () => void;
  onReset: () => void;
}

export function BedFilters({
  searchQuery, onSearchChange,
  department, onDepartmentChange,
  wardType, onWardTypeChange,
  floor, onFloorChange,
  bedType, onBedTypeChange,
  status, onStatusChange,
  departments, wardTypes, floors, bedTypes,
  onApply, onReset,
}: BedFiltersProps) {
  return (
    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search by Department or Ward" className="pl-9" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
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
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Ward Type</label>
        <Select value={wardType} onValueChange={onWardTypeChange}>
          <SelectTrigger><SelectValue placeholder="All Ward Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ward Types</SelectItem>
            {wardTypes.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Floor</label>
        <Select value={floor} onValueChange={onFloorChange}>
          <SelectTrigger><SelectValue placeholder="All Floors" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Floors</SelectItem>
            {floors.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Bed Type</label>
        <Select value={bedType} onValueChange={onBedTypeChange}>
          <SelectTrigger><SelectValue placeholder="All Bed Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bed Types</SelectItem>
            {bedTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">Status</label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
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