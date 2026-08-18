// app/ipd/doctor/treatment-plan/_components/treatment-plan-dialog.tsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClipboardPlus } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { PlanCategory, PlanPriority, TreatmentPlanItem } from "@/types/doctor/ipd/treatment-plan-types";

interface TreatmentPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: TreatmentPlanItem | null;
  onSave: (item: TreatmentPlanItem) => void;
}

const initialState = {
  problemDiagnosis: "",
  category: "Medical Management" as PlanCategory,
  intervention: "",
  targetGoal: "",
  duration: "",
  priority: "Medium" as PlanPriority,
  notes: "",
};

export function TreatmentPlanDialog({
  open,
  onOpenChange,
  editingItem,
  onSave,
}: TreatmentPlanDialogProps) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingItem) {
      setForm({
        problemDiagnosis: editingItem.problemDiagnosis,
        category: editingItem.category,
        intervention: editingItem.intervention,
        targetGoal: editingItem.targetGoal,
        duration: editingItem.duration,
        priority: editingItem.priority,
        notes: editingItem.notes,
      });
    } else {
      setForm(initialState);
    }
  }, [editingItem, open]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.problemDiagnosis || !form.intervention || !form.targetGoal || !form.duration) {
      toast.error("Please fill all required fields");
      return;
    }

    const item: TreatmentPlanItem = {
      id: editingItem?.id ?? `TP-${Date.now()}`,
      problemDiagnosis: form.problemDiagnosis,
      category: form.category,
      intervention: form.intervention,
      targetGoal: form.targetGoal,
      duration: form.duration,
      priority: form.priority,
      notes: form.notes,
    };

    console.log(editingItem ? "Updating treatment plan:" : "Adding treatment plan:", item);
    onSave(item);
    onOpenChange(false);
    setForm(initialState);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[95vw] !max-w-[760px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b border-slate-100 px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
            <ClipboardPlus className="h-5 w-5 text-blue-600" />
            {editingItem ? "Edit Treatment Plan" : "Add Treatment Plan"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-5 py-5">
          <div>
            <Label className="text-xs text-slate-500">Problem / Diagnosis *</Label>
            <Input
              className="mt-1"
              value={form.problemDiagnosis}
              onChange={(e) => update("problemDiagnosis", e.target.value)}
              placeholder="Enter diagnosis/problem"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-slate-500">Category</Label>
              <Select value={form.category} onValueChange={(v) => update("category", v as PlanCategory)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical Management">Medical Management</SelectItem>
                  <SelectItem value="Monitoring">Monitoring</SelectItem>
                  <SelectItem value="Diet & Lifestyle">Diet & Lifestyle</SelectItem>
                  <SelectItem value="Therapy & Rehabilitation">Therapy & Rehabilitation</SelectItem>
                  <SelectItem value="Patient Education">Patient Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-slate-500">Priority</Label>
              <Select value={form.priority} onValueChange={(v) => update("priority", v as PlanPriority)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-slate-500">Intervention / Management *</Label>
            <Textarea
              className="mt-1"
              rows={3}
              value={form.intervention}
              onChange={(e) => update("intervention", e.target.value)}
              placeholder="Enter intervention/management"
            />
          </div>

          <div>
            <Label className="text-xs text-slate-500">Target / Goal *</Label>
            <Textarea
              className="mt-1"
              rows={2}
              value={form.targetGoal}
              onChange={(e) => update("targetGoal", e.target.value)}
              placeholder="Enter target/goal"
            />
          </div>

          <div>
            <Label className="text-xs text-slate-500">Duration *</Label>
            <Input
              className="mt-1"
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
              placeholder="e.g. Ongoing / 5 Days / 2 Weeks"
            />
          </div>

          <div>
            <Label className="text-xs text-slate-500">Notes</Label>
            <Textarea
              className="mt-1"
              rows={3}
              maxLength={500}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Additional notes..."
            />
            <p className="text-right text-xs text-slate-400">{form.notes.length}/500</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}