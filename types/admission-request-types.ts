// types/admission-request-types.ts
export type RequestStatus = "Pending Review" | "Approved" | "Rejected";
export type RequestPriority = "Low" | "Medium" | "High";

export interface AdmissionRequestRecord {
  requestId: string;
  requestDateTime: string;
  patientName: string;
  uhid: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  department: string;
  attendingDoctor: string;
  requestedByLocation: string;
  requestedByDoctor: string;
  requestStatus: RequestStatus;
  priority: RequestPriority;
}

export interface AttachedDocument {
  fileName: string;
  fileSizeLabel: string;
  fileType: "pdf" | "image" | "doc";
  url: string;
}

export interface AdmissionRequestDetail extends AdmissionRequestRecord {
  mobile: string;
  email: string;
  address: string;
  requestedFor: string;
  provisionalDiagnosis: string;
  symptoms: string;
  referredFrom: string;
  clinicalRemarks: string;
  preferredWardType: string;
  preferredBedType: string;
  preferredFloor: string;
  specialRequest: string;
  documents: AttachedDocument[];
}