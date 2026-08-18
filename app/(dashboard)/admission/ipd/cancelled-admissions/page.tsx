// app/ipd/cancel-admission/page.tsx
"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  FileX,
  CalendarX,
  UserX,
  ShieldOff,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CancelStatCard } from "./_components/cancel-stat-card";
import { CancelFilters } from "./_components/cancel-filters";
import { CancelListRow } from "./_components/cancel-list-row";
import { CancelDetailPanel } from "./_components/cancel-detail-panel";

import {
  CANCELLED_ADMISSIONS,
  CANCEL_DEPARTMENTS,
  CANCEL_REASONS,
} from "@/lib/cancel-admission-data";
import type { CancelledAdmissionRecord } from "@/types/cancel-admission-types";
import { TablePagination } from "../admission-list/_components/table-pagination";

export default function CancelAdmissionPage() {
  const [dateFrom, setDateFrom] = useState("2024-05-01");
  const [dateTo, setDateTo] = useState("2024-05-20");
  const [department, setDepartment] = useState("all");
  const [reason, setReason] = useState("all");
  const [cancelledBy, setCancelledBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<CancelledAdmissionRecord | null>(
    CANCELLED_ADMISSIONS[0],
  );

  const filtered = useMemo(() => {
    return CANCELLED_ADMISSIONS.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.requestId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = department === "all" || r.department === department;
      const matchesReason = reason === "all" || r.reason === reason;
      const matchesCancelledBy =
        cancelledBy === "all" || r.cancelledBy === cancelledBy;
      return (
        matchesSearch && matchesDept && matchesReason && matchesCancelledBy
      );
    });
  }, [searchQuery, department, reason, cancelledBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const stats = useMemo(() => {
    const total = CANCELLED_ADMISSIONS.length;
    const byPatient = CANCELLED_ADMISSIONS.filter(
      (r) => r.cancelledBy === "Patient/Family",
    ).length;
    const byStaff = CANCELLED_ADMISSIONS.filter(
      (r) => r.cancelledBy === "Admission Desk",
    ).length;
    const byOthers = CANCELLED_ADMISSIONS.filter(
      (r) => r.cancelledBy === "Others",
    ).length;
    return {
      total,
      today: 3,
      byPatient,
      byPatientPct: ((byPatient / total) * 100).toFixed(2),
      byStaff,
      byStaffPct: ((byStaff / total) * 100).toFixed(2),
      byOthers,
      byOthersPct: ((byOthers / total) * 100).toFixed(2),
    };
  }, []);

  function handleExport() {
    console.log("Exporting", filtered.length, "cancelled admissions");
    toast.success("Exporting cancelled admissions...");
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Cancelled Admissions
            </h1>
            <p className="text-xs text-slate-400">
              Overview of cancelled admissions, reasons, and responsible parties.
            </p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <CancelStatCard
            icon={FileX}
            label="Total Cancelled"
            value={stats.total}
            sublabel="All Time"
            color="blue"
          />
          <CancelStatCard
            icon={CalendarX}
            label="Cancelled Today"
            value={stats.today}
            sublabel="20 May 2024"
            color="red"
          />
          <CancelStatCard
            icon={UserX}
            label="By Patient/Family"
            value={stats.byPatient}
            sublabel={`${stats.byPatientPct}%`}
            color="amber"
          />
          <CancelStatCard
            icon={ShieldOff}
            label="By Staff"
            value={stats.byStaff}
            sublabel={`${stats.byStaffPct}%`}
            color="purple"
          />
          <CancelStatCard
            icon={MoreHorizontal}
            label="By Others"
            value={stats.byOthers}
            sublabel={`${stats.byOthersPct}%`}
            color="emerald"
          />
        </div>

        {/* Filters */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-5">
            <CancelFilters
              dateFrom={dateFrom}
              dateTo={dateTo}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
              department={department}
              onDepartmentChange={setDepartment}
              reason={reason}
              onReasonChange={setReason}
              cancelledBy={cancelledBy}
              onCancelledByChange={setCancelledBy}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              departments={CANCEL_DEPARTMENTS}
              reasons={CANCEL_REASONS}
              onExport={handleExport}
            />
          </CardContent>
        </Card>

        {/* Master-detail layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          {/* Master list */}
          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <div className="hidden border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500 sm:grid sm:grid-cols-[100px_140px_110px_130px_150px_1fr_100px_28px] sm:gap-3">
              <span>Request ID</span>
              <span>Patient Details</span>
              <span>Department</span>
              <span>Cancelled On</span>
              <span>Cancelled By</span>
              <span>Reason</span>
              <span>Status</span>
              <span />
            </div>
            <div className="divide-y divide-slate-100 overflow-y-auto">
              {paginated.map((r) => (
                <CancelListRow
                  key={r.requestId}
                  record={r}
                  isSelected={selected?.requestId === r.requestId}
                  onSelect={setSelected}
                />
              ))}
            </div>
            <TablePagination
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              totalEntries={filtered.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </Card>

          {/* Detail panel */}
          <CancelDetailPanel record={selected} />
        </div>
      </div>
    </div>
  );
}
