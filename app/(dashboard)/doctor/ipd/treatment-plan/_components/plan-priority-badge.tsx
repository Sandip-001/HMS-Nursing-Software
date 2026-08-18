
import { Badge } from "@/components/ui/badge";
import type { PlanPriority } from "@/types/doctor/ipd/treatment-plan-types";

const styles: Record<PlanPriority, string> = {
  High: "border-red-200 bg-red-50 text-red-600",
  Medium: "border-amber-200 bg-amber-50 text-amber-600",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-600",
};

export function PlanPriorityBadge({ priority }: { priority: PlanPriority }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[priority]}`}>
      {priority}
    </Badge>
  );
}