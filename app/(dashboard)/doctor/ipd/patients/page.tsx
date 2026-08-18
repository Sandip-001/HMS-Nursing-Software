// app/doctor/ipd/patients/page.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Search, Users, HeartPulse, AlertCircle, Activity, LayoutGrid,
  List as ListIcon, MapPin, Calendar, Stethoscope, Eye, Droplet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  getAllWardPatients, STATUS_OPTIONS,
} from "@/lib/doctor/ipd/ward-round-data";
import type { WardRoundPatient } from "@/types/doctor/ipd/ward-round-types";
import { useRouter } from "next/navigation";

type ViewMode = "list" | "grid";
type StatusFilter = "all" | WardRoundPatient["status"];
type WardFilter = "all" | string;
type RoomFilter = "all" | string;

// Parse "Ward / Room / Bed" string into parts
function parseWardRoomBed(wardRoomBed: string) {
  const parts = wardRoomBed.split("/").map((s) => s.trim());
  const ward = parts[0] || "";
  const room = parts[1] || "";
  const bed = parts[2] || "";
  return { ward, room, bed };
}

export default function MyIPDPatientsPage() {
  const router = useRouter();
  const [patients] = useState<WardRoundPatient[]>(getAllWardPatients());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [wardFilter, setWardFilter] = useState<WardFilter>("all");
  const [roomFilter, setRoomFilter] = useState<RoomFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Build ward and room options from data
  const wardOptions = useMemo(() => {
    const wards = new Set<string>();
    patients.forEach((p) => {
      const { ward } = parseWardRoomBed(p.wardRoomBed);
      if (ward) wards.add(ward);
    });
    return Array.from(wards).sort();
  }, [patients]);

  const roomOptions = useMemo(() => {
    const rooms = new Set<string>();
    patients.forEach((p) => {
      const { ward, room } = parseWardRoomBed(p.wardRoomBed);
      // If a ward is selected, only show rooms for that ward
      if (wardFilter === "all" || ward === wardFilter) {
        if (room) rooms.add(room);
      }
    });
    return Array.from(rooms).sort();
  }, [patients, wardFilter]);

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ipdId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    const { ward, room } = parseWardRoomBed(p.wardRoomBed);
    const matchesWard = wardFilter === "all" || ward === wardFilter;
    const matchesRoom = roomFilter === "all" || room === roomFilter;

    return matchesSearch && matchesStatus && matchesWard && matchesRoom;
  });

  const stats = {
    total: patients.length,
    stable: patients.filter((p) => p.status === "Stable").length,
    observation: patients.filter((p) => p.status === "Under Observation").length,
    critical: patients.filter((p) => p.status === "Critical").length,
  };

  function getStatusBadge(status: string) {
    const variants: Record<string, string> = {
      Stable: "bg-green-50 text-green-700 border-green-200",
      "Under Observation": "bg-amber-50 text-amber-700 border-amber-200",
      Critical: "bg-red-50 text-red-700 border-red-200",
    };
    return variants[status] || variants.Stable;
  }

  function handleClinicalOverview(uhid: string) {
    router.push(`/doctor/ipd/clinical-overview/${uhid}`);
  }

  return (
    <div className="min-h-screen  overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              My IPD Patients
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage and review all admitted patients under your care
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Patients" value={stats.total} icon={<Users className="w-5 h-5" />} gradient="from-blue-500 to-blue-600" />
          <StatCard label="Stable" value={stats.stable} icon={<HeartPulse className="w-5 h-5" />} gradient="from-green-500 to-green-600" />
          <StatCard label="Under Observation" value={stats.observation} icon={<Activity className="w-5 h-5" />} gradient="from-amber-500 to-amber-600" />
          <StatCard label="Critical" value={stats.critical} icon={<AlertCircle className="w-5 h-5" />} gradient="from-red-500 to-red-600" />
        </div>

        {/* Filters + View Toggle */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search patient, UHID, or IPD ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-blue-500"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
                  <SelectTrigger className="border-slate-200 w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={wardFilter} onValueChange={(v) => { setWardFilter(v); setRoomFilter("all"); }}>
                  <SelectTrigger className="border-slate-200 w-full">
                    <SelectValue placeholder="Filter by ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Wards</SelectItem>
                    {wardOptions.map((w) => (
                      <SelectItem key={w} value={w}>{w}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={roomFilter} onValueChange={(v) => setRoomFilter(v)} disabled={wardFilter === "all"}>
                  <SelectTrigger className="border-slate-200 w-full disabled:opacity-60">
                    <SelectValue placeholder="Filter by room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rooms</SelectItem>
                    {roomOptions.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* List / Grid Toggle */}
              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 self-start lg:self-auto">
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <ListIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1150px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Patient</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">UHID / IPD ID</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Ward / Bed</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Diagnosis</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Status</th>
                      <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPatients.map((p) => (
                      <tr key={p.uhid} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0">
                              {p.patientName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{p.patientName}</p>
                              <p className="text-xs text-slate-500">{p.age} yrs • {p.gender} • {p.bloodGroup}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-700">{p.uhid}</p>
                          <p className="text-xs text-slate-500">{p.ipdId}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 truncate max-w-[180px] block">{p.wardRoomBed}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-700">{p.currentDiagnosis}</p>
                          <p className="text-xs text-slate-500">{p.diagnosisCode}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusBadge(p.status)}>{p.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            size="sm"
                            onClick={() => handleClinicalOverview(p.uhid)}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                          >
                            <Eye className="w-4 h-4 mr-1.5" />
                            Clinical Overview
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPatients.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No patients found</h3>
                  <p className="text-slate-500">Try adjusting your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPatients.map((p) => (
              <Card key={p.uhid} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                        {p.patientName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-base truncate">{p.patientName}</h3>
                        <p className="text-xs text-slate-500 truncate">{p.age} yrs • {p.gender}</p>
                      </div>
                    </div>
                    <Badge className={getStatusBadge(p.status)}>{p.status}</Badge>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Droplet className="w-3.5 h-3.5" /> UHID
                      </span>
                      <span className="font-medium text-slate-700 truncate max-w-[160px]">{p.uhid}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">IPD ID</span>
                      <span className="font-medium text-slate-700 truncate max-w-[160px]">{p.ipdId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Ward / Bed
                      </span>
                      <span className="font-medium text-slate-700 truncate max-w-[160px]">{p.wardRoomBed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Admitted
                      </span>
                      <span className="font-medium text-slate-700">{p.daysAdmitted} day{p.daysAdmitted !== 1 ? "s" : ""}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mb-4">
                    <p className="text-xs text-slate-500">Diagnosis</p>
                    <p className="text-sm font-semibold text-slate-800">{p.currentDiagnosis}</p>
                    <p className="text-xs text-slate-400">{p.diagnosisCode}</p>
                  </div>

                  <Button
                    onClick={() => handleClinicalOverview(p.uhid)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Clinical Overview
                  </Button>
                </CardContent>
              </Card>
            ))}

            {filteredPatients.length === 0 && (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No patients found</h3>
                <p className="text-slate-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, gradient }: { label: string; value: number; icon: React.ReactNode; gradient: string }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 text-white bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{label}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}