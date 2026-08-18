
import { Badge } from "@/components/ui/badge";
import type { RequestStatus } from "@/types/admission-request-types";

const styles: Record<RequestStatus, string> = {
  "Pending Review": "border-amber-200 bg-amber-50 text-amber-600",
  Approved: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Rejected: "border-red-200 bg-red-50 text-red-600",
};

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[status]}`}>
      {status}
    </Badge>
  );
}