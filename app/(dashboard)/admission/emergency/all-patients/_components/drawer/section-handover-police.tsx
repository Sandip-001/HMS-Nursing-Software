// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/section-handover-police.tsx
"use client";
import { useState } from "react";
import { AlertOctagon, ArrowRightLeft, CheckCircle2, Phone, ShieldAlert, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PoliceNotification, ShiftHandoverEntry } from "@/types/emergency/emergency-types";

export function SectionHandoverPolice({ handovers, police, onInformPolice }: { handovers: ShiftHandoverEntry[]; police: PoliceNotification; onInformPolice: (firNumber: string, remarks: string) => void }) {
  const [firNumber, setFirNumber] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <div className="space-y-4">
      {police.caseType !== "None" && (
        <div className={`rounded-2xl border p-5 ${police.informed ? "border-emerald-200 bg-emerald-50/40" : "border-red-200 bg-red-50/40"}`}>
          <p className={`flex items-center gap-2 text-sm font-bold ${police.informed ? "text-emerald-800" : "text-red-800"}`}>
            <ShieldAlert className="h-4 w-4" />Medico-Legal Case: {police.caseType}
          </p>
          <p className="mt-1 text-xs text-slate-500">Nearest Police Station: <span className="font-semibold text-slate-700">{police.nearestPoliceStation}</span></p>

          {police.informed ? (
            <div className="mt-3 space-y-2">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" />Police informed on {police.informedAt} by {police.informedBy}</p>
              {police.firNumber && <p className="text-xs text-slate-500">FIR Number: <span className="font-semibold text-slate-700">{police.firNumber}</span></p>}
              {police.remarks && <p className="text-xs text-slate-500">Remarks: {police.remarks}</p>}
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <input value={firNumber} onChange={(e) => setFirNumber(e.target.value)} placeholder="FIR Number (optional)" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks (optional)" rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <Button className="gap-2 bg-red-600 hover:bg-red-700" onClick={() => onInformPolice(firNumber, remarks)}>
                <Phone className="h-4 w-4" />Inform {police.nearestPoliceStation}
              </Button>
            </div>
          )}
        </div>
      )}

      {police.caseType === "None" && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
          <AlertOctagon className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-2 text-sm text-slate-500">This is not a medico-legal case. No police notification required.</p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ArrowRightLeft className="h-4 w-4 text-blue-600" />Shift Handover Logs</p>
        <div className="mt-3 space-y-3">
          {handovers.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="flex items-center gap-1 font-semibold text-slate-800"><UserRound className="h-3.5 w-3.5 text-slate-400" />{entry.fromNurse}</span>
                <span className="text-xs text-slate-400">({entry.fromShift})</span>
                <ArrowRightLeft className="h-3.5 w-3.5 text-blue-500" />
                <span className="flex items-center gap-1 font-semibold text-slate-800"><UserRound className="h-3.5 w-3.5 text-slate-400" />{entry.toNurse}</span>
                <span className="text-xs text-slate-400">({entry.toShift})</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{entry.handoverDateTime}</p>
              {entry.notes && <p className="mt-2 text-sm italic text-slate-600">&quot;{entry.notes}&quot;</p>}
            </div>
          ))}
          {handovers.length === 0 && <p className="py-4 text-center text-sm text-slate-400">No shift handovers recorded yet for this patient.</p>}
        </div>
      </div>
    </div>
  );
}