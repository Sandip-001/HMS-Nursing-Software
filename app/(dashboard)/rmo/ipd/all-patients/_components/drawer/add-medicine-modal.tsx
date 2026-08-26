// app/(dashboard)/rmo/ipd/all-patients/_components/drawer/add-medicine-modal.tsx
"use client";
import { useMemo, useState } from "react";
import { Pencil, Pill, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { MedicineDose, MedicineOrder } from "@/types/rmo/ipd/rmo-types";
import { CURRENT_RMO, MEDICINE_CATALOG } from "@/lib/rmo/ipd/rmo-data";

const FREQUENCY_SLOTS: Record<string, { slot: string; time: string }[]> = {
  "Once Daily": [{ slot: "Morning", time: "08:00 AM" }],
  "Twice Daily": [{ slot: "Morning", time: "08:00 AM" }, { slot: "Night", time: "08:00 PM" }],
  "Thrice Daily": [{ slot: "Morning", time: "08:00 AM" }, { slot: "Afternoon", time: "02:00 PM" }, { slot: "Night", time: "08:00 PM" }],
  "Four Times Daily": [{ slot: "Morning", time: "08:00 AM" }, { slot: "Afternoon", time: "02:00 PM" }, { slot: "Evening", time: "06:00 PM" }, { slot: "Night", time: "10:00 PM" }],
  "SOS (As Needed)": [{ slot: "As Needed", time: "SOS" }],
};

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function AddMedicineModal({ onCancel, onSave }: { onCancel: () => void; onSave: (order: MedicineOrder, doses: MedicineDose[]) => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof MEDICINE_CATALOG[number] | null>(null);
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("Twice Daily");
  const [durationDays, setDurationDays] = useState("5");
  const [instructions, setInstructions] = useState("After meals");
  const [editingSlots, setEditingSlots] = useState(false);
  const [customSlots, setCustomSlots] = useState<{ slot: string; time: string }[] | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return MEDICINE_CATALOG.slice(0, 6);
    const q = query.toLowerCase();
    return MEDICINE_CATALOG.filter((m) => m.name.toLowerCase().includes(q) || m.code.toLowerCase().includes(q));
  }, [query]);

  const activeSlots = customSlots ?? FREQUENCY_SLOTS[frequency] ?? [];
  const today = new Date().toISOString().slice(0, 10);
  const valid = selected && dose.trim() && Number(durationDays) > 0 && activeSlots.length > 0;

  function selectMedicine(item: typeof MEDICINE_CATALOG[number]) {
    setSelected(item);
    setQuery(item.name);
    setDose(item.strength);
  }

  function updateSlotTime(index: number, time: string) {
    const base = customSlots ?? [...activeSlots];
    const updated = base.map((s, i) => i === index ? { ...s, time } : s);
    setCustomSlots(updated);
  }

  function handleSave() {
    if (!selected || !valid) return;
    const duration = Number(durationDays);
    const orderId = `MO-${Date.now()}`;
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    const order: MedicineOrder = {
      id: orderId, medicineName: selected.name, medicineCode: selected.code, dose: dose.trim(), frequency,
      durationDays: duration, instructions: instructions.trim(), startDate: today, orderedBy: CURRENT_RMO.name, orderedAt: stamp,
    };

    const doses: MedicineDose[] = [];
    for (let day = 0; day < duration; day++) {
      const doseDate = addDays(today, day);
      activeSlots.forEach((slotInfo, index) => {
        doses.push({
          id: `${orderId}-D${day}-${index}`, medicineName: selected.name, medicineCode: selected.code, strength: selected.strength,
          route: selected.route, slot: slotInfo.slot, scheduledTime: slotInfo.time, date: doseDate, status: "Pending", urgency: "Routine",
        });
      });
    }
    onSave(order, doses);
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800"><Pill className="h-5 w-5 text-blue-600" />Add Medicine Order</h3>
          <Button variant="ghost" size="icon" onClick={onCancel}><X className="h-5 w-5" /></Button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <Label className="text-xs text-slate-500">Search Medicine (name or code) *</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="pl-9" value={query} onChange={(e) => { setQuery(e.target.value); setSelected(null); }} placeholder="e.g. Ceftriaxone, MED-008..." />
            </div>
            <div className="mt-2 max-h-44 space-y-1 overflow-y-auto rounded-lg border border-slate-100 p-1.5">
              {results.map((item) => (
                <button key={item.code} onClick={() => selectMedicine(item)} className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm ${selected?.code === item.code ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 text-slate-700"}`}>
                  <span>{item.name}</span><span className="text-xs text-slate-400">{item.code} · {item.route}</span>
                </button>
              ))}
              {results.length === 0 && <p className="p-3 text-center text-xs text-slate-400">No matching medicine found.</p>}
            </div>
          </div>

          {selected && (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div><Label className="text-xs text-slate-500">Dose *</Label><Input className="mt-1" value={dose} onChange={(e) => setDose(e.target.value)} /></div>
                <div><Label className="text-xs text-slate-500">Duration (days) *</Label><Input type="number" className="mt-1" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} /></div>
              </div>

              <div>
                <Label className="text-xs text-slate-500">Frequency *</Label>
                <Select value={frequency} onValueChange={(v) => { setFrequency(v); setCustomSlots(null); }}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.keys(FREQUENCY_SLOTS).map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-xs text-slate-500">Administration Times {activeSlots.length > 1 && `(${activeSlots.length}x daily)`}</Label>
                  <button onClick={() => setEditingSlots((v) => !v)} className="flex items-center gap-1 text-xs font-semibold text-blue-600"><Pencil className="h-3 w-3" />{editingSlots ? "Done" : "Edit Times"}</button>
                </div>
                <div className="space-y-1.5">
                  {activeSlots.map((slotInfo, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
                      <span className="text-sm font-medium text-slate-700">{slotInfo.slot}</span>
                      {editingSlots ? (
                        <Input className="h-8 w-32 text-xs" value={slotInfo.time} onChange={(e) => updateSlotTime(index, e.target.value)} />
                      ) : (
                        <span className="text-sm text-slate-500">{slotInfo.time}</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-400">This medicine will repeat automatically at the times above, every day, for {durationDays || 0} day(s), and appear in the nurse's daily eMAR queue.</p>
              </div>

              <div><Label className="text-xs text-slate-500">Instructions</Label><Textarea className="mt-1" rows={2} value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="e.g. After meals, IV over 30 mins..." /></div>
            </>
          )}
        </div>

        <div className="flex gap-3 border-t border-slate-100 p-5">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button disabled={!valid} className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>Add to Medicine Queue</Button>
        </div>
      </div>
    </div>
  );
}