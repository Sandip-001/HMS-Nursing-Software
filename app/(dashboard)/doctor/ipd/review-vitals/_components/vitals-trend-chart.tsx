
"use client";

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import type { VitalRecordEntry } from "@/types/doctor/ipd/vitals-types";

interface VitalsTrendChartProps {
  records: VitalRecordEntry[];
}

const LINE_CONFIG = [
  { key: "systolic", name: "Systolic (mmHg)", color: "#2563eb" },
  { key: "diastolic", name: "Diastolic (mmHg)", color: "#10b981" },
  { key: "pulse", name: "Pulse (bpm)", color: "#ef4444" },
  { key: "respRate", name: "Resp. Rate (/min)", color: "#8b5cf6" },
  { key: "spo2", name: "SpO2 (%)", color: "#06b6d4" },
];

export function VitalsTrendChart({ records }: VitalsTrendChartProps) {
  const chartData = [...records].reverse().map((r) => ({
    ...r,
    label: r.dateTime.split(",")[0].replace("20 May", "20 May").trim() + "\n" + r.dateTime.split(",")[1]?.trim(),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#94a3b8" }} interval={0} />
          <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} domain={[0, 200]} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} domain={[90, 104]} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {LINE_CONFIG.map((line) => (
            <Line
              key={line.key}
              yAxisId="left"
              type="monotone"
              dataKey={line.key}
              name={line.name}
              stroke={line.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
          <Line yAxisId="right" type="monotone" dataKey="temp" name="Temp. (°F)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}