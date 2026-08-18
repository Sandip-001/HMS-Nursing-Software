// app/ipd/doctor/review-vitals/_components/vitals-comparison-table.tsx
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { VitalRecordEntry } from "@/types/doctor/ipd/vitals-types";
import type { VitalsFormData } from "@/types/doctor/ipd/record-vitals-types";

interface VitalsComparisonTableProps {
  previous: VitalRecordEntry | undefined;
  current: VitalsFormData;
}

function TrendIcon({ prev, curr }: { prev: number; curr: number }) {
  if (!prev || !curr || prev === curr) return <Minus className="h-3 w-3 text-slate-400" />;
  return curr > prev ? <ArrowUp className="h-3 w-3 text-red-500" /> : <ArrowDown className="h-3 w-3 text-emerald-500" />;
}

export function VitalsComparisonTable({ previous, current }: VitalsComparisonTableProps) {
  if (!previous) return <p className="text-sm text-slate-400">No previous vitals recorded.</p>;

  const rows = [
    { param: "BP (mmHg)", prev: previous.bp, curr: `${current.systolic || "-"}/${current.diastolic || "-"}`, prevNum: previous.systolic, currNum: parseFloat(current.systolic) },
    { param: "Pulse (bpm)", prev: String(previous.pulse), curr: current.pulse || "-", prevNum: previous.pulse, currNum: parseFloat(current.pulse) },
    { param: "Resp. Rate (/min)", prev: String(previous.respRate), curr: current.respRate || "-", prevNum: previous.respRate, currNum: parseFloat(current.respRate) },
    { param: "SpO2 (%)", prev: String(previous.spo2), curr: current.spo2 || "-", prevNum: previous.spo2, currNum: parseFloat(current.spo2) },
    { param: "Temp. (°F)", prev: String(previous.temp), curr: current.temp || "-", prevNum: previous.temp, currNum: parseFloat(current.temp) },
    { param: "Pain Score (NRS)", prev: String(previous.pain), curr: String(current.painScore), prevNum: previous.pain, currNum: current.painScore },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-slate-100">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 text-slate-500">
            <th className="px-3 py-2 text-left font-medium">Parameter</th>
            <th className="px-3 py-2 text-left font-medium">Previous</th>
            <th className="px-3 py-2 text-left font-medium">Current</th>
            <th className="px-2 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.param}>
              <td className="px-3 py-2 text-slate-600">{r.param}</td>
              <td className="px-3 py-2 text-slate-500">{r.prev}</td>
              <td className="px-3 py-2 font-semibold text-slate-800">{r.curr}</td>
              <td className="px-2 py-2"><TrendIcon prev={r.prevNum} curr={r.currNum} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}