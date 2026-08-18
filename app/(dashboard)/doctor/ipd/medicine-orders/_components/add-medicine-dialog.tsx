// app/doctor/ipd/medicine-orders/_components/add-medicine-dialog.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Pill, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  MEDICINE_REFERENCE_LIST, FREQUENCY_OPTIONS, INSTRUCTION_OPTIONS, findMedicineReference,
} from "@/lib/doctor/ipd/medicine-orders-data";
import type { MedicineOrderItem } from "@/types/doctor/ipd/medicine-order-types";

interface AddMedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: MedicineOrderItem | null;
  onSave: (item: MedicineOrderItem) => void;
}

const emptyForm = {
  medicineName: "",
  strengthForm: "",
  dose: "",
  route: "",
  frequency: "",
  timesPerDay: 1,
  duration: "",
  instructions: "",
};

export function AddMedicineDialog({ open, onOpenChange, editingItem, onSave }: AddMedicineDialogProps) {
  const [form, setForm] = useState(emptyForm);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editingItem) {
      setForm({
        medicineName: editingItem.medicineName,
        strengthForm: editingItem.strengthForm,
        dose: editingItem.dose,
        route: editingItem.route,
        frequency: editingItem.frequency,
        timesPerDay: editingItem.timesPerDay,
        duration: editingItem.duration,
        instructions: editingItem.instructions,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingItem, open]);

  const filteredSuggestions = useMemo(
    () => MEDICINE_REFERENCE_LIST.filter((m) => m.name.toLowerCase().includes(form.medicineName.toLowerCase())),
    [form.medicineName],
  );

  function selectMedicine(name: string) {
    const ref = findMedicineReference(name);
    if (ref) {
      setForm((prev) => ({
        ...prev,
        medicineName: ref.name,
        strengthForm: ref.strengthForm,
        dose: ref.dose,
        route: ref.route,
        frequency: ref.frequency,
        timesPerDay: ref.timesPerDay,
        instructions: ref.defaultInstruction,
      }));
    } else {
      setForm((prev) => ({ ...prev, medicineName: name }));
    }
    setSearchOpen(false);
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFrequencyChange(label: string) {
    const option = FREQUENCY_OPTIONS.find((f) => f.label === label);
    setForm((prev) => ({ ...prev, frequency: label, timesPerDay: option?.timesPerDay ?? 1 }));
  }

  function close() {
    setForm(emptyForm);
    setSearchOpen(false);
    onOpenChange(false);
  }

  function handleSave() {
    if (!form.medicineName.trim() || !form.frequency || !form.duration.trim() || !form.instructions) {
      toast.error("Please fill medicine name, frequency, duration, and instructions");
      return;
    }

    const today = new Date();
    const startDate = editingItem?.startDate ?? today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const item: MedicineOrderItem = {
      id: editingItem?.id ?? `MED-${Date.now()}`,
      medicineName: form.medicineName,
      strengthForm: form.strengthForm,
      dose: form.dose,
      route: form.route,
      frequency: form.frequency,
      timesPerDay: form.timesPerDay,
      duration: form.duration,
      startDate,
      endDate: editingItem?.endDate ?? "",
      instructions: form.instructions,
      orderedBy: editingItem?.orderedBy ?? "Dr. Amit Verma",
      orderedOn: editingItem?.orderedOn ?? today.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      status: "Pending",
      dailyLogs: editingItem?.dailyLogs ?? [],
    };

    onSave(item);
    close();
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-slate-950/35 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Pill className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">{editingItem ? "Edit Medicine" : "Add Medicine"}</h2>
              <p className="text-xs text-slate-500">Prescribe medicine for this patient</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={close}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-5 p-5">
          <div className="relative">
            <Label className="text-xs text-slate-500">Medicine Name *</Label>
            <div className="relative mt-1">
              <Input
                value={form.medicineName}
                onChange={(e) => { update("medicineName", e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search medicine name..."
                className="pr-9"
              />
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
            </div>
            {searchOpen && form.medicineName && filteredSuggestions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
                {filteredSuggestions.slice(0, 6).map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-blue-50"
                    onClick={() => selectMedicine(item.name)}
                  >
                    <span className="font-medium text-slate-800">{item.name}</span>
                    <span className="text-xs text-slate-400">{item.strengthForm} · {item.route} · {item.frequency}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {form.strengthForm && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Auto-filled details</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <DetailPair label="Strength / Form" value={form.strengthForm} />
                <DetailPair label="Dose" value={form.dose} />
                <DetailPair label="Route" value={form.route} />
                <DetailPair label="Frequency" value={form.frequency} />
              </div>
            </div>
          )}

          <div>
            <Label className="text-xs text-slate-500">Frequency *</Label>
            <Select value={form.frequency} onValueChange={handleFrequencyChange}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select frequency" /></SelectTrigger>
              <SelectContent>
                {FREQUENCY_OPTIONS.map((f) => (
                  <SelectItem key={f.label} value={f.label}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-slate-500">Duration *</Label>
            <Input
              className="mt-1"
              placeholder="e.g. 5 Days, 2 Weeks"
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
            />
            <p className="mt-1 text-[11px] text-slate-400">Enter duration manually (days/weeks as needed).</p>
          </div>

          <div>
            <Label className="text-xs text-slate-500">Instructions *</Label>
            <Select value={form.instructions} onValueChange={(v) => update("instructions", v)}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select instruction" /></SelectTrigger>
              <SelectContent>
                {INSTRUCTION_OPTIONS.map((instruction) => (
                  <SelectItem key={instruction} value={instruction}>{instruction}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-3 border-t border-slate-200 bg-white p-5">
          <Button variant="outline" onClick={close} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
            {editingItem ? "Save Changes" : "Add Medicine"}
          </Button>
        </div>
      </aside>
    </div>
  );
}

function DetailPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="font-medium text-slate-700">{value}</p>
    </div>
  );
}