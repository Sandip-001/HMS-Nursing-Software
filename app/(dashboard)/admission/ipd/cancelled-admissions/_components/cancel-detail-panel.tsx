
"use client";

import { toast } from "sonner";
import { Eye, Download, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancelStatusBadge } from "./cancel-status-badge";
import type { CancelledAdmissionRecord } from "@/types/cancel-admission-types";

interface CancelDetailPanelProps {
  record: CancelledAdmissionRecord | null;
}

export function CancelDetailPanel({ record }: CancelDetailPanelProps) {
  if (!record) {
    return (
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center text-slate-400">
          <Eye className="h-8 w-8" />
          <p className="text-sm">Select a request to view cancellation details</p>
        </CardContent>
      </Card>
    );
  }

  const initials = record.patientName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  function handleViewRequest() {
    console.log("View request:", record?.requestId);
    toast.info(`Opening full request for ${record?.requestId}`);
  }

  function handleDownloadPdf() {
    console.log("Download PDF:", record?.requestId);
    toast.success(`Downloading cancellation summary for ${record?.requestId}...`);
  }

  return (
    <div className="space-y-4 lg:sticky lg:top-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
          <CardTitle className="text-sm font-semibold text-slate-800">Cancellation Details</CardTitle>
          <CancelStatusBadge status={record.status} />
        </CardHeader>
        <CardContent className="space-y-5 pt-4">
          {/* Patient row */}
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
              {initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">{record.patientName}</p>
              <p className="text-xs text-slate-400">UHID: {record.uhid} · {record.age} Y / {record.gender}</p>
              <p className="text-xs text-slate-400">{record.mobile}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3 border-t border-slate-100 pt-4 text-sm">
            <FieldRow label="Request ID" value={record.requestId} />
            <FieldRow label="Department" value={record.department} />
            <FieldRow label="Ward / Room" value={record.wardRoom} />
            <FieldRow label="Bed Type" value={record.bedType} />
            <FieldRow label="Package" value={record.packageName} />
            <FieldRow label="Package Amount" value={record.packageAmount ? `₹ ${record.packageAmount.toLocaleString("en-IN")}` : "-"} />
          </div>

          <div className="space-y-3 rounded-lg border border-red-100 bg-red-50/60 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <AlertCircle className="h-3.5 w-3.5" /> Cancellation Information
            </p>
            <FieldRow label="Cancelled On" value={record.cancelledOnDateTime} stacked />
            <FieldRow label="Cancelled By" value={record.cancelledBy} stacked />
            <FieldRow label="Cancelled By Name" value={record.cancelledByName} stacked />
            <FieldRow label="Reason" value={record.reason} stacked />
            <FieldRow label="Remarks" value={record.remarks} stacked />
          </div>
        </CardContent>
      </Card>

      {/* History timeline */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Clock className="h-4 w-4 text-blue-600" /> History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {record.history.map((h, i) => (
            <div key={i} className="flex gap-3 text-xs">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <div>
                <p className="font-medium text-slate-700">{h.dateTime}</p>
                <p className="text-slate-500">{h.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" className="flex-1 gap-2" onClick={handleViewRequest}>
          <Eye className="h-4 w-4" /> View Request
        </Button>
        <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleDownloadPdf}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>
    </div>
  );
}

function FieldRow({ label, value, stacked }: { label: string; value: string; stacked?: boolean }) {
  if (stacked) {
    return (
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    );
  }
  return (
    <>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-right text-sm font-medium text-slate-700">{value}</p>
    </>
  );
}