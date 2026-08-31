// app/(dashboard)/admission/ipd/pending-admissions/page.tsx
"use client";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Clock, AlertCircle, Edit2, Trash2, Search, Grid2X2, LayoutList, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DraftAdmission } from "@/types/admission-desk/ipd/ipd-admission-types";
import { DRAFT_ADMISSIONS } from "@/lib/admission-desk/ipd/ipd-admission-data";

type ViewMode = "table" | "grid";

export default function IPDPendingAdmissionsPage() {
  const router = useRouter();
  const [drafts] = useState<DraftAdmission[]>(DRAFT_ADMISSIONS);
  const [view, setView] = useState<ViewMode>("table");
  const [search, setSearch] = useState("");
  const [filterSection, setFilterSection] = useState<string>("All");

  const filteredDrafts = useMemo(() => {
    return drafts.filter((draft) => {
      const query = search.toLowerCase();
      const matchesSearch = !query || 
        `${draft.patient.firstName} ${draft.patient.lastName}`.toLowerCase().includes(query) ||
        draft.patient.mobileNumber?.includes(query);
      const matchesSection = filterSection === "All" || 
        draft.completedSections.includes(filterSection);
      return matchesSearch && matchesSection;
    });
  }, [drafts, search, filterSection]);

  const stats = useMemo(() => {
    return {
      total: drafts.length,
      patientDetails: drafts.filter(d => d.completedSections.includes("Patient Details")).length,
      department: drafts.filter(d => d.completedSections.includes("Department")).length,
      package: drafts.filter(d => d.completedSections.includes("Package")).length,
    };
  }, [drafts]);

  function continueAdmission(draftId: string) {
    router.push(`/admission/ipd/new-registration?draft=${draftId}`);
  }

  function deleteDraft(draftId: string) {
    if (confirm("Are you sure you want to delete this draft?")) {
      // Delete logic here
      console.log("Deleting draft:", draftId);
    }
  }

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setFilterSection("All");
  }, []);

  const hasActiveFilters = search || filterSection !== "All";

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Pending Admissions</h1>
            <p className="text-sm text-slate-500 mt-1">Draft admissions waiting to be completed</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PremiumStatCard 
            icon={<FileText className="h-5 w-5" />} 
            label="Total Drafts" 
            value={String(stats.total)} 
            subtitle="Pending admissions" 
            gradient="from-amber-500 to-orange-500"
          />
          <PremiumStatCard 
            icon={<Clock className="h-5 w-5" />} 
            label="Patient Details" 
            value={String(stats.patientDetails)} 
            subtitle="Details filled" 
            gradient="from-blue-500 to-cyan-500"
          />
          <PremiumStatCard 
            icon={<AlertCircle className="h-5 w-5" />} 
            label="Department Selected" 
            value={String(stats.department)} 
            subtitle="Department chosen" 
            gradient="from-emerald-500 to-teal-500"
          />
          <PremiumStatCard 
            icon={<Edit2 className="h-5 w-5" />} 
            label="Package Selected" 
            value={String(stats.package)} 
            subtitle="Package chosen" 
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        {/* Filters */}
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
              <div className="relative md:col-span-3 group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  className="h-12 pl-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by patient name or mobile..."
                />
              </div>
              <Select value={filterSection} onValueChange={setFilterSection}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-full">
                  <SelectValue placeholder="Filter by section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Sections</SelectItem>
                  <SelectItem value="Patient Details">Patient Details</SelectItem>
                  <SelectItem value="Department">Department</SelectItem>
                  <SelectItem value="Package">Package</SelectItem>
                  <SelectItem value="Payment">Payment</SelectItem>
                  <SelectItem value="Bed Allocation">Bed Allocation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-800">{filteredDrafts.length}</span> pending admissions
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

        {/* Drafts List */}
        {view === "table" ? (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Patient</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Mobile</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Department</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Last Updated</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Progress</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{draft.patient.firstName} {draft.patient.lastName}</p>
                      <p className="text-xs text-slate-400">Age: {draft.patient.age} · {draft.patient.gender}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{draft.patient.mobileNumber}</td>
                    <td className="py-3 px-4">
                      {draft.department ? (
                        <Badge className="bg-blue-50 text-blue-700">{draft.department}</Badge>
                      ) : (
                        <span className="text-xs text-slate-400">Not selected</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{draft.lastUpdated}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${(draft.completedSections.length / 6) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{draft.completedSections.length}/6</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => continueAdmission(draft.id)}>
                          <Edit2 className="mr-1 h-3 w-3" /> Continue
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteDraft(draft.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrafts.map((draft) => (
              <DraftCard key={draft.id} draft={draft} onContinue={() => continueAdmission(draft.id)} onDelete={() => deleteDraft(draft.id)} />
            ))}
          </div>
        )}

        {filteredDrafts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No pending admissions found</p>
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


function DraftCard({ draft, onContinue, onDelete }: { draft: DraftAdmission; onContinue: () => void; onDelete: () => void }) {
  const progress = (draft.completedSections.length / 6) * 100;

  const firstName = draft.patient.firstName ?? "";
  
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
              {firstName[0] || "?"}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{draft.patient.firstName} {draft.patient.lastName}</p>
              <p className="text-xs text-slate-400">{draft.patient.mobileNumber}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
            Draft
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Progress:</span>
            <span className="font-medium text-slate-700">{draft.completedSections.length}/6 sections</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {draft.completedSections.map((section, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                {section}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onContinue}>
            <Edit2 className="mr-2 h-4 w-4" /> Continue
          </Button>
          <Button variant="outline" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}