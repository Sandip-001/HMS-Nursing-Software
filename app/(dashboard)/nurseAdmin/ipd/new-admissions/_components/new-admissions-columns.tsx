// app/(dashboard)/nurse-admin/ipd/new-admissions/_components/new-admissions-columns.tsx
"use client";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdmittedPatient } from "@/types/nurse-admin/ipd/nurse-admin-types";
import { AcuityBadge } from "./nurse-admin-badges";

export function getNewAdmissionColumns(onAssign: (patient: AdmittedPatient) => void): ColumnDef<AdmittedPatient>[] {
  return [
    {
      id: "Patient", accessorKey: "patientName", header: "Patient",
      cell: ({ row }) => (
        <div><p className="font-semibold text-slate-800">{row.original.patientName}</p><p className="text-xs text-slate-400">{row.original.uhid}</p></div>
      ),
    },
    { id: "IPD ID", accessorKey: "ipdId", header: "IPD ID", cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.ipdId}</span> },
    { id: "Age / Gender", header: "Age / Gender", cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.age} yrs · {row.original.gender}</span> },
    {
      id: "Ward / Bed", accessorKey: "ward", header: "Ward / Bed",
      cell: ({ row }) => <div className="text-sm text-slate-600">{row.original.ward}<p className="text-xs text-slate-400">{row.original.room} · {row.original.bed}</p></div>,
    },
    {
      id: "Diagnosis", accessorKey: "currentDiagnosis", header: "Diagnosis",
      cell: ({ row }) => <div><p className="text-sm text-slate-700">{row.original.currentDiagnosis}</p><p className="text-xs text-slate-400">{row.original.diagnosisCode}</p></div>,
    },
    { id: "Doctor", accessorKey: "admittingDoctor", header: "Doctor", cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.admittingDoctor}</span> },
    { id: "Admitted From", accessorKey: "admittedFrom", header: "Admitted From", cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.admittedFrom}</span> },
    { id: "Admission Time", accessorKey: "admissionDateTime", header: "Admission Time", cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.admissionDateTime}</span> },
    { id: "Acuity", header: "Acuity", cell: ({ row }) => <AcuityBadge acuity={row.original.acuity} /> },
    {
      id: "Action", header: () => <span className="block text-right">Action</span>, enableHiding: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Button size="sm" onClick={() => onAssign(row.original)} className="gap-1 bg-blue-600 hover:bg-blue-700"><UserPlus className="h-4 w-4" />Assign Nurse</Button>
        </div>
      ),
    },
  ];
}

export const defaultNewAdmissionColumnVisibility: VisibilityState = { "Admitted From": false };