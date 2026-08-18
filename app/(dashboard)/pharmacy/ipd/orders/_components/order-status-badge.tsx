
import { Badge } from "@/components/ui/badge";
import type { PharmacyOrderStatus } from "@/types/pharmacy/ipd/pharmacy-order-types";

const styles: Record<PharmacyOrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  "Partially Available": "bg-orange-50 text-orange-700",
  "Ready to Deliver": "bg-blue-50 text-blue-700",
  "Medicine Delivered & Payment Received": "bg-emerald-50 text-emerald-700",
  "Medicine Delivered & Billing Updated": "bg-emerald-50 text-emerald-700",
};

export function OrderStatusBadge({ status }: { status: PharmacyOrderStatus }) {
  return <Badge className={`font-medium hover:${styles[status]} ${styles[status]}`}>{status}</Badge>;
}