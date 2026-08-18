
"use client";

import { FlaskConical, TrendingUp, User, CheckCircle2, MessageSquare, LucideIcon } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { LabStatusBadge } from "./lab-status-badge";
import type { LabTestResult } from "@/types/doctor/ipd/lab-results-types";

interface LabResultDetailDialogProps {
  result: LabTestResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LabResultDetailDialog({ result, open, onOpenChange }: LabResultDetailDialogProps) {
  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[92vw] !max-w-[560px] max-h-[88vh] flex flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
            <FlaskConical className="h-5 w-5 text-blue-600" /> Test Result Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">{result.testName}</p>
              <p className="text-xs text-slate-400">{result.category} · {result.testDateTime}</p>
            </div>
            <LabStatusBadge status={result.status} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ResultStat label="Result" value={`${result.result} ${result.unit !== "-" ? result.unit : ""}`} highlight />
            <ResultStat label="Reference Range" value={result.referenceRange} />
            <ResultStat label="Unit" value={result.unit} />
          </div>

          {result.trend && result.trend.length > 1 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" /> Trend (Last 4 readings)
              </p>
              <div className="h-40 w-full rounded-lg border border-slate-100 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {result.interpretation && (
            <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3">
              <p className="mb-1 text-xs font-semibold text-amber-700">Clinical Interpretation</p>
              <p className="text-sm leading-snug text-amber-800">{result.interpretation}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {result.performedBy && (
              <DetailRow icon={User} label="Performed By" value={result.performedBy} />
            )}
            {result.verifiedBy && (
              <DetailRow icon={CheckCircle2} label="Verified By" value={result.verifiedBy} />
            )}
          </div>

          {result.labRemarks && (
            <div className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs font-semibold text-slate-600">Lab Remarks</p>
                <p className="text-sm text-slate-600">{result.labRemarks}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 justify-end border-t border-slate-100 px-5 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResultStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-100 p-3 text-center">
      <p className={highlight ? "text-lg font-bold text-slate-800" : "text-sm font-semibold text-slate-700"}>{value}</p>
      <p className="mt-0.5 text-[11px] text-slate-400">{label}</p>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" />
      <div>
        <p className="text-[11px] text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}