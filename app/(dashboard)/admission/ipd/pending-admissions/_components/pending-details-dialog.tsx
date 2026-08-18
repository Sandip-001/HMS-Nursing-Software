
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ClipboardList, User, Wallet, BedDouble, Printer, ArrowRight, Clock, AlertTriangle,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdmissionProgressTracker } from "./admission-progress-tracker";
import { DetailRow } from "./detail-row";
import { CurrentStepBadge } from "./current-step-badge";
import { PriorityBadge } from "./priority-badge";
import type { PendingAdmissionRecord, PendingStep } from "@/types/pending-admission-types";

interface PendingDetailsDialogProps {
  admission: PendingAdmissionRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stepRouteMap: Record<PendingStep, string> = {
  "Awaiting Package & Payment": "package-payment",
  "Awaiting Bed Allocation": "bed-allocation",
  "Awaiting Review & Confirm": "review-confirm",
};

// Mock: fields already captured, filled progressively as steps complete.
// Replace with real data fetched per admissionId.
function getMockCapturedData(r: PendingAdmissionRecord) {
  const stepIndexMap: Record<PendingStep, number> = {
    "Awaiting Package & Payment": 0,
    "Awaiting Bed Allocation": 1,
    "Awaiting Review & Confirm": 2,
  };
  const idx = stepIndexMap[r.currentStep];

  return {
    patient: {
      uhid: r.uhid,
      patientName: r.patientName,
      age: r.age,
      gender: r.gender,
      department: r.department,
      attendingDoctor: r.attendingDoctor,
      mobile: "98765XXXXX",
      admissionType: "Elective",
    },
    package: idx >= 1 ? {
      packageName: "General Package (5 Days)",
      packageRate: 15000,
      advanceAmount: 37500,
      paymentMode: "Cash",
    } : null,
    bed: idx >= 2 ? {
      floor: "3rd Floor",
      ward: "General Ward",
      roomNo: "302",
      bedNo: "B-02",
    } : null,
  };
}

export function PendingDetailsDialog({ admission, open, onOpenChange }: PendingDetailsDialogProps) {
  const router = useRouter();
  if (!admission) return null;

  const data = getMockCapturedData(admission);

  function handleContinue() {
    console.log("Resume admission:", admission?.admissionId, "at", admission?.currentStep);
    toast.info(`Resuming admission at "${admission?.currentStep}"`);
    router.push(`/admission/ipd/new-admission?admissionId=${admission?.admissionId}&step=${stepRouteMap[admission!.currentStep]}`);
  }

  function handlePrint() {
    console.log("Print pending admission:", admission?.admissionId);
    toast.success("Preparing print view...");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="!w-[92vw] !max-w-[820px] max-h-[88vh] flex flex-col gap-0 overflow-hidden p-0"
      >
        {/* Header */}
        <DialogHeader className="shrink-0 border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-base font-semibold text-slate-800 sm:text-lg">
              <ClipboardList className="h-5 w-5 shrink-0 text-blue-600" />
              Pending Admission Details
            </DialogTitle>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handlePrint}>
              <Printer className="h-3.5 w-3.5" /> Print
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <div className="mx-auto w-full max-w-[720px] space-y-5">
            {/* ID + badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500">Admission ID :</span>
              <span className="text-sm font-bold text-slate-800">{admission.admissionId}</span>
              <CurrentStepBadge step={admission.currentStep} />
              <PriorityBadge priority={admission.priority} />
            </div>

            {/* Progress tracker card */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-800">Admission Progress</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <AdmissionProgressTracker currentStep={admission.currentStep} />
              </CardContent>
            </Card>

            {/* Pending since alert */}
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Pending since <strong>{admission.pendingSinceDateTime}</strong> — waiting for{" "}
                <strong>{admission.currentStep}</strong> for <strong>{admission.pendingDuration}</strong>.
              </span>
            </div>

            {/* Patient Info — always captured (step 1 complete) */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <User className="h-4 w-4 text-blue-600" /> Patient Information
                </CardTitle>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">Completed</span>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4 sm:grid-cols-3">
                <DetailRow label="UHID" value={data.patient.uhid} />
                <DetailRow label="Patient Name" value={data.patient.patientName} />
                <DetailRow label="Age / Gender" value={`${data.patient.age} Y / ${data.patient.gender}`} />
                <DetailRow label="Department" value={data.patient.department} />
                <DetailRow label="Attending Doctor" value={data.patient.attendingDoctor} />
                <DetailRow label="Admission Type" value={data.patient.admissionType} />
              </CardContent>
            </Card>

            {/* Package & Payment — conditional */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Wallet className="h-4 w-4 text-blue-600" /> Package & Payment Details
                </CardTitle>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${data.package ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                  {data.package ? "Completed" : "Not Started"}
                </span>
              </CardHeader>
              <CardContent className="pt-4">
                {data.package ? (
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                    <DetailRow label="Package" value={data.package.packageName} />
                    <DetailRow label="Package Rate" value={`₹ ${data.package.packageRate.toLocaleString("en-IN")} Per Day`} />
                    <DetailRow label="Advance Paid" value={`₹ ${data.package.advanceAmount.toLocaleString("en-IN")}`} />
                    <DetailRow label="Payment Mode" value={data.package.paymentMode} />
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">This step has not been completed yet.</p>
                )}
              </CardContent>
            </Card>

            {/* Bed Allocation — conditional */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <BedDouble className="h-4 w-4 text-blue-600" /> Bed Allocation Details
                </CardTitle>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${data.bed ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                  {data.bed ? "Completed" : "Not Started"}
                </span>
              </CardHeader>
              <CardContent className="pt-4">
                {data.bed ? (
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                    <DetailRow label="Floor / Ward" value={`${data.bed.floor} / ${data.bed.ward}`} />
                    <DetailRow label="Room No." value={data.bed.roomNo} />
                    <DetailRow label="Bed No." value={data.bed.bedNo} />
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">This step has not been completed yet.</p>
                )}
              </CardContent>
            </Card>

            {/* Blocking notice */}
            <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              Complete the remaining steps to finalize this admission and reserve the bed permanently.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleContinue}>
            Continue Admission <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}