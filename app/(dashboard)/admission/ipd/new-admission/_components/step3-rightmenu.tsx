// app/ipd/new-admission/_components/step3-sidebar.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, Bookmark, Pencil } from "lucide-react";
import type { PatientInfoFormValues, PackageInfoFormValues, BedAllocationFormValues } from "@/lib/admission-schema";

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={bold ? "font-semibold text-blue-700" : "font-medium text-slate-800"}>{value}</span>
    </div>
  );
}

interface Step3SidebarProps {
  patientInfo: PatientInfoFormValues | null;
  packageInfo: PackageInfoFormValues | null;
  bedDraft: Partial<BedAllocationFormValues>;
  onEdit?: () => void;
  onRefresh?: () => void;
  onHoldBed?: () => void;
}

export function Step3Sidebar({ patientInfo, packageInfo, bedDraft, onEdit, onRefresh, onHoldBed }: Step3SidebarProps) {
  const total = packageInfo?.totalEstimatedAmount ?? 75000;
  const advance = packageInfo?.advanceAmount ?? 37500;
  const balance = total - advance;

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">Admission Summary</CardTitle>
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-blue-600" onClick={onEdit}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Row label="Admission Date & Time" value="20 May 2024, 11:30 AM" />
          <Row label="Department" value={patientInfo?.department || "—"} />
          <Row label="Admission Type" value={patientInfo?.admissionType || "—"} />
          <Row label="Package Selected" value={packageInfo?.packageName ? `${packageInfo.packageName} (${packageInfo.expectedStayDays} Days)` : "—"} />
          <Row label="Package Rate" value={packageInfo ? `₹ ${packageInfo.packageRate.toLocaleString("en-IN")} Per Day` : "—"} />
          <Row label="Expected Stay (Days)" value={packageInfo ? `${packageInfo.expectedStayDays}` : "—"} />
          <Row label="Total Estimated Amount" value={`₹ ${total.toLocaleString("en-IN")}`} />
          <Row label="Advance Paid" value={`₹ ${advance.toLocaleString("en-IN")}`} />
          <hr className="my-1 border-slate-100" />
          <Row label="Balance Amount" value={`₹ ${balance.toLocaleString("en-IN")}`} bold />
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">Selected Bed Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Row label="Floor / Ward" value={bedDraft.floor || "—"} />
          <Row label="Ward / Room Type" value={bedDraft.wardRoomType || "—"} />
          <Row label="Room No." value={bedDraft.roomNo || "—"} />
          <Row label="Bed No." value={bedDraft.bedNo || "—"} />
          <Row label="Charges" value={bedDraft.bedCharges ? `₹ ${Number(bedDraft.bedCharges).toLocaleString("en-IN")} Per Day` : "—"} />
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="justify-start gap-2 text-xs" onClick={onRefresh}>
            <RotateCw className="h-4 w-4" /> Refresh Availability
          </Button>
          <Button variant="outline" size="sm" className="justify-start gap-2 text-xs" onClick={onHoldBed}>
            <Bookmark className="h-4 w-4" /> Hold Bed
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}