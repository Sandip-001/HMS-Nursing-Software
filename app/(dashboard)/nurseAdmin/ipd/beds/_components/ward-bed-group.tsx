// app/(dashboard)/nurse-admin/ipd/beds/_components/ward-bed-group.tsx
"use client";
import { Building2 } from "lucide-react";
import type { BedInfo, WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { RoomBedSection } from "./room-bed-section";

export function WardBedGroup({ ward, beds, patientsByUhid, onOpenPatient }: {
  ward: string;
  beds: BedInfo[];
  patientsByUhid: Map<string, WardPatientFull>;
  onOpenPatient: (patient: WardPatientFull) => void;
}) {
  const rooms = Array.from(new Set(beds.map((b) => b.room)));
  const available = beds.filter((b) => b.status === "Available").length;
  const occupied = beds.filter((b) => b.status === "Occupied").length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/50 p-4">
        <p className="flex items-center gap-2 text-base font-bold text-slate-800"><Building2 className="h-5 w-5 text-blue-600" />{ward}</p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">{available} Available</span>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-700">{occupied} Occupied</span>
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-500">{beds.length} Total</span>
        </div>
      </div>
      <div className="space-y-3">
        {rooms.map((room) => (
          <RoomBedSection key={room} room={room} beds={beds.filter((b) => b.room === room)} patientsByUhid={patientsByUhid} onOpenPatient={onOpenPatient} />
        ))}
      </div>
    </div>
  );
}