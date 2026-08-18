"use client";

import {
  Activity, Droplets, HeartPulse, Thermometer, Wind, Gauge, Clock3, UserRound, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { VitalRecordEntry } from "@/types/doctor/ipd/vitals-types";

interface LatestVitalsMiniProps {
  vitals: VitalRecordEntry | undefined;
  onViewAll?: () => void;
}

function bpTone(systolic: number, diastolic: number) {
  if (systolic >= 140 || diastolic >= 90) return "text-red-600 bg-red-50 border-red-200";
  if (systolic < 90 || diastolic < 60) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-emerald-600 bg-emerald-50 border-emerald-200";
}

function spo2Tone(spo2: number) {
  if (spo2 < 94) return "text-red-600 bg-red-50 border-red-200";
  if (spo2 < 96) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-emerald-600 bg-emerald-50 border-emerald-200";
}

function tempTone(temp: number) {
  if (temp >= 100.4) return "text-red-600 bg-red-50 border-red-200";
  if (temp >= 99.1) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-emerald-600 bg-emerald-50 border-emerald-200";
}

function pulseTone(pulse: number) {
  if (pulse >= 110 || pulse < 55) return "text-red-600 bg-red-50 border-red-200";
  if (pulse >= 100) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-emerald-600 bg-emerald-50 border-emerald-200";
}

export function LatestVitalsMini({ vitals, onViewAll }: LatestVitalsMiniProps) {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Activity className="h-4 w-4 text-blue-600" />
          Latest Vitals
        </p>
        {onViewAll && (
          <Button variant="link" size="sm" onClick={onViewAll} className="h-auto gap-0.5 p-0 text-xs font-semibold text-blue-600">
            View All <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <CardContent className="space-y-4 p-4">
        {!vitals ? (
          <div className="py-8 text-center">
            <Activity className="mx-auto h-7 w-7 text-slate-300" />
            <p className="mt-2 text-sm font-medium text-slate-500">No vitals recorded yet</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              <VitalTile
                icon={<HeartPulse className="h-3.5 w-3.5" />}
                label="Blood Pressure"
                value={vitals.bp}
                unit="mmHg"
                tone={bpTone(vitals.systolic, vitals.diastolic)}
              />
              <VitalTile
                icon={<Gauge className="h-3.5 w-3.5" />}
                label="Pulse"
                value={String(vitals.pulse)}
                unit="/min"
                tone={pulseTone(vitals.pulse)}
              />
              <VitalTile
                icon={<Thermometer className="h-3.5 w-3.5" />}
                label="Temperature"
                value={String(vitals.temp)}
                unit="°F"
                tone={tempTone(vitals.temp)}
              />
              <VitalTile
                icon={<Droplets className="h-3.5 w-3.5" />}
                label="SpO₂"
                value={String(vitals.spo2)}
                unit="%"
                tone={spo2Tone(vitals.spo2)}
              />
              <VitalTile
                icon={<Wind className="h-3.5 w-3.5" />}
                label="Resp. Rate"
                value={String(vitals.respRate)}
                unit="/min"
                tone="text-slate-600 bg-slate-50 border-slate-200"
              />
              <VitalTile
                icon={<Activity className="h-3.5 w-3.5" />}
                label="Pain (NRS)"
                value={String(vitals.pain)}
                unit="/10"
                tone={vitals.pain >= 6 ? "text-red-600 bg-red-50 border-red-200" : vitals.pain >= 4 ? "text-amber-600 bg-amber-50 border-amber-200" : "text-emerald-600 bg-emerald-50 border-emerald-200"}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock3 className="h-3 w-3" /> {vitals.dateTime}
              </span>
              <span className="flex items-center gap-1">
                <UserRound className="h-3 w-3" /> {vitals.recordedBy}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function VitalTile({ icon, label, value, unit, tone }: { icon: React.ReactNode; label: string; value: string; unit: string; tone: string }) {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${tone}`}>
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide opacity-80">
        {icon} {label}
      </div>
      <p className="mt-1 text-base font-bold leading-none">
        {value} <span className="text-[10px] font-medium opacity-70">{unit}</span>
      </p>
    </div>
  );
}