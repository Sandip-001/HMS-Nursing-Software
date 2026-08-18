// app/doctor/ipd/diagnosis-update/_components/diagnosis-badges.tsx
import { Badge } from "@/components/ui/badge";
import type { DiagnosisStatus } from "@/types/doctor/ipd/diagnosis-types";

const statusStyles: Record<DiagnosisStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Resolved: "border-slate-200 bg-slate-50 text-slate-500",
  "Ruled Out": "border-red-200 bg-red-50 text-red-600",
};

export function DiagnosisStatusBadge({ status }: { status: DiagnosisStatus }) {
  return <Badge variant="outline" className={`font-medium ${statusStyles[status]}`}>{status}</Badge>;
}

export function PrimaryBadge() {
  return <Badge variant="outline" className="border-blue-200 bg-blue-50 font-medium text-blue-600">Primary</Badge>;
}