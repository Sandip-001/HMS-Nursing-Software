// app/ipd/admission-list/_components/admission-table.tsx
"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import { RowActions } from "./row-actions";
import { AdmissionRecord } from "@/types/admission-list-types";


interface AdmissionTableProps {
  records: AdmissionRecord[];
  onView: (r: AdmissionRecord) => void;
  onBedTransfer: (r: AdmissionRecord) => void;
  onPrint: (r: AdmissionRecord) => void;
  onCancel: (r: AdmissionRecord) => void;
}

export function AdmissionTable({ records, onView, onBedTransfer, onPrint, onCancel }: AdmissionTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead>Admission ID</TableHead>
              <TableHead>Admission Date & Time</TableHead>
              <TableHead>UHID / MR No.</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Age / Gender</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Bed No.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expected Discharge</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((r) => (
              <TableRow key={r.admissionId} className="hover:bg-slate-50/60">
                <TableCell className="font-medium text-blue-600">{r.admissionId}</TableCell>
                <TableCell className="whitespace-nowrap text-slate-500">{r.admissionDateTime}</TableCell>
                <TableCell className="text-slate-500">{r.uhid}</TableCell>
                <TableCell className="font-medium text-slate-800">{r.patientName}</TableCell>
                <TableCell className="text-slate-500">{r.age} Y / {r.gender}</TableCell>
                <TableCell className="text-slate-500">{r.department}</TableCell>
                <TableCell>
                  <p className="text-slate-700">{r.packageName} ({r.packageDays} Days)</p>
                  <p className="text-xs text-slate-400">₹ {r.packageRate.toLocaleString("en-IN")}/Day</p>
                </TableCell>
                <TableCell>
                  <p className="text-slate-700">{r.floor}</p>
                  <p className="text-xs text-slate-400">{r.roomNo} / {r.bedNo}</p>
                </TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="whitespace-nowrap text-slate-500">{r.expectedDischarge}</TableCell>
                <TableCell>
                  <RowActions record={r} onView={onView} onBedTransfer={onBedTransfer} onPrint={onPrint} onCancel={onCancel} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile / tablet card list */}
      <div className="space-y-3 lg:hidden">
        {records.map((r) => (
          <div key={r.admissionId} className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">{r.admissionId}</p>
                <p className="text-xs text-slate-400">{r.admissionDateTime}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <div><p className="text-xs text-slate-400">Patient</p><p className="font-medium text-slate-800">{r.patientName}</p></div>
              <div><p className="text-xs text-slate-400">Age / Gender</p><p className="text-slate-700">{r.age} Y / {r.gender}</p></div>
              <div><p className="text-xs text-slate-400">Department</p><p className="text-slate-700">{r.department}</p></div>
              <div><p className="text-xs text-slate-400">Package</p><p className="text-slate-700">{r.packageName} ({r.packageDays}D)</p></div>
              <div><p className="text-xs text-slate-400">Bed</p><p className="text-slate-700">{r.roomNo} / {r.bedNo}</p></div>
              <div><p className="text-xs text-slate-400">Expected Discharge</p><p className="text-slate-700">{r.expectedDischarge}</p></div>
            </div>
            <div className="mt-3 flex justify-end border-t border-slate-100 pt-2">
              <RowActions record={r} onView={onView} onBedTransfer={onBedTransfer} onPrint={onPrint} onCancel={onCancel} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}