// app/(dashboard)/rmo/emergency/all-patients/_components/status-workflow-drawers.tsx
"use client";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BedDouble,
  CheckCircle2,
  HeartCrack,
  Send,
  ShieldAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  EmergencyPatient,
  EmergencyStatus,
} from "@/types/emergency/emergency-types";
import type {
  BedOption,
  DeathRecord,
} from "@/types/emergency/rmo-emergency-types";

export function BedAllocationDrawer({
  patient,
  target,
  beds,
  onClose,
  onBook,
}: {
  patient: EmergencyPatient | null;
  target: "Shifted to IPD" | "Shifted to ICU";
  beds: BedOption[];
  onClose: () => void;
  onBook: (bed: BedOption) => void;
}) {
  const [floor, setFloor] = useState("All");
  const [query, setQuery] = useState("");

  // Hooks first
  const rows = useMemo(
    () =>
      beds.filter(
        (b) =>
          b.unit === (target === "Shifted to ICU" ? "ICU" : "IPD") &&
          (floor === "All" || b.floor === floor) &&
          `${b.ward} ${b.room} ${b.bed}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [beds, target, floor, query],
  );
  const floors = Array.from(new Set(rows.map((b) => b.floor)));

  // Guard AFTER hooks
  if (!patient) return null;

  return (
    <WorkflowShell
      title={`Allocate ${target === "Shifted to ICU" ? "ICU" : "IPD"} Bed`}
      patient={patient}
      onClose={onClose}
    >
      <p className="text-sm text-slate-500">
        Select an available floor, ward, room, and bed. Booking the bed will
        update the patient's emergency status.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Input
          placeholder="Search ward / room / bed"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={floor} onValueChange={setFloor}>
          <SelectTrigger>
            <SelectValue placeholder="Floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Floors</SelectItem>
            {floors.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((bed) => (
          <div
            key={bed.id}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="flex items-center gap-2 font-bold text-slate-800">
                  <BedDouble className="h-4 w-4 text-blue-600" />
                  {bed.ward} · Room {bed.room} · Bed {bed.bed}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {bed.floor} · {bed.bedType}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-bold ${bed.status === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"}`}
              >
                {bed.status}
              </span>
            </div>
            <Button
              disabled={bed.status !== "Available"}
              variant="outline"
              className="mt-3 w-full gap-2"
              onClick={() => onBook(bed)}
            >
              {bed.status === "Available" && (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Book This Bed
            </Button>
          </div>
        ))}
        {rows.length === 0 && <Empty text="No beds found for this unit." />}
      </div>
    </WorkflowShell>
  );
}

export function CriticalNotificationDrawer({
  patient,
  onClose,
  onSend,
}: {
  patient: EmergencyPatient | null;
  onClose: () => void;
  onSend: (doctor: string, note: string) => void;
}) {
  const [doctor, setDoctor] = useState(
    patient?.attendingDoctor === "Unassigned"
      ? ""
      : patient?.attendingDoctor || "",
  );
  const [note, setNote] = useState("");
  if (!patient) return null;
  return (
    <WorkflowShell
      title="Mark Patient Critical"
      patient={patient}
      onClose={onClose}
    >
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="flex items-center gap-2 font-bold text-red-800">
          <AlertTriangle className="h-4 w-4" />
          Doctor notification required
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Add the doctor and clinical note that will be recorded in the critical
          status log.
        </p>
      </div>
      <Field label="Notify Doctor">
        <Input
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          placeholder="Doctor name"
        />
      </Field>
      <Field label="Clinical Note">
        <Textarea
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Why is the patient critical? What immediate action is needed?"
        />
      </Field>
      <Button
        className="mt-5 w-full gap-2 bg-red-600 hover:bg-red-700"
        onClick={() => onSend(doctor, note)}
      >
        <Send className="h-4 w-4" />
        Notify Doctor & Mark Critical
      </Button>
    </WorkflowShell>
  );
}

