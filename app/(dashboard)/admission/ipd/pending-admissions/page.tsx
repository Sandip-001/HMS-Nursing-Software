// app/ipd/admission-list/pending/page.tsx
"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Clock,
  Download,
  SlidersHorizontal,
  FileText,
  BedDouble,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PendingStatCard } from "./_components/pending-stat-card";
import { PendingFilters } from "./_components/pending-filters";
import { PendingTable } from "./_components/pending-table";

import { PENDING_ADMISSIONS } from "@/lib/pending-admission-data";
import type { PendingAdmissionRecord } from "@/types/pending-admission-types";
import { TablePagination } from "../admission-list/_components/table-pagination";
import { PendingDetailsDialog } from "./_components/pending-details-dialog";

export default function PendingAdmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("2024-05-13");
  const [dateTo, setDateTo] = useState("2024-05-20");
  const [currentStep, setCurrentStep] = useState("all");
  const [department, setDepartment] = useState("all");
  const [priority, setPriority] = useState("all");
  const [doctor, setDoctor] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return PENDING_ADMISSIONS.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.uhid.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStep =
        currentStep === "all" || r.currentStep === currentStep;
      const matchesDept = department === "all" || r.department === department;
      const matchesPriority = priority === "all" || r.priority === priority;
      const matchesDoctor = doctor === "all" || r.attendingDoctor === doctor;
      return (
        matchesSearch &&
        matchesStep &&
        matchesDept &&
        matchesPriority &&
        matchesDoctor
      );
    });
  }, [searchQuery, currentStep, department, priority, doctor]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const stats = useMemo(
    () => ({
      total: PENDING_ADMISSIONS.length,
      awaitingPayment: PENDING_ADMISSIONS.filter(
        (r) => r.currentStep === "Awaiting Package & Payment",
      ).length,
      awaitingBed: PENDING_ADMISSIONS.filter(
        (r) => r.currentStep === "Awaiting Bed Allocation",
      ).length,
      awaitingReview: PENDING_ADMISSIONS.filter(
        (r) => r.currentStep === "Awaiting Review & Confirm",
      ).length,
    }),
    [],
  );

  const [selectedPending, setSelectedPending] =
    useState<PendingAdmissionRecord | null>(null);
  const [pendingDetailsOpen, setPendingDetailsOpen] = useState(false);

  function handleView(r: PendingAdmissionRecord) {
    console.log("View pending admission:", r.admissionId);
    setSelectedPending(r);
    setPendingDetailsOpen(true);
  }

  function handleCancel(r: PendingAdmissionRecord) {
    console.log("Cancel pending admission:", r.admissionId);
    toast.error(`Admission ${r.admissionId} cancelled`);
  }

  function handleExportExcel() {
    console.log("Exporting", filtered.length, "pending records to Excel");
    toast.success("Exporting pending admissions to Excel...");
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Pending Admissions
              </h1>
              <p className="text-xs text-slate-400">
                Admissions in progress that are awaiting completion.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => toast.info("More filters coming soon")}
            >
              <SlidersHorizontal className="h-4 w-4" /> More Filters
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleExportExcel}
            >
              <Download className="h-4 w-4" /> Export Excel
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <PendingStatCard
            icon={FileText}
            label="Total Pending"
            value={stats.total}
            sublabel="Admissions"
            color="blue"
          />
          <PendingStatCard
            icon={Clock}
            label="Awaiting Package & Payment"
            value={stats.awaitingPayment}
            sublabel="Admissions"
            color="amber"
          />
          <PendingStatCard
            icon={BedDouble}
            label="Awaiting Bed Allocation"
            value={stats.awaitingBed}
            sublabel="Admissions"
            color="purple"
          />
          <PendingStatCard
            icon={ClipboardCheck}
            label="Awaiting Review & Confirm"
            value={stats.awaitingReview}
            sublabel="Admissions"
            color="emerald"
          />
        </div>

        {/* Filters */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-5">
            <PendingFilters
              searchQuery={searchQuery}
              onSearchChange={(v) => {
                setSearchQuery(v);
                setPage(1);
              }}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
              currentStep={currentStep}
              onCurrentStepChange={(v) => {
                setCurrentStep(v);
                setPage(1);
              }}
              department={department}
              onDepartmentChange={(v) => {
                setDepartment(v);
                setPage(1);
              }}
              priority={priority}
              onPriorityChange={(v) => {
                setPriority(v);
                setPage(1);
              }}
              doctor={doctor}
              onDoctorChange={(v) => {
                setDoctor(v);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-slate-200 shadow-sm">
          <PendingTable
            records={paginated}
            onView={handleView}
            onCancel={handleCancel}
          />
          <TablePagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalEntries={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </Card>
      </div>

      <PendingDetailsDialog
  admission={selectedPending}
  open={pendingDetailsOpen}
  onOpenChange={setPendingDetailsOpen}
/>
    </div>
  );
}
