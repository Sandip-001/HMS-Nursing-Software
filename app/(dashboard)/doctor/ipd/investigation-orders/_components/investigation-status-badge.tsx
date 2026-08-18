//app/doctor/ipd/investigation-orders/_components/investigation-status-badge.tsx
import { Badge } from "@/components/ui/badge";
import type {
  InvestigationStatus,
  PathologyResultStatus,
} from "@/types/doctor/ipd/investigation-order-types";

const statusStyles: Record<InvestigationStatus, string> = {
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Ordered: "border-blue-200 bg-blue-50 text-blue-700",
  "Sample Collected": "border-orange-200 bg-orange-50 text-orange-700",
  Processing: "border-violet-200 bg-violet-50 text-violet-700",
  "Report Ready": "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const resultStyles: Record<PathologyResultStatus, string> = {
  Normal: "border-emerald-200 bg-emerald-50 text-emerald-700",
  High: "border-red-200 bg-red-50 text-red-700",
  Low: "border-amber-200 bg-amber-50 text-amber-700",
  Borderline: "border-orange-200 bg-orange-50 text-orange-700",
  Critical: "border-red-300 bg-red-100 text-red-800",
};

export function InvestigationStatusBadge({
  status,
}: {
  status: InvestigationStatus;
}) {
  return (
    <Badge variant="outline" className={`font-medium ${statusStyles[status]}`}>
      {status}
    </Badge>
  );
}

export function PathologyResultBadge({
  status,
}: {
  status: PathologyResultStatus;
}) {
  return (
    <Badge variant="outline" className={`font-medium ${resultStyles[status]}`}>
      {status}
    </Badge>
  );
}