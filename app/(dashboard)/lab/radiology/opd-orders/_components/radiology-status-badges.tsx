// app/(dashboard)/lab/radiology/opd-orders/_components/radiology-status-badges.tsx
import { Badge } from "@/components/ui/badge";
import type {
  RadiologyOrderStatus,
  RadiologyPaymentStatus,
} from "@/types/lab/radiology/radiology-opd-types";
const orderStyles: Record<RadiologyOrderStatus, string> = {
  Ordered: "border-blue-200 bg-blue-50 text-blue-700",
  Processing: "border-violet-200 bg-violet-50 text-violet-700",
  "Report Ready": "border-emerald-200 bg-emerald-50 text-emerald-700",
};
const paymentStyles: Record<RadiologyPaymentStatus, string> = {
  Unpaid: "border-red-200 bg-red-50 text-red-700",
  Paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
};
export function RadiologyTestStatusBadge({
  status,
}: {
  status: RadiologyOrderStatus;
}) {
  return (
    <Badge variant="outline" className={orderStyles[status]}>
      {status}
    </Badge>
  );
}
export function RadiologyPaymentStatusBadge({
  status,
}: {
  status: RadiologyPaymentStatus;
}) {
  return (
    <Badge variant="outline" className={paymentStyles[status]}>
      {status}
    </Badge>
  );
}
