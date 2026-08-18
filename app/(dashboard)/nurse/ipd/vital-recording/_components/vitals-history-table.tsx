
"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VitalHistoryItem } from "@/types/nurse/ipd/vital-recording-types";

export function VitalsHistoryTable({
  items,
  onView,
}: {
  items: VitalHistoryItem[];
  onView: (item: VitalHistoryItem) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Date & Time</th>
            <th className="px-4 py-3 font-medium">Temp (°F)</th>
            <th className="px-4 py-3 font-medium">Pulse (/min)</th>
            <th className="px-4 py-3 font-medium">RR (/min)</th>
            <th className="px-4 py-3 font-medium">BP (mmHg)</th>
            <th className="px-4 py-3 font-medium">SpO₂ (%)</th>
            <th className="px-4 py-3 font-medium">Pain Score</th>
            <th className="px-4 py-3 font-medium">Recorded By</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium text-slate-700">{item.dateTime}</td>
              <td className="px-4 py-3 text-slate-600">{item.temperature}</td>
              <td className="px-4 py-3 text-slate-600">{item.pulse}</td>
              <td className="px-4 py-3 text-slate-600">{item.respiratoryRate}</td>
              <td className="px-4 py-3 text-slate-600">{item.bloodPressure}</td>
              <td className="px-4 py-3 text-slate-600">{item.spo2}</td>
              <td className="px-4 py-3 text-slate-600">{item.painScore}</td>
              <td className="px-4 py-3 text-slate-700">{item.recordedBy}</td>
              <td className="px-4 py-3">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onView(item)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}