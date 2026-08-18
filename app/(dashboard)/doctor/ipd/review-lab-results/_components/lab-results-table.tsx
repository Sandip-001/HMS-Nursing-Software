
"use client";

import { Fragment } from "react";
import { Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { LabStatusBadge } from "./lab-status-badge";
import type { LabTestResult } from "@/types/doctor/ipd/lab-results-types";

interface LabResultsTableProps {
  results: LabTestResult[];
  onView: (r: LabTestResult) => void;
  onViewReport: (r: LabTestResult) => void;
}

export function LabResultsTable({ results, onView, onViewReport }: LabResultsTableProps) {
  const grouped = results.reduce<Record<string, LabTestResult[]>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead>Test Name</TableHead>
            <TableHead>Test Date & Time</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Reference Range</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(grouped).map(([category, items]) => (
            <Fragment key={category}>
              <TableRow className="bg-slate-100/70 hover:bg-slate-100/70">
                <TableCell colSpan={7} className="py-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  {category}
                </TableCell>
              </TableRow>
              {items.map((r) => (
                <TableRow key={r.id} className="hover:bg-slate-50/60">
                  <TableCell>
                    <button onClick={() => onView(r)} className="text-left font-medium text-blue-600 hover:underline">
                      {r.testName}
                    </button>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-slate-500">{r.testDateTime}</TableCell>
                  <TableCell>
                    {r.isReport ? (
                      <button onClick={() => onViewReport(r)} className="flex items-center gap-1.5 text-blue-600 hover:underline">
                        <FileText className="h-3.5 w-3.5" /> View Report
                      </button>
                    ) : (
                      <span className="font-semibold text-slate-800">{r.result}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500">{r.unit}</TableCell>
                  <TableCell className="text-slate-500">{r.referenceRange}</TableCell>
                  <TableCell><LabStatusBadge status={r.status} /></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => onView(r)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}