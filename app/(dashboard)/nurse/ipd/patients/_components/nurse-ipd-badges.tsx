// app/(dashboard)/nurse/ipd/patients/_components/nurse-ipd-badges.tsx
import { AlertTriangle, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MedicineUrgency, PatientAcuity } from "@/types/nurse/ipd/nurse-ipd-types";

export function AcuityBadge({ acuity }: { acuity: PatientAcuity }) {
  const styles: Record<PatientAcuity, string> = {
    Stable: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Under Observation": "border-amber-200 bg-amber-50 text-amber-700",
    Critical: "border-red-200 bg-red-50 text-red-700",
  };
  return <Badge variant="outline" className={styles[acuity]}>{acuity}</Badge>;
}

export function UrgencyBadge({ urgency }: { urgency: MedicineUrgency }) {
  return urgency === "Urgent" ? (
    <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700"><AlertTriangle className="h-3 w-3" />Urgent</Badge>
  ) : (
    <Badge variant="outline" className="gap-1 border-slate-200 bg-slate-50 text-slate-600"><Clock3 className="h-3 w-3" />Routine</Badge>
  );
}