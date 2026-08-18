"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface MedicineSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (medicine: {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }) => void;
}

// Mock medicine catalogue
const MEDICINE_CATALOGUE = [
  { id: "1", name: "Azithromycin 500mg Tablet", category: "Antibiotic", defaultDose: "500 mg PO", defaultFreq: "OD", defaultDuration: "3 days", defaultInstructions: "After food" },
  { id: "2", name: "Paracetamol 650mg Tablet", category: "Analgesic", defaultDose: "650 mg PO", defaultFreq: "SOS", defaultDuration: "3 days", defaultInstructions: "For fever > 100F" },
  { id: "3", name: "Ambroxol 30mg Tablet", category: "Mucolytic", defaultDose: "30 mg PO", defaultFreq: "TDS", defaultDuration: "5 days", defaultInstructions: "After meals" },
  { id: "4", name: "Metformin 500mg Tablet", category: "Antidiabetic", defaultDose: "500 mg PO", defaultFreq: "BD", defaultDuration: "30 days", defaultInstructions: "With meals" },
  { id: "5", name: "Amlodipine 5mg Tablet", category: "Antihypertensive", defaultDose: "5 mg PO", defaultFreq: "OD", defaultDuration: "30 days", defaultInstructions: "Morning" },
];

export function MedicineSelectorDialog({ open, onOpenChange, onAdd }: MedicineSelectorDialogProps) {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");

  const medicine = MEDICINE_CATALOGUE.find((m) => m.id === selectedMedicine);

  function handleAdd() {
    if (!selectedMedicine || !dosage || !frequency) return;
    onAdd({
      id: String(Date.now()),
      name: medicine?.name || selectedMedicine,
      dosage,
      frequency,
      duration,
      instructions,
    });
    onOpenChange(false);
    // Reset form
    setSelectedMedicine("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setInstructions("");
  }

  function handleMedicineSelect(id: string) {
    setSelectedMedicine(id);
    const med = MEDICINE_CATALOGUE.find((m) => m.id === id);
    if (med) {
      setDosage(med.defaultDose);
      setFrequency(med.defaultFreq);
      setDuration(med.defaultDuration);
      setInstructions(med.defaultInstructions);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[96vw] !max-w-[700px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Medicine</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Medicine Name</Label>
            <Select value={selectedMedicine} onValueChange={handleMedicineSelect}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Search medicine catalogue" />
              </SelectTrigger>
              <SelectContent>
                {MEDICINE_CATALOGUE.map((med) => (
                  <SelectItem key={med.id} value={med.id}>
                    {med.name} ({med.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {medicine && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-xs text-blue-700">
                <strong>Default:</strong> {medicine.defaultDose} • {medicine.defaultFreq} • {medicine.defaultDuration} • {medicine.defaultInstructions}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Dosage & Route</Label>
              <Input
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="mt-2"
                placeholder="e.g. 500 mg PO"
              />
            </div>
            <div>
              <Label>Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OD">OD (Once Daily)</SelectItem>
                  <SelectItem value="BD">BD (Twice Daily)</SelectItem>
                  <SelectItem value="TDS">TDS (Three Times Daily)</SelectItem>
                  <SelectItem value="QID">QID (Four Times Daily)</SelectItem>
                  <SelectItem value="SOS">SOS (As Needed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duration</Label>
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-2"
                placeholder="e.g. 5 days"
              />
            </div>
            <div>
              <Label>Instructions</Label>
              <Input
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="mt-2"
                placeholder="e.g. After food"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-600 to-cyan-600">
              Add Medicine
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}