// app/(dashboard)/lab/pathology/ipd-orders/_components/pathology-ipd-badges.tsx
import { AlertTriangle, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TestUrgency } from "@/types/lab/pathology/pathology-ipd-types";

export function UrgencyBadge({ urgency }: { urgency: TestUrgency }) {
  if (urgency === "Urgent") {
    return (
      <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700">
        <AlertTriangle className="h-3 w-3" />
        Urgent
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1 border-slate-200 bg-slate-50 text-slate-600">
      <Clock3 className="h-3 w-3" />
      Routine
    </Badge>
  );
}

export function IpdPaymentBadge({ status }: { status: "Paid" | "Unpaid" }) {
  const style = status === "Paid" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700";
  return <Badge variant="outline" className={style}>{status}</Badge>;
}

export function BillSentBadge() {
  return (
    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
      Bill Sent to Billing Dept.
    </Badge>
  );
}