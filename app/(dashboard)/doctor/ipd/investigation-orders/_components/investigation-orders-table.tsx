//app/doctor/ipd/investigation-orders/_components/investigation-orders-table.tsx
"use client";

import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InvestigationStatusBadge } from "./investigation-status-badge";
import type { InvestigationOrderItem } from "@/types/doctor/ipd/investigation-order-types";

interface InvestigationOrdersTableProps {
  items: InvestigationOrderItem[];
  onView: (item: InvestigationOrderItem) => void;
  onDelete: (id: string) => void;
}

export function InvestigationOrdersTable({
  items,
  onView,
  onDelete,
}: InvestigationOrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-10">#</TableHead>
            <TableHead>Investigation</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Sample</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Report</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={9}
                className="py-8 text-center text-sm text-slate-400"
              >
                No investigations added yet.
              </TableCell>
            </TableRow>
          )}

          {items.map((item, index) => (
            <TableRow key={item.id} className="hover:bg-slate-50/60">
              <TableCell className="text-slate-500">{index + 1}</TableCell>

              <TableCell className="min-w-[220px]">
                <p className="font-medium text-slate-800">
                  {item.investigationName}
                </p>
                <p className="text-xs text-slate-400">
                  Ordered: {item.orderDate}
                </p>
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.department === "Pathology"
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-violet-200 bg-violet-50 text-violet-700"
                  }
                >
                  {item.department}
                </Badge>
              </TableCell>

              <TableCell className="text-slate-600">
                {item.category}
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.priority === "Urgent"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  }
                >
                  {item.priority}
                </Badge>
              </TableCell>

              <TableCell className="text-slate-600">
                {item.sample}
              </TableCell>

              <TableCell>
                <InvestigationStatusBadge status={item.status} />
              </TableCell>

              <TableCell className="min-w-[120px]">
                {item.status === "Report Ready" ? (
                  <span className="text-xs font-semibold text-emerald-600">
                    Available
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">Pending</span>
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-blue-600"
                    title="View test details"
                    onClick={() => onView(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-red-600"
                    title="Delete investigation"
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