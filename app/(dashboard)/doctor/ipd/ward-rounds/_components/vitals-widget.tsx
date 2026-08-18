
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VitalReading } from "@/types/doctor/ipd/ward-round-types";

export function VitalsWidget({ vitals }: { vitals: VitalReading }) {
  const items = [
    { label: "BP", value: vitals.bp, unit: "mmHg" },
    { label: "Pulse", value: vitals.pulse, unit: "bpm" },
    { label: "Temp.", value: vitals.temp, unit: "°F" },
    { label: "RR", value: vitals.rr, unit: "/min" },
    { label: "SpO₂", value: vitals.spo2, unit: "%" },
    { label: "Pain", value: vitals.pain, unit: "(No Pain)" },
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Vitals (Latest)</CardTitle>
        <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="mb-3 text-xs text-slate-400">Recorded On: {vitals.recordedOn}</p>
        <div className="grid grid-cols-2 gap-3">
          {items.map((it) => (
            <div key={it.label} className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5 text-center">
              <p className="text-sm font-bold text-slate-800">{it.value}</p>
              <p className="text-[11px] text-slate-400">{it.label}</p>
              <p className="text-[10px] text-slate-300">{it.unit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}