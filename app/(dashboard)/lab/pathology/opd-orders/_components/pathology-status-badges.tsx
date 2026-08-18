// app/(dashboard)/lab/pathology/opd-orders/_components/pathology-status-badges.tsx
import { Badge } from "@/components/ui/badge";
import type {
  PathologyOrderStatus,
  PathologyPaymentStatus,
  ResultFlag,
} from "@/types/lab/pathology/pathology-opd-types";
const testStyles: Record<PathologyOrderStatus, string> = {
  Ordered: "border-blue-200 bg-blue-50 text-blue-700",
  "Sample Collected": "border-amber-200 bg-amber-50 text-amber-700",
  Processing: "border-violet-200 bg-violet-50 text-violet-700",
  "Report Ready": "border-emerald-200 bg-emerald-50 text-emerald-700",
};
const paymentStyles: Record<PathologyPaymentStatus, string> = {
  Unpaid: "border-red-200 bg-red-50 text-red-700",
  Paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
};
const flagStyles: Record<ResultFlag, string> = {
  Normal: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Low: "border-amber-200 bg-amber-50 text-amber-700",
  High: "border-red-200 bg-red-50 text-red-700",
  Borderline: "border-orange-200 bg-orange-50 text-orange-700",
  Critical: "border-red-300 bg-red-100 text-red-800",
};
export function TestStatusBadge({ status }: { status: PathologyOrderStatus }) {
  return (
    <Badge variant="outline" className={testStyles[status]}>
      {status}
    </Badge>
  );
}
export function PaymentStatusBadge({
  status,
}: {
  status: PathologyPaymentStatus;
}) {
  return (
    <Badge variant="outline" className={paymentStyles[status]}>
      {status}
    </Badge>
  );
}
export function ResultFlagBadge({ flag }: { flag: ResultFlag }) {
  return (
    <Badge variant="outline" className={flagStyles[flag]}>
      {flag}
    </Badge>
  );
}
