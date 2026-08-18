
import { Badge } from "@/components/ui/badge";
import type { RequestPriority } from "@/types/admission-request-types";

const styles: Record<RequestPriority, string> = {
  Low: "border-slate-200 bg-slate-50 text-slate-500",
  Medium: "border-amber-200 bg-amber-50 text-amber-600",
  High: "border-red-200 bg-red-50 text-red-600",
};

export function RequestPriorityBadge({ priority }: { priority: RequestPriority }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[priority]}`}>
      {priority}
    </Badge>
  );
}