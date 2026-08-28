// app/(dashboard)/rmo/emergency/all-patients/_components/rmo-entry-drawers.tsx
"use client";
import { useState } from "react";
import {
    CheckCircle2,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  Pill,
  Plus,
  Stethoscope,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  DiagnosisEntry,
  EmergencyPatient,
  VitalRecord,
} from "@/types/emergency/emergency-types";
import type {
  LabDraft,
  MedicineDraft,
  ProgressNoteDraft,
} from "@/types/emergency/rmo-emergency-types";
import {
  DIAGNOSIS_CATALOG,
  FREQUENCY_OPTIONS,
  MEDICINE_CATALOG,
  ROUTE_OPTIONS,
} from "@/lib/emergency/emergency-data";
import {  Microscope, ScanLine } from "lucide-react"; // add these imports
import { LAB_TEST_CATALOG, type LabTestItem } from "@/lib/emergency/lab-test-catalog";

export type EntryKind =
  | "medicine"
  | "vital"
  | "lab"
  | "diagnosis"
  | "note"
  | null;

export function RmoEntryDrawer({
  kind,
  patient,
  onClose,
  onSubmit,
}: {
  kind: EntryKind;
  patient: EmergencyPatient | null;
  onClose: () => void;
  onSubmit: (payload: unknown) => void;
}) {
  if (!kind || !patient) return null;
  const config = {
    medicine: [
      "Add Medicines",
      <Pill key="i" className="h-5 w-5 text-blue-600" />,
    ],
    vital: [
      "Add New Vitals",
      <HeartPulse key="i" className="h-5 w-5 text-red-600" />,
    ],
    lab: [
      "Add Lab Reports",
      <FlaskConical key="i" className="h-5 w-5 text-cyan-600" />,
    ],
    diagnosis: [
      "Add Diagnosis",
      <Stethoscope key="i" className="h-5 w-5 text-violet-600" />,
    ],
    note: [
      "Add Progress Note",
      <ClipboardList key="i" className="h-5 w-5 text-blue-600" />,
    ],
  }[kind];
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold text-slate-800">
              {config[1]}
              {config[0]}
            </p>
            <p className="text-xs text-slate-500">
              {patient.patientName || "Unidentified"} · {patient.uhid}
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          {kind === "medicine" && <MedicineForm onSubmit={onSubmit} />}{" "}
          {kind === "vital" && <VitalForm onSubmit={onSubmit} />}{" "}
          {kind === "lab" && <LabForm onSubmit={onSubmit} />}{" "}
          {kind === "diagnosis" && <DiagnosisForm onSubmit={onSubmit} />}{" "}
          {kind === "note" && <ProgressNoteForm onSubmit={onSubmit} />}
        </div>
      </aside>
    </div>
  );
}

function FormFooter({
  submitLabel,
  onClick,
}: {
  submitLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="mt-6 flex justify-end gap-2 border-t border-slate-200 pt-4">
      <Button variant="outline" type="button">
        Cancel
      </Button>
      <Button
        type="button"
        onClick={onClick}
        className="gap-2 bg-blue-600 hover:bg-blue-700"
      >
        {submitLabel}
      </Button>
    </div>
  );
}

