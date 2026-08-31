// app/(dashboard)/admission/ipd/department-requests/page.tsx
"use client";
import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Activity, AlertTriangle, Clock, TrendingUp, Search, Grid2X2, LayoutList, CheckCircle, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DepartmentRequest } from "@/types/admission-desk/ipd/ipd-admission-types";
import { DEPARTMENT_REQUESTS } from "@/lib/admission-desk/ipd/ipd-admission-data";

type ViewMode = "table" | "grid";

export default function IPDDepartmentRequestsPage() {
  const router = useRouter();
  const [requests] = useState<DepartmentRequest[]>(DEPARTMENT_REQUESTS);
  const [view, setView] = useState<ViewMode>("table");
  const [search, setSearch] = useState("");
  const [filterUrgency, setFilterUrgency] = useState<string>("All");
  const [filterDepartment, setFilterDepartment] = useState<string>("All");

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const query = search.toLowerCase();
      const firstName = req.patient.firstName ?? "";
      const lastName = req.patient.lastName ?? "";
      const matchesSearch = !query || 
        `${firstName} ${lastName}`.toLowerCase().includes(query) ||
        req.department.toLowerCase().includes(query);
      const matchesUrgency = filterUrgency === "All" || req.urgency === filterUrgency;
      const matchesDepartment = filterDepartment === "All" || req.department === filterDepartment;
      return matchesSearch && matchesUrgency && matchesDepartment;
    });
  }, [requests, search, filterUrgency, filterDepartment]);

  const stats = useMemo(() => {
    return {
      total: requests.length,
      emergency: requests.filter(r => r.urgency === "Emergency").length,
      urgent: requests.filter(r => r.urgency === "Urgent").length,
      routine: requests.filter(r => r.urgency === "Routine").length,
    };
  }, [requests]);

  function completeAdmission(requestId: string) {
    router.push(`/admission/ipd/new-registration?request=${requestId}`);
  }

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setFilterUrgency("All");
    setFilterDepartment("All");
  }, []);

  const hasActiveFilters = search || filterUrgency !== "All" || filterDepartment !== "All";

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Department Requests</h1>
            <p className="text-sm text-slate-500 mt-1">Admission requests from Emergency, ICU & OPD</p>
          </div>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PremiumStatCard 
            icon={<Activity className="h-5 w-5" />} 
            label="Total Requests" 
            value={String(stats.total)} 
            subtitle="All departments" 
            gradient="from-blue-500 to-cyan-500"
          />
          <PremiumStatCard 
            icon={<AlertTriangle className="h-5 w-5" />} 
            label="Emergency" 
            value={String(stats.emergency)} 
            subtitle="Critical cases" 
            gradient="from-red-500 to-rose-500"
          />
          <PremiumStatCard 
            icon={<Clock className="h-5 w-5" />} 
            label="Urgent" 
            value={String(stats.urgent)} 
            subtitle="Needs attention" 
            gradient="from-amber-500 to-orange-500"
          />
          <PremiumStatCard 
            icon={<TrendingUp className="h-5 w-5" />} 
            label="Routine" 
            value={String(stats.routine)} 
            subtitle="Normal priority" 
            gradient="from-emerald-500 to-teal-500"
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
                  placeholder="Search by patient name or department..."
                />
              </div>
              <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-full">
                  <SelectValue placeholder="Filter by urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Urgency</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Routine">Routine</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-full">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="OPD">OPD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-blue-600">{filteredRequests.length}</span> requests
          </p>
          <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setView("table")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all flex items-center gap-2 ${
                view === "table" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <LayoutList className="h-4 w-4" /> Table
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all flex items-center gap-2 ${
                view === "grid" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Grid2X2 className="h-4 w-4" /> Grid
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div key={`view-${view}`}>
          {view === "table" ? (
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-lg">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Patient</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Department</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Doctor</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Urgency</th>
                    <th className="text-left py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Requested At</th>
                    <th className="text-right py-4 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => {
                    const firstName = req.patient.firstName ?? "";
                    const lastName = req.patient.lastName ?? "";
                    const age = req.patient.age ?? 0;
                    const gender = req.patient.gender ?? "N/A";
                    const mobileNumber = req.patient.mobileNumber ?? "";
                    
                    return (
                      <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {firstName[0] || "?"}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{firstName} {lastName}</p>
                              <p className="text-xs text-slate-400">Age: {age} · {gender} · {mobileNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                            {req.department}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="h-4 w-4 text-slate-400" />
                            <span>{req.doctor.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <UrgencyBadge urgency={req.urgency} />
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600">{req.requestedAt}</td>
                        <td className="py-4 px-4 text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => completeAdmission(req.id)}
                            className="border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" /> Complete Admission
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRequests.map((req) => (
                <RequestCard 
                  key={req.id} 
                  request={req} 
                  onComplete={() => completeAdmission(req.id)} 
                />
              ))}
            </div>
          )}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-16">
            <Activity className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No department requests found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Premium Stat Card Component
function PremiumStatCard({ icon, label, value, subtitle, gradient }: { icon: React.ReactNode; label: string; value: string; subtitle: string; gradient: string }) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-xl shadow-slate-200/50 group hover:shadow-2xl transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mt-2">{value}</p>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg`}>
            {icon}
          </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
      </div>
    </Card>
  );
}

// Urgency Badge Component
function UrgencyBadge({ urgency }: { urgency: string }) {
  const config = {
    Emergency: { 
      className: "bg-red-50 text-red-700 border-red-200 font-medium",
      icon: <AlertTriangle className="h-3 w-3 mr-1" />
    },
    Urgent: { 
      className: "bg-amber-50 text-amber-700 border-amber-200 font-medium",
      icon: <Clock className="h-3 w-3 mr-1" />
    },
    Routine: { 
      className: "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium",
      icon: <TrendingUp className="h-3 w-3 mr-1" />
    },
  };
  
  const { className, icon } = config[urgency as keyof typeof config] || config.Routine;
  
  return (
    <Badge variant="outline" className={className}>
      {icon}
      {urgency}
    </Badge>
  );
}

function RequestCard({ request, onComplete }: { request: DepartmentRequest; onComplete: () => void }) {
   const firstName = request.patient.firstName ?? "";
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {firstName[0] || "?"}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{request.patient.firstName} {request.patient.lastName}</p>
              <p className="text-xs text-slate-400">{request.patient.age} yrs · {request.patient.gender}</p>
            </div>
          </div>
          <UrgencyBadge urgency={request.urgency} />
        </div>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Department:</span>
            <span className="font-medium text-slate-700">{request.department}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Doctor:</span>
            <span className="font-medium text-slate-700">{request.doctor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Requested:</span>
            <span className="font-medium text-slate-700">{request.requestedAt}</span>
          </div>
        </div>
        
        <Button variant="outline" className="w-full" onClick={onComplete}>
          <CheckCircle className="mr-2 h-4 w-4" /> Complete Admission
        </Button>
      </CardContent>
    </Card>
  );
}