
"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BedDouble, CheckCircle2, Bed, Wrench, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedStatCard } from "./_components/bed-stat-card";
import { BedFilters } from "./_components/bed-filters";
import { BedAvailabilityTable } from "./_components/bed-availability-table";
import { AvailabilityOverviewChart } from "./_components/availability-overview-chart";
import { QuickInfoPanel } from "./_components/quick-info-panel";
import { getAvailabilityStatus } from "./_components/availability-status-badge";
import { BED_AVAILABILITY } from "@/lib/bed-availability-data";
import type { DepartmentBedAvailability } from "@/types/bed-availability-types";

export default function BedAvailabilityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [wardType, setWardType] = useState("all");
  const [floor, setFloor] = useState("all");
  const [bedType, setBedType] = useState("all");
  const [status, setStatus] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const departments = useMemo(() => Array.from(new Set(BED_AVAILABILITY.map((r) => r.department))), []);
  const wardTypes = useMemo(() => Array.from(new Set(BED_AVAILABILITY.map((r) => r.wardUnit))), []);
  const floors = useMemo(() => Array.from(new Set(BED_AVAILABILITY.map((r) => r.floor))), []);
  const bedTypes = useMemo(() => Array.from(new Set(BED_AVAILABILITY.map((r) => r.bedType))), []);

  const filtered = useMemo(() => {
    return BED_AVAILABILITY.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.wardUnit.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = department === "all" || r.department === department;
      const matchesWard = wardType === "all" || r.wardUnit === wardType;
      const matchesFloor = floor === "all" || r.floor === floor;
      const matchesBedType = bedType === "all" || r.bedType === bedType;
      const pct = r.totalBeds ? (r.available / r.totalBeds) * 100 : 0;
      const matchesStatus = status === "all" || getAvailabilityStatus(pct) === status;
      return matchesSearch && matchesDept && matchesWard && matchesFloor && matchesBedType && matchesStatus;
    });
  }, [searchQuery, department, wardType, floor, bedType, status]);

  const totals = useMemo(() => {
    return BED_AVAILABILITY.reduce(
      (acc, r) => ({
        totalBeds: acc.totalBeds + r.totalBeds,
        occupied: acc.occupied + r.occupied,
        available: acc.available + r.available,
        blocked: acc.blocked + r.blocked,
      }),
      { totalBeds: 0, occupied: 0, available: 0, blocked: 0 }
    );
  }, []);

  const availablePct = totals.totalBeds ? (totals.available / totals.totalBeds) * 100 : 0;
  const occupiedPct = totals.totalBeds ? (totals.occupied / totals.totalBeds) * 100 : 0;
  const blockedPct = totals.totalBeds ? (totals.blocked / totals.totalBeds) * 100 : 0;

  function handleRefresh() {
    setRefreshing(true);
    console.log("Refreshing bed availability data...");
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Bed availability data refreshed");
    }, 800);
  }

  function handleExportExcel() {
    console.log("Exporting", filtered.length, "bed availability rows to Excel");
    toast.success("Exporting bed availability to Excel...");
  }

  function handleApplyFilters() {
    console.log("Filters applied:", { searchQuery, department, wardType, floor, bedType, status });
    toast.info("Filters applied");
  }

  function handleResetFilters() {
    setSearchQuery(""); setDepartment("all"); setWardType("all"); setFloor("all"); setBedType("all"); setStatus("all");
    toast.info("Filters reset");
  }

  function handleViewDetails(r: DepartmentBedAvailability) {
    console.log("View bed details for:", r.department, r.wardUnit);
    toast.info(`Opening bed-level details for ${r.department} - ${r.wardUnit}`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Bed Availability</h1>
            <p className="text-xs text-slate-400">Real-time overview of bed availability across departments and wards.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleExportExcel}>
              <Download className="h-4 w-4" /> Export Excel
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <BedStatCard icon={BedDouble} label="Total Beds" value={totals.totalBeds} sublabel="All Departments" color="purple" />
          <BedStatCard icon={CheckCircle2} label="Available Beds" value={totals.available} sublabel={`${availablePct.toFixed(2)}% Available`} color="emerald" />
          <BedStatCard icon={Bed} label="Occupied Beds" value={totals.occupied} sublabel={`${occupiedPct.toFixed(2)}% Occupied`} color="amber" />
          <BedStatCard icon={Wrench} label="Blocked / Maintenance" value={totals.blocked} sublabel={`${blockedPct.toFixed(2)}% Blocked`} color="red" />
        </div>

        {/* Filters */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-5">
            <BedFilters
              searchQuery={searchQuery} onSearchChange={setSearchQuery}
              department={department} onDepartmentChange={setDepartment}
              wardType={wardType} onWardTypeChange={setWardType}
              floor={floor} onFloorChange={setFloor}
              bedType={bedType} onBedTypeChange={setBedType}
              status={status} onStatusChange={setStatus}
              departments={departments} wardTypes={wardTypes} floors={floors} bedTypes={bedTypes}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </CardContent>
        </Card>

        {/* Main content: table + sidebar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-800">Bed Availability Details</CardTitle>
            </CardHeader>
            <BedAvailabilityTable records={filtered} onViewDetails={handleViewDetails} />
          </Card>

          <div className="space-y-6">
            <AvailabilityOverviewChart available={totals.available} occupied={totals.occupied} blocked={totals.blocked} />
            <QuickInfoPanel records={BED_AVAILABILITY} lastUpdated="20 May 2024, 11:30 AM" />
          </div>
        </div>
      </div>
    </div>
  );
}