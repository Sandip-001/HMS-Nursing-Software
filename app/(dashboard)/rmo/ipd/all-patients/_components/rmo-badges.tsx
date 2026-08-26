// app/(dashboard)/rmo/ipd/all-patients/_components/rmo-badges.tsx
import { AlertTriangle, CheckCircle2, Eye, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { DoseStatus, PathologyFlag, PatientStatus } from "@/types/rmo/ipd/rmo-types";

export function PatientStatusBadge({ status }: { status: PatientStatus }) {
  const map: Record<PatientStatus, { cls: string; icon: React.ElementType }> = {
    Stable: { cls: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
    "Under Observation": { cls: "border-amber-200 bg-amber-50 text-amber-700", icon: Eye },
    Critical: { cls: "border-red-200 bg-red-50 text-red-700", icon: AlertTriangle },
    Discharged: { cls: "border-slate-200 bg-slate-100 text-slate-500", icon: LogOut },
  };
  const { cls, icon: Icon } = map[status];
  return <Badge variant="outline" className={`gap-1 ${cls}`}><Icon className="h-3 w-3" />{status}</Badge>;
}

export function DoseStatusBadge({ status }: { status: DoseStatus }) {
  const map: Record<DoseStatus, string> = {
    Given: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Not Given": "border-red-200 bg-red-50 text-red-700",
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    "Out of Stock": "border-red-300 bg-red-100 text-red-800",
  };
  return <Badge variant="outline" className={map[status]}>{status}</Badge>;
}

export function PathologyFlagBadge({ flag }: { flag: PathologyFlag }) {
  const map: Record<PathologyFlag, string> = {
    Normal: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Low: "border-blue-200 bg-blue-50 text-blue-700",
    High: "border-red-200 bg-red-50 text-red-700",
    Borderline: "border-amber-200 bg-amber-50 text-amber-700",
  };
  return <Badge variant="outline" className={map[flag]}>{flag}</Badge>;
}