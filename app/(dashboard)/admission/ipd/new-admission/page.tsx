// app/ipd/new-admission/page.tsx
"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearch, ClipboardList, Bed, FileText } from "lucide-react";
import type {
  BedAllocationFormValues,
  PackageInfoFormValues,
  PatientInfoFormValues,
} from "@/lib/admission-schema";
import { AdmissionStepper } from "./_components/admission-stepper";
import { AdmissionWorkflowChecklist } from "./_components/admission-workflow-checklist";
import { RecentAdmissionsCard } from "./_components/recent-admissions-card";
import { Step1PatientInfo } from "./_components/step1-patient-info";
import { toast } from "sonner";
import { Step2PackagePayment } from "./_components/step2-package-payment";
import { Step2Sidebar } from "./_components/step-2-rightmenu";
import { Step3Sidebar } from "./_components/step3-rightmenu";
import { Step3BedAllocation } from "./_components/step3-bed-allocation";
import { PatientInfoBar } from "./_components/patient-info-bar";
import { Step4Sidebar } from "./_components/step4-rightmenu";
import { Step4ReviewConfirm } from "./_components/step4-review-confirm";
import { useRouter } from "next/navigation";
import { Step5AdmissionComplete } from "./_components/step5-admission-complete";
import { Step5Sidebar } from "./_components/step5-rightmenu";

