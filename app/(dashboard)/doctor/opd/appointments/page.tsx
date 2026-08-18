"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search, Calendar, Users, CheckCircle, Clock,
  Eye, Play, LayoutGrid, List as ListIcon, ChevronLeft,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PatientDetailsDialog } from "./_components/patient-details-dialog";
import { getAllAppointments, type PatientFullProfile } from "@/lib/doctor/opd/opd-mock-data";

type ViewMode = "list" | "grid";
type StatusFilter = "all" | "waiting" | "checked-in" | "completed" | "scheduled";
type PatientTypeFilter = "all" | "new" | "follow-up";

export default function DoctorOPDAppointmentsPage() {
  const [appointments] = useState<PatientFullProfile[]>(getAllAppointments());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [patientTypeFilter, setPatientTypeFilter] = useState<PatientTypeFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewingPatient, setViewingPatient] = useState<PatientFullProfile | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.appointmentNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesPatientType = patientTypeFilter === "all" || apt.patientType === patientTypeFilter;
    return matchesSearch && matchesStatus && matchesPatientType;
  });

  const stats = {
    total: appointments.length,
    waiting: appointments.filter((a) => a.status === "waiting").length,
    checkedIn: appointments.filter((a) => a.status === "checked-in").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    scheduled: appointments.filter((a) => a.status === "scheduled").length,
  };

 {/* useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActionMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); */}

  function handleViewDetails(apt: PatientFullProfile) {
    setViewingPatient(apt);
    setIsDetailsOpen(true);
    setActionMenuOpen(null);
  }

  function handleStartConsultation(apt: PatientFullProfile) {
    window.location.href = `/doctor/opd/consultation/${apt.uhid}`;
  }

  function getStatusBadge(status: string) {
    const variants: Record<string, string> = {
      waiting: "bg-amber-50 text-amber-700 border-amber-200",
      "checked-in": "bg-blue-50 text-blue-700 border-blue-200",
      completed: "bg-green-50 text-green-700 border-green-200",
      scheduled: "bg-purple-50 text-purple-700 border-purple-200",
    };
    return variants[status] || variants.waiting;
  }

  function toggleActionMenu(id: string, e?: React.MouseEvent) {
    e?.stopPropagation();
    setActionMenuOpen(actionMenuOpen === id ? null : id);
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                OPD Appointment Queue
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Review patients, record clinical notes, and complete consultations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 w-[180px] border-slate-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] py-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Queue" value={stats.total} icon={<Users className="w-5 h-5" />} gradient="from-blue-500 to-blue-600" />
          <StatCard label="Waiting" value={stats.waiting} icon={<Clock className="w-5 h-5" />} gradient="from-amber-500 to-amber-600" />
          <StatCard label="Checked In" value={stats.checkedIn} icon={<CheckCircle className="w-5 h-5" />} gradient="from-blue-500 to-blue-600" />
          <StatCard label="Completed" value={stats.completed} icon={<CheckCircle className="w-5 h-5" />} gradient="from-green-500 to-green-600" />
          <StatCard label="Scheduled" value={stats.scheduled} icon={<Calendar className="w-5 h-5" />} gradient="from-purple-500 to-purple-600" />
        </div>

        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search patient, UHID, or appointment..."
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
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={patientTypeFilter} onValueChange={(v) => setPatientTypeFilter(v as PatientTypeFilter)}>
                  <SelectTrigger className="border-slate-200 w-full">
                    <SelectValue placeholder="Patient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="new">New Visit</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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

        {viewMode === "list" && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Patient</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">UHID / Appointment</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Time</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Type</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Reason</th>
                      <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Status</th>
                      <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                              {apt.patientName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{apt.patientName}</p>
                              <p className="text-xs text-slate-500">{apt.age} yrs • {apt.gender}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-700">{apt.uhid}</p>
                          <p className="text-xs text-slate-500">{apt.appointmentNo}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{apt.time}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700 capitalize">
                            {apt.patientType}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 truncate max-w-[200px] block">{apt.reason}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusBadge(apt.status)}>{apt.status.replace("-", " ")}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => toggleActionMenu(apt.id, e)}
                              className="text-slate-500 hover:text-slate-700"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                            {actionMenuOpen === apt.id && (
                              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 min-w-[180px]">
                                <button
                                  onClick={() => handleViewDetails(apt)}
                                  className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 rounded-t-lg"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleStartConsultation(apt)}
                                  disabled={apt.status === "completed"}
                                  className={cn(
                                    "w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 rounded-b-lg",
                                    apt.status === "completed"
                                      ? "text-slate-400 cursor-not-allowed bg-slate-50"
                                      : "text-blue-600 hover:bg-blue-50"
                                  )}
                                >
                                  <Play className="w-4 h-4" />
                                  {apt.status === "checked-in" ? "Continue Consultation" : "Start Consultation"}
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredAppointments.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No appointments found</h3>
                  <p className="text-slate-500">Try adjusting your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAppointments.map((apt) => (
              <Card key={apt.id} className="hover:shadow-lg transition-all duration-300 relative" ref={actionMenuRef}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {apt.patientName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-base truncate">{apt.patientName}</h3>
                        <p className="text-xs text-slate-500 truncate">{apt.age} yrs • {apt.gender}</p>
                      </div>
                    </div>
                    <Badge className={getStatusBadge(apt.status)}>{apt.status.replace("-", " ")}</Badge>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">UHID</span>
                      <span className="font-medium text-slate-700 truncate max-w-[160px]">{apt.uhid}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Appointment</span>
                      <span className="font-medium text-slate-700 truncate max-w-[160px]">{apt.appointmentNo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Time</span>
                      <span className="font-medium text-slate-700">{apt.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Type</span>
                      <span className="font-medium text-slate-700 capitalize">{apt.patientType}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <Button
                      variant="outline"
                      onClick={(e) => toggleActionMenu(apt.id, e)}
                      className="w-full border-slate-200 justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <MoreVertical className="w-4 h-4" />
                        Actions
                      </span>
                      <ChevronLeft className={cn("w-4 h-4 transition-transform", actionMenuOpen === apt.id && "rotate-90")} />
                    </Button>
                    {actionMenuOpen === apt.id && (
                      <div className="absolute inset-x-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
                        <button
                          onClick={() => handleViewDetails(apt)}
                          className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-b border-slate-100"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleStartConsultation(apt)}
                          disabled={apt.status === "completed"}
                          className={cn(
                            "w-full px-4 py-3 text-left text-sm flex items-center gap-2",
                            apt.status === "completed"
                              ? "text-slate-400 cursor-not-allowed bg-slate-50"
                              : "text-blue-600 hover:bg-blue-50"
                          )}
                        >
                          <Play className="w-4 h-4" />
                          {apt.status === "checked-in" ? "Continue Consultation" : "Start Consultation"}
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <PatientDetailsDialog
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          patient={viewingPatient}
          onStartConsultation={() => viewingPatient && handleStartConsultation(viewingPatient)}
        />
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