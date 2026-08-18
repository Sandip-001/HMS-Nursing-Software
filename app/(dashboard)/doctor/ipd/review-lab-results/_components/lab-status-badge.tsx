
import { Badge } from "@/components/ui/badge";
import type { LabResultStatus } from "@/types/doctor/ipd/lab-results-types";

const styles: Record<LabResultStatus, string> = {
  Normal: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Low: "border-red-200 bg-red-50 text-red-600",
  High: "border-red-200 bg-red-50 text-red-600",
  Borderline: "border-amber-200 bg-amber-50 text-amber-600",
  Pending: "border-slate-200 bg-slate-50 text-slate-500",
};

export function LabStatusBadge({ status }: { status: LabResultStatus }) {
  return <Badge variant="outline" className={`font-medium ${styles[status]}`}>{status}</Badge>;
}