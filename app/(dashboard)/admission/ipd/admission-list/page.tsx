// app/ipd/admission-list/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Menu,
  Download,
  Plus,
  Bed,
  CheckCircle2,
  Clock,
  DoorOpen,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatCard } from "./_components/stat-card";
import { AdmissionFilters } from "./_components/admission-filters";
import { AdmissionTable } from "./_components/admission-table";
import { TablePagination } from "./_components/table-pagination";
import { ADMISSIONS } from "@/lib/admission-list-data";
import { AdmissionDetail, AdmissionRecord } from "@/types/admission-list-types";
import { AdmissionDetailsDialog } from "./_components/admission-details-dialog";

export default function AdmissionListPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [admissionIdQuery, setAdmissionIdQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("2024-05-13");
  const [dateTo, setDateTo] = useState("2024-05-20");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // inside component:
  const [selectedAdmission, setSelectedAdmission] =
    useState<AdmissionDetail | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filtered = useMemo(() => {
    return ADMISSIONS.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.uhid.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAdmissionId =
        !admissionIdQuery ||
        r.admissionId.toLowerCase().includes(admissionIdQuery.toLowerCase());
      const matchesDept = department === "all" || r.department === department;
      const matchesStatus = status === "all" || r.status === status;
      return (
        matchesSearch && matchesAdmissionId && matchesDept && matchesStatus
      );
    });
  }, [searchQuery, admissionIdQuery, department, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleView(r: AdmissionRecord) {
    toast.info(`Opening details for ${r.admissionId}`);
    console.log("View admission:", r.admissionId);
    const detail: AdmissionDetail = {
      ...r,
      opdMrNo: "OPD240520-0003",
      attendingDoctor: "Dr. Amit Verma",
      admissionType: "Elective",
      priority: "Normal",
      mobile: "9876543210",
      email: "amit.kumar@email.com",
      address: "123, Green Park, Civil Lines, Delhi - 110054",
      admissionSource: "OPD",
      referredBy: "Dr. Amit Verma",
      remarks: "-",
      advanceAmount: 37500,
      paymentMode: "Cash",
      transactionNo: "RCPT240520-0001",
      paymentDate: "20 May 2024, 11:30 AM",
      isolatedBed: false,
      specialInstructions: "-",
      createdBy: "Amit Sharma",
      createdAt: "20 May 2024, 11:30 AM",
      lastUpdatedBy: "Amit Sharma",
      lastUpdatedAt: "20 May 2024, 11:30 AM",
      totalUpdates: 1,
    };
    setSelectedAdmission(detail);
    setDetailsOpen(true);
  }

  function handleBedTransfer(r: AdmissionRecord) {
    console.log("Bed/ward transfer:", r.admissionId);
    toast.info(`Opening bed/ward transfer for ${r.patientName}`);
  }

  function handlePrint(r: AdmissionRecord) {
    console.log("Print summary:", r.admissionId);
    toast.success(`Printing summary for ${r.admissionId}`);
  }

  function handleCancel(r: AdmissionRecord) {
    console.log("Cancel admission:", r.admissionId);
    toast.error(`Admission ${r.admissionId} cancelled`);
  }

  function handleExportExcel() {
    console.log("Exporting", filtered.length, "records to Excel");
    toast.success("Exporting admission list to Excel...");
  }

  function handleNewAdmission() {
    router.push("/admission/ipd/new-admission");
  }

  return (
    <>
      {" "}
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Menu className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-lg font-semibold text-slate-800">
                  Admission List
                </h1>
                <p className="text-xs text-slate-400">
                  View and manage all inpatient admissions
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleExportExcel}
              >
                <Download className="h-4 w-4" /> Export Excel
              </Button>
              <Button
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleNewAdmission}
              >
                <Plus className="h-4 w-4" /> New Admission
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="py-5">
              <AdmissionFilters
                searchQuery={searchQuery}
                onSearchChange={(v) => {
                  setSearchQuery(v);
                  setPage(1);
                }}
                admissionIdQuery={admissionIdQuery}
                onAdmissionIdChange={(v) => {
                  setAdmissionIdQuery(v);
                  setPage(1);
                }}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateFromChange={setDateFrom}
                onDateToChange={setDateTo}
                department={department}
                onDepartmentChange={(v) => {
                  setDepartment(v);
                  setPage(1);
                }}
                status={status}
                onStatusChange={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
                onMoreFilters={() => toast.info("More filters coming soon")}
              />
            </CardContent>
          </Card>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard
              icon={Bed}
              label="Total Admissions"
              value={128}
              sublabel="Total admitted patients"
              color="blue"
            />
            <StatCard
              icon={CheckCircle2}
              label="Active Admissions"
              value={96}
              sublabel="Currently admitted"
              color="emerald"
            />
            <StatCard
              icon={Clock}
              label="Pending Admissions"
              value={12}
              sublabel="Awaiting completion"
              color="amber"
            />
            <StatCard
              icon={DoorOpen}
              label="Discharged Today"
              value={6}
              sublabel="Today's discharges"
              color="purple"
            />
            <StatCard
              icon={XCircle}
              label="Cancelled"
              value={14}
              sublabel="Cancelled admissions"
              color="red"
            />
          </div>

          {/* Table */}
          <Card className="border-slate-200 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Show</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => {
                    setPageSize(Number(v));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 25, 50, 100].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>entries</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Column Visibility
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Admission ID</DropdownMenuItem>
                  <DropdownMenuItem>Patient Name</DropdownMenuItem>
                  <DropdownMenuItem>Department</DropdownMenuItem>
                  <DropdownMenuItem>Package</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <AdmissionTable
              records={paginated}
              onView={handleView}
              onBedTransfer={handleBedTransfer}
              onPrint={handlePrint}
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
      </div>
      
      <AdmissionDetailsDialog
        admission={selectedAdmission}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}
