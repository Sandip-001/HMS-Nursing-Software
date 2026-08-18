
import { ArrowDown, ArrowUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CriticalAlert } from "@/types/doctor/ipd/lab-results-types";

const dirConfig = {
  low: { Icon: ArrowDown, iconStyle: "bg-red-50 text-red-500", textStyle: "text-red-600", label: "Low" },
  high: { Icon: ArrowUp, iconStyle: "bg-red-50 text-red-500", textStyle: "text-red-600", label: "High" },
  borderline: { Icon: AlertCircle, iconStyle: "bg-amber-50 text-amber-500", textStyle: "text-amber-600", label: "Borderline" },
};

export function CriticalAlertsWidget({ alerts }: { alerts: CriticalAlert[] }) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Critical / Abnormal Alerts ({alerts.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {alerts.length === 0 && <p className="text-sm text-slate-400">No critical alerts.</p>}
        {alerts.map((a) => {
          const { Icon, iconStyle, textStyle, label } = dirConfig[a.direction];
          return (
            <div key={a.testName} className="flex items-start gap-2.5">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconStyle}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">{a.testName}</p>
                  <span className={`text-xs font-semibold ${textStyle}`}>{label}</span>
                </div>
                <p className="text-sm font-bold text-slate-700">{a.value} {a.unit}</p>
                <p className="text-[11px] text-slate-400">Ref. Range: {a.referenceRange}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}