function MedicineForm({ onSubmit }: { onSubmit: (payload: MedicineDraft[]) => void }) {
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
          route: m.route, // RouteType, assignable to string
          dose: m.defaultDose ?? m.strength,
          frequency: m.defaultFrequency ?? "OD", // string now
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
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(rows); }}>
      <p className="text-sm text-slate-500">
        Search the approved formulary and add multiple medicines to one order.
      </p>
      <div className="mt-4 relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicine by name or code..."
        />
      </div>
      {query && (
        <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white">
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
                <span className="block text-sm font-semibold text-slate-800">
                  {m.name}
                </span>
                <span className="text-xs text-slate-400">
                  {m.code} · {m.route}
                </span>
              </span>
              <Plus className="h-4 w-4 text-blue-600" />
            </button>
          ))}
        </div>
      )}
      <div className="mt-5 space-y-3">
        {rows.map((row, index) => (
          <div
            key={row.medicineCode}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-800">{row.medicineName}</p>
                <p className="text-xs text-slate-400">{row.strength}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setRows((v) => v.filter((_, i) => i !== index))
                }
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SmallField label="Dose">
                <Input
                  value={row.dose}
                  onChange={(e) =>
                    setRows((v) =>
                      v.map((x, i) =>
                        i === index ? { ...x, dose: e.target.value } : x,
                      ),
                    )
                  }
                />
              </SmallField>

              {/* Route: keep dropdown but no cast */}
              <SmallField label="Route">
                <Select
                  value={row.route}
                  onValueChange={(v) =>
                    setRows((prev) =>
                      prev.map((x, i) =>
                        i === index ? { ...x, route: v } : x,
                      ),
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROUTE_OPTIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SmallField>

              {/* Frequency: keep dropdown but no cast */}
              <SmallField label="Frequency">
                <Select
                  value={row.frequency}
                  onValueChange={(v) =>
                    setRows((prev) =>
                      prev.map((x, i) =>
                        i === index ? { ...x, frequency: v } : x,
                      ),
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCY_OPTIONS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}{" "}
                        {f === "OD"
                          ? "(Once a day)"
                          : f === "BD"
                          ? "(Twice a day)"
                          : f === "TDS"
                          ? "(Three times a day)"
                          : f === "QID"
                          ? "(Four times a day)"
                          : f === "HS"
                          ? "(At bedtime)"
                          : "(As needed)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SmallField>

              <SmallField label="Duration">
                <Input
                  value={row.duration}
                  onChange={(e) =>
                    setRows((v) =>
                      v.map((x, i) =>
                        i === index ? { ...x, duration: e.target.value } : x,
                      ),
                    )
                  }
                />
              </SmallField>

              <SmallField label="Instructions">
                <Input
                  value={row.instructions}
                  onChange={(e) =>
                    setRows((v) =>
                      v.map((x, i) =>
                        i === index
                          ? { ...x, instructions: e.target.value }
                          : x,
                      ),
                    )
                  }
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
      <FormFooter
        submitLabel="Save Medicine Order"
        onClick={() => onSubmit(rows)}
      />
    </form>
  );
}

function VitalForm({
  onSubmit,
}: {
  onSubmit: (payload: Partial<VitalRecord>) => void;
}) {
  const [form, setForm] = useState({
    bp: "",
    pulse: "",
    respRate: "",
    spo2: "",
    temp: "",
    pain: "",
  });
  const set = (key: keyof typeof form, value: string) =>
    setForm((v) => ({ ...v, [key]: value }));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          ...form,
          pulse: Number(form.pulse),
          respRate: Number(form.respRate),
          spo2: Number(form.spo2),
          temp: Number(form.temp),
          pain: Number(form.pain),
        });
      }}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Object.entries({
          bp: "BP (mmHg)",
          pulse: "Pulse (/min)",
          respRate: "Respiratory Rate",
          spo2: "SpO₂ (%)",
          temp: "Temperature (°F)",
          pain: "Pain Score (0–10)",
        }).map(([key, label]) => (
          <SmallField key={key} label={label}>
            <Input
              value={form[key as keyof typeof form]}
              onChange={(e) => set(key as keyof typeof form, e.target.value)}
              placeholder="Enter value"
            />
          </SmallField>
        ))}
      </div>
      <FormFooter
        submitLabel="Save Vitals"
        onClick={() =>
          onSubmit({
            ...form,
            pulse: Number(form.pulse),
            respRate: Number(form.respRate),
            spo2: Number(form.spo2),
            temp: Number(form.temp),
            pain: Number(form.pain),
          })
        }
      />
    </form>
  );
}

