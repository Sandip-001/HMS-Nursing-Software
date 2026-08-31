// app/(dashboard)/nurse/icu/patients/[uhid]/_components/ventilator-monitoring-timeline.tsx
"use client";
import { AlertTriangle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VentilatorObservation, VentilatorOrder } from "@/types/nurse/icu/ventilation-types";
import { formatVentilatorSettings } from "./ventilator-mode-fields";

export function VentilatorMonitoringTimeline({ observations, orders }: { observations: VentilatorObservation[]; orders: VentilatorOrder[] }) {
  function orderFor(orderId: string) {
    return orders.find((o) => o.id === orderId);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[1200px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400">
            <th className="px-4 py-3">Date & Time</th>
            <th className="px-4 py-3">Mode / Settings</th>
            <th className="px-4 py-3">SpO₂</th>
            <th className="px-4 py-3">RR</th>
            <th className="px-4 py-3">HR</th>
            <th className="px-4 py-3">BP</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Recorded By</th>
          </tr>
        </thead>
        <tbody>
          {observations.map((obs) => {
            const order = orderFor(obs.orderId);
            return (
              <tr key={obs.id} className={`border-b border-slate-100 last:border-0 ${obs.hasDifference ? "bg-amber-50/40" : ""}`}>
                <td className="px-4 py-3 text-slate-600">{obs.recordedAt}</td>
                <td className="px-4 py-3 text-slate-700">{order ? `${order.mode} · ${formatVentilatorSettings(order.mode, obs.ventilatorParameters)}` : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${obs.spo2 && obs.spo2 < 94 ? "text-red-600" : "text-emerald-600"}`}>{obs.spo2 ?? "—"}%</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{obs.respiratoryRate ?? "—"}/min</td>
                <td className="px-4 py-3 text-slate-600">{obs.heartRate ?? "—"} bpm</td>
                <td className="px-4 py-3 text-slate-600">{obs.bloodPressureSystolic && obs.bloodPressureDiastolic ? `${obs.bloodPressureSystolic}/${obs.bloodPressureDiastolic}` : "—"}</td>
                <td className="px-4 py-3">
                  {obs.hasDifference ? (
                    <Badge variant="outline" className="gap-1 border-amber-300 bg-amber-50 text-amber-700"><AlertTriangle className="h-3 w-3" />Difference</Badge>
                  ) : obs.patientStatus === "Stable" ? (
                    <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-3 w-3" />Stable</Badge>
                  ) : obs.patientStatus === "Needs Review" ? (
                    <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-700"><TrendingUp className="h-3 w-3" />Needs Review</Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700"><TrendingDown className="h-3 w-3" />Deteriorating</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{obs.recordedBy}</td>
              </tr>
            );
          })}
          {observations.length === 0 && (
            <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-400">No ventilator observations recorded yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}