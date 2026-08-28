// app/(dashboard)/admission-desk/emergency/new-registration/_components/police-notice-banner.tsx
import { ShieldAlert } from "lucide-react";
import type { IncidentType } from "@/types/emergency/emergency-types";

export function PoliceNoticeBanner({ incidentType }: { incidentType: IncidentType }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      <div>
        <p className="text-sm font-bold text-amber-800">This incident type requires police notification</p>
        <p className="mt-1 text-xs text-slate-600">
          "{incidentType}" is flagged as a medico-legal case (MLC). After registration, use the <span className="font-semibold">Handover & Police</span> section in patient details to inform the nearest police station.
        </p>
      </div>
    </div>
  );
}