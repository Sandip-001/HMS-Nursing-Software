
import { Badge } from "@/components/ui/badge";
import { Wallet, BedDouble, ClipboardCheck } from "lucide-react";
import type { PendingStep } from "@/types/pending-admission-types";

const config: Record<PendingStep, { style: string; icon: typeof Wallet }> = {
  "Awaiting Package & Payment": { style: "border-amber-200 bg-amber-50 text-amber-600", icon: Wallet },
  "Awaiting Bed Allocation": { style: "border-purple-200 bg-purple-50 text-purple-600", icon: BedDouble },
  "Awaiting Review & Confirm": { style: "border-emerald-200 bg-emerald-50 text-emerald-600", icon: ClipboardCheck },
};

export function CurrentStepBadge({ step }: { step: PendingStep }) {
  const { style, icon: Icon } = config[step];
  return (
    <Badge variant="outline" className={`gap-1.5 font-medium ${style}`}>
      <Icon className="h-3 w-3" />
      {step}
    </Badge>
  );
}