function LabForm({ onSubmit }: { onSubmit: (payload: LabDraft[]) => void }) {
  const [rows, setRows] = useState<LabDraft[]>([]);
  const [form, setForm] = useState({
    category: "All" as "All" | "Pathology" | "Radiology",
    testName: "",
    clinicalNotes: "",
    priority: "Routine" as "Routine" | "Urgent" | "Stat",
  });
  const [query, setQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState<LabTestItem | null>(null);

  const filteredTests = LAB_TEST_CATALOG.filter(
    (t) =>
      (form.category === "All" || t.category === form.category) &&
      `${t.name} ${t.code}`.toLowerCase().includes(query.toLowerCase()),
  );

  function add() {
    const name = selectedTest ? selectedTest.name : form.testName;
    const category = selectedTest ? selectedTest.category : form.category === "All" ? "Pathology" : form.category;
    if (!name.trim()) return;
    setRows((v) => [
      ...v,
      {
        category: category as "Pathology" | "Radiology",
        testName: name,
        orderedBy: "RMO",
        priority: form.priority,
        clinicalNotes: form.clinicalNotes,
        pathologyResults: category === "Pathology" ? [] : undefined,
      },
    ]);
    setForm((v) => ({ ...v, testName: "", clinicalNotes: "" }));
    setSelectedTest(null);
    setQuery("");
  }

  function handleTestSelect(test: LabTestItem) {
    setSelectedTest(test);
    setForm((v) => ({ ...v, testName: test.name, category: test.category as "Pathology" | "Radiology" }));
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SmallField label="Category">
          <Select
            value={form.category}
            onValueChange={(v) => {
              setForm((x) => ({ ...x, category: v as typeof x.category }));
              setSelectedTest(null);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Tests</SelectItem>
              <SelectItem value="Pathology">Pathology</SelectItem>
              <SelectItem value="Radiology">Radiology</SelectItem>
            </SelectContent>
          </Select>
        </SmallField>
        <SmallField label="Priority">
          <Select
            value={form.priority}
            onValueChange={(v) =>
              setForm((x) => ({ ...x, priority: v as typeof x.priority }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Routine">Routine</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
              <SelectItem value="Stat">Stat</SelectItem>
            </SelectContent>
          </Select>
        </SmallField>
      </div>

      {/* Searchable test dropdown */}
      <div className="mt-4">
        <SmallField label="Select Test">
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedTest(null);
              }}
              placeholder={form.category === "All" ? "Search all tests..." : `Search ${form.category.toLowerCase()} tests...`}
              className="pr-10"
            />
            {form.category === "Pathology" || (form.category === "All" && !query) ? (
              <Microscope className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-600" />
            ) : (
              <ScanLine className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600" />
            )}
          </div>
        </SmallField>

        {query && (
          <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white">
            {filteredTests.map((test) => (
              <button
                type="button"
                key={test.id}
                onClick={() => handleTestSelect(test)}
                className={`flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-0 ${selectedTest?.id === test.id ? "bg-cyan-100" : "hover:bg-cyan-50"}`}
              >
                {test.category === "Pathology" ? (
                  <Microscope className="h-5 w-5 text-cyan-600" />
                ) : (
                  <ScanLine className="h-5 w-5 text-blue-600" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {test.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {test.code} · {test.description}
                  </p>
                </div>
                {selectedTest?.id === test.id ? (
                  <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                ) : (
                  <Plus className="h-4 w-4 text-cyan-600" />
                )}
              </button>
            ))}
            {filteredTests.length === 0 && (
              <p className="px-4 py-3 text-sm text-slate-400">
                No tests found matching "{query}"
              </p>
            )}
          </div>
        )}
      </div>

      {/* Selected test display */}
      {selectedTest && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm">
          <CheckCircle2 className="h-4 w-4 text-cyan-600" />
          <span className="font-semibold text-cyan-900">{selectedTest.name}</span>
          <span className="text-slate-500">({selectedTest.category})</span>
        </div>
      )}

      <SmallField label="Clinical Notes">
        <Textarea
          value={form.clinicalNotes}
          onChange={(e) =>
            setForm((v) => ({ ...v, clinicalNotes: e.target.value }))
          }
          placeholder="Clinical indication or instructions"
        />
      </SmallField>

      <Button
        type="button"
        variant="outline"
        onClick={add}
        disabled={!selectedTest && !form.testName.trim()}
        className="mt-2 gap-2"
      >
        <Plus className="h-4 w-4" />
        Add to Order Basket
      </Button>

      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-sm"
          >
            <div className="flex items-center gap-2">
              {r.category === "Pathology" ? (
                <Microscope className="h-4 w-4 text-cyan-600" />
              ) : (
                <ScanLine className="h-4 w-4 text-blue-600" />
              )}
              <span>
                <b>{r.testName}</b> · {r.category} · {r.priority}
                {r.clinicalNotes && (
                  <small className="block text-slate-500">
                    Notes: {r.clinicalNotes}
                  </small>
                )}
                <small className="block text-slate-400">
                  Ordered — awaiting lab acceptance
                </small>
              </span>
            </div>
            <button
              onClick={() => setRows((v) => v.filter((_, j) => j !== i))}
              className="text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
            Select tests from the catalog or enter manually to create the order basket.
          </div>
        )}
      </div>

      <FormFooter
        submitLabel="Send Orders to Lab"
        onClick={() => onSubmit(rows)}
      />
    </div>
  );
}

function DiagnosisForm({
  onSubmit,
}: {
  onSubmit: (payload: Partial<DiagnosisEntry>) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "Provisional" as DiagnosisEntry["type"],
    notes: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <SmallField label="Diagnosis">
        <Input
          list="diagnosis-list"
          value={form.name}
          onChange={(e) => {
            const item = DIAGNOSIS_CATALOG.find(
              (x) => x.name === e.target.value,
            );
            setForm((v) => ({
              ...v,
              name: e.target.value,
              code: item?.code ?? v.code,
            }));
          }}
          placeholder="Search diagnosis..."
        />
        <datalist id="diagnosis-list">
          {DIAGNOSIS_CATALOG.map((d) => (
            <option key={d.code} value={d.name}>
              {d.code}
            </option>
          ))}
        </datalist>
      </SmallField>
      <SmallField label="Type">
        <Select
          value={form.type}
          onValueChange={(v) =>
            setForm((x) => ({ ...x, type: v as typeof x.type }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Provisional">Provisional</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Differential">Differential</SelectItem>
          </SelectContent>
        </Select>
      </SmallField>
      <SmallField label="Clinical Notes">
        <Textarea
          value={form.notes}
          onChange={(e) => setForm((v) => ({ ...v, notes: e.target.value }))}
        />
      </SmallField>
      <FormFooter submitLabel="Save Diagnosis" onClick={() => onSubmit(form)} />
    </form>
  );
}

function ProgressNoteForm({
  onSubmit,
}: {
  onSubmit: (payload: ProgressNoteDraft) => void;
}) {
  const [form, setForm] = useState<ProgressNoteDraft>({
    title: "RMO Progress Note",
    category: "Clinical Review",
    priority: "Routine",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    noteText: "",
  });
  const set = (key: keyof ProgressNoteDraft, value: string) =>
    setForm((v) => ({ ...v, [key]: value }));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SmallField label="Title">
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </SmallField>
        <SmallField label="Category">
          <Input
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          />
        </SmallField>
      </div>
      <div className="mt-4 space-y-3">
        {(["subjective", "objective", "assessment", "plan"] as const).map(
          (key) => (
            <SmallField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            >
              <Textarea
                rows={3}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
              />
            </SmallField>
          ),
        )}
      </div>
      <FormFooter
        submitLabel="Save Progress Note"
        onClick={() =>
          onSubmit({
            ...form,
            noteText: [
              form.subjective,
              form.objective,
              form.assessment,
              form.plan,
            ]
              .filter(Boolean)
              .join(" "),
          })
        }
      />
    </form>
  );
}

function SmallField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3">
      <Label className="text-xs text-slate-500">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
