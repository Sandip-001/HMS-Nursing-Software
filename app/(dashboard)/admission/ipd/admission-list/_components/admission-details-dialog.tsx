// app/ipd/admission-list/_components/admission-details-dialog.tsx
"use client";

import { toast } from "sonner";
import {
  User, ClipboardList, Wallet, BedDouble, Receipt, Info, ArrowRight,
  Printer, FileText, ArrowLeftRight,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { DetailCard } from "./detail-card";
import { StatusBadge } from "./status-badge";
import { AdmissionDetail } from "@/types/admission-list-types";


interface AdmissionDetailsDialogProps {
  admission: AdmissionDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdmissionDetailsDialog({ admission, open, onOpenChange }: AdmissionDetailsDialogProps) {
  if (!admission) return null;

  const registrationCharges = 500;
  const admissionCharges = 1000;
  const otherCharges = 0;
  const packageTotal = admission.packageRate * admission.packageDays;
  const balance = packageTotal - admission.advanceAmount;
  const grandTotal = packageTotal + registrationCharges + admissionCharges + otherCharges;
  const grandBalance = grandTotal - admission.advanceAmount;

  function log(action: string) {
    console.log(action, admission?.admissionId);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="!w-[92vw] !max-w-[1100px] max-h-[88vh] flex flex-col gap-0 overflow-hidden p-0 sm:!w-[90vw] lg:!w-[1100px]"
      >
        {/* Sticky Header */}
        <DialogHeader className="shrink-0 border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-base font-semibold text-slate-800 sm:text-lg">
              <ClipboardList className="h-5 w-5 shrink-0 text-blue-600" />
              Admission Details
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                log("Print admission:");
                toast.success("Preparing print view...");
              }}
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <div className="mx-auto w-full max-w-[1000px] space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500">Admission ID :</span>
              <span className="text-sm font-bold text-slate-800">{admission.admissionId}</span>
              <StatusBadge status={admission.status} />
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <DetailCard
                icon={User}
                title="Patient Information"
                actionLabel="Edit"
                onAction={() => { log("Edit patient info:"); toast.info("Opening patient info editor..."); }}
                fields={[
                  { label: "UHID", value: admission.uhid },
                  { label: "OPD / MR No.", value: admission.opdMrNo },
                  { label: "Patient Name", value: admission.patientName },
                  { label: "Department", value: admission.department },
                  { label: "Age / Gender", value: `${admission.age} Y / ${admission.gender}` },
                  { label: "Attending Doctor", value: admission.attendingDoctor },
                  { label: "Mobile No.", value: admission.mobile },
                  { label: "Admission Type", value: admission.admissionType },
                  { label: "Email", value: admission.email },
                  { label: "Priority", value: admission.priority },
                  { label: "Address", value: admission.address, fullWidth: true },
                ]}
              />

              <DetailCard
                icon={ClipboardList}
                title="Admission Information"
                fields={[
                  { label: "Admission Date & Time", value: admission.admissionDateTime },
                  { label: "Admission Status", value: <StatusBadge status={admission.status} /> },
                  { label: "Expected Discharge Date", value: admission.expectedDischarge },
                  { label: "Admission Source", value: admission.admissionSource },
                  { label: "Referred By", value: admission.referredBy },
                  { label: "Remarks", value: admission.remarks || "-" },
                ]}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <DetailCard
                icon={Wallet}
                title="Package & Payment Details"
                actionLabel="Invoice"
                actionIcon={FileText}
                onAction={() => { log("View invoice:"); toast.info("Opening invoice..."); }}
                fields={[
                  { label: "Package", value: `${admission.packageName} Package (${admission.packageDays} Days)` },
                  { label: "Advance Paid", value: `₹ ${admission.advanceAmount.toLocaleString("en-IN")}` },
                  { label: "Package Rate", value: `₹ ${admission.packageRate.toLocaleString("en-IN")} Per Day` },
                  { label: "Payment Mode", value: admission.paymentMode },
                  { label: "Expected Stay (Days)", value: `${admission.packageDays} Days` },
                  { label: "Transaction / Receipt No.", value: admission.transactionNo },
                  { label: "Total Estimated Amount", value: `₹ ${packageTotal.toLocaleString("en-IN")}` },
                  { label: "Payment Date", value: admission.paymentDate },
                ]}
                footer={
                  <div className="sm:col-span-2">
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <p className="text-xs text-slate-500">Balance Amount</p>
                      <p className="text-lg font-bold text-emerald-600">₹ {balance.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                }
              />

              <DetailCard
                icon={BedDouble}
                title="Bed Allocation Details"
                actionLabel="Transfer"
                actionIcon={ArrowLeftRight}
                onAction={() => { log("Transfer bed:"); toast.info("Opening bed transfer..."); }}
                fields={[
                  { label: "Floor / Ward", value: `${admission.floor} / General Ward` },
                  { label: "Room No.", value: admission.roomNo },
                  { label: "Bed No.", value: admission.bedNo },
                  { label: "Bed Type", value: "General Bed" },
                  { label: "Bed Charges", value: `₹ ${admission.packageRate.toLocaleString("en-IN")} Per Day` },
                  { label: "Patient Isolated Bed", value: admission.isolatedBed ? "Yes" : "No" },
                  { label: "Special Instructions / Remarks", value: admission.specialInstructions || "-", fullWidth: true },
                  { label: "Expected Discharge Date", value: admission.expectedDischarge },
                ]}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-slate-200 shadow-sm">
                <SectionHeader icon={Receipt} title="Breakup of Charges" actionLabel="View Details" onAction={() => { log("View breakup:"); toast.info("Opening full breakup..."); }} />
                <CardContent className="space-y-2.5 pt-3 text-sm">
                  <Row label={`Package Charges (${admission.packageDays} Days)`} value={`₹ ${packageTotal.toLocaleString("en-IN")}`} />
                  <Row label="Registration Charges" value={`₹ ${registrationCharges.toLocaleString("en-IN")}`} />
                  <Row label="Admission Charges" value={`₹ ${admissionCharges.toLocaleString("en-IN")}`} />
                  <Row label="Other Charges (Estimated)" value={`₹ ${otherCharges.toLocaleString("en-IN")}`} />
                  <hr className="my-1 border-slate-100" />
                  <Row label="Total Estimated Amount" value={`₹ ${grandTotal.toLocaleString("en-IN")}`} />
                  <Row label="Advance Paid" value={`- ₹ ${admission.advanceAmount.toLocaleString("en-IN")}`} />
                  <hr className="my-1 border-slate-100" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-600">Balance Amount</span>
                    <span className="font-bold text-emerald-600">₹ {grandBalance.toLocaleString("en-IN")}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <SectionHeader icon={Info} title="Important Information" />
                <CardContent className="space-y-2.5 pt-3">
                  {[
                    "Patient has been admitted successfully.",
                    "Bed has been allocated and reserved.",
                    "Advance payment has been collected.",
                    "Admission record has been created.",
                    "All departments have been notified.",
                    "Patient can now be transferred to the ward.",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {t}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <SectionHeader icon={ArrowRight} title="Next Steps" />
                <CardContent className="space-y-2.5 pt-3">
                  {[
                    "Transfer patient to the ward",
                    "Nursing assessment to be completed",
                    "Doctor assessment and orders to follow",
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toast.info(t)}
                      className="flex w-full items-start gap-2 text-left text-xs font-medium text-blue-600 hover:underline"
                    >
                      <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" /> {t}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Audit footer */}
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-blue-50/60 px-4 py-3 text-xs sm:grid-cols-3">
              <div>
                <p className="text-slate-400">Created By</p>
                <p className="font-semibold text-slate-700">{admission.createdBy}</p>
                <p className="text-slate-400">{admission.createdAt}</p>
              </div>
              <div>
                <p className="text-slate-400">Last Updated By</p>
                <p className="font-semibold text-slate-700">{admission.lastUpdatedBy}</p>
                <p className="text-slate-400">{admission.lastUpdatedAt}</p>
              </div>
              <div>
                <p className="text-slate-400">Total Updates</p>
                <p className="font-semibold text-slate-700">{admission.totalUpdates}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex shrink-0 justify-center border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
          <Button variant="outline" className="w-full max-w-xs" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionHeader({
  icon: Icon, title, actionLabel, onAction,
}: { icon: LucideIcon; title: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
      <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <Icon className="h-4 w-4 shrink-0 text-blue-600" />
        {title}
      </CardTitle>
      {actionLabel && (
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </CardHeader>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-slate-600">
      <span>{label}</span>
      <span className="text-right font-medium text-slate-800">{value}</span>
    </div>
  );
}