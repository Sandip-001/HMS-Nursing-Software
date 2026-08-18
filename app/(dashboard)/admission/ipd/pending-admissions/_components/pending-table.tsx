// app/ipd/admission-list/pending/_components/pending-table.tsx
"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CurrentStepBadge } from "./current-step-badge";
import { PriorityBadge } from "./priority-badge";
import { PendingRowActions } from "./pending-row-actions";
import type { PendingAdmissionRecord } from "@/types/pending-admission-types";

interface PendingTableProps {
  records: PendingAdmissionRecord[];
  onView: (r: PendingAdmissionRecord) => void;
  onCancel: (r: PendingAdmissionRecord) => void;
}

export function PendingTable({ records, onView, onCancel }: PendingTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto xl:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead>Admission ID</TableHead>
              <TableHead>Admission Date & Time</TableHead>
              <TableHead>UHID / MR No.</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Age / Gender</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Current Step</TableHead>
              <TableHead>Pending Since</TableHead>
              <TableHead>Priority</TableHead>
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
                <TableCell><CurrentStepBadge step={r.currentStep} /></TableCell>
                <TableCell className="whitespace-nowrap">
                  <p className="text-slate-700">{r.pendingSinceDateTime}</p>
                  <p className="text-xs text-slate-400">({r.pendingDuration})</p>
                </TableCell>
                <TableCell><PriorityBadge priority={r.priority} /></TableCell>
                <TableCell>
                  <PendingRowActions record={r} onView={onView} onCancel={onCancel} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile / tablet card list */}
      <div className="space-y-3 xl:hidden">
        {records.map((r) => (
          <div key={r.admissionId} className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">{r.admissionId}</p>
                <p className="text-xs text-slate-400">{r.admissionDateTime}</p>
              </div>
              <PriorityBadge priority={r.priority} />
            </div>
            <div className="mb-3">
              <CurrentStepBadge step={r.currentStep} />
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <div><p className="text-xs text-slate-400">Patient</p><p className="font-medium text-slate-800">{r.patientName}</p></div>
              <div><p className="text-xs text-slate-400">Age / Gender</p><p className="text-slate-700">{r.age} Y / {r.gender}</p></div>
              <div><p className="text-xs text-slate-400">Department</p><p className="text-slate-700">{r.department}</p></div>
              <div><p className="text-xs text-slate-400">Doctor</p><p className="text-slate-700">{r.attendingDoctor}</p></div>
              <div className="col-span-2">
                <p className="text-xs text-slate-400">Pending Since</p>
                <p className="text-slate-700">{r.pendingSinceDateTime} <span className="text-slate-400">({r.pendingDuration})</span></p>
              </div>
            </div>
            <div className="mt-3 flex justify-end border-t border-slate-100 pt-2">
              <PendingRowActions record={r} onView={onView} onCancel={onCancel} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}