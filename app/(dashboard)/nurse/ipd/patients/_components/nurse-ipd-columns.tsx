// app/(dashboard)/nurse/ipd/patients/_components/nurse-ipd-columns.tsx
"use client";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NurseIpdPatient } from "@/types/nurse/ipd/nurse-ipd-types";
import { getEmarForPatient } from "@/lib/nurse/ipd/nurse-ipd-data";
import { AcuityBadge } from "./nurse-ipd-badges";

export function getNurseIpdColumns(onView: (patient: NurseIpdPatient) => void): ColumnDef<NurseIpdPatient>[] {
  return [
    {
      id: "Patient", accessorKey: "patientName", header: "Patient",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.patientName}</p>
          <p className="text-xs text-slate-400">{row.original.uhid}</p>
        </div>
      ),
    },
    {
      id: "IPD ID", accessorKey: "ipdId", header: "IPD ID",
      cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.ipdId}</span>,
    },
    {
      id: "Age / Gender", header: "Age / Gender",
      cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.age} yrs · {row.original.gender}</span>,
    },
    {
      id: "Ward / Bed", accessorKey: "ward", header: "Ward / Bed",
      cell: ({ row }) => (
        <div className="text-sm text-slate-600">{row.original.ward}<p className="text-xs text-slate-400">{row.original.room} · {row.original.bed}</p></div>
      ),
    },
    {
      id: "Diagnosis", accessorKey: "currentDiagnosis", header: "Diagnosis",
      cell: ({ row }) => (
        <div><p className="text-sm text-slate-700">{row.original.currentDiagnosis}</p><p className="text-xs text-slate-400">{row.original.diagnosisCode}</p></div>
      ),
    },
    {
      id: "Doctor", accessorKey: "admittingDoctor", header: "Doctor",
      cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.admittingDoctor}</span>,
    },
    {
      id: "Pending Doses", header: "Pending Doses",
      cell: ({ row }) => {
        const pending = getEmarForPatient(row.original.uhid).filter((dose) => dose.status === "Pending").length;
        return <span className={`text-sm font-semibold ${pending > 0 ? "text-amber-600" : "text-emerald-600"}`}>{pending}</span>;
      },
    },
    {
      id: "Shift Nurse", accessorKey: "assignedNurse", header: "Shift Nurse",
      cell: ({ row }) => (
        <div><p className="text-sm text-slate-700">{row.original.assignedNurse}</p><p className="text-xs text-slate-400">{row.original.currentShift}</p></div>
      ),
    },
    {
      id: "Acuity", header: "Acuity",
      cell: ({ row }) => <AcuityBadge acuity={row.original.acuity} />,
    },
    {
      id: "Action", header: () => <span className="block text-right">Action</span>, enableHiding: false,
      cell: ({ row }) => (
        <div className="text-right">
          <Button variant="outline" size="sm" onClick={() => onView(row.original)} className="border-blue-200 text-blue-700">
            <Eye className="mr-1 h-4 w-4" />View Details
          </Button>
        </div>
      ),
    },
  ];
}

export const defaultNurseColumnVisibility: VisibilityState = {
  "Age / Gender": true, "Doctor": false,
};