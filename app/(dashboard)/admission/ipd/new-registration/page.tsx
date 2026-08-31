// app/(dashboard)/admission/ipd/new-registration/page.tsx
"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, User, Stethoscope, Package, CreditCard, BedDouble, CheckCircle, ArrowRight, ArrowLeft, Upload, X, Phone, Mail, MapPin, Calendar, FileText, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DOCTORS, PACKAGES, WARDS, EXISTING_PATIENTS, generateUHID, generateIPDId } from "@/lib/admission-desk/ipd/ipd-admission-data";
import type { Patient, Doctor, PackageIPD, Ward, Bed, IPDPatient } from "@/types/admission-desk/ipd/ipd-admission-types";

type Step = "search" | "patient" | "department" | "package" | "payment" | "bed" | "review";

export default function IPDNewRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft");
  const requestId = searchParams.get("request");

  const [currentStep, setCurrentStep] = useState<Step>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IPDPatient[]>([]);
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<IPDPatient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<PackageIPD | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("Self Pay");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [showAyushmanModal, setShowAyushmanModal] = useState(false);
  const [ayushmanNumber, setAyushmanNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedUHID, setGeneratedUHID] = useState("");
  const [generatedIPDId, setGeneratedIPDId] = useState("");

  // Form state
  const [formData, setFormData] = useState<Partial<Patient>>({
    firstName: "", middleName: "", lastName: "", dateOfBirth: "", age: 0,
    gender: "Male", mobileNumber: "", alternativeMobile: "", email: "",
    address: "", state: "", city: "", pinCode: "", aadharNumber: "",
  });

  // Filter doctors by selected department
  const filteredDoctors = useMemo(() => {
    if (!selectedDepartment) return DOCTORS;
    return DOCTORS.filter(doc => doc.department === selectedDepartment);
  }, [selectedDepartment]);

  // Get unique departments
  const departments = useMemo(() => {
    return Array.from(new Set(DOCTORS.map(doc => doc.department)));
  }, []);

  // Search existing patients
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = EXISTING_PATIENTS.filter(p =>
        p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mobileNumber.includes(searchQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Auto-calculate age
  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const finalAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
      setFormData(prev => ({ ...prev, age: finalAge }));
    }
  }, [formData.dateOfBirth]);

  function handleSearchSelect(patient: IPDPatient) {
    setSelectedPatient(patient);
    setFormData({
      firstName: patient.firstName,
      middleName: patient.middleName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      age: patient.age,
      gender: patient.gender,
      mobileNumber: patient.mobileNumber,
      alternativeMobile: patient.alternativeMobile,
      email: patient.email,
      address: patient.address,
      state: patient.state,
      city: patient.city,
      pinCode: patient.pinCode,
      aadharNumber: patient.aadharNumber,
    });
    setIsNewPatient(false);
    setCurrentStep("patient");
  }

  function handleAyushmanSearch() {
    // Mock Ayushman Bharat lookup with realistic data
    if (ayushmanNumber.length >= 4) {
      setFormData({
        firstName: "Rajesh", 
        middleName: "Kumar",
        lastName: "Verma", 
        age: 52, 
        gender: "Male",
        dateOfBirth: "1974-03-15",
        address: "45, Mahatma Gandhi Road, Near City Hospital",
        state: "Karnataka", 
        city: "Bangalore",
        pinCode: "560001", 
        aadharNumber: "4521-8796-3214",
        mobileNumber: "9845123677",
        email: "rajesh.verma@email.com",
      });
      setShowAyushmanModal(false);
      setAyushmanNumber("");
    }
  }

  function handleSubmit() {
    const uhid = generateUHID();
    const ipdId = generateIPDId();
    setGeneratedUHID(uhid);
    setGeneratedIPDId(ipdId);
    setShowSuccessModal(true);
  }

  function handleContinueToDashboard() {
    setShowSuccessModal(false);
    router.push("/admission/ipd/all-patients");
  }

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: "search", label: "Search", icon: <Search className="h-4 w-4" /> },
    { id: "patient", label: "Patient Details", icon: <User className="h-4 w-4" /> },
    { id: "department", label: "Department", icon: <Stethoscope className="h-4 w-4" /> },
    { id: "package", label: "Package", icon: <Package className="h-4 w-4" /> },
    { id: "payment", label: "Payment", icon: <CreditCard className="h-4 w-4" /> },
    { id: "bed", label: "Bed Allocation", icon: <BedDouble className="h-4 w-4" /> },
    { id: "review", label: "Review", icon: <CheckCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">New IPD Admission</h1>
            <p className="text-sm text-slate-500 mt-1">Complete the admission process step by step</p>
          </div>
          <Button variant="outline" onClick={() => router.back()} className="border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1 min-w-max">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                currentStep === step.id ? "bg-blue-50 text-blue-700" : "text-slate-400"
              }`}>
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  currentStep === step.id ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" : "bg-slate-200 text-slate-500"
                }`}>
                  {idx + 1}
                </div>
                <span className="text-sm font-semibold hidden sm:inline">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  steps.findIndex(s => s.id === currentStep) > idx ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-slate-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-slate-200 shadow-xl">
          <CardContent className="p-8">
            {currentStep === "search" && (
              <SearchStep
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                isNewPatient={isNewPatient}
                setIsNewPatient={setIsNewPatient}
                onSearchSelect={handleSearchSelect}
                onNext={() => setCurrentStep("patient")}
              />
            )}

            {currentStep === "patient" && (
              <PatientStep
                formData={formData}
                setFormData={setFormData}
                showAyushmanModal={showAyushmanModal}
                setShowAyushmanModal={setShowAyushmanModal}
                ayushmanNumber={ayushmanNumber}
                setAyushmanNumber={setAyushmanNumber}
                handleAyushmanSearch={handleAyushmanSearch}
                onNext={() => setCurrentStep("department")}
                onBack={() => setCurrentStep("search")}
              />
            )}

            {currentStep === "department" && (
              <DepartmentStep
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                filteredDoctors={filteredDoctors}
                departments={departments}
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                onNext={() => setCurrentStep("package")}
                onBack={() => setCurrentStep("patient")}
              />
            )}

            {currentStep === "package" && (
              <PackageStep
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                onNext={() => setCurrentStep("payment")}
                onBack={() => setCurrentStep("department")}
              />
            )}

            {currentStep === "payment" && (
              <PaymentStep
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                insuranceNumber={insuranceNumber}
                setInsuranceNumber={setInsuranceNumber}
                onNext={() => setCurrentStep("bed")}
                onBack={() => setCurrentStep("package")}
              />
            )}

            {currentStep === "bed" && (
              <BedStep
                selectedWard={selectedWard}
                setSelectedWard={setSelectedWard}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                selectedBed={selectedBed}
                setSelectedBed={setSelectedBed}
                onNext={() => setCurrentStep("review")}
                onBack={() => setCurrentStep("payment")}
              />
            )}

            {currentStep === "review" && (
              <ReviewStep
                formData={formData}
                selectedDepartment={selectedDepartment}
                selectedDoctor={selectedDoctor}
                selectedPackage={selectedPackage}
                paymentMethod={paymentMethod}
                selectedWard={selectedWard}
                selectedRoom={selectedRoom}
                selectedBed={selectedBed}
                onSubmit={handleSubmit}
                onBack={() => setCurrentStep("bed")}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ayushman Modal */}
      <Dialog open={showAyushmanModal} onOpenChange={setShowAyushmanModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Ayushman Bharat Card
            </DialogTitle>
            <DialogDescription>Enter card number to auto-fill patient details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Ayushman Bharat Card Number</Label>
              <Input
                value={ayushmanNumber}
                onChange={(e) => setAyushmanNumber(e.target.value)}
                placeholder="Enter 12-digit card number"
                className="h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAyushmanModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleAyushmanSearch} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-lg">
          <div className="text-center py-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Admission Successful!</h2>
            <p className="text-slate-500 mb-6">Patient has been successfully admitted to IPD</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">UHID</p>
                <p className="text-lg font-bold text-blue-600 font-mono">{generatedUHID}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">IPD ID</p>
                <p className="text-lg font-bold text-emerald-600 font-mono">{generatedIPDId}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl mb-6">
              <p className="text-sm text-slate-600">
                <strong>Bed:</strong> {selectedWard} - {selectedRoom} - {selectedBed?.bedNumber}
              </p>
            </div>

            <Button 
              onClick={handleContinueToDashboard}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Continue to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Search Step Component
function SearchStep({ searchQuery, setSearchQuery, searchResults, isNewPatient, setIsNewPatient, onSearchSelect, onNext }: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  searchResults: IPDPatient[];
  isNewPatient: boolean;
  setIsNewPatient: (v: boolean) => void;
  onSearchSelect: (p: IPDPatient) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Search Existing Patient</h2>
        <p className="text-sm text-slate-500 mt-1">Search by name, UHID, Aadhar, OPD number, or mobile</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          className="h-14 pl-12 text-base border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter patient details to search..."
        />
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {searchResults.map((patient) => (
            <Card 
              key={patient.uhid} 
              className="cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all border-slate-200"
              onClick={() => onSearchSelect(patient)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {patient.firstName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{patient.firstName} {patient.lastName}</p>
                    <p className="text-xs text-slate-400">UHID: {patient.uhid} · {patient.age} yrs · {patient.gender}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchQuery.length >= 2 && searchResults.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No patients found matching "{searchQuery}"</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="newPatient"
            checked={isNewPatient}
            onChange={(e) => setIsNewPatient(e.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <Label htmlFor="newPatient" className="text-sm font-medium cursor-pointer">New Patient (Skip Search)</Label>
        </div>
        <Button 
          onClick={onNext} 
          disabled={!isNewPatient}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Next: Patient Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Patient Details Step
function PatientStep({ formData, setFormData, showAyushmanModal, setShowAyushmanModal, ayushmanNumber, setAyushmanNumber, handleAyushmanSearch, onNext, onBack }: {
  formData: Partial<Patient>;
  setFormData: (f: Partial<Patient>) => void;
  showAyushmanModal: boolean;
  setShowAyushmanModal: (v: boolean) => void;
  ayushmanNumber: string;
  setAyushmanNumber: (v: string) => void;
  handleAyushmanSearch: () => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const indianStates = ["Karnataka", "Maharashtra", "Tamil Nadu", "Delhi", "West Bengal", "Gujarat", "Rajasthan"];
  const majorCities: Record<string, string[]> = {
    "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Delhi": ["New Delhi"],
    "West Bengal": ["Kolkata", "Howrah"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Patient Details</h2>
          <p className="text-sm text-slate-500 mt-1">Enter patient personal information</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowAyushmanModal(true)}
          className="border-blue-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
        >
          <FileText className="mr-2 h-4 w-4" /> Fill via Ayushman Bharat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <Label className="text-sm font-semibold">First Name *</Label>
          <Input 
            value={formData.firstName} 
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Middle Name</Label>
          <Input 
            value={formData.middleName} 
            onChange={(e) => setFormData({...formData, middleName: e.target.value})}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Last Name *</Label>
          <Input 
            value={formData.lastName} 
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Date of Birth *</Label>
          <Input 
            type="date" 
            value={formData.dateOfBirth} 
            onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Age (Auto-calculated)</Label>
          <Input 
            value={formData.age} 
            disabled 
            className="h-11 bg-slate-50 border-slate-200"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Gender *</Label>
          <Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v as "Male" | "Female" | "Other"})}>
            <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold">Mobile Number *</Label>
          <Input 
            value={formData.mobileNumber} 
            onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
            maxLength={10}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Alternative Mobile</Label>
          <Input 
            value={formData.alternativeMobile} 
            onChange={(e) => setFormData({...formData, alternativeMobile: e.target.value})}
            maxLength={10}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Email</Label>
          <Input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="md:col-span-3">
          <Label className="text-sm font-semibold">Address *</Label>
          <Textarea 
            value={formData.address} 
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            rows={2}
            className="border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">State *</Label>
          <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v, city: ""})}>
            <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold">City *</Label>
          <Select value={formData.city} onValueChange={(v) => setFormData({...formData, city: v})}>
            <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {formData.state && majorCities[formData.state]?.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold">Pin Code *</Label>
          <Input 
            value={formData.pinCode} 
            onChange={(e) => setFormData({...formData, pinCode: e.target.value})}
            maxLength={6}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Aadhar Number</Label>
          <Input 
            value={formData.aadharNumber} 
            onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
            maxLength={12}
            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="md:col-span-2">
          <Label className="text-sm font-semibold">Aadhar Card Upload</Label>
          <div className="flex gap-2 mt-1">
            <Button variant="outline" size="sm" className="flex-1 border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">
              <Upload className="mr-2 h-4 w-4" /> Front
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">
              <Upload className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">Back</Button>
        <Button onClick={onNext} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Next: Department <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Department Step
function DepartmentStep({ selectedDepartment, setSelectedDepartment, filteredDoctors, departments, selectedDoctor, setSelectedDoctor, onNext, onBack }: {
  selectedDepartment: string;
  setSelectedDepartment: (v: string) => void;
  filteredDoctors: Doctor[];
  departments: string[];
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (d: Doctor | null) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Select Department & Doctor</h2>
        <p className="text-sm text-slate-500 mt-1">Choose the treating department and doctor</p>
      </div>

      <div className="mb-6">
        <Label className="text-sm font-semibold mb-2 block">Select Department</Label>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500">
            <SelectValue placeholder="Choose department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedDepartment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className={`cursor-pointer transition-all border-2 ${
                selectedDoctor?.id === doctor.id 
                  ? "border-blue-500 bg-blue-50 shadow-lg" 
                  : "border-slate-200 hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{doctor.name}</p>
                    <p className="text-sm text-blue-600 font-medium mt-1">{doctor.specialization}</p>
                    <p className="text-xs text-slate-400 mt-2">{doctor.qualification} · {doctor.experience} yrs exp</p>
                  </div>
                  {selectedDoctor?.id === doctor.id && (
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                {!doctor.available && (
                  <Badge variant="outline" className="mt-3 text-amber-700 border-amber-200 bg-amber-50">
                    Not Available
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!selectedDepartment && (
        <div className="text-center py-8 bg-slate-50 rounded-xl">
          <Stethoscope className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Please select a department to view available doctors</p>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">Back</Button>
        <Button onClick={onNext} disabled={!selectedDoctor} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Next: Package <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Package Step
function PackageStep({ selectedPackage, setSelectedPackage, onNext, onBack }: {
  selectedPackage: PackageIPD | null;
  setSelectedPackage: (p: PackageIPD | null) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Select Package</h2>
        <p className="text-sm text-slate-500 mt-1">Choose admission package based on requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PACKAGES.map((pkg) => (
          <Card
            key={pkg.id}
            className={`cursor-pointer transition-all border-2 hover:shadow-xl ${
              selectedPackage?.id === pkg.id 
                ? "border-blue-500 bg-blue-50 shadow-lg" 
                : "border-slate-200 hover:border-blue-300"
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-slate-800 text-lg">{pkg.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{pkg.description}</p>
                </div>
                {selectedPackage?.id === pkg.id && (
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <IndianRupee className="h-5 w-5 text-blue-600" />
                <p className="text-3xl font-bold text-blue-600">{pkg.price.toLocaleString()}</p>
                <span className="text-sm text-slate-500">/day</span>
              </div>
              <ul className="space-y-2">
                {pkg.facilities.slice(0, 4).map((facility, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {facility}
                  </li>
                ))}
                {pkg.facilities.length > 4 && (
                  <li className="text-xs text-slate-400 pl-3.5">+{pkg.facilities.length - 4} more facilities</li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">Back</Button>
        <Button onClick={onNext} disabled={!selectedPackage} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Next: Payment <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Payment Step
function PaymentStep({ paymentMethod, setPaymentMethod, insuranceNumber, setInsuranceNumber, onNext, onBack }: {
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  insuranceNumber: string;
  setInsuranceNumber: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Payment Method</h2>
        <p className="text-sm text-slate-500 mt-1">Select payment method for admission</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["Self Pay", "Ayushman Bharat", "TPA", "Health Insurance"].map((method) => (
          <Card
            key={method}
            className={`cursor-pointer transition-all border-2 ${
              paymentMethod === method 
                ? "border-blue-500 bg-blue-50 shadow-lg" 
                : "border-slate-200 hover:border-blue-300 hover:shadow-md"
            }`}
            onClick={() => setPaymentMethod(method)}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <input
                type="radio"
                checked={paymentMethod === method}
                onChange={() => {}}
                className="h-5 w-5 text-blue-600"
              />
              <div>
                <p className="font-semibold text-slate-800 text-lg">{method}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(paymentMethod === "TPA" || paymentMethod === "Health Insurance" || paymentMethod === "Ayushman Bharat") && (
        <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
          <Label className="text-sm font-semibold">{paymentMethod} Card/Policy Number</Label>
          <Input
            value={insuranceNumber}
            onChange={(e) => setInsuranceNumber(e.target.value)}
            placeholder={`Enter ${paymentMethod.toLowerCase()} number`}
            className="h-12 mt-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      )}

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">Back</Button>
        <Button 
          onClick={onNext} 
          disabled={!paymentMethod || (paymentMethod !== "Self Pay" && !insuranceNumber)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Next: Bed Allocation <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Bed Allocation Step
function BedStep({ selectedWard, setSelectedWard, selectedRoom, setSelectedRoom, selectedBed, setSelectedBed, onNext, onBack }: {
  selectedWard: string;
  setSelectedWard: (v: string) => void;
  selectedRoom: string;
  setSelectedRoom: (v: string) => void;
  selectedBed: Bed | null;
  setSelectedBed: (b: Bed | null) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const selectedWardData = WARDS.find(w => w.name === selectedWard);
  const selectedRoomData = selectedWardData?.rooms.find(r => r.name === selectedRoom);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Bed Allocation</h2>
        <p className="text-sm text-slate-500 mt-1">Select ward, room and bed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <Label className="text-sm font-semibold mb-2 block">Select Ward</Label>
          <Select value={selectedWard} onValueChange={(v) => { setSelectedWard(v); setSelectedRoom(""); setSelectedBed(null); }}>
            <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500">
              <SelectValue placeholder="Choose ward" />
            </SelectTrigger>
            <SelectContent>
              {WARDS.map(ward => (
                <SelectItem key={ward.id} value={ward.name}>{ward.name} ({ward.floor})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold mb-2 block">Select Room</Label>
          <Select value={selectedRoom} onValueChange={(v) => { setSelectedRoom(v); setSelectedBed(null); }} disabled={!selectedWard}>
            <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500">
              <SelectValue placeholder="Choose room" />
            </SelectTrigger>
            <SelectContent>
              {selectedWardData?.rooms.map(room => (
                <SelectItem key={room.id} value={room.name}>{room.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold mb-2 block">Select Bed</Label>
          <Select value={selectedBed?.bedNumber} onValueChange={(v) => {
            const bed = selectedRoomData?.beds.find(b => b.bedNumber === v);
            setSelectedBed(bed || null);
          }} disabled={!selectedRoom}>
            <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500">
              <SelectValue placeholder="Choose bed" />
            </SelectTrigger>
            <SelectContent>
              {selectedRoomData?.beds.map(bed => (
                <SelectItem key={bed.id} value={bed.bedNumber} disabled={bed.status !== "Available"}>
                  {bed.bedNumber} - {bed.status === "Available" ? `₹${bed.price}/day` : bed.status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedRoomData && (
        <div className="mt-6">
          <Label className="text-sm font-semibold mb-3 block">Available Beds</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedRoomData.beds.map((bed) => (
              <Card
                key={bed.id}
                className={`cursor-pointer transition-all border-2 ${
                  selectedBed?.id === bed.id 
                    ? "border-blue-500 bg-blue-50 shadow-lg" 
                    : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                } ${bed.status === "Occupied" ? "opacity-50 cursor-not-allowed" : ""} ${bed.status === "Maintenance" ? "bg-red-50 border-red-200" : ""}`}
                onClick={() => bed.status === "Available" && setSelectedBed(bed)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-800">{bed.bedNumber}</p>
                    <Badge variant="outline" className={`text-xs ${
                      bed.status === "Available" ? "text-emerald-700 border-emerald-200 bg-emerald-50" :
                      bed.status === "Occupied" ? "text-red-700 border-red-200 bg-red-50" :
                      "text-amber-700 border-amber-200 bg-amber-50"
                    }`}>
                      {bed.status}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <IndianRupee className="h-4 w-4 text-blue-600" />
                    <p className="text-xl font-bold text-blue-600">{bed.price.toLocaleString()}</p>
                    <span className="text-xs text-slate-500">/day</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!selectedWard && (
        <div className="text-center py-8 bg-slate-50 rounded-xl">
          <BedDouble className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Please select a ward to view available beds</p>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">Back</Button>
        <Button onClick={onNext} disabled={!selectedBed} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Next: Review <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Review Step
function ReviewStep({ formData, selectedDepartment, selectedDoctor, selectedPackage, paymentMethod, selectedWard, selectedRoom, selectedBed, onSubmit, onBack }: {
  formData: Partial<Patient>;
  selectedDepartment: string;
  selectedDoctor: Doctor | null;
  selectedPackage: PackageIPD | null;
  paymentMethod: string;
  selectedWard: string;
  selectedRoom: string;
  selectedBed: Bed | null;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Review & Submit</h2>
        <p className="text-sm text-slate-500 mt-1">Verify all details before submission</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-5 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Patient Details</h3>
          </div>
          <InfoRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
          <InfoRow label="Age/Gender" value={`${formData.age} yrs / ${formData.gender}`} />
          <InfoRow label="Mobile" value={formData.mobileNumber || "N/A"} />
          <InfoRow label="Address" value={`${formData.address}, ${formData.city}, ${formData.state}`} />
        </div>

        <div className="space-y-4 p-5 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Admission Details</h3>
          </div>
          <InfoRow label="Department" value={selectedDepartment} />
          <InfoRow label="Doctor" value={selectedDoctor?.name || "N/A"} />
          <InfoRow label="Package" value={selectedPackage?.name || "N/A"} />
          <InfoRow label="Price" value={`₹${selectedPackage?.price.toLocaleString()}/day` || "N/A"} />
        </div>

        <div className="space-y-4 p-5 bg-slate-50 rounded-xl md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Payment & Bed</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Payment Method" value={paymentMethod} />
            <InfoRow label="Ward" value={selectedWard} />
            <InfoRow label="Room" value={selectedRoom} />
            <InfoRow label="Bed" value={selectedBed?.bedNumber || "N/A"} />
            <InfoRow label="Bed Price" value={`₹${selectedBed?.price.toLocaleString()}/day` || "N/A"} />
          </div>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> By submitting, you confirm that all information provided is accurate. 
          UHID and IPD ID will be generated upon submission.
        </p>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={onBack} className="border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">Back</Button>
        <Button 
          onClick={onSubmit} 
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Submit Admission
        </Button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
  );
}