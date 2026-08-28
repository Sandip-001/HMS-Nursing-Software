// app/(dashboard)/admission-desk/emergency/new-registration/_components/registration-form-fields.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ArrivalMode, Gender, IncidentType } from "@/types/emergency/emergency-types";
import { ARRIVAL_MODE_OPTIONS, INCIDENT_TYPE_OPTIONS } from "@/lib/emergency/emergency-data";

export interface RegistrationFormState {
  patientName: string; dateOfBirth: string; age: string; mobileNumber: string; attendantName: string;
  gender: Gender; aadharNumber: string; ayushmanCardNumber: string; emergencyContactNumber: string; address: string;
  arrivalMode: ArrivalMode; referredFrom: string; incidentType: IncidentType; broughtBy: string;
}

export function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <div><Label className="text-xs text-slate-500">{label}{required && <span className="ml-0.5 text-red-500">*</span>}</Label><div className="mt-1">{children}</div></div>;
}

export function PatientIdentitySection({ form, onChange }: { form: RegistrationFormState; onChange: <K extends keyof RegistrationFormState>(key: K, value: RegistrationFormState[K]) => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-bold text-slate-800">Patient Identity</p>
      <p className="mt-1 text-xs text-slate-500">All fields here are optional and can be completed later — except Gender.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Patient Name"><Input value={form.patientName} onChange={(e) => onChange("patientName", e.target.value)} placeholder="Full name (if known)" /></Field>
        <Field label="Gender" required>
          <Select value={form.gender} onValueChange={(v) => onChange("gender", v as Gender)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>{["Male", "Female", "Other"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Date of Birth"><Input type="date" value={form.dateOfBirth} onChange={(e) => onChange("dateOfBirth", e.target.value)} /></Field>
        <Field label="Age (auto-calculated)"><Input value={form.age} readOnly placeholder="Calculated from DOB" className="bg-slate-50" /></Field>
        <Field label="Mobile Number"><Input value={form.mobileNumber} onChange={(e) => onChange("mobileNumber", e.target.value)} placeholder="+91 ..." /></Field>
        <Field label="Attendant Name"><Input value={form.attendantName} onChange={(e) => onChange("attendantName", e.target.value)} placeholder="Person accompanying patient" /></Field>
        <Field label="Aadhar Card Number"><Input value={form.aadharNumber} onChange={(e) => onChange("aadharNumber", e.target.value)} placeholder="XXXX-XXXX-XXXX" /></Field>
        <Field label="Ayushman Bharat Card Number"><Input value={form.ayushmanCardNumber} onChange={(e) => onChange("ayushmanCardNumber", e.target.value)} placeholder="PMJAY-XXXXXXXX" /></Field>
        <Field label="Emergency Contact Number"><Input value={form.emergencyContactNumber} onChange={(e) => onChange("emergencyContactNumber", e.target.value)} placeholder="Alternate contact" /></Field>
        <Field label="Address"><Textarea rows={2} value={form.address} onChange={(e) => onChange("address", e.target.value)} placeholder="Residential address" /></Field>
      </div>
    </div>
  );
}

export function EmergencyIntakeSection({ form, onChange }: { form: RegistrationFormState; onChange: <K extends keyof RegistrationFormState>(key: K, value: RegistrationFormState[K]) => void }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/30 p-5">
      <p className="text-sm font-bold text-red-800">Emergency Intake Details</p>
      <p className="mt-1 text-xs text-slate-500">Arrival mode and incident/reason are required at registration time.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Arrival Mode" required>
          <Select value={form.arrivalMode} onValueChange={(v) => onChange("arrivalMode", v as ArrivalMode)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{ARRIVAL_MODE_OPTIONS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Incident / Reason" required>
          <Select value={form.incidentType} onValueChange={(v) => onChange("incidentType", v as IncidentType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{INCIDENT_TYPE_OPTIONS.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Referred From (if any)"><Input value={form.referredFrom} onChange={(e) => onChange("referredFrom", e.target.value)} placeholder="Clinic / hospital name" /></Field>
        <Field label="Brought By"><Input value={form.broughtBy} onChange={(e) => onChange("broughtBy", e.target.value)} placeholder="Ambulance crew, police, family member..." /></Field>
      </div>
    </div>
  );
}