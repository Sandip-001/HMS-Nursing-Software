// app/ipd/new-admission/_components/step2-sidebar.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { PatientInfoFormValues, PackageInfoFormValues } from "@/lib/admission-schema";

interface Step2SidebarProps {
  patientInfo: PatientInfoFormValues | null;
  packageInfo: PackageInfoFormValues | null;
  liveTotal: number;
  liveAdvance: number;
  onEditPatientInfo?: () => void;
  onViewBreakup?: () => void;
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={bold ? "text-right font-semibold text-slate-800" : "text-right font-medium text-slate-800"}>
        {value}
      </span>
    </div>
  );
}

export function Step2Sidebar({
  patientInfo,
  packageInfo,
  liveTotal,
  liveAdvance,
  onEditPatientInfo,
  onViewBreakup,
}: Step2SidebarProps) {
  const balance = liveTotal - liveAdvance;
  const registrationCharges = 500;
  const admissionCharges = 1000;
  const otherCharges = 0;
  const grandTotal = liveTotal + registrationCharges + admissionCharges + otherCharges;
  const grandBalance = grandTotal - liveAdvance;

  return (
    <div className="space-y-6">
      {/* Patient & Admission Summary */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">
            Patient &amp; Admission Summary
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-blue-600" onClick={onEditPatientInfo}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Row label="UHID" value={patientInfo?.uhid || "—"} />
          <Row label="Patient Name" value={patientInfo?.patientName || "—"} />
          <Row
            label="Age / Gender"
            value={patientInfo ? `${patientInfo.age} Y / ${patientInfo.gender}` : "—"}
          />
          <Row label="Mobile No." value={patientInfo?.mobile || "—"} />
          <Row label="Address" value={patientInfo?.address || "—"} />
          <hr className="my-1 border-slate-100" />
          <Row label="OPD / MR No." value={patientInfo?.opdMrNo || "—"} />
          <Row label="Department" value={patientInfo?.department || "—"} />
          <Row label="Attending Doctor" value={patientInfo?.attendingDoctor || "—"} />
          <Row label="Admission Type" value={patientInfo?.admissionType || "—"} />
          <Row label="Priority" value={patientInfo?.priority || "—"} />
        </CardContent>
      </Card>

      {/* Charges Summary */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">Charges Summary</CardTitle>
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-blue-600" onClick={onViewBreakup}>
            View Breakup
          </Button>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Row
            label={`Package Charges (${packageInfo?.expectedStayDays ?? 5} Days)`}
            value={`₹ ${liveTotal.toLocaleString("en-IN")}`}
          />
          <Row label="Registration Charges" value={`₹ ${registrationCharges.toLocaleString("en-IN")}`} />
          <Row label="Admission Charges" value={`₹ ${admissionCharges.toLocaleString("en-IN")}`} />
          <Row label="Other Charges (Estimated)" value={`₹ ${otherCharges.toLocaleString("en-IN")}`} />
          <hr className="my-1 border-slate-100" />
          <Row label="Total Estimated Amount" value={`₹ ${grandTotal.toLocaleString("en-IN")}`} bold />
          <Row
            label="Advance / Deposit Collected"
            value={`- ₹ ${liveAdvance.toLocaleString("en-IN")}`}
          />
          <hr className="my-1 border-slate-100" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800">Balance Amount</span>
            <span className="text-base font-bold text-blue-700">
              ₹ {grandBalance.toLocaleString("en-IN")}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}