// app/ipd/admission-list/edit/_components/edit-bed-grid.tsx
"use client";

import { cn } from "@/lib/utils";
import { FLOOR_DATA } from "@/lib/bed-data";
import { Bed } from "@/types/admission-types";


interface EditBedGridProps {
  selectedBedId: string | null;
  onSelectBed: (bed: Bed & { floor: string; ward: string }) => void;
}

const statusStyles: Record<Bed["status"], string> = {
  Available: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer",
  Occupied: "border-red-200 bg-red-50 text-red-400 cursor-not-allowed opacity-70",
  Reserved: "border-amber-200 bg-amber-50 text-amber-600 cursor-not-allowed opacity-80",
  Maintenance: "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-70",
};

export function EditBedGrid({ selectedBedId, onSelectBed }: EditBedGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-3 text-xs text-slate-500">
        {[
          { label: "Available", color: "bg-emerald-500" },
          { label: "Occupied", color: "bg-red-400" },
          { label: "Reserved / Hold", color: "bg-amber-400" },
          { label: "Current Bed", color: "bg-blue-500" },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            {item.label}
          </span>
        ))}
      </div>

      {FLOOR_DATA.map((floorGroup) => (
        <div key={floorGroup.floor}>
          <p className="mb-3 text-sm font-semibold text-slate-700">{floorGroup.floor}</p>
          <div className="space-y-5">
            {floorGroup.wards.map((ward) => (
              <div key={ward.wardName}>
                <p className="mb-2 text-xs font-medium text-slate-400">{ward.wardName}</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ward.rooms.map((room) => (
                    <div key={room.roomNo} className="rounded-lg border border-slate-100 p-3">
                      <p className="mb-2 text-xs font-medium text-slate-500">Room {room.roomNo}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {room.beds.map((bed) => {
                          const isSelected = selectedBedId === bed.id;
                          const isSelectable = bed.status === "Available" || isSelected;
                          return (
                            <button
                              key={bed.id}
                              type="button"
                              disabled={!isSelectable}
                              onClick={() =>
                                isSelectable &&
                                onSelectBed({ ...bed, floor: floorGroup.floor, ward: ward.wardName })
                              }
                              className={cn(
                                "relative rounded-md border px-2 py-2 text-center text-xs font-medium transition-colors",
                                isSelected
                                  ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                                  : statusStyles[bed.status]
                              )}
                            >
                              {bed.bedNo}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}