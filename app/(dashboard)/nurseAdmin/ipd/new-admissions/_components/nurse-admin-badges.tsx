// app/(dashboard)/nurse-admin/ipd/new-admissions/_components/nurse-admin-badges.tsx
import { CheckCircle2, Circle, PieChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AssignmentStatus, PatientAcuity } from "@/types/nurse-admin/ipd/nurse-admin-types";

export function AcuityBadge({ acuity }: { acuity: PatientAcuity }) {
  const styles: Record<PatientAcuity, string> = {
    Stable: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Under Observation": "border-amber-200 bg-amber-50 text-amber-700",
    Critical: "border-red-200 bg-red-50 text-red-700",
  };
  return <Badge variant="outline" className={styles[acuity]}>{acuity}</Badge>;
}

export function AssignmentBadge({ status }: { status: AssignmentStatus }) {
  if (status === "Fully Assigned") return <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-3 w-3" />Fully Assigned</Badge>;
  if (status === "Partially Assigned") return <Badge variant="outline" className="gap-1 border-amber-200 bg-amber-50 text-amber-700"><PieChart className="h-3 w-3" />Partially Assigned</Badge>;
  return <Badge variant="outline" className="gap-1 border-slate-200 bg-slate-50 text-slate-500"><Circle className="h-3 w-3" />Unassigned</Badge>;
}