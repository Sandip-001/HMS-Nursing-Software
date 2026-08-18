// app/ipd/admission-list/_components/status-badge.tsx
import { Badge } from "@/components/ui/badge";
import { AdmissionStatus } from "@/types/admission-list-types";


const styles: Record<AdmissionStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Discharged: "border-blue-200 bg-blue-50 text-blue-600",
  Cancelled: "border-red-200 bg-red-50 text-red-600",
  Pending: "border-amber-200 bg-amber-50 text-amber-600",
};

export function StatusBadge({ status }: { status: AdmissionStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[status]}`}>
      {status}
    </Badge>
  );
}