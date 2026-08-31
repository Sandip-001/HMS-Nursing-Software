// app/(dashboard)/admission/ipd/all-patients/page.tsx
"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Activity,
  TrendingUp,
  IndianRupee,
  Search,
  Grid2X2,
  LayoutList,
  Plus,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Stethoscope,
  BedDouble,
  FileText,
  CreditCard,
  RotateCcw,
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IPDPatient } from "@/types/admission-desk/ipd/ipd-admission-types";
import { EXISTING_PATIENTS } from "@/lib/admission-desk/ipd/ipd-admission-data";

export default function IPDAllPatientsPage() {
  const router = useRouter();
  const [patients] = useState<IPDPatient[]>(EXISTING_PATIENTS);
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterDepartment, setFilterDepartment] = useState<string>("All");
  const [selectedPatient, setSelectedPatient] = useState<IPDPatient | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        `${patient.firstName} ${patient.lastName}`
          .toLowerCase()
          .includes(query) ||
        patient.uhid.toLowerCase().includes(query) ||
        patient.ipdId.toLowerCase().includes(query) ||
        patient.mobileNumber?.includes(query);
      const matchesStatus =
        filterStatus === "All" || patient.status === filterStatus;
      const matchesDepartment =
        filterDepartment === "All" || patient.department === filterDepartment;
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [patients, search, filterStatus, filterDepartment]);

  const stats = useMemo(() => {
    return {
      total: patients.length,
      admitted: patients.filter((p) => p.status === "Admitted").length,
      discharged: patients.filter((p) => p.status === "Discharged").length,
      revenue: patients.filter((p) => p.status === "Admitted").length * 5000,
    };
  }, [patients]);

  const columns: ColumnDef<IPDPatient>[] = [
    {
      id: "Patient",
      header: "Patient",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {row.original.firstName[0]}
          </div>
          <div>
            <p className="font-semibold text-slate-800">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-xs text-slate-400">{row.original.uhid}</p>
          </div>
        </div>
      ),
    },
    {
      id: "IPD ID",
      header: "IPD ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">
          {row.original.ipdId}
        </div>
      ),
    },
    {
      id: "Department",
      header: "Department",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
        >
          {row.original.department}
        </Badge>
      ),
    },
    {
      id: "Doctor",
      header: "Doctor",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            {row.original.doctor.name}
          </span>
        </div>
      ),
    },
    {
      id: "Bed",
      header: "Bed",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <BedDouble className="h-4 w-4 text-slate-400" />
            <span className="font-medium">{row.original.bed}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {row.original.ward} · {row.original.room}
          </p>
        </div>
      ),
    },
    {
      id: "Status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={`font-medium ${
            row.original.status === "Admitted"
              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
              : row.original.status === "Discharged"
                ? "bg-slate-100 text-slate-700 border-slate-200"
                : "bg-amber-100 text-amber-700 border-amber-200"
          }`}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "Admission Date",
      header: "Admission Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>{row.original.admissionDate}</span>
        </div>
      ),
    },
    {
      id: "Action",
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedPatient(row.original);
            setIsDrawerOpen(true);
          }}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <Eye className="mr-1 h-4 w-4" /> View
        </Button>
      ),
    },
  ];

  function openDrawer(patient: IPDPatient) {
    setSelectedPatient(patient);
    setIsDrawerOpen(true);
  }

  function handleResetFilters() {
    setSearch("");
    setFilterStatus("All");
    setFilterDepartment("All");
  }

  const hasActiveFilters =
    search || filterStatus !== "All" || filterDepartment !== "All";

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              All IPD Patients
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all admitted patients across departments
            </p>
          </div>
          <Button
            onClick={() => router.push("/admission/ipd/new-registration")}
            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
          >
            <Plus className="h-4 w-4" /> New Registration
          </Button>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PremiumStatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Patients"
            value={String(stats.total)}
            subtitle="All admissions"
            gradient="from-blue-500 to-cyan-500"
          />
          <PremiumStatCard
            icon={<Activity className="h-5 w-5" />}
            label="Currently Admitted"
            value={String(stats.admitted)}
            subtitle="Active patients"
            gradient="from-emerald-500 to-teal-500"
          />
          <PremiumStatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Discharged"
            value={String(stats.discharged)}
            subtitle="Completed treatment"
            gradient="from-slate-500 to-zinc-500"
          />
          <PremiumStatCard
            icon={<IndianRupee className="h-5 w-5" />}
            label="Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
            subtitle="From admitted patients"
            gradient="from-amber-500 to-orange-500"
          />
        </div>

        {/* Premium Filters */}
        <Card className="border-slate-200 shadow-lg shadow-slate-200/50 backdrop-blur bg-white/80">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Search className="h-4 w-4" /> Filters
              </h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-slate-500 hover:text-red-600 hover:bg-red-50 h-8"
                >
                  <RotateCcw className="h-3 w-3 mr-1" /> Reset
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="relative md:col-span-2 group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  className="h-12 pl-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by patient name, UHID, IPD ID, or mobile..."
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Admitted">Admitted</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filterDepartment}
                onValueChange={setFilterDepartment}
              >
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-full">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Trauma Surgery">Trauma Surgery</SelectItem>
                  <SelectItem value="Emergency Medicine">
                    Emergency Medicine
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-blue-600">
              {filteredPatients.length}
            </span>{" "}
            patients
          </p>
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => setView("table")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "table" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}
            >
              <LayoutList className="inline h-4 w-4" /> Table
            </button>
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${view === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-500"}`}
            >
              <Grid2X2 className="inline h-4 w-4" /> Grid
            </button>
          </div>
        </div>

        {/* Patients List */}
        {view === "table" ? (
          <DataTable columns={columns} data={filteredPatients} pageSize={10} />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.ipdId}
                patient={patient}
                onView={() => openDrawer(patient)}
              />
            ))}
          </div>
        )}

        {/* Right Side Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {selectedPatient && (
            <div className="h-full flex flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Patient Details
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {selectedPatient.ipdId}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-full hover:bg-white/50"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Patient Avatar & Basic Info */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {selectedPatient.firstName[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {selectedPatient.firstName} {selectedPatient.lastName}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {selectedPatient.uhid}
                    </p>
                    <Badge
                      className={`mt-2 ${selectedPatient.status === "Admitted" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
                    >
                      {selectedPatient.status}
                    </Badge>
                  </div>
                </div>

                {/* Personal Information */}
                <Section
                  title="Personal Information"
                  icon={<User className="h-5 w-5" />}
                >
                  <InfoGrid>
                    <InfoField
                      label="Age"
                      value={`${selectedPatient.age} years`}
                    />
                    <InfoField label="Gender" value={selectedPatient.gender} />
                    <InfoField
                      label="Date of Birth"
                      value={selectedPatient.dateOfBirth}
                    />
                    <InfoField
                      label="Mobile"
                      value={selectedPatient.mobileNumber}
                      icon={<Phone className="h-4 w-4" />}
                    />
                    {selectedPatient.email && (
                      <InfoField
                        label="Email"
                        value={selectedPatient.email}
                        icon={<Mail className="h-4 w-4" />}
                      />
                    )}
                    <InfoField
                      label="Address"
                      value={`${selectedPatient.address}, ${selectedPatient.city}, ${selectedPatient.state} - ${selectedPatient.pinCode}`}
                      icon={<MapPin className="h-4 w-4" />}
                    />
                  </InfoGrid>
                </Section>

                {/* Admission Details */}
                <Section
                  title="Admission Details"
                  icon={<FileText className="h-5 w-5" />}
                >
                  <InfoGrid>
                    <InfoField
                      label="IPD ID"
                      value={selectedPatient.ipdId}
                      highlight
                    />
                    <InfoField label="UHID" value={selectedPatient.uhid} />
                    <InfoField
                      label="Admission Date"
                      value={selectedPatient.admissionDate}
                      icon={<Calendar className="h-4 w-4" />}
                    />
                    <InfoField
                      label="Department"
                      value={selectedPatient.department}
                      badge
                    />
                    <InfoField
                      label="Doctor"
                      value={selectedPatient.doctor.name}
                      icon={<Stethoscope className="h-4 w-4" />}
                    />
                    <InfoField
                      label="Package"
                      value={selectedPatient.package}
                    />
                  </InfoGrid>
                </Section>

                {/* Bed Allocation */}
                <Section
                  title="Bed Allocation"
                  icon={<BedDouble className="h-5 w-5" />}
                >
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                          Ward
                        </p>
                        <p className="font-bold text-slate-800 mt-1">
                          {selectedPatient.ward}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                          Room
                        </p>
                        <p className="font-bold text-slate-800 mt-1">
                          {selectedPatient.room}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                          Bed
                        </p>
                        <p className="font-bold text-blue-600 mt-1">
                          {selectedPatient.bed}
                        </p>
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Payment Information */}
                <Section
                  title="Payment Information"
                  icon={<CreditCard className="h-5 w-5" />}
                >
                  <InfoGrid>
                    <InfoField
                      label="Payment Method"
                      value={selectedPatient.paymentMethod}
                    />
                    {selectedPatient.insuranceNumber && (
                      <InfoField
                        label="Insurance Number"
                        value={selectedPatient.insuranceNumber}
                      />
                    )}
                  </InfoGrid>
                </Section>
              </div>
            </div>
          )}
        </div>

        {/* Backdrop */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

// Premium Stat Card Component
function PremiumStatCard({
  icon,
  label,
  value,
  subtitle,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  gradient: string;
}) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-200/50 group hover:shadow-2xl transition-all duration-300">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
      />
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              {label}
            </p>
            <p className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mt-2">
              {value}
            </p>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          </div>
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg`}
          >
            {icon}
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
        />
      </div>
    </Card>
  );
}

// Premium Patient Card Component
function PatientCard({ patient, onView }: { patient: IPDPatient; onView: () => void }) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {patient.firstName[0]}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{patient.firstName} {patient.lastName}</p>
              <p className="text-xs text-slate-400">{patient.uhid}</p>
            </div>
          </div>
          <Badge className={patient.status === "Admitted" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}>
            {patient.status}
          </Badge>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">IPD ID:</span>
            <span className="font-medium text-slate-700">{patient.ipdId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Department:</span>
            <span className="font-medium text-slate-700">{patient.department}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Bed:</span>
            <span className="font-medium text-slate-700">{patient.bed}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4" onClick={onView}>
          <Eye className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardContent>
    </Card>
  );
}

// Section Component
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">{icon}</div>
        {title}
      </h4>
      {children}
    </div>
  );
}

// Info Grid Component
function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

// Info Field Component
function InfoField({
  label,
  value,
  icon,
  badge,
  highlight,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  badge?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      {badge ? (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
        >
          {value}
        </Badge>
      ) : highlight ? (
        <p className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {value}
        </p>
      ) : (
        <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
          {icon} {value}
        </p>
      )}
    </div>
  );
}
