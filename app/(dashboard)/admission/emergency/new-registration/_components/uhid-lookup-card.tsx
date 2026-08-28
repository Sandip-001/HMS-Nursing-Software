// app/(dashboard)/admission-desk/emergency/new-registration/_components/uhid-lookup-card.tsx
"use client";
import { CheckCircle2, Search, Sparkles, UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  mobile: string;
  onMobileChange: (value: string) => void;
  onLookup: () => void;
  lookupState: "idle" | "found" | "new";
  resolvedUhid: string;
  resolvedPatientName?: string;
}

export function UhidLookupCard({ mobile, onMobileChange, onLookup, lookupState, resolvedUhid, resolvedPatientName }: Props) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
      <p className="flex items-center gap-2 text-sm font-bold text-blue-800"><UserSearch className="h-4 w-4" />Check Existing UHID</p>
      <p className="mt-1 text-xs text-slate-500">Enter mobile number to check if the patient already has a UHID from a previous OPD/IPD visit.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Input value={mobile} onChange={(e) => onMobileChange(e.target.value)} placeholder="Enter mobile number..." className="flex-1" />
        <Button variant="outline" className="gap-2 border-blue-300 text-blue-700" onClick={onLookup}><Search className="h-4 w-4" />Check UHID</Button>
      </div>

      {lookupState === "found" && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-emerald-800">Existing patient found: <span className="font-bold">{resolvedPatientName}</span> — UHID <span className="font-bold">{resolvedUhid}</span> will be linked automatically.</span>
        </div>
      )}
      {lookupState === "new" && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm">
          <Sparkles className="h-4 w-4 text-violet-600" />
          <span className="text-violet-800">No existing record found. A new UHID <span className="font-bold">{resolvedUhid}</span> will be generated on registration.</span>
        </div>
      )}
    </div>
  );
}