// app/ipd/doctor/diagnosis-update/_components/resolved-diagnoses-table.tsx
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { ResolvedDiagnosis } from "@/types/doctor/ipd/diagnosis-types";

interface ResolvedDiagnosesTableProps {
  diagnoses: ResolvedDiagnosis[];
}

export function ResolvedDiagnosesTable({
  diagnoses,
}: ResolvedDiagnosesTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead>Diagnosis</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Diagnosed On</TableHead>
            <TableHead>Resolved On</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {diagnoses.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-5 text-center text-sm text-slate-400"
              >
                No resolved or inactive diagnoses.
              </TableCell>
            </TableRow>
          )}

          {diagnoses.map((diagnosis) => (
            <TableRow key={diagnosis.id} className="hover:bg-slate-50/60">
              <TableCell className="font-medium text-slate-800">
                {diagnosis.diagnosis}
              </TableCell>

              <TableCell className="text-slate-500">
                {diagnosis.type}
              </TableCell>

              <TableCell className="whitespace-nowrap text-slate-500">
                {diagnosis.diagnosedOn}
              </TableCell>

              <TableCell className="whitespace-nowrap font-medium text-slate-600">
                {diagnosis.resolvedOn}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}