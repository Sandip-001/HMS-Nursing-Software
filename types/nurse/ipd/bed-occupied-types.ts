
export type BedOccupiedStatus = "Stable" | "Observation" | "Critical";
export type AssessmentStatus = "Pending" | "Completed";

export interface BedOccupiedPatient {
  id: string;
  admissionId: string;
  uhid: string;
  patientName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  ward: string;
  room: string;
  bed: string;
  department: string;
  admittingDoctor: string;
  occupiedOn: string;
  status: BedOccupiedStatus;
  occupiedBy: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  packageName: string;
  initialAssessment: AssessmentStatus;
  vitalsRecording: AssessmentStatus;
  nursingAssessment: AssessmentStatus;
}