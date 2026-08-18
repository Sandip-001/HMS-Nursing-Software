
"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { RequestStatusBadge } from "./request-status-badge";
import { RequestPriorityBadge } from "./request-priority-badge";
import { RequestRowActions } from "./request-row-actions";
import type { AdmissionRequestRecord } from "@/types/admission-request-types";

interface RequestsTableProps {
  records: AdmissionRequestRecord[];
  onView: (r: AdmissionRequestRecord) => void;
  onApprove: (r: AdmissionRequestRecord) => void;
  onReject: (r: AdmissionRequestRecord) => void;
}

export function RequestsTable({ records, onView, onApprove, onReject }: RequestsTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto xl:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead>Request ID</TableHead>
              <TableHead>Request Date & Time</TableHead>
              <TableHead>Patient Details</TableHead>
              <TableHead>Age / Gender</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Attending Doctor</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Request Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((r) => (
              <TableRow key={r.requestId} className="hover:bg-slate-50/60">
                <TableCell className="font-medium text-blue-600">{r.requestId}</TableCell>
                <TableCell className="whitespace-nowrap text-slate-500">{r.requestDateTime}</TableCell>
                <TableCell>
                  <p className="font-medium text-slate-800">{r.patientName}</p>
                  <p className="text-xs text-slate-400">{r.uhid}</p>
                </TableCell>
                <TableCell className="text-slate-500">{r.age} Y / {r.gender}</TableCell>
                <TableCell className="text-slate-500">{r.department}</TableCell>
                <TableCell className="text-slate-500">{r.attendingDoctor}</TableCell>
                <TableCell>
                  <p className="text-slate-700">{r.requestedByLocation}</p>
                  <p className="text-xs text-slate-400">{r.requestedByDoctor}</p>
                </TableCell>
                <TableCell><RequestStatusBadge status={r.requestStatus} /></TableCell>
                <TableCell><RequestPriorityBadge priority={r.priority} /></TableCell>
                <TableCell>
                  <RequestRowActions record={r} onView={onView} onApprove={onApprove} onReject={onReject} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile / tablet card list */}
      <div className="space-y-3 p-4 xl:hidden">
        {records.map((r) => (
          <div key={r.requestId} className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">{r.requestId}</p>
                <p className="text-xs text-slate-400">{r.requestDateTime}</p>
              </div>
              <RequestPriorityBadge priority={r.priority} />
            </div>
            <div className="mb-3">
              <RequestStatusBadge status={r.requestStatus} />
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <div><p className="text-xs text-slate-400">Patient</p><p className="font-medium text-slate-800">{r.patientName}</p><p className="text-xs text-slate-400">{r.uhid}</p></div>
              <div><p className="text-xs text-slate-400">Age / Gender</p><p className="text-slate-700">{r.age} Y / {r.gender}</p></div>
              <div><p className="text-xs text-slate-400">Department</p><p className="text-slate-700">{r.department}</p></div>
              <div><p className="text-xs text-slate-400">Attending Doctor</p><p className="text-slate-700">{r.attendingDoctor}</p></div>
              <div className="col-span-2">
                <p className="text-xs text-slate-400">Requested By</p>
                <p className="text-slate-700">{r.requestedByLocation} · {r.requestedByDoctor}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end border-t border-slate-100 pt-2">
              <RequestRowActions record={r} onView={onView} onApprove={onApprove} onReject={onReject} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}