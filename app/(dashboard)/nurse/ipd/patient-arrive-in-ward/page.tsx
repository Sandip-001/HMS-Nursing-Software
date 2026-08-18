// app/doctor/ipd/nurse/patient-arrives-in-ward/page.tsx
"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  BedDouble,
  ClipboardCheck,
  LogOut,
  LucideIcon,
  Printer,
  QrCode,
  RefreshCcw,
  ShieldAlert,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { NURSE_WARD_PATIENTS, RECEIVING_NURSES } from "@/lib/nurse/ipd/patient-arrives-data";
import type { WardArrivalPatient } from "@/types/nurse/ipd/patient-arrives-types";

export default function PatientArrivesInWardPage() {
  const [patients, setPatients] = useState<WardArrivalPatient[]>(NURSE_WARD_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState(NURSE_WARD_PATIENTS[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [selectedWard, setSelectedWard] = useState("All Wards");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctors");
  const [acceptanceDateTime, setAcceptanceDateTime] = useState("2024-05-20T13:15");
  const [receivingNurse, setReceivingNurse] = useState("Neha Singh");
  const [specialNotes, setSpecialNotes] = useState("");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.patientName.toLowerCase().includes(search.toLowerCase()) ||
        patient.uhid.toLowerCase().includes(search.toLowerCase()) ||
        patient.admissionId.toLowerCase().includes(search.toLowerCase());

      const matchesWard = selectedWard === "All Wards" || patient.ward === selectedWard;
      const matchesDepartment = selectedDepartment === "All Departments" || patient.department === selectedDepartment;
      const matchesDoctor = selectedDoctor === "All Doctors" || patient.admittingDoctor === selectedDoctor;

      return matchesSearch && matchesWard && matchesDepartment && matchesDoctor;
    });
  }, [patients, search, selectedWard, selectedDepartment, selectedDoctor]);

  const selectedPatient =
    filteredPatients.find((patient) => patient.id === selectedPatientId) ||
    filteredPatients[0] ||
    patients[0];

  function handleSelectPatient(patientId: string) {
    setSelectedPatientId(patientId);
  }

  function handleRefresh() {
    toast.success("Patient arrival list refreshed");
  }

  function handleAcceptPatient() {
    if (!selectedPatient) return;

    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === selectedPatient.id
          ? { ...patient, arrivalStatus: "Accepted" }
          : patient
      )
    );

    toast.success(`Patient accepted by ${receivingNurse}`);
  }

  function handleGenerateWristBand() {
    toast.success(`Wrist band generated for ${selectedPatient?.patientName}`);
  }

  function handlePrintBedCard() {
    toast.success(`Bed card sent to print for ${selectedPatient?.bed}`);
  }

  const stats = {
    newAdmissions: patients.length,
    awaitingAcceptance: patients.filter((p) => p.arrivalStatus === "Awaiting Acceptance").length,
    admittedToWard: patients.filter((p) => p.arrivalStatus === "Accepted").length,
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Users} label="New Admissions Today" value={String(stats.newAdmissions)} tint="violet" />
          <StatCard icon={ClipboardCheck} label="Awaiting Ward Acceptance" value={String(stats.awaitingAcceptance)} tint="amber" />
          <StatCard icon={BedDouble} label="Admitted To Ward" value={String(stats.admittedToWard)} tint="emerald" />
          <StatCard icon={LogOut} label="Today's Release Patients" value="3" tint="cyan" />
          <div className="hidden xl:block" />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.88fr]">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-slate-800">Newly Arrived Patients</h1>
                  <p className="text-xs text-slate-400">Patients admitted from front desk and waiting for nurse acceptance.</p>
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

                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Departments">All Departments</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Doctors">All Doctors</SelectItem>
                    <SelectItem value="Dr. Amit Verma">Dr. Amit Verma</SelectItem>
                    <SelectItem value="Dr. Priya Nair">Dr. Priya Nair</SelectItem>
                    <SelectItem value="Dr. Rajesh Iyer">Dr. Rajesh Iyer</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Search by patient name, UHID, Admission ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full min-w-[980px] text-sm">
                  <thead className="bg-slate-50 text-left text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Admission ID</th>
                      <th className="px-4 py-3 font-medium">UHID</th>
                      <th className="px-4 py-3 font-medium">Patient Name</th>
                      <th className="px-4 py-3 font-medium">Ward / Room / Bed</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Admitting Doctor</th>
                      <th className="px-4 py-3 font-medium">Arrival Status</th>
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
                          <td className="px-4 py-3 text-slate-600">{patient.uhid}</td>
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
                          <td className="px-4 py-3">
                            <StatusBadge status={patient.arrivalStatus} />
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              size="sm"
                              variant={patient.arrivalStatus === "Accepted" ? "outline" : "default"}
                              className={patient.arrivalStatus === "Accepted" ? "" : "bg-blue-600 hover:bg-blue-700"}
                            >
                              {patient.arrivalStatus === "Accepted" ? "Accepted" : "Accept"}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                      <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50">New Admission</Badge>
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
                  <InfoBlock label="Admission Date & Time" value={selectedPatient.admissionDateTime} />
                  <InfoBlock label="Department" value={selectedPatient.department} />
                  <InfoBlock label="Package" value={selectedPatient.packageName} />
                  <InfoBlock label="Admitting Doctor" value={selectedPatient.admittingDoctor} />
                  <InfoBlock label="Emergency Contact" value={selectedPatient.emergencyContactName} />
                  <InfoBlock label="Mobile" value={selectedPatient.emergencyContactPhone} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedPatient.alerts.map((alert) => (
                    <Badge key={alert} variant="outline" className="border-slate-200 bg-slate-50 text-slate-700">
                      {alert}
                    </Badge>
                  ))}
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-slate-800">Transfer Checklist</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <ChecklistItem label="Admission Confirmed" checked={selectedPatient.transferChecklist.admissionConfirmed} />
                    <ChecklistItem label="Admission Documents Verified" checked={selectedPatient.transferChecklist.documentsVerified} />
                    <ChecklistItem label="Deposit Received" checked={selectedPatient.transferChecklist.depositReceived} />
                    <ChecklistItem label="Wristband Generated" checked={selectedPatient.transferChecklist.wristbandGenerated} />
                    <ChecklistItem label="Bed Allocated" checked={selectedPatient.transferChecklist.bedAllocated} />
                    <ChecklistItem label="Initial Assessment Pending" checked={selectedPatient.transferChecklist.initialAssessmentPending} warning />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="mb-4 text-sm font-semibold text-slate-800">Nurse Acceptance</p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Acceptance Date & Time">
                      <Input
                        type="datetime-local"
                        value={acceptanceDateTime}
                        onChange={(e) => setAcceptanceDateTime(e.target.value)}
                      />
                    </Field>

                    <Field label="Receiving Nurse">
                      <Select value={receivingNurse} onValueChange={setReceivingNurse}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {RECEIVING_NURSES.map((nurse) => (
                            <SelectItem key={nurse} value={nurse}>{nurse}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Ward">
                      <Input value={selectedPatient.ward} disabled />
                    </Field>

                    <Field label="Room">
                      <Input value={selectedPatient.room} disabled />
                    </Field>

                    <Field label="Bed">
                      <Input value={selectedPatient.bed} disabled />
                    </Field>

                    <Field label="Special Notes (Optional)" className="sm:col-span-2">
                      <Input
                        placeholder="Enter note if any..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                      />
                    </Field>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handleAcceptPatient}>
                      <UserRoundCheck className="h-4 w-4" /> Accept Patient
                    </Button>

                    <Button variant="outline" className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50" onClick={handleGenerateWristBand}>
                      <QrCode className="h-4 w-4" /> Generate Wrist Band
                    </Button>

                    <Button variant="outline" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50" onClick={handlePrintBedCard}>
                      <Printer className="h-4 w-4" /> Print Bed Card
                    </Button>
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

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tint: "violet" | "amber" | "emerald" | "rose" | "cyan" ;
}) {
  const styles = {
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  cyan: "bg-cyan-50 text-cyan-600",
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
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: "Awaiting Acceptance" | "Accepted" }) {
  const className =
    status === "Accepted"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
      : "bg-amber-50 text-amber-700 hover:bg-amber-50";

  return <Badge className={className}>{status}</Badge>;
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">{label}</label>
      {children}
    </div>
  );
}

function ChecklistItem({
  label,
  checked,
  warning = false,
}: {
  label: string;
  checked: boolean;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm">
      {checked ? (
        <BadgeCheck className="h-4 w-4 text-emerald-500" />
      ) : warning ? (
        <ShieldAlert className="h-4 w-4 text-amber-500" />
      ) : (
        <ShieldAlert className="h-4 w-4 text-slate-300" />
      )}
      <span className="text-slate-700">{label}</span>
    </div>
  );
}