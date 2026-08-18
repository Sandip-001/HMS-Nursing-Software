
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { AbnormalAlert } from "@/types/doctor/ipd/record-vitals-types";

const config = {
  normal: { Icon: CheckCircle2, iconStyle: "text-emerald-500 bg-emerald-50", textStyle: "text-emerald-600" },
  mild: { Icon: AlertTriangle, iconStyle: "text-amber-500 bg-amber-50", textStyle: "text-amber-600" },
  critical: { Icon: XCircle, iconStyle: "text-red-500 bg-red-50", textStyle: "text-red-600" },
};

export function AbnormalAlertRow({ alert }: { alert: AbnormalAlert }) {
  const { Icon, iconStyle, textStyle } = config[alert.level];
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
      <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${iconStyle}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        {alert.label}
      </span>
      <span className={`text-xs font-semibold ${textStyle}`}>{alert.message}</span>
    </div>
  );
}