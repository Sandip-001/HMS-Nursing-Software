// app/(dashboard)/rmo/ipd/all-patients/_components/rmo-columns.tsx
"use client";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RmoPatient } from "@/types/rmo/ipd/rmo-types";
import { PatientStatusBadge } from "./rmo-badges";

export function getRmoColumns(onView: (patient: RmoPatient) => void): ColumnDef<RmoPatient>[] {
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
      id: "Diagnosis", header: "Diagnosis",
      cell: ({ row }) => {
        const latest = row.original.diagnoses[0];
        return latest ? <div><p className="text-sm text-slate-700">{latest.name}</p><p className="text-xs text-slate-400">{latest.code}</p></div> : <span className="text-xs text-slate-400">Not yet added</span>;
      },
    },
    { id: "Attending Doctor", accessorKey: "attendingDoctor", header: "Attending Doctor", cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.attendingDoctor}</span> },
    { id: "Department", accessorKey: "department", header: "Department", cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.department}</span> },
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

export const defaultRmoColumnVisibility: VisibilityState = { Department: false };