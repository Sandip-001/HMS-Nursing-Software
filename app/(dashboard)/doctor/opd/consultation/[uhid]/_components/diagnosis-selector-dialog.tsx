"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DiagnosisSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (diagnosis: { id: string; name: string; icd10: string; type: "provisional" | "active" | "chronic" }) => void;
}

// Mock ICD-10 catalogue - replace with real search API
const DIAGNOSIS_CATALOGUE = [
  { name: "Community-acquired pneumonia, suspected", icd10: "J18.9" },
  { name: "Type 2 diabetes mellitus without complication", icd10: "E11.9" },
  { name: "Essential hypertension", icd10: "I10" },
  { name: "Acute upper respiratory infection", icd10: "J06.9" },
  { name: "Gastroenteritis, unspecified", icd10: "A09" },
  { name: "Migraine, unspecified", icd10: "G43.9" },
  { name: "Allergic rhinitis, unspecified", icd10: "J30.9" },
  { name: "Urinary tract infection, unspecified", icd10: "N39.0" },
];

export function DiagnosisSelectorDialog({ open, onOpenChange, onAdd }: DiagnosisSelectorDialogProps) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [customName, setCustomName] = useState("");
  const [icd10, setIcd10] = useState("");
  const [type, setType] = useState<"provisional" | "active" | "chronic">("provisional");

  function handleSelectFromCatalogue(name: string) {
    setSelectedDiagnosis(name);
    const match = DIAGNOSIS_CATALOGUE.find((d) => d.name === name);
    if (match) {
      setCustomName(match.name);
      setIcd10(match.icd10);
    }
  }

  function handleAdd() {
    if (!customName.trim()) return;
    onAdd({
      id: String(Date.now()),
      name: customName,
      icd10: icd10 || "TBD",
      type,
    });
    onOpenChange(false);
    setSelectedDiagnosis("");
    setCustomName("");
    setIcd10("");
    setType("provisional");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[96vw] !max-w-[600px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Diagnosis</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Select from ICD-10 Catalogue</Label>
            <Select value={selectedDiagnosis} onValueChange={handleSelectFromCatalogue}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Search diagnosis catalogue" />
              </SelectTrigger>
              <SelectContent>
                {DIAGNOSIS_CATALOGUE.map((d) => (
                  <SelectItem key={d.icd10} value={d.name}>
                    {d.name} ({d.icd10})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label>Diagnosis Name</Label>
              <Input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="mt-2"
                placeholder="e.g. Community-acquired pneumonia"
              />
            </div>
            <div>
              <Label>ICD-10 Code</Label>
              <Input
                value={icd10}
                onChange={(e) => setIcd10(e.target.value)}
                className="mt-2"
                placeholder="e.g. J18.9"
              />
            </div>
          </div>

          <div>
            <Label>Diagnosis Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as "provisional" | "active" | "chronic")}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="provisional">Provisional</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="chronic">Chronic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!customName.trim()} className="bg-gradient-to-r from-blue-600 to-cyan-600">
              Add Diagnosis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}