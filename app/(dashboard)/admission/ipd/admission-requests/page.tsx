"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RequestStatCard } from "./_components/request-stat-card";
import { RequestFilters } from "./_components/request-filters";
import { RequestsTable } from "./_components/requests-table";

import {
  ADMISSION_REQUESTS,
  REQUEST_DEPARTMENTS,
  REQUEST_DOCTORS,
} from "@/lib/admission-request-data";
import type {
  AdmissionRequestDetail,
  AdmissionRequestRecord,
} from "@/types/admission-request-types";
import { TablePagination } from "../admission-list/_components/table-pagination";
import { RequestDetailsDialog } from "./_components/request-details-dialog";

export default function AdmissionRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("2024-05-13");
  const [dateTo, setDateTo] = useState("2024-05-20");
  const [requestStatus, setRequestStatus] = useState("all");
  const [department, setDepartment] = useState("all");
  const [doctor, setDoctor] = useState("all");
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedRequest, setSelectedRequest] =
    useState<AdmissionRequestDetail | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  function handleView(r: AdmissionRequestRecord) {
    console.log("View admission request:", r.requestId);
    toast.info(`Opening full request for ${r.requestId}`);
    const detail: AdmissionRequestDetail = {
      ...r,
      mobile: "9875543210",
      email: "ravi.sharma@email.com",
      address: "123, Green Park, Civil Lines, Delhi - 110054",
      requestedFor: "Admission",
      provisionalDiagnosis: "Chest Pain / Angina",
      symptoms: "Chest pain since 2 days, breathlessness on exertion",
      referredFrom: "OPD",
      clinicalRemarks:
        "Patient requires monitoring and further cardiac evaluation.",
      preferredWardType: "General Ward",
      preferredBedType: "General Bed",
      preferredFloor: "3rd Floor",
      specialRequest: "Near Nurse Station",
      documents: [
        {
          fileName: "OPD Prescription.pdf",
          fileSizeLabel: "245 KB",
          fileType: "pdf",
          url: "#",
        },
        {
          fileName: "Investigation Reports.pdf",
          fileSizeLabel: "512 KB",
          fileType: "pdf",
          url: "#",
        },
      ],
    };
    setSelectedRequest(detail);
    setDetailsOpen(true);
  }

  const filtered = useMemo(() => {
    return ADMISSION_REQUESTS.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.uhid.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        requestStatus === "all" || r.requestStatus === requestStatus;
      const matchesDept = department === "all" || r.department === department;
      const matchesDoctor = doctor === "all" || r.attendingDoctor === doctor;
      return matchesSearch && matchesStatus && matchesDept && matchesDoctor;
    });
  }, [searchQuery, requestStatus, department, doctor]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const stats = useMemo(
    () => ({
      total: ADMISSION_REQUESTS.length,
      pending: ADMISSION_REQUESTS.filter(
        (r) => r.requestStatus === "Pending Review",
      ).length,
      approved: ADMISSION_REQUESTS.filter((r) => r.requestStatus === "Approved")
        .length,
      rejected: ADMISSION_REQUESTS.filter((r) => r.requestStatus === "Rejected")
        .length,
    }),
    [],
  );

  function handleApprove(r: AdmissionRequestRecord) {
    console.log("Approve admission request:", r.requestId);
    toast.success(
      `Request ${r.requestId} approved. Proceed to create admission.`,
    );
  }

  function handleReject(r: AdmissionRequestRecord) {
    console.log("Reject admission request:", r.requestId);
    toast.error(`Request ${r.requestId} rejected`);
  }

  function handleRefresh() {
    setRefreshing(true);
    console.log("Refreshing admission requests...");
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Admission requests refreshed");
    }, 800);
  }

  function handleExportExcel() {
    console.log("Exporting", filtered.length, "requests to Excel");
    toast.success("Exporting admission requests to Excel...");
  }

  function handleApplyFilters() {
    console.log("Filters applied:", {
      searchQuery,
      dateFrom,
      dateTo,
      requestStatus,
      department,
      doctor,
    });
    setPage(1);
    toast.info("Filters applied");
  }

  function handleResetFilters() {
    setSearchQuery("");
    setRequestStatus("all");
    setDepartment("all");
    setDoctor("all");
    setDateFrom("2024-05-13");
    setDateTo("2024-05-20");
    setPage(1);
    toast.info("Filters reset");
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Admission Requests
              </h1>
              <p className="text-xs text-slate-400">
                Requests received from OPD / Doctors for IPD admission.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />{" "}
              Refresh
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
          <RequestStatCard
            icon={FileText}
            label="Total Requests"
            value={stats.total}
            sublabel="All Requests"
            color="blue"
          />
          <RequestStatCard
            icon={Clock}
            label="Pending Review"
            value={stats.pending}
            sublabel="Awaiting Review"
            color="amber"
          />
          <RequestStatCard
            icon={CheckCircle2}
            label="Approved"
            value={stats.approved}
            sublabel="Approved Requests"
            color="emerald"
          />
          <RequestStatCard
            icon={XCircle}
            label="Rejected"
            value={stats.rejected}
            sublabel="Rejected Requests"
            color="red"
          />
        </div>

        {/* Filters */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-5">
            <RequestFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
              requestStatus={requestStatus}
              onRequestStatusChange={setRequestStatus}
              department={department}
              onDepartmentChange={setDepartment}
              doctor={doctor}
              onDoctorChange={setDoctor}
              departments={REQUEST_DEPARTMENTS}
              doctors={REQUEST_DOCTORS}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-slate-200 shadow-sm">
          <RequestsTable
            records={paginated}
            onView={handleView}
            onApprove={handleApprove}
            onReject={handleReject}
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

      <RequestDetailsDialog
        request={selectedRequest}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