export default function NewAdmissionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState<PatientInfoFormValues | null>(
    null,
  );
  const [packageInfo, setPackageInfo] = useState<PackageInfoFormValues | null>(
    null,
  );

  const [bedAllocation, setBedAllocation] =
    useState<BedAllocationFormValues | null>(null);
  const [bedDraft, setBedDraft] = useState<Partial<BedAllocationFormValues>>(
    {},
  );

  const [admissionId] = useState("ADM240520-0017");

  function handleStep1Submit(values: PatientInfoFormValues) {
    console.log("Patient info saved:", values);
    setPatientInfo(values);
    toast.success("Patient & admission info saved", {
      description: "Proceeding to package & payment.",
    });
    setCurrentStep(2);
  }

  function handleStep2Submit(values: PackageInfoFormValues) {
    console.log("Package & payment saved:", values);
    setPackageInfo(values);
    setCurrentStep(3); // Step 3: Bed Allocation (next)
  }

  function handleStep3Submit(values: BedAllocationFormValues) {
    console.log("Bed allocation saved:", values);
    setBedAllocation(values);
    setCurrentStep(4);
  }

  const liveTotal = packageInfo?.totalEstimatedAmount ?? 0;
  const liveAdvance = packageInfo?.advanceAmount ?? 0;

  function handleGoToAdmissionList() {
    router.push("/admission/ipd/admission-list");
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-7xl space-y-6">
        <AdmissionStepper currentStep={currentStep} />

        {currentStep === 1 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left: main form column */}
            <div className="space-y-6">
              <Step1PatientInfo
                defaultValues={patientInfo ?? undefined}
                onSubmit={handleStep1Submit}
                onSaveDraft={(vals) => {
                  console.log("Draft saved:", vals);
                  toast.info("Saved as draft");
                }}
                onCancel={() => toast.error("Admission cancelled")}
              />

              <AdmissionWorkflowChecklist
                items={[
                  {
                    label: "Patient Information",
                    sublabel: "Collect & verify patient details",
                    status: "completed",
                  },
                  {
                    label: "Clinical Information",
                    sublabel: "Diagnosis & clinical details",
                    status: "completed",
                  },
                  {
                    label: "Package Selection",
                    sublabel: "Select suitable IPD package",
                    status: "pending",
                  },
                  {
                    label: "Deposit Collection",
                    sublabel: "Collect advance payment",
                    status: "pending",
                  },
                  {
                    label: "Bed Allocation",
                    sublabel: "Check availability & allocate bed",
                    status: "pending",
                  },
                ]}
              />
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-slate-800">
                    Admission Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5 text-sm">
                  <SummaryRow
                    label="Admission Date & Time"
                    value="20 May 2024, 11:30 AM"
                  />
                  <SummaryRow
                    label="Referred By"
                    value={patientInfo?.referredBy || "—"}
                  />
                  <SummaryRow
                    label="Department"
                    value={patientInfo?.department || "General Medicine"}
                  />
                  <SummaryRow
                    label="Admission Type"
                    value={patientInfo?.admissionType || "Elective"}
                  />
                  <SummaryRow
                    label="Priority"
                    value={patientInfo?.priority || "Normal"}
                  />
                  <SummaryRow
                    label="Attending Doctor"
                    value={patientInfo?.attendingDoctor || "—"}
                  />
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-slate-800">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 text-xs"
                  >
                    <FileSearch className="h-4 w-4" /> Check Bed Availability
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 text-xs"
                  >
                    <ClipboardList className="h-4 w-4" /> Estimate Admission
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 text-xs"
                  >
                    <Bed className="h-4 w-4" /> Estimate IPD Package
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 text-xs"
                  >
                    <FileText className="h-4 w-4" /> Print Admission Request
                  </Button>
                </CardContent>
              </Card>

              <RecentAdmissionsCard />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <Step2PackagePayment
                defaultValues={packageInfo ?? undefined}
                onSubmit={handleStep2Submit}
                onBack={() => setCurrentStep(1)}
              />
            </div>

            <div>
              <Step2Sidebar
                patientInfo={patientInfo}
                packageInfo={packageInfo}
                liveTotal={liveTotal || 75000}
                liveAdvance={liveAdvance || 37500}
                onEditPatientInfo={() => setCurrentStep(1)}
                onViewBreakup={() =>
                  toast.info("Charges breakup", {
                    description: "Full breakdown coming soon.",
                  })
                }
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <PatientInfoBar patientInfo={patientInfo} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
              <div>
                <Step3BedAllocation
                  patientInfo={patientInfo}
                  defaultValues={bedAllocation ?? undefined}
                  onSubmit={handleStep3Submit}
                  onBack={() => setCurrentStep(2)}
                  onHoldBed={(vals) => setBedDraft(vals)}
                />
              </div>
              <div>
                <Step3Sidebar
                  patientInfo={patientInfo}
                  packageInfo={packageInfo}
                  bedDraft={bedDraft}
                  onEdit={() => setCurrentStep(1)}
                  onRefresh={() => toast.info("Bed availability refreshed")}
                  onHoldBed={() =>
                    toast.info("Select a bed in the grid to hold it")
                  }
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <Step4ReviewConfirm
                patientInfo={patientInfo}
                packageInfo={packageInfo}
                bedAllocation={bedAllocation}
                onEditStep={(step) => setCurrentStep(step)}
                onConfirm={() => setCurrentStep(5)}
                onSaveDraft={() => toast.info("Saved as draft")}
                onBack={() => setCurrentStep(3)}
              />
            </div>
            <div>
              <Step4Sidebar
                patientInfo={patientInfo}
                packageInfo={packageInfo}
                bedAllocation={bedAllocation}
                referenceId={admissionId}
                onPrintSummary={() =>
                  toast.info("Preparing summary for print...")
                }
                onSendEmail={() => toast.success("Summary sent via email")}
                onViewBreakupDetails={() =>
                  toast.info("Full charges breakup", {
                    description: "Detailed view coming soon.",
                  })
                }
              />
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <Step5AdmissionComplete
                admissionId={admissionId}
                admissionDateTime="20 May 2024, 11:30 AM"
                patientInfo={patientInfo}
                packageInfo={packageInfo}
                bedAllocation={bedAllocation}
                onGoToAdmissionList={handleGoToAdmissionList}
              />
            </div>
            <div>
              <Step5Sidebar
                admissionId={admissionId}
                admissionDateTime="20 May 2024, 11:30 AM"
                patientInfo={patientInfo}
                packageInfo={packageInfo}
                onViewBreakup={() =>
                  toast.info("Full charges breakup coming soon")
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
