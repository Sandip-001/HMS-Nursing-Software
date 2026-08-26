// app/(dashboard)/nurse-admin/ipd/_components/assign-nurse-drawer.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Save,
  Sunrise,
  Sunset,
  Moon,
  UserRound,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  AdmittedPatient,
  DailyShiftAssignment,
  ShiftName,
} from "@/types/nurse-admin/ipd/nurse-admin-types";
import {
  NURSE_DIRECTORY,
  SHIFTS,
} from "@/lib/nurse-admin/ipd/nurse-admin-data";

interface Props {
  patient: AdmittedPatient | null;
  onClose: () => void;
  onSave: (uhid: string, assignments: DailyShiftAssignment[]) => void;
}

const shiftIcon: Record<ShiftName, React.ElementType> = {
  Morning: Sunrise,
  Evening: Sunset,
  Night: Moon,
};
const shiftTone: Record<ShiftName, string> = {
  Morning: "border-amber-200 bg-amber-50 text-amber-700",
  Evening: "border-orange-200 bg-orange-50 text-orange-700",
  Night: "border-indigo-200 bg-indigo-50 text-indigo-700",
};

function toIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function toDisplay(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AssignNurseDrawer({ patient, onClose, onSave }: Props) {
  const [selectedDate, setSelectedDate] = useState(() => toIso(new Date()));
  const [draftByDate, setDraftByDate] = useState<
    Record<string, Record<ShiftName, string[]>>
  >({});

  useEffect(() => {
    if (patient) {
      setSelectedDate(toIso(new Date()));
      setDraftByDate({});
    }
  }, [patient]);

  const relevantNurses = useMemo(
    () => NURSE_DIRECTORY.filter((nurse) => nurse.ward === patient?.ward),
    [patient?.ward],
  );
  const otherNurses = useMemo(
    () => NURSE_DIRECTORY.filter((nurse) => nurse.ward !== patient?.ward),
    [patient?.ward],
  );

  if (!patient) return null;
  const selectedPatient = patient;

  function getShiftNurses(date: string, shift: ShiftName): string[] {
    if (draftByDate[date]?.[shift]) return draftByDate[date][shift];
    const existing = selectedPatient.assignments.find(
      (a) => a.date === date && a.shift === shift,
    );
    return existing?.nurseIds ?? [];
  }

  function toggleNurse(date: string, shift: ShiftName, nurseId: string) {
    setDraftByDate((previous) => {
      const currentDay = previous[date] ?? {
        Morning: getShiftNurses(date, "Morning"),
        Evening: getShiftNurses(date, "Evening"),
        Night: getShiftNurses(date, "Night"),
      };
      const currentShiftList = currentDay[shift] ?? [];
      const updatedShiftList = currentShiftList.includes(nurseId)
        ? currentShiftList.filter((id) => id !== nurseId)
        : [...currentShiftList, nurseId];
      return {
        ...previous,
        [date]: { ...currentDay, [shift]: updatedShiftList },
      };
    });
  }

  function shiftDate(days: number) {
    const next = new Date(`${selectedDate}T12:00:00`);
    next.setDate(next.getDate() + days);
    setSelectedDate(toIso(next));
  }

  function handleSaveAll() {
    const merged: DailyShiftAssignment[] = [];
    const seenKeys = new Set<string>();

    selectedPatient.assignments.forEach((a) => {
      const key = `${a.date}-${a.shift}`;
      if (!draftByDate[a.date]) {
        merged.push(a);
        seenKeys.add(key);
      }
    });

    Object.entries(draftByDate).forEach(([date, shiftsMap]) => {
      SHIFTS.forEach((shift) => {
        const key = `${date}-${shift.name}`;
        if (seenKeys.has(key)) return;
        merged.push({
          date,
          shift: shift.name,
          nurseIds: shiftsMap[shift.name] ?? [],
        });
        seenKeys.add(key);
      });
    });

    onSave(selectedPatient.uhid, merged);
  }

  const totalAssignedToday = SHIFTS.reduce(
    (sum, shift) => sum + getShiftNurses(selectedDate, shift.name).length,
    0,
  );

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-hidden bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          <header className="border-b border-slate-200 bg-white px-5 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
                  Assign Nurses
                </p>
                <h2 className="mt-0.5 text-xl font-bold text-slate-800">
                  {selectedPatient.patientName}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedPatient.uhid} · {selectedPatient.ward} ·{" "}
                  {selectedPatient.room} · {selectedPatient.bed}
                </p>
              </div>
              <Button variant="outline" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {/* Date selector */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={() => shiftDate(-1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex flex-1 items-center justify-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-semibold text-slate-800"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={() => shiftDate(1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">
                {toDisplay(selectedDate)} · {totalAssignedToday} nurse
                assignment(s) across all shifts
              </p>
            </div>

            {/* Shift-wise assignment */}
            <div className="space-y-4">
              {SHIFTS.map((shift) => {
                const Icon = shiftIcon[shift.name];
                const assignedIds = getShiftNurses(selectedDate, shift.name);
                return (
                  <div
                    key={shift.name}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <Icon className="h-4 w-4" />
                        {shift.name} Shift
                      </p>
                      <Badge
                        variant="outline"
                        className={shiftTone[shift.name]}
                      >
                        {shift.timeRange}
                      </Badge>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {relevantNurses.map((nurse) => {
                        const selected = assignedIds.includes(nurse.id);
                        return (
                          <button
                            key={nurse.id}
                            onClick={() =>
                              toggleNurse(selectedDate, shift.name, nurse.id)
                            }
                            className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-left transition ${selected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"}`}
                          >
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${nurse.avatarColor} text-xs font-bold text-white`}
                            >
                              {nurse.name.split(" ")[1]?.charAt(0) ??
                                nurse.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-800">
                                {nurse.name}
                              </p>
                              <p className="truncate text-xs text-slate-400">
                                {nurse.designation}
                              </p>
                            </div>
                            {selected && (
                              <Check className="h-4 w-4 shrink-0 text-blue-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {otherNurses.length > 0 && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs font-medium text-blue-600">
                          Show nurses from other wards
                        </summary>
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {otherNurses.map((nurse) => {
                            const selected = assignedIds.includes(nurse.id);
                            return (
                              <button
                                key={nurse.id}
                                onClick={() =>
                                  toggleNurse(
                                    selectedDate,
                                    shift.name,
                                    nurse.id,
                                  )
                                }
                                className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-left transition ${selected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"}`}
                              >
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${nurse.avatarColor} text-xs font-bold text-white`}
                                >
                                  {nurse.name.split(" ")[1]?.charAt(0) ??
                                    nurse.name.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-semibold text-slate-800">
                                    {nurse.name}
                                  </p>
                                  <p className="truncate text-xs text-slate-400">
                                    {nurse.designation} · {nurse.ward}
                                  </p>
                                </div>
                                {selected && (
                                  <Check className="h-4 w-4 shrink-0 text-blue-600" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </details>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Assignment summary across touched dates */}
            {Object.keys(draftByDate).length > 0 && (
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-blue-800">
                  <UserRound className="h-4 w-4" />
                  Unsaved changes for {Object.keys(draftByDate).length} date(s)
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.keys(draftByDate)
                    .sort()
                    .map((date) => (
                      <Badge
                        key={date}
                        variant="outline"
                        className="border-blue-200 bg-white text-blue-700"
                      >
                        {toDisplay(date)}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </div>

          <footer className="border-t border-slate-200 bg-white p-5">
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleSaveAll}
              >
                <Save className="h-4 w-4" />
                Save Assignment
              </Button>
            </div>
          </footer>
        </div>
      </aside>
    </div>
  );
}
