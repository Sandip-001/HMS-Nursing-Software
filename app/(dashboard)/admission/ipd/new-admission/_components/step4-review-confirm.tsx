// app/ipd/new-admission/_components/step4-review-confirm.tsx
"use client";

import { toast } from "sonner";
import { User, Wallet, BedDouble, AlertTriangle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewInfoCard } from "./review-info-card";
import { ImportantInstructionsCard } from "./important-instructions-card";
import { ConfirmAdmissionDialog } from "./confirm-admission-dialog";
import type { PatientInfoFormValues, PackageInfoFormValues, BedAllocationFormValues } from "@/lib/admission-schema";

interface Step4ReviewConfirmProps {
  patientInfo: PatientInfoFormValues | null;
  packageInfo: PackageInfoFormValues | null;
  bedAllocation: BedAllocationFormValues | null;
  onEditStep: (step: 1 | 2 | 3) => void;
  onConfirm: () => void;
  onSaveDraft?: () => void;
  onBack?: () => void;
}

export function Step4ReviewConfirm({
  patientInfo,
  packageInfo,
  bedAllocation,
  onEditStep,
  onConfirm,
  onSaveDraft,
  onBack,
}: Step4ReviewConfirmProps) {
  const canConfirm = Boolean(patientInfo && packageInfo && bedAllocation);

  async function handleConfirm() {
    if (!canConfirm) {
      toast.error("Incomplete admission details", {
        description: "Please complete all previous steps before confirming.",
      });
      return;
    }
    console.log("Admission confirmed:", { patientInfo, packageInfo, bedAllocation });
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Admission confirmed successfully", {
      description: "Bed reserved and admission record created.",
    });
    onConfirm();
  }

  function handleSaveDraft() {
    console.log("Draft saved at review step:", { patientInfo, packageInfo, bedAllocation });
    toast.info("Saved as draft");
    onSaveDraft?.();
  }

  const balance = (packageInfo?.totalEstimatedAmount ?? 0) - (packageInfo?.advanceAmount ?? 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Review &amp; Confirm Admission Details</h2>
          <p className="text-sm text-slate-400">Please review all the details below before confirming the admission.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
          <Printer className="h-4 w-4" /> Print Preview
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ReviewInfoCard
          icon={User}
          title="1. Patient & Admission Information"
          onEdit={() => onEditStep(1)}
          fields={[
            { label: "UHID", value: patientInfo?.uhid || "—" },
            { label: "OPD / MR No.", value: patientInfo?.opdMrNo || "—" },
            { label: "Patient Name", value: patientInfo?.patientName || "—" },
            { label: "Department", value: patientInfo?.department || "—" },
            { label: "Age / Gender", value: patientInfo ? `${patientInfo.age} Y / ${patientInfo.gender}` : "—" },
            { label: "Attending Doctor", value: patientInfo?.attendingDoctor || "—" },
            { label: "Mobile No.", value: patientInfo?.mobile || "—" },
            { label: "Admission Type", value: patientInfo?.admissionType || "—" },
            { label: "Address", value: patientInfo?.address || "—" },
            { label: "Priority", value: patientInfo?.priority || "—" },
            { label: "Admission Date & Time", value: "20 May 2024, 11:30 AM", fullWidth: true },
          ]}
        />

        <ReviewInfoCard
          icon={Wallet}
          title="2. Package & Payment Information"
          onEdit={() => onEditStep(2)}
          fields={[
            { label: "Package Selected", value: packageInfo ? `${packageInfo.packageName} (${packageInfo.expectedStayDays} Days)` : "—" },
            { label: "Package Rate", value: packageInfo ? `₹ ${packageInfo.packageRate.toLocaleString("en-IN")} Per Day` : "—" },
            { label: "Expected Stay (Days)", value: packageInfo ? `${packageInfo.expectedStayDays}` : "—" },
            { label: "Total Estimated Amount", value: packageInfo ? `₹ ${packageInfo.totalEstimatedAmount.toLocaleString("en-IN")}` : "—" },
            { label: "Advance Paid", value: packageInfo ? `₹ ${packageInfo.advanceAmount.toLocaleString("en-IN")}` : "—" },
            { label: "Payment Mode", value: packageInfo?.paymentMode || "—" },
            { label: "Transaction / Receipt No.", value: packageInfo?.transactionNo || "—" },
            { label: "Payment Date", value: packageInfo?.paymentDate || "—" },
          ]}
        />

        <ReviewInfoCard
          icon={BedDouble}
          title="3. Bed Allocation Details"
          onEdit={() => onEditStep(3)}
          fields={[
            { label: "Floor / Ward", value: bedAllocation ? `${bedAllocation.floor} / ${bedAllocation.wardRoomType}` : "—" },
            { label: "Room No.", value: bedAllocation?.roomNo || "—" },
            { label: "Bed No.", value: bedAllocation?.bedNo || "—" },
            { label: "Bed Type", value: bedAllocation?.bedType || "—" },
            { label: "Bed Charges", value: bedAllocation ? `₹ ${Number(bedAllocation.bedCharges).toLocaleString("en-IN")} Per Day` : "—" },
            { label: "Patient Isolated Bed", value: bedAllocation?.isolatedBed ? "Yes" : "No" },
            { label: "Special Instructions / Remarks", value: bedAllocation?.specialInstructions || "—" },
            { label: "Expected Discharge Date", value: bedAllocation?.expectedDischargeDate || "—" },
          ]}
        />

        <ImportantInstructionsCard />
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          By confirming this admission, the bed will be reserved for the patient and the admission process will be completed.
        </span>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50"
          onClick={onBack}
        >
          ← Back to Bed Allocation
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <ConfirmAdmissionDialog onConfirm={handleConfirm} disabled={!canConfirm} />
        </div>
      </div>
    </div>
  );
}