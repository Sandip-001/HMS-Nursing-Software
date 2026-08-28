// app/(dashboard)/admission/emergency/all-patients/_components/emergency-badges.tsx
import { AlertTriangle, CheckCircle2, Eye, HeartCrack, LogOut, RefreshCw, Scissors, Siren, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { DoseStatus, EmergencyStatus, PathologyFlag } from "@/types/emergency/emergency-types";

export function EmergencyStatusBadge({ status }: { status: EmergencyStatus }) {
  const map: Record<EmergencyStatus, { cls: string; icon: React.ElementType }> = {
    "Under Observation": { cls: "border-amber-200 bg-amber-50 text-amber-700", icon: Eye },
    Stable: { cls: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
    Critical: { cls: "border-red-200 bg-red-50 text-red-700", icon: Siren },
    "Shifted to IPD": { cls: "border-blue-200 bg-blue-50 text-blue-700", icon: RefreshCw },
    "Shifted to OT": { cls: "border-violet-200 bg-violet-50 text-violet-700", icon: Scissors },
    "Shifted to ICU": { cls: "border-rose-200 bg-rose-50 text-rose-700", icon: AlertTriangle },
    "Well & Released": { cls: "border-teal-200 bg-teal-50 text-teal-700", icon: LogOut },
    "Follow-up OPD": { cls: "border-cyan-200 bg-cyan-50 text-cyan-700", icon: Stethoscope },
    "Patient Death": { cls: "border-slate-400 bg-slate-200 text-slate-700", icon: HeartCrack },
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