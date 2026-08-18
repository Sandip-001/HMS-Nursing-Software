// app/ipd/new-admission/_components/step4-sidebar.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Mail } from "lucide-react";
import type { PatientInfoFormValues, PackageInfoFormValues, BedAllocationFormValues } from "@/lib/admission-schema";

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={bold ? "font-semibold text-blue-700" : "font-medium text-slate-800"}>{value}</span>
    </div>
  );
}

interface Step4SidebarProps {
  patientInfo: PatientInfoFormValues | null;
  packageInfo: PackageInfoFormValues | null;
  bedAllocation: BedAllocationFormValues | null;
  referenceId: string;
  onPrintSummary?: () => void;
  onSendEmail?: () => void;
  onViewBreakupDetails?: () => void;
}

export function Step4Sidebar({
  patientInfo,
  packageInfo,
  bedAllocation,
  referenceId,
  onPrintSummary,
  onSendEmail,
  onViewBreakupDetails,
}: Step4SidebarProps) {
  const packageAmount = packageInfo?.totalEstimatedAmount ?? 0;
  const registrationCharges = 500;
  const admissionCharges = 1000;
  const otherCharges = 0;
  const grandTotal = packageAmount + registrationCharges + admissionCharges + otherCharges;
  const advance = packageInfo?.advanceAmount ?? 0;
  const balance = grandTotal - advance;

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">Admission Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Row label="Reference ID" value={referenceId} />
          <Row label="Admission Date & Time" value="20 May 2024, 11:30 AM" />
          <Row label="Department" value={patientInfo?.department || "—"} />
          <Row label="Attending Doctor" value={patientInfo?.attendingDoctor || "—"} />
          <Row label="Admission Type" value={patientInfo?.admissionType || "—"} />
          <Row label="Package" value={packageInfo ? `${packageInfo.packageName} (${packageInfo.expectedStayDays} Days)` : "—"} />
          <Row label="Expected Stay (Days)" value={packageInfo ? `${packageInfo.expectedStayDays}` : "—"} />
          <Row label="Total Estimated Amount" value={`₹ ${packageAmount.toLocaleString("en-IN")}`} />
          <Row label="Advance Paid" value={`₹ ${advance.toLocaleString("en-IN")}`} />
          <hr className="my-1 border-slate-100" />
          <Row label="Balance Amount" value={`₹ ${(packageAmount - advance).toLocaleString("en-IN")}`} bold />
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">Breakup of Charges</CardTitle>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-blue-600" onClick={onViewBreakupDetails}>
            View Details
          </Button>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Row label={`Package Charges (${packageInfo?.expectedStayDays ?? 5} Days)`} value={`₹ ${packageAmount.toLocaleString("en-IN")}`} />
          <Row label="Registration Charges" value={`₹ ${registrationCharges.toLocaleString("en-IN")}`} />
          <Row label="Admission Charges" value={`₹ ${admissionCharges.toLocaleString("en-IN")}`} />
          <Row label="Other Charges (Estimated)" value={`₹ ${otherCharges.toLocaleString("en-IN")}`} />
          <hr className="my-1 border-slate-100" />
          <Row label="Total Estimated Amount" value={`₹ ${grandTotal.toLocaleString("en-IN")}`} />
          <Row label="Advance Paid" value={`- ₹ ${advance.toLocaleString("en-IN")}`} />
          <hr className="my-1 border-slate-100" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800">Balance Amount</span>
            <span className="text-base font-bold text-blue-700">₹ {balance.toLocaleString("en-IN")}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="justify-start gap-2 text-xs" onClick={onPrintSummary}>
            <Printer className="h-4 w-4" /> Print Admission Summary
          </Button>
          <Button variant="outline" size="sm" className="justify-start gap-2 text-xs" onClick={onSendEmail}>
            <Mail className="h-4 w-4" /> Send via Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}