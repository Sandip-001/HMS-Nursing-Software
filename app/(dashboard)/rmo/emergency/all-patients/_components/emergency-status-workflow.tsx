// app/(dashboard)/rmo/emergency/all-patients/_components/emergency-status-workflow.tsx
"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  BedDouble,
  HeartCrack,
  History,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  RmoEmergencyPatient,
} from "@/types/emergency/rmo-emergency-types";
import { RMO_BEDS } from "@/lib/emergency/rmo-emergency-data";
import {
  BedAllocationDrawer,
  CriticalNotificationDrawer,
  DeathDocumentationDrawer,
} from "./status-workflow-drawers";
import { EmergencyStatusBadge } from "@/app/(dashboard)/admission/emergency/all-patients/_components/emergency-badges";

const statuses: EmergencyStatus[] = [
  "Under Observation",
  "Stable",
  "Critical",
  "Shifted to IPD",
  "Shifted to OT",
  "Shifted to ICU",
  "Well & Released",
  "Follow-up OPD",
  "Patient Death",
];
export function EmergencyStatusWorkflow({
  patient,
  onUpdate,
}: {
  patient: RmoEmergencyPatient;
  onUpdate: (patient: RmoEmergencyPatient) => void;
}) {
  const [selected, setSelected] = useState<EmergencyStatus>(patient.status);
  const [bedTarget, setBedTarget] = useState<
    "Shifted to IPD" | "Shifted to ICU" | null
  >(null);
  const [critical, setCritical] = useState(false);
  const [death, setDeath] = useState(false);
  function choose(value: EmergencyStatus) {
    setSelected(value);
    if (value === "Shifted to IPD" || value === "Shifted to ICU")
      setBedTarget(value);
    else if (value === "Critical") setCritical(true);
    else if (value === "Patient Death") setDeath(true);
    else saveStatus(value);
  }
  function saveStatus(status: EmergencyStatus, reason?: string) {
    const stamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    onUpdate({
      ...patient,
      status,
      statusLog: [
        {
          id: `S-${Date.now()}`,
          status,
          changedBy: "RMO",
          changedAt: stamp,
          reason,
        },
        ...patient.statusLog,
      ],
    });
    toast.success(`Status changed to ${status}.`);
  }
  function bookBed(bed: BedOption) {
    saveStatus(
      bedTarget as EmergencyStatus,
      `Bed booked: ${bed.ward}, Room ${bed.room}, Bed ${bed.bed}`,
    );
    setBedTarget(null);
  }
  function notify(doctor: string, note: string) {
    const stamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    onUpdate({
      ...patient,
      status: "Critical",
      criticalNotifications: [
        {
          id: `CN-${Date.now()}`,
          patientEmergencyNumber: patient.emergencyNumber,
          notifiedTo: doctor,
          note,
          notifiedBy: "RMO",
          notifiedAt: stamp,
        },
        ...patient.criticalNotifications,
      ],
      statusLog: [
        {
          id: `S-${Date.now()}`,
          status: "Critical",
          changedBy: "RMO",
          changedAt: stamp,
          reason: note,
        },
        ...patient.statusLog,
      ],
    });
    setCritical(false);
    toast.success("Doctor notified and patient marked Critical.");
  }
  function recordDeath(record: DeathRecord) {
    const stamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    onUpdate({
      ...patient,
      status: "Patient Death",
      deathRecord: record,
      statusLog: [
        {
          id: `S-${Date.now()}`,
          status: "Patient Death",
          changedBy: record.declaredBy || "RMO",
          changedAt: stamp,
          reason: record.causeOfDeath,
        },
        ...patient.statusLog,
      ],
    });
    setDeath(false);
    toast.success("Death documentation saved and status updated.");
  }
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Activity className="h-4 w-4 text-violet-600" />
          Change Patient Status
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Special workflows open automatically for Critical, IPD, ICU, and
          Patient Death.
        </p>
        <div className="mt-4 flex gap-2">
          <Select
            value={selected}
            onValueChange={(v) => choose(v as EmergencyStatus)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="shrink-0" onClick={() => saveStatus(selected)}>
            Save Status
          </Button>
        </div>
      </div>
      {patient.criticalNotifications.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-red-800">
            <AlertTriangle className="h-4 w-4" />
            Critical Notifications
          </p>
          {patient.criticalNotifications.map((n) => (
            <p key={n.id} className="mt-2 text-xs text-slate-600">
              {n.notifiedAt} · {n.notifiedTo} · {n.note}
            </p>
          ))}
        </div>
      )}
      {patient.deathRecord && (
        <div className="rounded-xl border border-slate-300 bg-slate-100 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <HeartCrack className="h-4 w-4" />
            Death Documentation Saved
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Declared by {patient.deathRecord.declaredBy} · Cause:{" "}
            {patient.deathRecord.causeOfDeath} · Manner:{" "}
            {patient.deathRecord.manner}
          </p>
        </div>
      )}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <History className="h-4 w-4 text-slate-500" />
          Status Change Log
        </p>
        <div className="mt-3 space-y-3">
          {patient.statusLog.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0"
            >
              <div className="mt-0.5 h-2 w-2 rounded-full bg-violet-500" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <EmergencyStatusBadge status={log.status} />
                  <span className="text-xs text-slate-400">
                    {log.changedAt}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Changed by{" "}
                  <span className="font-semibold text-slate-700">
                    {log.changedBy}
                  </span>
                  {log.reason ? ` · ${log.reason}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BedAllocationDrawer
        patient={bedTarget ? patient : null}
        target={bedTarget || "Shifted to IPD"}
        beds={RMO_BEDS}
        onClose={() => setBedTarget(null)}
        onBook={bookBed}
      />
      <CriticalNotificationDrawer
        patient={critical ? patient : null}
        onClose={() => setCritical(false)}
        onSend={notify}
      />
      <DeathDocumentationDrawer
        patient={death ? patient : null}
        onClose={() => setDeath(false)}
        onConfirm={recordDeath}
      />
    </div>
  );
}
