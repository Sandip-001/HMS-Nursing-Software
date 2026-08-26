// app/(dashboard)/nurse-admin/ipd/all-ward-patients/_components/drawer/section-treatment-plan.tsx
import { CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TreatmentPlanFull } from "@/types/nurse-admin/ipd/ward-detail-types";

export function SectionTreatmentPlan({ plans }: { plans: TreatmentPlanFull[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardCheck className="h-4 w-4 text-violet-600" />Doctor&apos;s Treatment Plan</p>
        <p className="mt-1 text-xs text-slate-500">Read-only view for admin — shows whether assigned nurses are following each plan item.</p>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <div key={plan.id} className={`rounded-2xl border p-5 ${plan.followStatus === "Following" ? "border-emerald-200 bg-emerald-50/20" : "border-amber-200 bg-amber-50/20"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-slate-800">{plan.title}</p>
                <p className="mt-1 text-sm text-slate-600">{plan.description}</p>
                <p className="mt-2 text-xs text-slate-400">Ordered by {plan.orderedBy} · {plan.orderedOn}</p>
              </div>
              <Badge variant="outline" className={plan.followStatus === "Following" ? "gap-1 border-emerald-200 bg-emerald-50 text-emerald-700" : "gap-1 border-amber-200 bg-amber-50 text-amber-700"}>
                {plan.followStatus === "Following" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{plan.followStatus}
              </Badge>
            </div>
          </div>
        ))}
        {plans.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No treatment plan items recorded.</div>}
      </div>
    </div>
  );
}