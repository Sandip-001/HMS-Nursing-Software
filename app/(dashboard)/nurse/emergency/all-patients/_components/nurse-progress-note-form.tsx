// app/(dashboard)/nurse/emergency/_components/nurse-progress-note-form.tsx
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProgressNote } from "@/types/emergency/emergency-types";

export function NurseProgressNoteForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (note: Omit<ProgressNote, "id" | "date" | "createdAt" | "author" | "role">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: "Nursing Note",
    category: "Nursing Care",
    noteText: "",
  });

  const set = (key: keyof typeof form, value: string) => setForm((v) => ({ ...v, [key]: value }));

  function handleSubmit() {
    onSubmit({
      title: form.title,
      category: form.category,
      noteText: form.noteText,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-800">Add Progress Note</p>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-slate-500">Title</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Nursing Note" />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Category</Label>
            <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Nursing Care" />
          </div>
        </div>

        <div>
          <Label className="text-xs text-slate-500">Note Text</Label>
          <Textarea
            value={form.noteText}
            onChange={(e) => set("noteText", e.target.value)}
            placeholder="Document nursing observations, interventions, patient response..."
            rows={6}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>
          Save Note
        </Button>
      </div>
    </div>
  );
}