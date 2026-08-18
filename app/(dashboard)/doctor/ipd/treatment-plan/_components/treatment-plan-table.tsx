// app/ipd/doctor/treatment-plan/_components/treatment-plan-table.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PlanPriorityBadge } from "./plan-priority-badge";
import type { TreatmentPlanItem } from "@/types/doctor/ipd/treatment-plan-types";

interface TreatmentPlanTableProps {
  items: TreatmentPlanItem[];
  onEdit: (item: TreatmentPlanItem) => void;
  onDelete: (id: string) => void;
}

export function TreatmentPlanTable({ items, onEdit, onDelete }: TreatmentPlanTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-10">#</TableHead>
            <TableHead>Problem / Diagnosis</TableHead>
            <TableHead>Intervention / Management</TableHead>
            <TableHead>Target / Goal</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="py-6 text-center text-sm text-slate-400">
                No treatment plan added yet.
              </TableCell>
            </TableRow>
          )}
          {items.map((item, index) => (
            <TableRow key={item.id} className="hover:bg-slate-50/60">
              <TableCell className="text-slate-500">{index + 1}</TableCell>
              <TableCell className="font-medium text-slate-800">{item.problemDiagnosis}</TableCell>
              <TableCell className="min-w-[220px] text-slate-600">{item.intervention}</TableCell>
              <TableCell className="min-w-[180px] text-slate-600">{item.targetGoal}</TableCell>
              <TableCell className="whitespace-nowrap text-slate-600">{item.duration}</TableCell>
              <TableCell><PlanPriorityBadge priority={item.priority} /></TableCell>
              <TableCell className="min-w-[180px] text-slate-600">{item.notes}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-blue-600"
                    onClick={() => onEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-red-600"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}