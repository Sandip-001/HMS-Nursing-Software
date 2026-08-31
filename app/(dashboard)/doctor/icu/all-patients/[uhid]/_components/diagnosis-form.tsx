// app/(dashboard)/doctor/icu/patients/[uhid]/_components/diagnosis-form.tsx
"use client";
import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { DiagnosisItem } from "@/types/doctor/icu/doctor-icu-types";

interface SmallFieldProps {
  label: string;
  children: React.ReactNode;
}

function SmallField({ label, children }: SmallFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-slate-600">{label}</Label>
      {children}
    </div>
  );
}

const DIAGNOSIS_OPTIONS = [
  { code: "I21.9", name: "Acute Myocardial Infarction" },
  { code: "J18.9", name: "Pneumonia" },
  { code: "K80.20", name: "Calculus of Gallbladder" },
  { code: "E11.9", name: "Type 2 Diabetes Mellitus" },
  { code: "I10", name: "Essential Hypertension" },
  { code: "T14.90", name: "Multiple Traumatic Injuries" },
  { code: "T39.9", name: "Drug Overdose" },
];

const STATUS_OPTIONS = ["Active", "Resolved", "Chronic", "Rule Out"] as const;

export function DiagnosisForm({ onSubmit, onClose }: { onSubmit: (payload: DiagnosisItem[]) => void; onClose: () => void }) {
  const [rows, setRows] = useState<DiagnosisItem[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<{ code: string; name: string } | null>(null);
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("Active");

  function add() {
    if (!selectedDiagnosis) return;
    setRows((v) => [
      ...v,
      {
        id: `DIAG-${Date.now()}-${Math.random()}`,
        code: selectedDiagnosis.code,
        name: selectedDiagnosis.name,
        status,
        notedAt: new Date().toISOString(),
        notedBy: "Dr. Amit Verma",
      },
    ]);
    setSelectedDiagnosis(null);
    setStatus("Active");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Add Diagnosis</h3>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SmallField label="Diagnosis">
          <Select
            value={selectedDiagnosis?.code ?? ""}
            onValueChange={(v) => {
              const diag = DIAGNOSIS_OPTIONS.find((d) => d.code === v);
              setSelectedDiagnosis(diag ?? null);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select diagnosis..." />
            </SelectTrigger>
            <SelectContent>
              {DIAGNOSIS_OPTIONS.map((d) => (
                <SelectItem key={d.code} value={d.code}>
                  {d.name} ({d.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SmallField>

        <SmallField label="Status">
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SmallField>
      </div>

      {selectedDiagnosis && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm">
          <p className="font-semibold text-blue-900">{selectedDiagnosis.name}</p>
          <p className="text-xs text-blue-700">Code: {selectedDiagnosis.code}</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={add}
        disabled={!selectedDiagnosis}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Add to List
      </Button>

      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-sm"
          >
            <div>
              <p className="font-semibold text-slate-800">{r.name}</p>
              <p className="text-xs text-slate-500">{r.code} · {r.status}</p>
            </div>
            <button
              onClick={() => setRows((v) => v.filter((_, j) => j !== i))}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
            Select diagnosis from the list to add.
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="button" onClick={() => onSubmit(rows)} disabled={rows.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Save Diagnosis
        </Button>
      </div>
    </div>
  );
}