// app/(dashboard)/doctor/icu/patients/[uhid]/_components/lab-form.tsx
"use client";
import { useState } from "react";
import { Plus, Trash2, X, Microscope, ScanLine, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LabDraft, LabTestItem } from "@/types/doctor/icu/doctor-icu-types";
import { LAB_TEST_CATALOG } from "@/lib/doctor/icu/doctor-icu-data";

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

export function LabForm({ onSubmit, onClose }: { onSubmit: (payload: LabDraft[]) => void; onClose: () => void }) {
  const [rows, setRows] = useState<LabDraft[]>([]);
  const [form, setForm] = useState({
    category: "All" as "All" | "Pathology" | "Radiology",
    testName: "",
    clinicalNotes: "",
    priority: "Routine" as "Routine" | "Urgent" | "Stat",
  });
  const [query, setQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState<LabTestItem | null>(null);

  const filteredTests = LAB_TEST_CATALOG.filter(
    (t) =>
      (form.category === "All" || t.category === form.category) &&
      `${t.name} ${t.code}`.toLowerCase().includes(query.toLowerCase()),
  );

  function add() {
    const name = selectedTest ? selectedTest.name : form.testName;
    const category = selectedTest ? selectedTest.category : form.category === "All" ? "Pathology" : form.category;
    if (!name.trim()) return;
    setRows((v) => [
      ...v,
      {
        category: category as "Pathology" | "Radiology",
        testName: name,
        orderedBy: "Doctor",
        priority: form.priority,
        clinicalNotes: form.clinicalNotes,
      },
    ]);
    setForm((v) => ({ ...v, testName: "", clinicalNotes: "" }));
    setSelectedTest(null);
    setQuery("");
  }

  function handleTestSelect(test: LabTestItem) {
    setSelectedTest(test);
    setForm((v) => ({ ...v, testName: test.name, category: test.category as "Pathology" | "Radiology" }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Order Lab Tests</h3>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SmallField label="Category">
          <Select
            value={form.category}
            onValueChange={(v) => {
              setForm((x) => ({ ...x, category: v as typeof x.category }));
              setSelectedTest(null);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Tests</SelectItem>
              <SelectItem value="Pathology">Pathology</SelectItem>
              <SelectItem value="Radiology">Radiology</SelectItem>
            </SelectContent>
          </Select>
        </SmallField>
        <SmallField label="Priority">
          <Select
            value={form.priority}
            onValueChange={(v) =>
              setForm((x) => ({ ...x, priority: v as typeof x.priority }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Routine">Routine</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
              <SelectItem value="Stat">Stat</SelectItem>
            </SelectContent>
          </Select>
        </SmallField>
      </div>

      <div>
        <SmallField label="Select Test">
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedTest(null);
              }}
              placeholder={form.category === "All" ? "Search all tests..." : `Search ${form.category.toLowerCase()} tests...`}
              className="pr-10"
            />
            {form.category === "Pathology" || (form.category === "All" && !query) ? (
              <Microscope className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
            ) : (
              <ScanLine className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600" />
            )}
          </div>
        </SmallField>

        {query && (
          <ScrollArea className="mt-2 h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white">
            {filteredTests.map((test) => (
              <button
                type="button"
                key={test.id}
                onClick={() => handleTestSelect(test)}
                className={`flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-0 ${selectedTest?.id === test.id ? "bg-cyan-100" : "hover:bg-cyan-50"}`}
              >
                {test.category === "Pathology" ? (
                  <Microscope className="h-5 w-5 text-cyan-600" />
                ) : (
                  <ScanLine className="h-5 w-5 text-blue-600" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{test.name}</p>
                  <p className="text-xs text-slate-400">{test.code} · {test.description}</p>
                </div>
                {selectedTest?.id === test.id ? (
                  <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                ) : (
                  <Plus className="h-4 w-4 text-cyan-600" />
                )}
              </button>
            ))}
          </ScrollArea>
        )}
      </div>

      {selectedTest && (
        <div className="flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm">
          <CheckCircle2 className="h-4 w-4 text-cyan-600" />
          <span className="font-semibold text-cyan-900">{selectedTest.name}</span>
          <span className="text-slate-500">({selectedTest.category})</span>
        </div>
      )}

      <SmallField label="Clinical Notes">
        <Textarea
          value={form.clinicalNotes}
          onChange={(e) =>
            setForm((v) => ({ ...v, clinicalNotes: e.target.value }))
          }
          placeholder="Clinical indication or instructions"
        />
      </SmallField>

      <Button
        type="button"
        variant="outline"
        onClick={add}
        disabled={!selectedTest && !form.testName.trim()}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Add to Order Basket
      </Button>

      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-sm"
          >
            <div className="flex items-center gap-2">
              {r.category === "Pathology" ? (
                <Microscope className="h-4 w-4 text-cyan-600" />
              ) : (
                <ScanLine className="h-4 w-4 text-blue-600" />
              )}
              <span>
                <b>{r.testName}</b> · {r.category} · {r.priority}
                {r.clinicalNotes && (
                  <small className="block text-slate-500">Notes: {r.clinicalNotes}</small>
                )}
              </span>
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
            Select tests from the catalog or enter manually to create the order basket.
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="button" onClick={() => onSubmit(rows)} disabled={rows.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Send Orders to Lab
        </Button>
      </div>
    </div>
  );
}