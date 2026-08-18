// app/doctor/ipd/nurse/bed-occupied/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BedDouble,
  ClipboardList,
  Eye,
  LucideIcon,
  Printer,
  RefreshCcw,
  ShieldAlert,
  Stethoscope,
  TimerReset,
  UserRound,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BED_OCCUPIED_PATIENTS } from "@/lib/nurse/ipd/bed-occupied-data";
import type { AssessmentStatus, BedOccupiedPatient, BedOccupiedStatus } from "@/types/nurse/ipd/bed-occupied-types";

export default function BedOccupiedPage() {
  const router = useRouter();
  const [patients] = useState<BedOccupiedPatient[]>(BED_OCCUPIED_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState(BED_OCCUPIED_PATIENTS[0]?.id ?? "");
  const [selectedWard, setSelectedWard] = useState("All Wards");
  const [selectedRoom, setSelectedRoom] = useState("All Rooms");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.patientName.toLowerCase().includes(search.toLowerCase()) ||
        patient.uhid.toLowerCase().includes(search.toLowerCase()) ||
        patient.bed.toLowerCase().includes(search.toLowerCase());

      const matchesWard = selectedWard === "All Wards" || patient.ward === selectedWard;
      const matchesRoom = selectedRoom === "All Rooms" || patient.room === selectedRoom;
      const matchesStatus = selectedStatus === "All Status" || patient.status === selectedStatus;

      return matchesSearch && matchesWard && matchesRoom && matchesStatus;
    });
  }, [patients, selectedWard, selectedRoom, selectedStatus, search]);

  const selectedPatient =
    filteredPatients.find((patient) => patient.id === selectedPatientId) ||
    filteredPatients[0] ||
    patients[0];

  const stats = {
    bedsOccupied: patients.length,
    newOccupiedToday: 4,
    pendingAssessments: patients.filter(
      (p) =>
        p.initialAssessment === "Pending" ||
        p.vitalsRecording === "Pending" ||
        p.nursingAssessment === "Pending"
    ).length,
    highRiskPatients: patients.filter((p) => p.status === "Critical").length,
  };

  function handleRefresh() {
    toast.success("Bed occupied list refreshed");
  }

  function handleSelectPatient(patientId: string) {
    setSelectedPatientId(patientId);
  }

  function navigateWithUhid(path: string) {
    if (!selectedPatient) return;
    router.push(`${path}?uhid=${selectedPatient.uhid}`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={BedDouble} label="Beds Occupied" value="16" subValue="80% of 20 Beds" tint="emerald" />
          <MetricCard icon={UserRound} label="New Occupied Today" value="4" subValue="View Details" tint="amber" />
          <MetricCard icon={TimerReset} label="Pending Assessments" value={String(stats.pendingAssessments)} subValue="View Details" tint="violet" />
          <MetricCard icon={ShieldAlert} label="High Risk Patients" value={String(stats.highRiskPatients)} subValue="View Details" tint="rose" />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.22fr_0.88fr]">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-slate-800">Patients with Bed Occupied</h1>
                  <p className="text-xs text-slate-400">Track admitted patients and continue nursing workflow.</p>
                </div>

                <Button variant="ghost" className="gap-2 text-blue-600" onClick={handleRefresh}>
                  <RefreshCcw className="h-4 w-4" /> Refresh
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Select value={selectedWard} onValueChange={setSelectedWard}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Wards">All Wards</SelectItem>
                    <SelectItem value="Semi Private">Semi Private</SelectItem>
                    <SelectItem value="General Ward">General Ward</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Rooms">All Rooms</SelectItem>
                    <SelectItem value="Room-1">Room-1</SelectItem>
                    <SelectItem value="Room-2">Room-2</SelectItem>
                    <SelectItem value="Room-3">Room-3</SelectItem>
                    <SelectItem value="Room-4">Room-4</SelectItem>
                    <SelectItem value="Room-5">Room-5</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Status">All Status</SelectItem>
                    <SelectItem value="Stable">Stable</SelectItem>
                    <SelectItem value="Observation">Observation</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Search by patient name, UHID, Bed No."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full min-w-[980px] text-sm">
                  <thead className="bg-slate-50 text-left text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Admission ID</th>
                      <th className="px-4 py-3 font-medium">Patient Name</th>
                      <th className="px-4 py-3 font-medium">Ward / Room / Bed</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Admitting Doctor</th>
                      <th className="px-4 py-3 font-medium">Occupied On</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => {
                      const active = selectedPatient?.id === patient.id;
                      return (
                        <tr
                          key={patient.id}
                          onClick={() => handleSelectPatient(patient.id)}
                          className={`cursor-pointer border-t border-slate-100 transition ${
                            active ? "bg-blue-50/70" : "hover:bg-slate-50"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-slate-700">{patient.admissionId}</td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-800">{patient.patientName}</div>
                            <div className="text-xs text-slate-400">{patient.age} Y / {patient.gender}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {patient.ward}
                            <div className="text-xs text-slate-400">{patient.room} / {patient.bed}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{patient.department}</td>
                          <td className="px-4 py-3 text-slate-600">{patient.admittingDoctor}</td>
                          <td className="px-4 py-3 text-slate-600">{patient.occupiedOn}</td>
                          <td className="px-4 py-3">
                            <PatientStatus status={patient.status} />
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm" className="gap-1.5">
                              <Eye className="h-3.5 w-3.5" /> View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                Bed is marked as occupied. Proceed with initial assessment and continue patient care.
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <Button variant="outline" className="gap-2" onClick={() => toast.success("Bed card sent to printer")}>
                  <Printer className="h-4 w-4" /> Print Bed Card
                </Button>

                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigateWithUhid("/nurse/ipd/initial-assessment")}
                >
                  Proceed to Initial Assessment
                </Button>
              </div>
            </CardContent>
          </Card>

          {selectedPatient && (
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="space-y-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
                    {selectedPatient.patientName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                  </span>

                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-base font-semibold text-slate-800">
                      {selectedPatient.patientName}
                      <Badge className={selectedPatient.status === "Stable" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" : "bg-amber-50 text-amber-700 hover:bg-amber-50"}>
                        {selectedPatient.status}
                      </Badge>
                    </p>
                    <p className="text-sm text-slate-500">
                      {selectedPatient.age} Y / {selectedPatient.gender} · Blood Group: {selectedPatient.bloodGroup}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      UHID: {selectedPatient.uhid} · Admission ID: {selectedPatient.admissionId}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
                  <InfoBlock label="Ward / Room / Bed" value={`${selectedPatient.ward} / ${selectedPatient.room} / ${selectedPatient.bed}`} />
                  <InfoBlock label="Mobile" value={selectedPatient.emergencyContactPhone} />
                  <InfoBlock label="Department" value={selectedPatient.department} />
                  <InfoBlock label="Emergency Contact" value={selectedPatient.emergencyContactName} />
                  <InfoBlock label="Admitting Doctor" value={selectedPatient.admittingDoctor} />
                  <InfoBlock label="Package" value={selectedPatient.packageName} />
                  <InfoBlock label="Admission Date" value={selectedPatient.occupiedOn} />
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-slate-800">Current Status</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatusMiniCard label="Bed Status" value="Occupied" icon={BedDouble} />
                    <StatusMiniCard label="Patient Status" value={selectedPatient.status} icon={UserRound} />
                    <StatusMiniCard label="Occupied On" value={selectedPatient.occupiedOn} icon={ClipboardList} />
                    <StatusMiniCard label="Occupied By" value={selectedPatient.occupiedBy} icon={Stethoscope} />
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-slate-800">Next Required Actions</p>
                  <div className="space-y-2">
                    <ActionRow
                      label="Initial Assessment"
                      status={selectedPatient.initialAssessment}
                      onClick={() => navigateWithUhid("/nurse/ipd/initial-assessment")}
                    />
                    <ActionRow
                      label="Vitals Recording"
                      status={selectedPatient.vitalsRecording}
                      onClick={() => navigateWithUhid("/nurse/ipd/vital-recording")}
                    />
                    <ActionRow
                      label="Nursing Assessment"
                      status={selectedPatient.nursingAssessment}
                      onClick={() => navigateWithUhid("/nurse/ipd/nursing-assessment")}
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-slate-800">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    <QuickActionButton label="View Patient Timeline" />
                    <QuickActionButton label="Change Bed" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  subValue,
  tint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue: string;
  tint: "emerald" | "amber" | "violet" | "rose";
}) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles[tint]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-xs text-slate-400">{subValue}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PatientStatus({ status }: { status: BedOccupiedStatus }) {
  const classes =
    status === "Stable"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
      : status === "Observation"
      ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
      : "bg-rose-50 text-rose-700 hover:bg-rose-50";

  return <Badge className={classes}>{status}</Badge>;
}

function StatusMiniCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <div className="mb-2 flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function ActionRow({
  label,
  status,
  onClick,
}: {
  label: string;
  status: AssessmentStatus;
  onClick: () => void;
}) {
  const badgeClass =
    status === "Completed"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-2">
        <Badge className={badgeClass}>{status}</Badge>
        <Button size="sm" variant="outline" onClick={onClick}>
          {status === "Completed" ? "Open" : "Start"}
        </Button>
      </div>
    </div>
  );
}

function QuickActionButton({ label }: { label: string }) {
  return (
    <Button variant="outline" className="text-xs text-slate-600">
      {label}
    </Button>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}