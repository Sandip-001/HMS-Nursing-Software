"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, ScanLine } from "lucide-react";

interface LabOrderSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (order: { id: string; test: string; priority: "routine" | "priority" }) => void;
}

// Mock lab test catalogue
const LAB_TESTS = [
  { id: "1", name: "Complete Blood Count (CBC)", category: "Hematology", icon: "test" },
  { id: "2", name: "Blood Sugar HbA1c", category: "Biochemistry", icon: "test" },
  { id: "3", name: "Lipid Profile", category: "Biochemistry", icon: "test" },
  { id: "4", name: "Kidney Function Test", category: "Biochemistry", icon: "test" },
  { id: "5", name: "ECG", category: "Cardiology", icon: "scan" },
  { id: "6", name: "Chest X-Ray PA View", category: "Radiology", icon: "scan" },
  { id: "7", name: "CRP Quantitative", category: "Immunology", icon: "test" },
  { id: "8", name: "Liver Function Test", category: "Biochemistry", icon: "test" },
];

export function LabOrderSelectorDialog({ open, onOpenChange, onAdd }: LabOrderSelectorDialogProps) {
  const [selectedTest, setSelectedTest] = useState("");
  const [priority, setPriority] = useState<"routine" | "priority">("routine");

  function handleAdd() {
    if (!selectedTest) return;
    const test = LAB_TESTS.find((t) => t.id === selectedTest);
    if (!test) return;
    onAdd({
      id: String(Date.now()),
      test: test.name,
      priority,
    });
    onOpenChange(false);
    setSelectedTest("");
    setPriority("routine");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[96vw] !max-w-[700px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Lab Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Select Investigation</Label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              {LAB_TESTS.map((test) => (
                <button
                  key={test.id}
                  onClick={() => setSelectedTest(test.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedTest === test.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {test.icon === "test" ? (
                      <TestTube className="w-4 h-4 text-blue-500" />
                    ) : (
                      <ScanLine className="w-4 h-4 text-purple-500" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{test.name}</p>
                      <p className="text-xs text-slate-500">{test.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Priority Level</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as "routine" | "priority")}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="priority">Priority (Today)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-600 to-cyan-600">
              Add Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}