// app/(dashboard)/doctor/icu/patients/[uhid]/_components/medicine-form.tsx
"use client";
import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MedicineDraft } from "@/types/doctor/icu/doctor-icu-types";
import { MEDICINE_CATALOG, ROUTE_OPTIONS, FREQUENCY_OPTIONS } from "@/lib/doctor/icu/doctor-icu-data";

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

export function MedicineForm({ onSubmit, onClose }: { onSubmit: (payload: MedicineDraft[]) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<MedicineDraft[]>([]);
  
  const results = MEDICINE_CATALOG.filter((m) =>
    `${m.name} ${m.code}`.toLowerCase().includes(query.toLowerCase()),
  );

  function add(m: (typeof MEDICINE_CATALOG)[number]) {
    if (!rows.some((r) => r.medicineCode === m.code)) {
      setRows((v) => [
        ...v,
        {
          medicineName: m.name,
          medicineCode: m.code,
          strength: m.strength,
          route: m.route,
          dose: m.defaultDose ?? m.strength,
          frequency: m.defaultFrequency ?? "OD",
          duration: m.defaultDuration ?? "5 days",
          instructions: m.defaultInstructions ?? "As directed",
          slot: "Immediate",
          scheduledTime: "Now",
          urgency: "Routine",
        },
      ]);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Add Medicines</h3>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <p className="text-sm text-slate-500">
        Search the approved formulary and add multiple medicines to one order.
      </p>

      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicine by name or code..."
        />
      </div>

      {query && (
        <ScrollArea className="h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white">
          {results.map((m) => (
            <button
              type="button"
              key={m.code}
              onClick={() => {
                add(m);
                setQuery("");
              }}
              className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-3 text-left last:border-0 hover:bg-blue-50"
            >
              <span>
                <span className="block text-sm font-semibold text-slate-800">{m.name}</span>
                <span className="text-xs text-slate-400">{m.code} · {m.route}</span>
              </span>
              <Plus className="h-4 w-4 text-blue-600" />
            </button>
          ))}
        </ScrollArea>
      )}

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={row.medicineCode} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-800">{row.medicineName}</p>
                <p className="text-xs text-slate-400">{row.strength}</p>
              </div>
              <button
                type="button"
                onClick={() => setRows((v) => v.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SmallField label="Dose">
                <Input
                  value={row.dose}
                  onChange={(e) => setRows((v) => v.map((x, i) => i === index ? { ...x, dose: e.target.value } : x))}
                />
              </SmallField>

              <SmallField label="Route">
                <Select
                  value={row.route}
                  onValueChange={(v) => setRows((prev) => prev.map((x, i) => i === index ? { ...x, route: v } : x))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROUTE_OPTIONS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SmallField>

              <SmallField label="Frequency">
                <Select
                  value={row.frequency}
                  onValueChange={(v) => setRows((prev) => prev.map((x, i) => i === index ? { ...x, frequency: v } : x))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCY_OPTIONS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}{" "}
                        {f === "OD" ? "(Once a day)" : f === "BD" ? "(Twice a day)" : f === "TDS" ? "(Three times a day)" : f === "QID" ? "(Four times a day)" : f === "HS" ? "(At bedtime)" : "(As needed)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SmallField>

              <SmallField label="Duration">
                <Input
                  value={row.duration}
                  onChange={(e) => setRows((v) => v.map((x, i) => i === index ? { ...x, duration: e.target.value } : x))}
                />
              </SmallField>

              <SmallField label="Urgency">
                <Select
                  value={row.urgency}
                  onValueChange={(v) => setRows((prev) => prev.map((x, i) => i === index ? { ...x, urgency: v as "Routine" | "Urgent" | "Stat" | "Emergency" } : x))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Routine">Routine</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="Stat">Stat</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </SmallField>

              <SmallField label="Instructions">
                <Input
                  value={row.instructions}
                  onChange={(e) => setRows((v) => v.map((x, i) => i === index ? { ...x, instructions: e.target.value } : x))}
                />
              </SmallField>
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            Search and add medicines to create the order basket.
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="button" onClick={() => onSubmit(rows)} disabled={rows.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Save Medicine Order
        </Button>
      </div>
    </div>
  );
}