// app/(dashboard)/nurse-admin/ipd/beds/page.tsx
"use client";
import { useMemo, useState } from "react";
import { BedDouble, CheckCircle2, Users, Wrench } from "lucide-react";
import type { WardPatientFull } from "@/types/nurse-admin/ipd/ward-detail-types";
import { ALL_WARDS, BEDS, WARD_PATIENTS_FULL } from "@/lib/nurse-admin/ipd/ward-detail-data";
import { BedStat } from "./_components/beds-stats";
import { BedsFilters, type BedFiltersState } from "./_components/beds-filters";
import { BedLegend } from "./_components/bed-legend";
import { WardBedGroup } from "./_components/ward-bed-group";
import { PatientDetailDrawer } from "../all-ward-patients/_components/drawer/patient-detail-drawer";

const initialFilters: BedFiltersState = { search: "", ward: "All", room: "All", status: "All" };

export default function BedsPage() {
  const [patients, setPatients] = useState<WardPatientFull[]>(WARD_PATIENTS_FULL);
  const [filters, setFilters] = useState<BedFiltersState>(initialFilters);
  const [viewingPatient, setViewingPatient] = useState<WardPatientFull | null>(null);

  const patientsByUhid = useMemo(() => new Map(patients.map((p) => [p.uhid, p])), [patients]);

  const availableRooms = useMemo(() => {
    if (filters.ward === "All") return Array.from(new Set(BEDS.map((b) => b.room)));
    return Array.from(new Set(BEDS.filter((b) => b.ward === filters.ward).map((b) => b.room)));
  }, [filters.ward]);

  const filteredBeds = useMemo(() => BEDS.filter((bed) => {
    const query = filters.search.trim().toLowerCase();
    const patient = bed.patientUhid ? patientsByUhid.get(bed.patientUhid) : undefined;
    const matchesSearch = !query || [bed.bedLabel, patient?.patientName ?? ""].join(" ").toLowerCase().includes(query);
    const matchesWard = filters.ward === "All" || bed.ward === filters.ward;
    const matchesRoom = filters.room === "All" || bed.room === filters.room;
    const matchesStatus = filters.status === "All" || bed.status === filters.status;
    return matchesSearch && matchesWard && matchesRoom && matchesStatus;
  }), [filters, patientsByUhid]);

  const stats = useMemo(() => ({
    total: BEDS.length,
    available: BEDS.filter((b) => b.status === "Available").length,
    occupied: BEDS.filter((b) => b.status === "Occupied").length,
    maintenance: BEDS.filter((b) => b.status === "Maintenance").length,
  }), []);

  function updateFilter<K extends keyof BedFiltersState>(key: K, value: BedFiltersState[K]) {
    setFilters((previous) => ({ ...previous, [key]: value, ...(key === "ward" ? { room: "All" } : {}) }));
  }

  function handlePatientUpdate(updated: WardPatientFull) {
    setPatients((previous) => previous.map((p) => p.uhid === updated.uhid ? updated : p));
    setViewingPatient(updated);
  }

  const wardsToRender = filters.ward === "All" ? ALL_WARDS : [filters.ward];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Bed Availability</h1>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Ward & Room View</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Live occupancy map across all wards and rooms — hover a bed for patient info, click to view full details.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <BedStat icon={<BedDouble className="h-5 w-5" />} label="Total Beds" value={String(stats.total)} subtitle="Across all wards" tone="blue" />
          <BedStat icon={<CheckCircle2 className="h-5 w-5" />} label="Available" value={String(stats.available)} subtitle="Ready for new booking" tone="emerald" />
          <BedStat icon={<Users className="h-5 w-5" />} label="Occupied" value={String(stats.occupied)} subtitle="Currently in use" tone="amber" />
          <BedStat icon={<Wrench className="h-5 w-5" />} label="Maintenance" value={String(stats.maintenance)} subtitle="Temporarily unavailable" tone="slate" />
        </div>

        <BedsFilters filters={filters} results={filteredBeds.length} wards={ALL_WARDS} rooms={availableRooms} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />

        <BedLegend />

        <div className="space-y-6">
          {wardsToRender.map((ward) => {
            const bedsInWard = filteredBeds.filter((b) => b.ward === ward);
            if (bedsInWard.length === 0) return null;
            return <WardBedGroup key={ward} ward={ward} beds={bedsInWard} patientsByUhid={patientsByUhid} onOpenPatient={setViewingPatient} />;
          })}
          {filteredBeds.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-sm text-slate-400">No beds match the selected filters.</div>
          )}
        </div>

        <PatientDetailDrawer patient={viewingPatient} onClose={() => setViewingPatient(null)} onPatientUpdate={handlePatientUpdate} />
      </div>
    </div>
  );
}