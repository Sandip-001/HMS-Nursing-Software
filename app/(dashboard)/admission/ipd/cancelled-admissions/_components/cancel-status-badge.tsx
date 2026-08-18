
import { Badge } from "@/components/ui/badge";
import type { CancelledAdmissionRecord } from "@/types/cancel-admission-types";

const styles: Record<CancelledAdmissionRecord["status"], string> = {
  "Patient Cancelled": "border-red-200 bg-red-50 text-red-600",
  "Staff Cancelled": "border-amber-200 bg-amber-50 text-amber-600",
  Others: "border-blue-200 bg-blue-50 text-blue-600",
};

const borderStyles: Record<CancelledAdmissionRecord["status"], string> = {
  "Patient Cancelled": "border-l-red-400",
  "Staff Cancelled": "border-l-amber-400",
  Others: "border-l-blue-400",
};

export function CancelStatusBadge({ status }: { status: CancelledAdmissionRecord["status"] }) {
  return <Badge variant="outline" className={`font-medium ${styles[status]}`}>{status}</Badge>;
}

export function getCancelBorderStyle(status: CancelledAdmissionRecord["status"]) {
  return borderStyles[status];
}