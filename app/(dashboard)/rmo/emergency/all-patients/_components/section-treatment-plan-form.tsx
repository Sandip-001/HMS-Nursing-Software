// app/(dashboard)/rmo/emergency/all-patients/_components/section-treatment-plan-form.tsx
"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TreatmentPlanItem } from "@/types/emergency/emergency-types";

export function TreatmentPlanForm({ onSubmit, onClose }: { onSubmit: (payload: Omit<TreatmentPlanItem, "id" | "orderedOn" | "followStatus">) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    orderedBy: "",
    orderedByRole: "Doctor" as "Doctor" | "RMO",
  });

  const set = (key: keyof typeof form, value: string) => setForm((v) => ({ ...v, [key]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-800">Add Treatment Plan</p>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
      </div>
      <div className="space-y-3">
        <div>
          <Label className="text-xs text-slate-500">Title</Label>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. ACS Protocol, Antibiotic Therapy" />
        </div>
        <div>
          <Label className="text-xs text-slate-500">Description</Label>
          <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Detailed treatment instructions" rows={4} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-slate-500">Ordered By (Name)</Label>
            <Input value={form.orderedBy} onChange={(e) => set("orderedBy", e.target.value)} placeholder="Doctor / RMO name" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Role</Label>
            <Select value={form.orderedByRole} onValueChange={(v) => set("orderedByRole", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="RMO">RMO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => onSubmit(form)}>Save Treatment Plan</Button>
      </div>
    </div>
  );
}