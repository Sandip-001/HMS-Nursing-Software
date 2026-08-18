
import type { VitalRecordEntry } from "@/types/doctor/ipd/vitals-types";

export function LatestVitalsPanel({ record }: { record: VitalRecordEntry }) {
  const rows = [
    { label: "BP", value: `${record.bp} mmHg` },
    { label: "Pulse", value: `${record.pulse} bpm` },
    { label: "Respiratory Rate", value: `${record.respRate} /min` },
    { label: "SpO2", value: `${record.spo2} %` },
    { label: "Temperature", value: `${record.temp} °F` },
    { label: "Pain (NRS)", value: `${record.pain} /10` },
  ];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4">
      <p className="mb-3 text-xs font-semibold text-slate-500">Latest Vitals ({record.dateTime})</p>
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{r.label}</span>
            <span className="font-semibold text-slate-800">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}