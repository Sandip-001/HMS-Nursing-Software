// app/(dashboard)/lab/radiology/ipd-orders/_components/radiology-ipd-badges.tsx
import { AlertTriangle, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RadiologyUrgency } from "@/types/lab/radiology/radiology-ipd-types";

export function RadiologyUrgencyBadge({ urgency }: { urgency: RadiologyUrgency }) {
  return urgency === "Urgent" ? (
    <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700"><AlertTriangle className="h-3 w-3" />Urgent</Badge>
  ) : (
    <Badge variant="outline" className="gap-1 border-slate-200 bg-slate-50 text-slate-600"><Clock3 className="h-3 w-3" />Routine</Badge>
  );
}

export function RadiologyIpdPaymentBadge({ status }: { status: "Paid" | "Unpaid" }) {
  return <Badge variant="outline" className={status === "Paid" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}>{status}</Badge>;
}

export function RadiologyBillSentBadge() {
  return <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">Bill Sent to Billing Dept.</Badge>;
}