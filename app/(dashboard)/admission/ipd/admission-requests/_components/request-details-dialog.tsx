
"use client";

import { toast } from "sonner";
import { User, ClipboardList, Stethoscope, BedDouble, Paperclip } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestStatusBadge } from "./request-status-badge";
import { RequestPriorityBadge } from "./request-priority-badge";
import { RequestDetailField } from "./request-detail-field";
import { DocumentItem } from "./document-item";
import type { AdmissionRequestDetail, AttachedDocument } from "@/types/admission-request-types";

interface RequestDetailsDialogProps {
  request: AdmissionRequestDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestDetailsDialog({ request, open, onOpenChange }: RequestDetailsDialogProps) {
  if (!request) return null;

  function handleDownload(doc: AttachedDocument) {
    console.log("Download document:", doc.fileName);
    toast.success(`Downloading ${doc.fileName}...`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="!w-[92vw] !max-w-[820px] max-h-[88vh] flex flex-col gap-0 overflow-hidden p-0"
      >
        {/* Header */}
        <DialogHeader className="shrink-0 border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-base font-semibold text-blue-700 sm:text-lg">
              Admission Request Details
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <div className="mx-auto w-full max-w-[720px] space-y-5">
            {/* Status row */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-2.5">
              <div className="flex flex-wrap items-center gap-3">
                <RequestStatusBadge status={request.requestStatus} />
                <span className="text-sm text-slate-500">
                  Request ID : <span className="font-semibold text-slate-800">{request.requestId}</span>
                </span>
              </div>
              <span className="text-xs text-slate-400">Requested On : {request.requestDateTime}</span>
            </div>

            {/* Row 1: Patient Info + Request Info */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <User className="h-4 w-4 text-blue-600" /> Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-4 sm:grid-cols-2">
                  <RequestDetailField label="UHID" value={request.uhid} />
                  <RequestDetailField label="Patient Name" value={request.patientName} />
                  <RequestDetailField label="Age / Gender" value={`${request.age} Y / ${request.gender}`} />
                  <RequestDetailField label="Mobile No." value={request.mobile} />
                  <RequestDetailField label="Email" value={request.email} fullWidth />
                  <RequestDetailField label="Address" value={request.address} fullWidth />
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <ClipboardList className="h-4 w-4 text-blue-600" /> Request Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-4 sm:grid-cols-2">
                  <RequestDetailField label="Request Date & Time" value={request.requestDateTime} fullWidth />
                  <RequestDetailField
                    label="Requested By"
                    value={<>{request.requestedByLocation}<br />{request.requestedByDoctor}</>}
                  />
                  <RequestDetailField label="Department" value={request.department} />
                  <RequestDetailField label="Priority" value={<RequestPriorityBadge priority={request.priority} />} />
                  <RequestDetailField label="Request Status" value={<RequestStatusBadge status={request.requestStatus} />} />
                  <RequestDetailField label="Requested For" value={request.requestedFor} fullWidth />
                </CardContent>
              </Card>
            </div>

            {/* Row 2: Clinical Info + Admission Preference */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Stethoscope className="h-4 w-4 text-blue-600" /> Clinical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <RequestDetailField label="Provisional Diagnosis" value={request.provisionalDiagnosis} />
                  <RequestDetailField label="Symptoms" value={request.symptoms} />
                  <RequestDetailField label="Referred From" value={request.referredFrom} />
                  <RequestDetailField label="Remarks" value={request.clinicalRemarks} />
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <BedDouble className="h-4 w-4 text-blue-600" /> Admission Preference
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <RequestDetailField label="Preferred Ward Type" value={request.preferredWardType} />
                  <RequestDetailField label="Preferred Bed Type" value={request.preferredBedType} />
                  <RequestDetailField label="Preferred Floor" value={request.preferredFloor} />
                  <RequestDetailField label="Special Request" value={request.specialRequest} />
                </CardContent>
              </Card>
            </div>

            {/* Documents */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Paperclip className="h-4 w-4 text-blue-600" /> Documents Attached ({request.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
                {request.documents.map((doc) => (
                  <DocumentItem key={doc.fileName} doc={doc} onDownload={handleDownload} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-center border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
          <Button variant="outline" className="w-full max-w-xs" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}