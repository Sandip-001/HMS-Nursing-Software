// app/(dashboard)/nurse/icu/patients/[uhid]/_components/oxygen-monitoring-timeline.tsx
"use client";
import { AlertTriangle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OxygenObservation } from "@/types/nurse/icu/oxygen-therapy-types";
import { formatDeviceSettings } from "./oxygen-device-fields";
import type { OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";

export function OxygenMonitoringTimeline({ observations, orders }: { observations: OxygenObservation[]; orders: OxygenOrder[] }) {
  function orderFor(orderId: string) {
    return orders.find((o) => o.id === orderId);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400">
            <th className="px-4 py-3">Date & Time</th>
            <th className="px-4 py-3">Device / Setting</th>
            <th className="px-4 py-3">SpO₂</th>
            <th className="px-4 py-3">RR</th>
            <th className="px-4 py-3">HR</th>
            <th className="px-4 py-3">Condition</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Recorded By</th>
          </tr>
        </thead>
        <tbody>
          {observations.map((obs) => {
            const order = orderFor(obs.orderId);
            return (
              <tr key={obs.id} className={`border-b border-slate-100 last:border-0 ${obs.belowTarget ? "bg-red-50/40" : ""}`}>
                <td className="px-4 py-3 text-slate-600">{obs.recordedAt}</td>
                <td className="px-4 py-3 text-slate-700">{order ? formatDeviceSettings(order.settings) : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${obs.belowTarget ? "text-red-600" : "text-emerald-600"}`}>{obs.spo2}%</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{obs.respiratoryRate}/min</td>
                <td className="px-4 py-3 text-slate-600">{obs.heartRate} bpm</td>
                <td className="px-4 py-3 text-slate-600">{obs.patientCondition}</td>
                <td className="px-4 py-3">
                  {obs.belowTarget ? (
                    <Badge variant="outline" className="gap-1 border-red-300 bg-red-50 text-red-700"><AlertTriangle className="h-3 w-3" />Watch</Badge>
                  ) : obs.oxygenResponse === "Improving" ? (
                    <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"><TrendingUp className="h-3 w-3" />Improving</Badge>
                  ) : obs.oxygenResponse === "Deteriorating" ? (
                    <Badge variant="outline" className="gap-1 border-amber-300 bg-amber-50 text-amber-700"><TrendingDown className="h-3 w-3" />Deteriorating</Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-700"><CheckCircle2 className="h-3 w-3" />Stable</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{obs.recordedBy}</td>
              </tr>
            );
          })}
          {observations.length === 0 && (
            <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-400">No oxygen observations recorded yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}