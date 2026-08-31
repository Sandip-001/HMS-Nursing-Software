// app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-badges.tsx
import { AlertTriangle, CheckCircle2, Clock3, PackageX, PauseCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type {
  DailyDeliveryStatus, MedicineUrgency, PharmacyIpdOrderStatus,
} from "@/types/pharmacy/ipd/pharmacy-ipd-order-types";

export function UrgencyBadge({ urgency }: { urgency: MedicineUrgency }) {
  return urgency === "Urgent" ? (
    <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700"><AlertTriangle className="h-3 w-3" />Urgent</Badge>
  ) : (
    <Badge variant="outline" className="gap-1 border-slate-200 bg-slate-50 text-slate-600"><Clock3 className="h-3 w-3" />Routine</Badge>
  );
}

export function OrderStatusBadge({ status }: { status: PharmacyIpdOrderStatus }) {
  const styles: Record<PharmacyIpdOrderStatus, string> = {
    Active: "border-blue-200 bg-blue-50 text-blue-700",
    "Course Completed": "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Payment Received": "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Partially Paid": "border-amber-200 bg-amber-50 text-amber-700",
    "Billed to Department": "border-violet-200 bg-violet-50 text-violet-700",
    "Partially Delivered": "border-amber-200 bg-amber-50 text-amber-700",
    "All Delivered": "border-emerald-200 bg-emerald-50 text-emerald-700",
  };
  return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
}

export function PaymentBadge({ status }: { status: "Paid" | "Partially Paid" | "Unpaid" }) {
  const styles: Record<string, string> = {
    Paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Partially Paid": "border-amber-200 bg-amber-50 text-amber-700",
    Unpaid: "border-red-200 bg-red-50 text-red-700",
  };
  return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
}

export function BillSentBadge() {
  return <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">Bill Sent to Billing Dept.</Badge>;
}

export function DailyStatusBadge({ status }: { status: DailyDeliveryStatus }) {
  const map: Record<DailyDeliveryStatus, { className: string; icon: React.ReactNode }> = {
    Delivered: { className: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: <CheckCircle2 className="h-3 w-3" /> },
    "Partially Delivered": { className: "border-amber-200 bg-amber-50 text-amber-700", icon: <PauseCircle className="h-3 w-3" /> },
    "Not Delivered": { className: "border-red-200 bg-red-50 text-red-700", icon: <PackageX className="h-3 w-3" /> },
    "Out of Stock": { className: "border-red-300 bg-red-100 text-red-800", icon: <PackageX className="h-3 w-3" /> },
    Pending: { className: "border-slate-200 bg-slate-50 text-slate-500", icon: <Clock3 className="h-3 w-3" /> },
  };
  const style = map[status];
  return <Badge variant="outline" className={`gap-1 ${style.className}`}>{style.icon}{status}</Badge>;
}