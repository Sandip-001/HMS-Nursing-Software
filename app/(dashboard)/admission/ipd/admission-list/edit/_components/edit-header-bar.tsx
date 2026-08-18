// app/ipd/admission-list/edit/_components/edit-header-bar.tsx
"use client";

import { Menu, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdmissionStatus } from "@/types/admission-list-types";
import { StatusBadge } from "../../_components/status-badge";

interface EditHeaderBarProps {
  admissionId: string;
  admissionDateTime: string;
  status: AdmissionStatus;
  admissionType: string;
  department: string;
  attendingDoctor: string;
  onCancelAdmission: () => void;
}

export function EditHeaderBar({
  admissionId, admissionDateTime, status, admissionType, department, attendingDoctor, onCancelAdmission,
}: EditHeaderBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Menu className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Edit Admission</h1>
            <p className="text-xs text-slate-400">Update admission details</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50" onClick={onCancelAdmission}>
          <Ban className="h-4 w-4" /> Cancel Admission
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-3 lg:grid-cols-6">
        <InfoBlock label="Admission ID" value={admissionId} highlight />
        <InfoBlock label="Admission Date & Time" value={admissionDateTime} />
        <InfoBlock label="Admission Status" value={<StatusBadge status={status} />} />
        <InfoBlock label="Admission Type" value={admissionType} />
        <InfoBlock label="Department" value={department} />
        <InfoBlock label="Attending Doctor" value={attendingDoctor} />
      </div>
    </div>
  );
}

function InfoBlock({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <div className={highlight ? "text-sm font-bold text-blue-600" : "text-sm font-semibold text-slate-800"}>{value}</div>
    </div>
  );
}