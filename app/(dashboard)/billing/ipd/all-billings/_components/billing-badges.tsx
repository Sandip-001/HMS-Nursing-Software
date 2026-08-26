// app/(dashboard)/billing/ipd/_components/billing-badges.tsx
import { CheckCircle2, CircleDollarSign, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BillingStatus, PaymentMethod } from "@/types/billing/ipd/billing-types";

export function BillingStatusBadge({ status }: { status: BillingStatus }) {
  const map: Record<BillingStatus, { cls: string; icon: React.ElementType }> = {
    "Fully Paid": { cls: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
    "Partially Paid": { cls: "border-amber-200 bg-amber-50 text-amber-700", icon: Clock3 },
    "Fully Due": { cls: "border-red-200 bg-red-50 text-red-700", icon: CircleDollarSign },
  };
  const { cls, icon: Icon } = map[status];
  return <Badge variant="outline" className={`gap-1 ${cls}`}><Icon className="h-3 w-3" />{status}</Badge>;
}

export function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const map: Record<PaymentMethod, string> = {
    Cash: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Card: "border-blue-200 bg-blue-50 text-blue-700",
    UPI: "border-violet-200 bg-violet-50 text-violet-700",
    "Net Banking": "border-cyan-200 bg-cyan-50 text-cyan-700",
  };
  return <Badge variant="outline" className={map[method]}>{method}</Badge>;
}