"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Activity, Thermometer, Droplets, Weight, Ruler } from "lucide-react";

interface VitalsSidebarCardProps {
  vitals: {
    bp?: string;
    pulse?: string;
    temp?: string;
    spo2?: string;
    weight?: string;
    height?: string;
  };
}

export function VitalsSidebarCard({ vitals }: VitalsSidebarCardProps) {
  const hasAnyVitals = vitals.bp || vitals.pulse || vitals.temp || vitals.spo2 || vitals.weight || vitals.height;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-500" />
          <h2 className="font-bold text-slate-800">Current Vitals</h2>
        </div>

        {hasAnyVitals ? (
          <div className="grid grid-cols-2 gap-3">
            <VitalCard
              icon={<Heart className="w-4 h-4" />}
              label="Blood Pressure"
              value={vitals.bp || "—"}
              unit="mmHg"
              color="text-red-500 bg-red-50"
            />
            <VitalCard
              icon={<Activity className="w-4 h-4" />}
              label="Pulse Rate"
              value={vitals.pulse || "—"}
              unit="/min"
              color="text-pink-500 bg-pink-50"
            />
            <VitalCard
              icon={<Thermometer className="w-4 h-4" />}
              label="Temperature"
              value={vitals.temp || "—"}
              unit="°F"
              color="text-orange-500 bg-orange-50"
            />
            <VitalCard
              icon={<Droplets className="w-4 h-4" />}
              label="SpO₂"
              value={vitals.spo2 || "—"}
              unit="%"
              color="text-blue-500 bg-blue-50"
            />
            {vitals.weight && (
              <VitalCard
                icon={<Weight className="w-4 h-4" />}
                label="Weight"
                value={vitals.weight}
                unit="kg"
                color="text-purple-500 bg-purple-50"
              />
            )}
            {vitals.height && (
              <VitalCard
                icon={<Ruler className="w-4 h-4" />}
                label="Height"
                value={vitals.height}
                unit="cm"
                color="text-teal-500 bg-teal-50"
              />
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-slate-400">No vitals recorded yet</p>
            <p className="text-xs text-slate-400 mt-1">Complete Step 1 to add vitals</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function VitalCard({
  icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="p-3 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-base font-bold text-slate-800 mt-0.5">
        {value} <span className="text-[10px] font-normal text-slate-400">{unit}</span>
      </p>
    </div>
  );
}