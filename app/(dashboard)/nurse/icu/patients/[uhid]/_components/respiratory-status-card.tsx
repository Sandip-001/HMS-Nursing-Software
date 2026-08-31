// app/(dashboard)/nurse/icu/patients/[uhid]/_components/respiratory-status-card.tsx
"use client";
import { Activity, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OxygenObservation, OxygenOrder } from "@/types/nurse/icu/oxygen-therapy-types";
import { formatDeviceSettings } from "./oxygen-device-fields";

export function RespiratoryStatusCard({
  order, latestObservation, observationHistory, onViewHistory,
}: {
  order?: OxygenOrder;
  latestObservation?: OxygenObservation;
  observationHistory: OxygenObservation[];
  onViewHistory: () => void;
}) {
  if (!order) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-400">
        No active oxygen therapy order.
      </div>
    );
  }

  const trend = observationHistory.slice(0, 5).reverse().map((o) => o.spo2);

  return (
    <div className="rounded-2xl border border-cyan-200 bg-cyan-50/30 p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-cyan-900"><Wind className="h-4 w-4" />🫁 Respiratory Status</p>
        <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">ACTIVE</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Metric label="Device" value={order.settings.device} />
        <Metric label="Setting" value={formatDeviceSettings(order.settings).replace(`${order.settings.device} · `, "")} />
        <Metric label="Target" value={`${order.targetSpo2Min}–${order.targetSpo2Max}%`} />
        <Metric label="Current SpO₂" value={latestObservation ? `${latestObservation.spo2}%` : "—"} highlight={latestObservation?.belowTarget} />
        <Metric label="RR" value={latestObservation ? `${latestObservation.respiratoryRate}/min` : "—"} />
        <Metric label="Last Observation" value={latestObservation?.recordedAt.split(",")[1]?.trim() ?? "—"} />
      </div>

      {trend.length > 0 && (
        <div className="mt-4 rounded-lg bg-white/70 p-3">
          <p className="text-[10px] uppercase text-cyan-600">Trend (SpO₂)</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-700">
            {trend.map((v, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {v}%{i < trend.length - 1 && <span className="text-slate-300">→</span>}
              </span>
            ))}
          </p>
        </div>
      )}

      <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5" onClick={onViewHistory}>
        <Activity className="h-3.5 w-3.5" />View Oxygen History
      </Button>
    </div>
  );
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-white/70 p-2.5">
      <p className="text-[10px] uppercase text-cyan-600">{label}</p>
      <p className={`mt-0.5 text-sm font-bold ${highlight ? "text-red-600" : "text-slate-800"}`}>{value}</p>
    </div>
  );
}