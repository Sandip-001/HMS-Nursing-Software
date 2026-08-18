
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function PharmacyFilters({
  search,
  onSearchChange,
  doctorFilter,
  onDoctorFilterChange,
  statusFilter,
  onStatusFilterChange,
  doctors,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  doctorFilter: string;
  onDoctorFilterChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  doctors: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="relative md:col-span-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search by patient name or UHID"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={doctorFilter} onValueChange={onDoctorFilterChange}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="All Doctors">All Doctors</SelectItem>
          {doctors.map((doctor) => (
            <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="All Status">All Status</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Partially Available">Partially Available</SelectItem>
          <SelectItem value="Ready to Deliver">Ready to Deliver</SelectItem>
          <SelectItem value="Medicine Delivered & Payment Received">Delivered (Paid)</SelectItem>
          <SelectItem value="Medicine Delivered & Billing Updated">Delivered (Billed)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}