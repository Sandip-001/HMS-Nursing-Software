
export type DiagnosisType = "Clinical" | "Co-morbidity" | "Past History" | "Provisional";
export type DiagnosisStatus = "Active" | "Resolved" | "Ruled Out";

export interface CurrentDiagnosis {
  id: string;
  diagnosis: string;
  isPrimary: boolean;
  type: DiagnosisType;
  diagnosedOn: string;
  status: DiagnosisStatus;
  icd10?: string;
  notes?: string;
}

export interface ResolvedDiagnosis {
  id: string;
  diagnosis: string;
  type: DiagnosisType;
  diagnosedOn: string;
  resolvedOn: string;
}

export interface DiagnosisPageData {
  currentDiagnoses: CurrentDiagnosis[];
  resolvedDiagnoses: ResolvedDiagnosis[];
  clinicalImpression: string;
}