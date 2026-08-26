// app/(dashboard)/nurse-admin/ipd/beds/_components/room-bed-section.tsx
"use client";
import { DoorOpen } from "lucide-react";
import type { BedInfo, WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { BedUnitCard } from "./bed-unit-card";

export function RoomBedSection({ room, beds, patientsByUhid, onOpenPatient }: {
  room: string;
  beds: BedInfo[];
  patientsByUhid: Map<string, WardPatientFull>;
  onOpenPatient: (patient: WardPatientFull) => void;
}) {
  const occupied = beds.filter((b) => b.status === "Occupied").length;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-700"><DoorOpen className="h-4 w-4 text-slate-400" />{room}</p>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">{occupied}/{beds.length} occupied</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {beds.map((bed) => (
          <BedUnitCard key={bed.bedId} bed={bed} patient={bed.patientUhid ? patientsByUhid.get(bed.patientUhid) : undefined} onOpenPatient={onOpenPatient} />
        ))}
      </div>
    </div>
  );
}