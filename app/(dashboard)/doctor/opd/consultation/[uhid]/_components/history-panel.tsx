"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Pill, TestTube, Activity, AlertTriangle } from "lucide-react";

interface HistoryPanelProps {
  uhid: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Mock history data
const MOCK_HISTORY = {
  chronicConditions: ["Type 2 Diabetes Mellitus", "Essential Hypertension"],
  allergies: ["Penicillin - rash and facial swelling (2022)", "Diclofenac - gastritis (2026)"],
  activeMeds: ["Metformin 500mg BD", "Telmisartan 40mg OD", "Amlodipine 5mg OD"],
  admissions: 1,
  timeline: [
    { date: "Today 04:02 PM", event: "Vitals recorded and triage completed", type: "vitals" },
    { date: "21 Jul 2026", event: "Diabetes follow-up - HbA1c review", type: "consultation" },
    { date: "04 Jun 2026", event: "Lab report: HbA1c 7.8", type: "lab" },
    { date: "17 May 2026", event: "Medication allergy updated", type: "allergy" },
  ],
};

export function HistoryPanel({ uhid, open = false, onOpenChange }: HistoryPanelProps) {
  return (
    <>
      {/* Sidebar Panel */}
      <Card className="hidden xl:block">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Patient Timeline</h2>
            <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => onOpenChange?.(true)}>
              Full History
            </Button>
          </div>
          <div className="space-y-3">
            {MOCK_HISTORY.timeline.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1" />
                <div>
                  <p className="font-semibold text-slate-700">{item.date}</p>
                  <p className="text-slate-500">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full History Dialog */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!w-[96vw] !max-w-[900px] max-h-[92vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Patient Longitudinal History</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <HistoryStat label="Chronic Conditions" value="02" desc="Diabetes, Hypertension" />
              <HistoryStat label="Drug Allergies" value="02" desc="Penicillin, Diclofenac" isAlert />
              <HistoryStat label="Active Medicines" value="03" desc="Regular medications" />
              <HistoryStat label="Admissions" value="01" desc="In last 12 months" />
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3">Clinical Timeline</h3>
              <div className="space-y-3">
                {MOCK_HISTORY.timeline.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">{item.date}</p>
                      <Badge variant="secondary" className="bg-green-50 text-green-700">Completed</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem List */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3">Active Problem List</h3>
              <div className="space-y-2">
                {MOCK_HISTORY.chronicConditions.map((condition, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-800">{condition}</p>
                    <p className="mt-1 text-xs text-slate-500">Active</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Drug Allergies
              </h3>
              <div className="space-y-2">
                {MOCK_HISTORY.allergies.map((allergy, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm font-semibold text-red-800">{allergy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4 text-purple-500" />
                Current Medications
              </h3>
              <div className="space-y-2">
                {MOCK_HISTORY.activeMeds.map((med, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-800">{med}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function HistoryStat({ label, value, desc, isAlert }: { label: string; value: string; desc: string; isAlert?: boolean }) {
  return (
    <div className="p-3 rounded-lg border border-slate-200">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${isAlert ? "text-red-600" : "text-slate-800"}`}>{value}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}