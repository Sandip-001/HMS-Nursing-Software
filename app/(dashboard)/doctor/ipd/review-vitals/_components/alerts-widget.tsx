
import { AlertTriangle, HeartPulse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VitalAlert } from "@/types/doctor/ipd/vitals-types";

const iconMap = {
  "Blood Pressure": { Icon: AlertTriangle, style: "bg-red-50 text-red-500" },
  SpO2: { Icon: HeartPulse, style: "bg-sky-50 text-sky-500" },
  Pulse: { Icon: HeartPulse, style: "bg-red-50 text-red-500" },
  Temperature: { Icon: AlertTriangle, style: "bg-amber-50 text-amber-500" },
};

export function AlertsWidget({ alerts, onViewTrend }: { alerts: VitalAlert[]; onViewTrend: (type: string) => void }) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {alerts.length === 0 && <p className="text-sm text-slate-400">No abnormal vitals detected.</p>}
        {alerts.map((a, i) => {
          const { Icon, style } = iconMap[a.type];
          return (
            <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${style}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700">{a.type}</p>
                <p className="text-xs leading-snug text-slate-500">{a.message}</p>
                <button
                  type="button"
                  onClick={() => onViewTrend(a.type)}
                  className="mt-1 text-xs font-medium text-blue-600 hover:underline"
                >
                  View Trend
                </button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}