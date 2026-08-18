
import { Badge } from "@/components/ui/badge";
import { WardRoundPatient } from "@/types/doctor/ipd/ward-round-types";

const styles: Record<WardRoundPatient["status"], string> = {
  Stable: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Critical: "border-red-200 bg-red-50 text-red-600",
  "Under Observation": "border-amber-200 bg-amber-50 text-amber-600",
};

export function PatientStatusBadge({ status }: { status: WardRoundPatient["status"] }) {
  return <Badge variant="outline" className={`font-medium ${styles[status]}`}>{status}</Badge>;
}