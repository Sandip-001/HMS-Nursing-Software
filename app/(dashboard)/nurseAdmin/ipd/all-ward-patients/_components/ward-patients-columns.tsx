// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/ward-patients-columns.tsx
"use client";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { PatientStatusBadge } from "./status-badges";

export function getWardPatientColumns(onView: (patient: WardPatientFull) => void): ColumnDef<WardPatientFull>[] {
  return [
    {
      id: "Patient", accessorKey: "patientName", header: "Patient",
      cell: ({ row }) => <div><p className="font-semibold text-slate-800">{row.original.patientName}</p><p className="text-xs text-slate-400">{row.original.uhid}</p></div>,
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
    { id: "Status", header: "Status", cell: ({ row }) => <PatientStatusBadge status={row.original.status} /> },
    {
      id: "Action", header: () => <span className="block text-right">Action</span>, enableHiding: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Button variant="outline" size="sm" onClick={() => onView(row.original)} className="gap-1 border-blue-200 text-blue-700"><Eye className="h-4 w-4" />View Details</Button>
        </div>
      ),
    },
  ];
}

export const defaultWardPatientColumnVisibility: VisibilityState = { "Age / Gender": true };