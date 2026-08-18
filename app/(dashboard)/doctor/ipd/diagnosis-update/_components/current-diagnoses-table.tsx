// app/doctor/ipd/diagnosis-update/_components/current-diagnoses-table.tsx
"use client";

import { CheckCircle2, X } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { DiagnosisStatusBadge, PrimaryBadge } from "./diagnosis-badges";
import type {
  CurrentDiagnosis,
  DiagnosisStatus,
} from "@/types/doctor/ipd/diagnosis-types";

interface CurrentDiagnosesTableProps {
  diagnoses: CurrentDiagnosis[];
  onRemove: (id: string) => void;
  onStatusChange: (id: string, status: DiagnosisStatus) => void;
}

export function CurrentDiagnosesTable({
  diagnoses,
  onRemove,
  onStatusChange,
}: CurrentDiagnosesTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-10">#</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Diagnosed On</TableHead>
            <TableHead className="min-w-[150px]">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {diagnoses.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-6 text-center text-sm text-slate-400">
                No active or current diagnoses.
              </TableCell>
            </TableRow>
          )}

          {diagnoses.map((diagnosis, index) => (
            <TableRow key={diagnosis.id} className="hover:bg-slate-50/60">
              <TableCell className="text-slate-500">{index + 1}</TableCell>

              <TableCell>
                <div>
                  <span className="flex items-center gap-2 font-medium text-slate-800">
                    {diagnosis.diagnosis}
                    {diagnosis.isPrimary && <PrimaryBadge />}
                  </span>

                  {diagnosis.icd10 && (
                    <p className="mt-0.5 text-xs text-slate-400">
                      ICD-10: {diagnosis.icd10}
                    </p>
                  )}

                  {diagnosis.notes && (
                    <p className="mt-0.5 max-w-[240px] truncate text-xs text-slate-400">
                      {diagnosis.notes}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-slate-500">
                {diagnosis.type}
              </TableCell>

              <TableCell className="whitespace-nowrap text-slate-500">
                {diagnosis.diagnosedOn}
              </TableCell>

              <TableCell>
                <Select
                  value={diagnosis.status}
                  onValueChange={(value) =>
                    onStatusChange(diagnosis.id, value as DiagnosisStatus)
                  }
                >
                  <SelectTrigger className="h-8 w-[140px] border-slate-200 text-xs">
                    <SelectValue>
                      <DiagnosisStatusBadge status={diagnosis.status} />
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Active">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </SelectItem>

                    <SelectItem value="Resolved">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" />
                        Resolved
                      </span>
                    </SelectItem>

                    <SelectItem value="Ruled Out">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Ruled Out
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-600"
                  onClick={() => onRemove(diagnosis.id)}
                  title="Remove diagnosis"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}