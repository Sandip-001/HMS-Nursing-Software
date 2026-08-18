
import { Badge } from "@/components/ui/badge";
import type { BedAvailabilityStatus } from "@/types/bed-availability-types";

export function getAvailabilityStatus(availabilityPct: number): BedAvailabilityStatus {
  if (availabilityPct >= 20) return "Good";
  if (availabilityPct >= 10) return "Medium";
  return "Critical";
}

const styles: Record<BedAvailabilityStatus, string> = {
  Good: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Medium: "border-amber-200 bg-amber-50 text-amber-600",
  Critical: "border-red-200 bg-red-50 text-red-600",
};

export function AvailabilityStatusBadge({ status }: { status: BedAvailabilityStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[status]}`}>
      {status}
    </Badge>
  );
}