// app/(dashboard)/admission/icu/all-patients/_components/icu-badges.tsx
import { Heart, Activity, AlertTriangle, CheckCircle2, Clock, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { IcuStatus, AdmissionType } from "@/types/admission-desk/icu/icu-types";

export function IcuStatusBadge({ status }: { status: IcuStatus }) {
  const map: Record<IcuStatus, { icon: React.ElementType; cls: string }> = {
    Stable: { icon: CheckCircle2, cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
    "Under Observation": { icon: Activity, cls: "border-blue-200 bg-blue-50 text-blue-700" },
    Critical: { icon: AlertTriangle, cls: "border-red-200 bg-red-50 text-red-700" },
    Released: { icon: LogOut, cls: "border-slate-200 bg-slate-50 text-slate-600" },
    "Follow-up OPD": { icon: Clock, cls: "border-amber-200 bg-amber-50 text-amber-700" },
    "Shifted to IPD": { icon: Heart, cls: "border-violet-200 bg-violet-50 text-violet-700" },
  };
  const { icon: Icon, cls } = map[status];
  return <Badge variant="outline" className={`gap-1 ${cls}`}><Icon className="h-3 w-3" />{status}</Badge>;
}

export function AdmissionTypeBadge({ type }: { type: AdmissionType }) {
  const map: Record<AdmissionType, string> = {
    Emergency: "border-red-200 bg-red-50 text-red-700",
    IPD: "border-blue-200 bg-blue-50 text-blue-700",
    OT: "border-amber-200 bg-amber-50 text-amber-700",
  };
  return <Badge variant="outline" className={map[type]}>{type}</Badge>;
}