
export type ArrivalStatus = "Awaiting Acceptance" | "Accepted";

export interface WardArrivalPatient {
  id: string;
  admissionId: string;
  uhid: string;
  patientName: string;
  age: number;
  gender: string;
  ward: string;
  room: string;
  bed: string;
  department: string;
  admittingDoctor: string;
  arrivalStatus: ArrivalStatus;
  admissionDateTime: string;
  packageName: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
  alerts: string[];
  transferChecklist: {
    admissionConfirmed: boolean;
    depositReceived: boolean;
    bedAllocated: boolean;
    documentsVerified: boolean;
    wristbandGenerated: boolean;
    initialAssessmentPending: boolean;
  };
}