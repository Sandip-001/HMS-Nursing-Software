// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/section-status-change.tsx
"use client";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { PatientStatus, StatusChangeLog } from "@/types/rmo/ipd/rmo-types";
import { CURRENT_RMO } from "@/lib/rmo/ipd/rmo-data";
import { PatientStatusBadge } from "../rmo-badges";

const STATUS_OPTIONS: { status: PatientStatus; icon: React.ElementType; tone: string }[] = [
  { status: "Stable", icon: CheckCircle2, tone: "border-emerald-300 text-emerald-700 hover:bg-emerald-50" },
  { status: "Under Observation", icon: Eye, tone: "border-amber-300 text-amber-700 hover:bg-amber-50" },
  { status: "Critical", icon: AlertTriangle, tone: "border-red-300 text-red-700 hover:bg-red-50" },
];

export function SectionStatusChange({ status, statusLog, onChangeStatus }: { status: PatientStatus; statusLog: StatusChangeLog[]; onChangeStatus: (status: PatientStatus, reason?: string) => void }) {
  const [pendingStatus, setPendingStatus] = useState<PatientStatus | null>(null);
  const [reason, setReason] = useState("");
  const isDischarged = status === "Discharged";

  function confirmStatus() {
    if (!pendingStatus) return;
    onChangeStatus(pendingStatus, reason.trim() || undefined);
    setPendingStatus(null);
    setReason("");
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-800">Update Patient Status</p>
        <p className="mt-1 text-xs text-slate-500">RMO can change status to Stable, Under Observation, or Critical.</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {STATUS_OPTIONS.map(({ status: s, icon: Icon, tone }) => (
            <Button key={s} variant="outline" disabled={status === s || isDischarged} className={`gap-2 ${tone}`} onClick={() => setPendingStatus(s)}><Icon className="h-4 w-4" />{s}</Button>
          ))}
        </div>

        {pendingStatus && (
          <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
            <p className="text-sm font-semibold text-blue-800">Change status to "{pendingStatus}"?</p>
            {pendingStatus === "Critical" && <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600"><AlertTriangle className="h-3.5 w-3.5" />Attending doctor will be notified immediately.</p>}
            <Textarea className="mt-2 w-full" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason / notes (optional)" />
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setPendingStatus(null); setReason(""); }}>Cancel</Button>
              <Button size="sm" className={pendingStatus === "Critical" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} onClick={confirmStatus}>Confirm</Button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-3 text-sm font-bold text-slate-800">Status Change History</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400"><th className="py-2 pr-4">Date / Time</th><th className="pr-4">Status</th><th className="pr-4">Changed By</th><th>Reason</th></tr></thead>
            <tbody>
              {statusLog.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-slate-700">{log.changedAt}</td>
                  <td className="pr-4"><PatientStatusBadge status={log.status} /></td>
                  <td className="pr-4 text-slate-600">{log.changedBy}</td>
                  <td className="text-slate-500">{log.reason ?? "—"}</td>
                </tr>
              ))}
              {statusLog.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-slate-400">No status changes recorded.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}