// app/(dashboard)/admission/icu/all-patients/_components/icu-patient-drawer.tsx
"use client";
import { useMemo, useState } from "react";
import { CalendarDays, Heart, MapPin, Phone, Shield, Stethoscope, User, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IcuPatient } from "@/types/admission-desk/icu/icu-types";
import { IcuStatusBadge, AdmissionTypeBadge } from "./icu-badges";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Tab = "overview" | "contact" | "insurance" | "medical" | "nurses";

export function IcuPatientDrawer({ patient, onClose }: { patient: IcuPatient | null; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [shiftFilter, setShiftFilter] = useState("All");

  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-4xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-bold text-white">
              {patient.patientName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800">{patient.patientName}</h2>
                <IcuStatusBadge status={patient.status} />
                <AdmissionTypeBadge type={patient.admissionType} />
              </div>
              <p className="text-sm text-slate-500">{patient.uhid} · {patient.icuId} · {patient.ward} · {patient.bed}</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex gap-1 border-b border-slate-200 bg-white px-4 py-2">
          {[
            { key: "overview", label: "Overview", icon: User },
            { key: "contact", label: "Contact", icon: Phone },
            { key: "insurance", label: "Insurance", icon: Shield },
            { key: "medical", label: "Medical", icon: Stethoscope },
            { key: "nurses", label: "Nurses", icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as Tab)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                tab === key ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "overview" && <OverviewTab patient={patient} />}
          {tab === "contact" && <ContactTab patient={patient} />}
          {tab === "insurance" && <InsuranceTab patient={patient} />}
          {tab === "medical" && <MedicalTab patient={patient} />}
          {tab === "nurses" && (
            <NursesTab
              patient={patient}
              shiftFilter={shiftFilter}
              onShiftChange={setShiftFilter}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

function OverviewTab({ patient }: { patient: IcuPatient }) {
  return (
    <div className="space-y-6">
      {/* Patient Info Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <InfoCard icon={<User className="h-4 w-4" />} label="Age / Gender" value={`${patient.age} / ${patient.gender}`} />
        <InfoCard icon={<CalendarDays className="h-4 w-4" />} label="Date of Birth" value={patient.dateOfBirth ?? "Not available"} />
        <InfoCard icon={<MapPin className="h-4 w-4" />} label="Floor / Ward" value={`${patient.floor} / ${patient.ward}`} />
        <InfoCard icon={<Heart className="h-4 w-4" />} label="Room / Bed" value={`${patient.room} / ${patient.bed}`} />
      </div>

      {/* Current Condition */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
        <p className="text-sm font-bold text-blue-900">Current Condition</p>
        <p className="mt-2 text-sm text-blue-800">{patient.currentCondition}</p>
      </div>

      {/* Diagnosis */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Diagnosis</p>
        <p className="mt-2 text-sm text-slate-600">{patient.diagnosis}</p>
        {patient.allergies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {patient.allergies.map((allergy, i) => (
              <span key={i} className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                ⚠ {allergy}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Admission Details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Admission Details</p>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <DetailRow label="Admission Date" value={new Date(patient.admissionDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} />
          <DetailRow label="Admission Time" value={patient.admissionTime} />
          <DetailRow label="Admitted By" value={patient.admittedBy} />
          <DetailRow label="Referred From" value={patient.referredFrom ?? "Direct"} />
        </div>
      </div>

      {/* Medical Team */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Medical Team</p>
        <div className="mt-3 space-y-3">
          <TeamRow role="Assigned Doctor" name={patient.assignedDoctor} />
          <TeamRow role="Assigned RMO" name={patient.assignedRmo} />
        </div>
      </div>
    </div>
  );
}

function ContactTab({ patient }: { patient: IcuPatient }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Patient Contact Information</p>
        <div className="mt-4 space-y-4">
          <DetailRow label="Mobile Number" value={patient.mobileNumber || "Not provided"} icon={<Phone className="h-4 w-4" />} />
          <DetailRow label="Alternative Mobile" value={patient.alternativeMobile || "Not provided"} icon={<Phone className="h-4 w-4" />} />
          <DetailRow label="Address" value={`${patient.address}, ${patient.city}, ${patient.state} - ${patient.pinCode}`} icon={<MapPin className="h-4 w-4" />} />
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
        <p className="text-sm font-bold text-emerald-900">Emergency Contact</p>
        <div className="mt-4 space-y-4">
          <DetailRow label="Emergency Contact Name" value={patient.emergencyContactName || "Not provided"} icon={<User className="h-4 w-4" />} />
          <DetailRow label="Relationship" value={patient.emergencyContactRelationship || "Not provided"} icon={<Users className="h-4 w-4" />} />
          <DetailRow label="Emergency Contact Number" value={patient.emergencyContactNumber || "Not provided"} icon={<Phone className="h-4 w-4 text-red-600" />} />
        </div>
      </div>
    </div>
  );
}

function InsuranceTab({ patient }: { patient: IcuPatient }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Government Identification</p>
        <div className="mt-4 space-y-4">
          <DetailRow label="Aadhar Number" value={patient.aadharNumber || "Not provided"} icon={<Shield className="h-4 w-4" />} />
          <DetailRow label="Ayushman Bharat Card" value={patient.ayushmanCardNumber || "Not enrolled"} icon={<Shield className="h-4 w-4 text-emerald-600" />} />
        </div>
      </div>

      {patient.tpaName || patient.healthInsuranceName ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
          <p className="text-sm font-bold text-blue-900">Private Insurance / TPA</p>
          <div className="mt-4 space-y-4">
            {patient.tpaName && <DetailRow label="TPA Name" value={patient.tpaName} icon={<Shield className="h-4 w-4" />} />}
            {patient.healthInsuranceName && <DetailRow label="Health Insurance" value={patient.healthInsuranceName} icon={<Shield className="h-4 w-4" />} />}
            {patient.insurancePolicyNumber && <DetailRow label="Policy Number" value={patient.insurancePolicyNumber} icon={<Shield className="h-4 w-4" />} />}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-500">No private insurance or TPA information provided.</p>
        </div>
      )}
    </div>
  );
}

function MedicalTab({ patient }: { patient: IcuPatient }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
        <p className="text-sm font-bold text-red-900">Allergies</p>
        {patient.allergies.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {patient.allergies.map((allergy, i) => (
              <span key={i} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700">
                ⚠ {allergy}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-red-800">No known allergies</p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Primary Diagnosis</p>
        <p className="mt-2 text-sm text-slate-600">{patient.diagnosis}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Current Condition</p>
        <p className="mt-2 text-sm text-slate-600">{patient.currentCondition}</p>
      </div>

      {patient.notes && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
          <p className="text-sm font-bold text-amber-900">Clinical Notes</p>
          <p className="mt-2 text-sm text-amber-800">{patient.notes}</p>
        </div>
      )}
    </div>
  );
}

function NursesTab({ patient, shiftFilter, onShiftChange }: {
  patient: IcuPatient;
  shiftFilter: string;
  onShiftChange: (value: string) => void;
}) {
  const filteredNurses = patient.assignedNurses.filter(
    (a) => shiftFilter === "All" || a.shift === shiftFilter
  );

  // Group by date
  const groupedByDate = useMemo(() => {
    const map = new Map<string, typeof patient.assignedNurses>();
    filteredNurses.forEach((assignment) => {
      const existing = map.get(assignment.date) ?? [];
      existing.push(assignment);
      map.set(assignment.date, existing);
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredNurses]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-bold text-slate-800">Nursing Staff Assignments</p>
        <Select value={shiftFilter} onValueChange={onShiftChange}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Shifts</SelectItem>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
            <SelectItem value="Night">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {groupedByDate.map(([date, assignments]) => {
          const morning = assignments.find((a) => a.shift === "Morning");
          const evening = assignments.find((a) => a.shift === "Evening");
          const night = assignments.find((a) => a.shift === "Night");

          return (
            <div key={date} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">
                    {new Date(date).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                  <p className="text-xs text-slate-500">Nursing Duty Roster</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-slate-400">
                      <th className="py-3 pr-4">Morning Shift</th>
                      <th className="py-3 pr-4">Evening Shift</th>
                      <th className="py-3 pr-4">Night Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 last:border-0">
                      <td className="py-4 pr-4">
                        {morning ? (
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                              {morning.nurseName.split(" ").pop()?.charAt(0)}
                            </span>
                            <span className="font-semibold text-slate-700">{morning.nurseName}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-4 pr-4">
                        {evening ? (
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-xs font-bold">
                              {evening.nurseName.split(" ").pop()?.charAt(0)}
                            </span>
                            <span className="font-semibold text-slate-700">{evening.nurseName}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-4 pr-4">
                        {night ? (
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                              {night.nurseName.split(" ").pop()?.charAt(0)}
                            </span>
                            <span className="font-semibold text-slate-700">{night.nurseName}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {groupedByDate.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <CalendarDays className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-sm font-semibold text-slate-600">No nursing assignments found</p>
            <p className="mt-1 text-xs text-slate-400">No nursing duty roster available for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-500">{icon}<span className="text-xs font-medium">{label}</span></div>
      <p className="mt-2 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function DetailRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="mt-0.5 text-slate-400">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function TeamRow({ role, name }: { role: string; name: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 p-3">
      <span className="text-sm font-medium text-slate-600">{role}</span>
      <span className="text-sm font-bold text-slate-800">{name}</span>
    </div>
  );
}