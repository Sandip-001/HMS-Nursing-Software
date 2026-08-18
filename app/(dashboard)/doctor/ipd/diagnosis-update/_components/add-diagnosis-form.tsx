// app/doctor/ipd/diagnosis-update/_components/add-diagnosis-form.tsx
"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { DIAGNOSIS_SUGGESTIONS } from "@/lib/doctor/ipd/diagnosis-data";
import type { CurrentDiagnosis, DiagnosisType, DiagnosisStatus } from "@/types/doctor/ipd/diagnosis-types";

interface AddDiagnosisFormProps {
  onAddToList: (diagnosis: CurrentDiagnosis) => void;
}

export function AddDiagnosisForm({ onAddToList }: AddDiagnosisFormProps) {
  const [diagnosisName, setDiagnosisName] = useState("");
  const [type, setType] = useState<DiagnosisType | "">("");
  const [icd10, setIcd10] = useState("");
  const [status, setStatus] = useState<DiagnosisStatus | "">("");
  const [notes, setNotes] = useState("");
  const [suggestOpen, setSuggestOpen] = useState(false);

  const filteredSuggestions = DIAGNOSIS_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(diagnosisName.toLowerCase())
  );

  function resetForm() {
    setDiagnosisName(""); setType(""); setIcd10(""); setStatus(""); setNotes("");
  }

  function handleAddToList() {
    if (!diagnosisName || !type || !status) return;
    const newDiagnosis: CurrentDiagnosis = {
      id: `D-${Date.now()}`,
      diagnosis: diagnosisName,
      isPrimary: false,
      type,
      diagnosedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status,
      icd10: icd10 || undefined,
      notes: notes || undefined,
    };
    console.log("Adding diagnosis to list:", newDiagnosis);
    onAddToList(newDiagnosis);
    resetForm();
  }

  const isValid = diagnosisName.trim() && type && status;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label className="text-xs text-slate-500">Diagnosis / Problem *</Label>
        <Popover open={suggestOpen && filteredSuggestions.length > 0} onOpenChange={setSuggestOpen}>
          <PopoverTrigger asChild>
            <Input
              className="mt-1"
              placeholder="Search diagnosis (e.g., Acute MI, Heart Failure)"
              value={diagnosisName}
              onChange={(e) => { setDiagnosisName(e.target.value); setSuggestOpen(true); }}
              onFocus={() => setSuggestOpen(true)}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-1" align="start">
            {filteredSuggestions.slice(0, 6).map((s) => (
              <button
                key={s}
                type="button"
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50"
                onClick={() => { setDiagnosisName(s); setSuggestOpen(false); }}
              >
                {s}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label className="text-xs text-slate-500">Type *</Label>
          <Select value={type} onValueChange={(v) => setType(v as DiagnosisType)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Clinical">Clinical</SelectItem>
              <SelectItem value="Co-morbidity">Co-morbidity</SelectItem>
              <SelectItem value="Provisional">Provisional</SelectItem>
              <SelectItem value="Past History">Past History</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-slate-500">Classification (ICD-10)</Label>
          <Input className="mt-1" placeholder="Search ICD-10 code or description" value={icd10} onChange={(e) => setIcd10(e.target.value)} />
        </div>
      </div>

      <div>
        <Label className="text-xs text-slate-500">Diagnosis Status *</Label>
        <Select value={status} onValueChange={(v) => setStatus(v as DiagnosisStatus)}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Ruled Out">Ruled Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-slate-500">Notes (Optional)</Label>
        <Textarea
          className="mt-1"
          rows={3}
          maxLength={500}
          placeholder="Enter notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <p className="text-right text-xs text-slate-400">{notes.length}/500</p>
      </div>

      <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700" disabled={!isValid} onClick={handleAddToList}>
        <PlusCircle className="h-4 w-4" /> Add to List
      </Button>
    </div>
  );
}