// app/(dashboard)/rmo/emergency/all-patients/_components/assignment-drawer.tsx
"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Search, UserRound, UserRoundCog, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EmergencyPatient } from "@/types/emergency/emergency-types";
import type { AssignmentRole, AvailableDoctor, AvailableNurse, EmergencyDepartment } from "@/types/emergency/rmo-emergency-types";
import { RMO_DEPARTMENTS } from "@/lib/emergency/rmo-emergency-data";

export function AssignmentDrawer({
  patient,
  role,
  doctors,
  nurses,
  onClose,
  onAssign,
}: {
  patient: EmergencyPatient | null;
  role: AssignmentRole | null;
  doctors: AvailableDoctor[];
  nurses: AvailableNurse[];
  onClose: () => void;
  onAssign: (selection: AvailableDoctor | AvailableNurse, showToast: boolean) => void;
}) {
  const [department, setDepartment] = useState<string>("All");
  const [shift, setShift] = useState<string>("All");
  const [query, setQuery] = useState("");

  const existing = role === "Doctor" ? (patient?.attendingDoctor ?? "Unassigned") : (patient?.assignedNurse ?? "Unassigned");

  const doctorRows = useMemo(
    () =>
      doctors.filter(
        (d) =>
          (department === "All" || d.department === (department as EmergencyDepartment)) &&
          d.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [doctors, department, query],
  );

  const nurseRows = useMemo(
    () =>
      nurses.filter(
        (n) =>
          (shift === "All" || n.shift === shift) &&
          n.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [nurses, shift, query],
  );

  if (!patient || !role) return null;

  function handleAssign(selection: AvailableDoctor | AvailableNurse) {
    onAssign(selection, true);
    const personName = selection.name;
    const assignedRole = role === "Doctor" ? "doctor" : "nurse";
    // Use optional chaining to fix the null error
    toast.success(`${personName} has been assigned as ${assignedRole} to ${patient?.patientName || "the patient"}.`);
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-visible bg-[#f7f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-xs uppercase text-slate-400">Emergency Assignment</p>
            <h2 className="text-lg font-bold text-slate-800">Assign {role}</h2>
            <p className="text-xs text-slate-500">{patient.patientName || "Unidentified"} · {patient.emergencyNumber}</p>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs uppercase text-blue-600">Current Assignment</p>
            <p className="mt-1 flex items-center gap-2 font-bold text-blue-900">
              {role === "Doctor" ? <UserRoundCog className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}{existing}
            </p>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
              placeholder={`Search ${role.toLowerCase()}...`}
            />
          </div>

          {role === "Doctor" ? (
            <>
              <div className="mt-3">
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="All">All Departments</SelectItem>
                    {RMO_DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 space-y-3">
                {doctorRows.map((doctor) => (
                  <PersonCard
                    key={doctor.id}
                    name={doctor.name}
                    detail={`${doctor.department} · ${doctor.specialization}`}
                    load={`${doctor.currentLoad}/${doctor.maxLoad} patients`}
                    available={doctor.available && doctor.currentLoad < doctor.maxLoad}
                    onAssign={() => handleAssign(doctor)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mt-3">
                <Select value={shift} onValueChange={setShift}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="All">All Shifts</SelectItem>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                    <SelectItem value="Night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 space-y-3">
                {nurseRows.map((nurse) => (
                  <PersonCard
                    key={nurse.id}
                    name={nurse.name}
                    detail={`${nurse.shift} Shift · ${nurse.ward}`}
                    load={`${nurse.currentPatients}/${nurse.maxPatients} patients`}
                    available={nurse.available && nurse.currentPatients < nurse.maxPatients}
                    onAssign={() => handleAssign(nurse)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function PersonCard({
  name,
  detail,
  load,
  available,
  onAssign,
}: {
  name: string;
  detail: string;
  load: string;
  available: boolean;
  onAssign: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-slate-800">{name}</p>
          <p className="mt-1 text-xs text-slate-500">{detail}</p>
          <p className="mt-1 text-xs text-slate-400">Current load: {load}</p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${
            available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"
          }`}
        >
          {available ? "Available" : "Unavailable"}
        </span>
      </div>
      <Button
        disabled={!available}
        className="mt-3 w-full gap-2"
        variant="outline"
        onClick={onAssign}
      >
        {available && <CheckCircle2 className="h-4 w-4" />}Assign to Patient
      </Button>
    </div>
  );
}