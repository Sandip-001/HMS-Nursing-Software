// app/ipd/new-admission/_components/step5-admission-complete.tsx
"use client";

import { toast } from "sonner";
import { User, Wallet, BedDouble, FileText, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdmissionSuccessBanner } from "./admission-success-banner";
import { RecapInfoCard } from "./recap-info-card";
import { ImportantInformationCard, NextStepsCard } from "./admission-complete-notes";
import type { PatientInfoFormValues, PackageInfoFormValues, BedAllocationFormValues } from "@/lib/admission-schema";

interface Step5AdmissionCompleteProps {
  admissionId: string;
  admissionDateTime: string;
  patientInfo: PatientInfoFormValues | null;
  packageInfo: PackageInfoFormValues | null;
  bedAllocation: BedAllocationFormValues | null;
  onGoToAdmissionList: () => void;
}

export function Step5AdmissionComplete({
  admissionId,
  admissionDateTime,
  patientInfo,
  packageInfo,
  bedAllocation,
  onGoToAdmissionList,
}: Step5AdmissionCompleteProps) {
  const balance = (packageInfo?.totalEstimatedAmount ?? 0) - (packageInfo?.advanceAmount ?? 0);

  function handleViewSummary() {
    console.log("View admission summary:", admissionId);
    toast.info("Opening admission summary...");
  }

  function handleDownloadSummary() {
    console.log("Download admission summary:", admissionId);
    toast.success("Admission summary downloaded");
  }

  function handleGoToAdmissionList() {
    console.log("Navigating to IPD Admission List");
    toast.success("Redirecting to Admission List");
    onGoToAdmissionList();
  }

  return (
    <div className="space-y-6">
      <AdmissionSuccessBanner
        admissionId={admissionId}
        admissionDateTime={admissionDateTime}
        onPrint={() => toast.info("Preparing print view...")}
      />

      <RecapInfoCard
        icon={User}
        title="Patient Information"
        fields={[
          { label: "UHID", value: patientInfo?.uhid || "—" },
          { label: "Patient Name", value: patientInfo?.patientName || "—" },
          { label: "Age / Gender", value: patientInfo ? `${patientInfo.age} Y / ${patientInfo.gender}` : "—" },
          { label: "Mobile No.", value: patientInfo?.mobile || "—" },
          { label: "Department", value: patientInfo?.department || "—" },
          { label: "Attending Doctor", value: patientInfo?.attendingDoctor || "—" },
        ]}
      />

      <RecapInfoCard
        icon={Wallet}
        title="Admission & Package Details"
        fields={[
          { label: "Admission Type", value: patientInfo?.admissionType || "—" },
          { label: "Package", value: packageInfo ? `${packageInfo.packageName} (${packageInfo.expectedStayDays} Days)` : "—" },
          { label: "Package Rate", value: packageInfo ? `₹ ${packageInfo.packageRate.toLocaleString("en-IN")} Per Day` : "—" },
          { label: "Expected Stay (Days)", value: packageInfo ? `${packageInfo.expectedStayDays} Days` : "—" },
          { label: "Total Estimated Amount", value: packageInfo ? `₹ ${packageInfo.totalEstimatedAmount.toLocaleString("en-IN")}` : "—" },
          { label: "Advance Paid", value: packageInfo ? `₹ ${packageInfo.advanceAmount.toLocaleString("en-IN")}` : "—" },
          { label: "Payment Mode", value: packageInfo?.paymentMode || "—" },
          { label: "Transaction / Receipt No.", value: packageInfo?.transactionNo || "—" },
          { label: "Payment Date", value: packageInfo?.paymentDate || "—" },
          { label: "Balance Amount", value: `₹ ${balance.toLocaleString("en-IN")}`, highlight: true },
        ]}
      />

      <RecapInfoCard
        icon={BedDouble}
        title="Bed Allocation Details"
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

      <ImportantInformationCard />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="gap-2" onClick={handleViewSummary}>
            <FileText className="h-4 w-4" /> View Admission Summary
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleDownloadSummary}>
            <Download className="h-4 w-4" /> Download Admission Summary
          </Button>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleGoToAdmissionList}>
          Go to Admission List <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}