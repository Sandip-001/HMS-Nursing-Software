// app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-column-toggle.tsx
"use client";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  columnIds: string[];
  visibility: Record<string, boolean>;
  onToggle: (columnId: string, visible: boolean) => void;
}

export function PharmacyIpdColumnToggle({ columnIds, visibility, onToggle }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-slate-200">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-72 overflow-y-auto w-56">
        {columnIds.map((id) => (
          <DropdownMenuCheckboxItem
            key={id}
            checked={visibility[id] ?? true}
            onCheckedChange={(value) => onToggle(id, Boolean(value))}
          >
            {id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}