
import { Badge } from "@/components/ui/badge";
import type { PendingPriority } from "@/types/pending-admission-types";

const styles: Record<PendingPriority, string> = {
  Low: "border-slate-200 bg-slate-50 text-slate-500",
  Medium: "border-amber-200 bg-amber-50 text-amber-600",
  High: "border-red-200 bg-red-50 text-red-600",
};

export function PriorityBadge({ priority }: { priority: PendingPriority }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[priority]}`}>
      {priority}
    </Badge>
  );
}