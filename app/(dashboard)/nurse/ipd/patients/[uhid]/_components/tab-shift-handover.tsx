// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/tab-shift-handover.tsx
"use client";
import { useState } from "react";
import { ArrowRightLeft, CheckCircle2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ShiftHandoverEntry } from "@/types/nurse/ipd/nurse-ipd-types";
import { AVAILABLE_NEXT_SHIFT_NURSES, CURRENT_NURSE } from "@/lib/nurse/ipd/nurse-ipd-data";

export function TabShiftHandover({ handovers, onHandover }: { handovers: ShiftHandoverEntry[]; onHandover: (entry: ShiftHandoverEntry) => void }) {
  const [nextNurse, setNextNurse] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit() {
    if (!nextNurse) return;
    const stamp = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const [name, shiftPart] = nextNurse.split(" (");
    onHandover({
      id: `H-${Date.now()}`, fromNurse: CURRENT_NURSE.name, fromShift: CURRENT_NURSE.shift,
      toNurse: name, toShift: shiftPart?.replace(")", "") ?? "", handoverDateTime: stamp, notes: notes.trim() || undefined,
    });
    setDone(true);
    setTimeout(() => setDone(false), 3000);
    setNextNurse(""); setNotes("");
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><ArrowRightLeft className="h-4 w-4 text-blue-600" />Shift Handover</p>
          <p className="mt-1 text-xs text-slate-500">Handing over from <span className="font-semibold text-slate-700">{CURRENT_NURSE.name}</span> ({CURRENT_NURSE.shift})</p>

          <div className="mt-4 space-y-3">
            <div>
              <Label className="text-xs text-slate-500">Handover To (Next Shift Nurse) *</Label>
              <Select value={nextNurse} onValueChange={setNextNurse}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select next shift nurse" /></SelectTrigger>
                <SelectContent>{AVAILABLE_NEXT_SHIFT_NURSES.map((nurse) => <SelectItem key={nurse} value={nurse}>{nurse}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-slate-500">Handover Notes (Optional)</Label>
              <Textarea className="mt-1" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any specific instructions or observations for the next shift..." />
            </div>
            <Button disabled={!nextNurse} className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}><ArrowRightLeft className="h-4 w-4" />Complete Handover</Button>
            {done && <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" />Handover completed successfully.</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <p className="mb-3 text-sm font-bold text-slate-800">Handover History</p>
          <div className="space-y-3">
            {handovers.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 font-semibold text-slate-800"><UserRound className="h-3.5 w-3.5 text-slate-400" />{entry.fromNurse}</span>
                  <span className="text-xs text-slate-400">({entry.fromShift})</span>
                  <ArrowRightLeft className="h-3.5 w-3.5 text-blue-500" />
                  <span className="flex items-center gap-1 font-semibold text-slate-800"><UserRound className="h-3.5 w-3.5 text-slate-400" />{entry.toNurse}</span>
                  <span className="text-xs text-slate-400">({entry.toShift})</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">{entry.handoverDateTime}</p>
                {entry.notes && <p className="mt-2 text-sm italic text-slate-600">&quot;{entry.notes}&quot;</p>}
              </div>
            ))}
            {handovers.length === 0 && <p className="text-sm text-slate-400">No shift handovers recorded for this patient yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}