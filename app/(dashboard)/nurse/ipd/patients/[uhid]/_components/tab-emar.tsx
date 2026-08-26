// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/tab-emar.tsx
"use client";
import { useMemo } from "react";
import { CheckCircle2, ClipboardList, PackageX, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EmarDose } from "@/types/nurse/ipd/nurse-ipd-types";
import { CURRENT_NURSE } from "@/lib/nurse/ipd/nurse-ipd-data";
import { UrgencyBadge } from "../../_components/nurse-ipd-badges";

export function TabEmar({ doses, onUpdateDose }: { doses: EmarDose[]; onUpdateDose: (dose: EmarDose) => void }) {
  const sorted = useMemo(() => [...doses].sort((a, b) => a.urgency === b.urgency ? 0 : a.urgency === "Urgent" ? -1 : 1), [doses]);
  const groupedByMedicine = useMemo(() => {
    const map = new Map<string, EmarDose[]>();
    sorted.forEach((dose) => { const rows = map.get(dose.medicineName) ?? []; rows.push(dose); map.set(dose.medicineName, rows); });
    return Array.from(map.entries());
  }, [sorted]);

  function markGiven(dose: EmarDose) {
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    onUpdateDose({ ...dose, status: "Given", givenBy: CURRENT_NURSE.name, givenAt: stamp });
  }
  function markNotGiven(dose: EmarDose) {
    onUpdateDose({ ...dose, status: "Not Given", givenBy: undefined, givenAt: undefined });
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ClipboardList className="h-4 w-4 text-blue-600" />Today&apos;s Medicine Orders & eMAR</p>
          <p className="mt-1 text-xs text-slate-500">Medicines ordered multiple times a day (e.g. after breakfast and after dinner) appear as separate dose rows — mark each dose independently.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {groupedByMedicine.map(([medicineName, doseRows]) => (
          <Card key={medicineName} className={`border-slate-200 ${doseRows[0].urgency === "Urgent" ? "border-red-200 bg-red-50/20" : ""}`}>
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold text-slate-800">{medicineName}</p>
                <UrgencyBadge urgency={doseRows[0].urgency} />
                {doseRows.length > 1 && <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700">{doseRows.length}x today</Badge>}
              </div>
              <p className="mt-1 text-xs text-slate-500">{doseRows[0].strength} · {doseRows[0].route} · {doseRows[0].instructions}</p>

              <div className="mt-3 space-y-2">
                {doseRows.map((dose) => (
                  <div key={dose.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-slate-200 bg-white text-slate-600">{dose.slot}</Badge>
                      <span className="text-xs text-slate-500">Scheduled: {dose.scheduledTime}</span>
                      <StatusPill status={dose.status} />
                      {dose.givenBy && <span className="text-xs text-slate-400">by {dose.givenBy} · {dose.givenAt}</span>}
                      {dose.remarks && <span className="text-xs italic text-red-500">{dose.remarks}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {dose.status !== "Given" && dose.status !== "Out of Stock" && (
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => markGiven(dose)}>Mark Given</Button>
                      )}
                      {dose.status === "Given" && (
                        <Button size="sm" variant="outline" className="border-slate-300 text-slate-600" onClick={() => markNotGiven(dose)}>Undo</Button>
                      )}
                      {dose.status === "Pending" && (
                        <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50" onClick={() => markNotGiven(dose)}>Mark Not Given</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {groupedByMedicine.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No medicine orders for today.</div>}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: EmarDose["status"] }) {
  if (status === "Given") return <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-3 w-3" />Given</Badge>;
  if (status === "Not Given") return <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700"><XCircle className="h-3 w-3" />Not Given</Badge>;
  if (status === "Out of Stock") return <Badge variant="outline" className="gap-1 border-red-300 bg-red-100 text-red-800"><PackageX className="h-3 w-3" />Out of Stock</Badge>;
  return <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">Pending</Badge>;
}