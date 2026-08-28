// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/section-diagnosis.tsx
import { Badge } from "@/components/ui/badge";
import { Stethoscope } from "lucide-react";
import type { DiagnosisEntry } from "@/types/emergency/emergency-types";

export function SectionDiagnosis({ diagnoses }: { diagnoses: DiagnosisEntry[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><Stethoscope className="h-4 w-4 text-violet-600" />Diagnosis Details</p>
        <p className="mt-1 text-xs text-slate-500">Most recent diagnosis is shown first.</p>
      </div>
      <div className="space-y-3">
        {diagnoses.map((diagnosis, index) => (
          <div key={diagnosis.id} className={`rounded-2xl border p-5 ${index === 0 ? "border-violet-200 bg-violet-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              {index === 0 && <Badge className="bg-violet-600 text-white">Current</Badge>}
              <Badge variant="outline" className={diagnosis.type === "Confirmed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : diagnosis.type === "Provisional" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 bg-slate-50 text-slate-600"}>{diagnosis.type}</Badge>
            </div>
            <h4 className="mt-2 text-base font-bold text-slate-800">{diagnosis.name} <span className="text-sm font-normal text-slate-400">({diagnosis.code})</span></h4>
            {diagnosis.notes && <p className="mt-1 text-sm text-slate-600">{diagnosis.notes}</p>}
            <p className="mt-2 text-xs text-slate-400">Added by {diagnosis.addedBy} on {diagnosis.addedAt}</p>
          </div>
        ))}
        {diagnoses.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No diagnosis recorded yet.</div>}
      </div>
    </div>
  );
}