export function DeathDocumentationDrawer({
  patient,
  onClose,
  onConfirm,
}: {
  patient: EmergencyPatient | null;
  onClose: () => void;
  onConfirm: (record: DeathRecord) => void;
}) {
  const [form, setForm] = useState<DeathRecord>({
    declaredAt: "",
    declaredBy: "",
    causeOfDeath: "",
    manner: "Pending Investigation",
    lastSeenAliveAt: "",
    resuscitationAttempted: false,
    attendantName: "",
    attendantRelationship: "",
    policeInformed: false,
    remarks: "",
  });
  const set = (key: keyof DeathRecord, value: string | boolean) =>
    setForm((v) => ({ ...v, [key]: value }));
  if (!patient) return null;
  return (
    <WorkflowShell
      title="Death Documentation"
      patient={patient}
      onClose={onClose}
    >
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="flex items-center gap-2 font-bold text-red-800">
          <HeartCrack className="h-4 w-4" />
          Required death documentation
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Record declaration, clinical circumstances, resuscitation, attendant
          communication, and police notification before changing the status.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Declared Date & Time">
          <Input
            type="datetime-local"
            value={form.declaredAt}
            onChange={(e) => set("declaredAt", e.target.value)}
          />
        </Field>
        <Field label="Declared By">
          <Input
            value={form.declaredBy}
            onChange={(e) => set("declaredBy", e.target.value)}
            placeholder="Doctor / RMO name"
          />
        </Field>
        <Field label="Last Seen Alive">
          <Input
            type="datetime-local"
            value={form.lastSeenAliveAt}
            onChange={(e) => set("lastSeenAliveAt", e.target.value)}
          />
        </Field>
        <Field label="Manner of Death">
          <Select value={form.manner} onValueChange={(v) => set("manner", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                "Natural",
                "Accidental",
                "Suicidal",
                "Homicidal",
                "Pending Investigation",
                "Unknown",
              ].map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Cause / Provisional Cause of Death">
        <Textarea
          rows={3}
          value={form.causeOfDeath}
          onChange={(e) => set("causeOfDeath", e.target.value)}
          placeholder="Clinical cause or provisional cause"
        />
      </Field>
      <label className="mt-4 flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.resuscitationAttempted}
          onChange={(e) => set("resuscitationAttempted", e.target.checked)}
        />
        Resuscitation attempted
      </label>
      {form.resuscitationAttempted && (
        <Field label="Resuscitation Summary">
          <Textarea
            value={form.resuscitationSummary || ""}
            onChange={(e) => set("resuscitationSummary", e.target.value)}
          />
        </Field>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Attendant Name">
          <Input
            value={form.attendantName || ""}
            onChange={(e) => set("attendantName", e.target.value)}
          />
        </Field>
        <Field label="Relationship">
          <Input
            value={form.attendantRelationship || ""}
            onChange={(e) => set("attendantRelationship", e.target.value)}
          />
        </Field>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.policeInformed}
          onChange={(e) => set("policeInformed", e.target.checked)}
        />
        Police informed / MLC notified
      </label>
      <Field label="Remarks">
        <Textarea
          value={form.remarks || ""}
          onChange={(e) => set("remarks", e.target.value)}
        />
      </Field>
      <Button
        className="mt-5 w-full gap-2 bg-slate-800 hover:bg-slate-900"
        onClick={() => onConfirm(form)}
      >
        <ShieldAlert className="h-4 w-4" />
        Save Documentation & Mark Patient Death
      </Button>
    </WorkflowShell>
  );
}

function WorkflowShell({
  title,
  patient,
  onClose,
  children,
}: {
  title: string;
  patient: EmergencyPatient;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[65]">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            <p className="text-xs text-slate-500">
              {patient.patientName || "Unidentified"} ·{" "}
              {patient.emergencyNumber}
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <Label className="text-xs text-slate-500">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
      {text}
    </div>
  );
}
