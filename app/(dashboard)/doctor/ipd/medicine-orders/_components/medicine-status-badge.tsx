// app/doctor/ipd/medicine-orders/_components/medicine-status-badge.tsx
import { Badge } from "@/components/ui/badge";
import type { DeliveryStatus, MedicineStatus } from "@/types/doctor/ipd/medicine-order-types";

const styles: Record<MedicineStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Pending: "border-amber-200 bg-amber-50 text-amber-600",
  "Course Completed": "border-slate-200 bg-slate-100 text-slate-500",
};

export function MedicineStatusBadge({ status }: { status: MedicineStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[status]}`}>
      {status}
    </Badge>
  );
}

const deliveryStyles: Record<DeliveryStatus, string> = {
  Delivered: "border-emerald-200 bg-emerald-50 text-emerald-600",
  "Not Delivered": "border-red-200 bg-red-50 text-red-600",
  "Partially Delivered": "border-amber-200 bg-amber-50 text-amber-600",
};

export function DeliveryStatusBadge({ status }: { status: DeliveryStatus }) {
  return (
    <Badge variant="outline" className={`font-medium text-[11px] ${deliveryStyles[status]}`}>
      {status}
    </Badge>
  );
}