// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/tab-treatment-plan.tsx
"use client";
import { CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TreatmentPlanItem } from "@/types/nurse/ipd/nurse-ipd-types";
import { CURRENT_NURSE } from "@/lib/nurse/ipd/nurse-ipd-data";

export function TabTreatmentPlan({ plans, onToggleFollow }: { plans: TreatmentPlanItem[]; onToggleFollow: (plan: TreatmentPlanItem) => void }) {
  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardCheck className="h-4 w-4 text-violet-600" />Doctor&apos;s Treatment Plan</p>
          <p className="mt-1 text-xs text-slate-500">Mark each plan item as followed once implemented on the ward.</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`border-slate-200 ${plan.followStatus === "Following" ? "bg-emerald-50/20" : "bg-amber-50/20"}`}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-bold text-slate-800">{plan.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{plan.description}</p>
                  <p className="mt-2 text-xs text-slate-400">Ordered by {plan.orderedBy} · {plan.orderedOn}</p>
                  {plan.lastUpdatedBy && <p className="text-xs text-slate-400">Last updated by {plan.lastUpdatedBy} · {plan.lastUpdatedAt}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant="outline" className={plan.followStatus === "Following" ? "gap-1 border-emerald-200 bg-emerald-50 text-emerald-700" : "gap-1 border-amber-200 bg-amber-50 text-amber-700"}>
                    {plan.followStatus === "Following" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{plan.followStatus}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className={plan.followStatus === "Following" ? "border-amber-300 text-amber-700 hover:bg-amber-50" : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"}
                    onClick={() => onToggleFollow({ ...plan, followStatus: plan.followStatus === "Following" ? "Not Following" : "Following", lastUpdatedBy: CURRENT_NURSE.name, lastUpdatedAt: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) })}
                  >
                    Mark as {plan.followStatus === "Following" ? "Not Following" : "Following"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {plans.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No treatment plan items recorded for this patient.</div>}
      </div>
    </div>
  );
}