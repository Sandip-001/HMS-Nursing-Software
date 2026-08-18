
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { VitalRecordEntry } from "@/types/doctor/ipd/vitals-types";

export function VitalsRecordsTable({ records }: { records: VitalRecordEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead>Date & Time</TableHead>
            <TableHead>BP (mmHg)</TableHead>
            <TableHead>Pulse (bpm)</TableHead>
            <TableHead>Resp. Rate (/min)</TableHead>
            <TableHead>SpO2 (%)</TableHead>
            <TableHead>Temp. (°F)</TableHead>
            <TableHead>Pain (NRS)</TableHead>
            <TableHead>Recorded By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((r) => (
            <TableRow key={r.dateTime} className="hover:bg-slate-50/60">
              <TableCell className="whitespace-nowrap text-slate-600">{r.dateTime}</TableCell>
              <TableCell className="font-medium text-slate-800">{r.bp}</TableCell>
              <TableCell className="text-slate-600">{r.pulse}</TableCell>
              <TableCell className="text-slate-600">{r.respRate}</TableCell>
              <TableCell className="text-slate-600">{r.spo2}</TableCell>
              <TableCell className="text-slate-600">{r.temp}</TableCell>
              <TableCell className="text-slate-600">{r.pain}</TableCell>
              <TableCell className="text-slate-600">{r.recordedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}