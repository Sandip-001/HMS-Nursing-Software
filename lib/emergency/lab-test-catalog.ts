// lib/emergency/lab-test-catalog.ts
export type LabCategory = "Pathology" | "Radiology";

export interface LabTestItem {
  id: string;
  code: string;
  name: string;
  category: LabCategory;
  description?: string;
}

export const LAB_TEST_CATALOG: LabTestItem[] = [
  // Pathology tests
  { id: "PATH-001", code: "CBC", name: "Complete Blood Count (CBC)", category: "Pathology", description: "Hemoglobin, RBC, WBC, Platelets" },
  { id: "PATH-002", code: "LFT", name: "Liver Function Test (LFT)", category: "Pathology", description: "SGOT, SGPT, Bilirubin, Albumin" },
  { id: "PATH-003", code: "KFT", name: "Kidney Function Test (KFT)", category: "Pathology", description: "Urea, Creatinine, Electrolytes" },
  { id: "PATH-004", code: "TROP", name: "Troponin I (Stat)", category: "Pathology", description: "Cardiac biomarker for MI" },
  { id: "PATH-005", code: "BNP", name: "BNP / NT-proBNP", category: "Pathology", description: "Heart failure marker" },
  { id: "PATH-006", code: "D-DIM", name: "D-Dimer", category: "Pathology", description: "Thrombosis/PE marker" },
  { id: "PATH-007", code: "ABG", name: "Arterial Blood Gas (ABG)", category: "Pathology", description: "pH, pCO2, pO2, HCO3" },
  { id: "PATH-008", code: "HBA1C", name: "HbA1c", category: "Pathology", description: "Glycated hemoglobin" },
  { id: "PATH-009", code: "LIPID", name: "Lipid Profile", category: "Pathology", description: "Cholesterol, TG, HDL, LDL" },
  { id: "PATH-010", code: "TSH", name: "TSH", category: "Pathology", description: "Thyroid stimulating hormone" },
  { id: "PATH-011", code: "CRP", name: "C-Reactive Protein (CRP)", category: "Pathology", description: "Inflammatory marker" },
  { id: "PATH-012", code: "PROCAL", name: "Procalcitonin", category: "Pathology", description: "Sepsis marker" },
  { id: "PATH-013", code: "AMYL", name: "Serum Amylase", category: "Pathology", description: "Pancreatic enzyme" },
  { id: "PATH-014", code: "LIPASE", name: "Serum Lipase", category: "Pathology", description: "Pancreatic enzyme" },
  { id: "PATH-015", code: "PT/APTT", name: "PT / aPTT", category: "Pathology", description: "Coagulation profile" },
  { id: "PATH-016", code: "FERR", name: "Serum Ferritin", category: "Pathology", description: "Iron stores" },
  { id: "PATH-017", code: "VB12", name: "Vitamin B12", category: "Pathology", description: "Cobalamin level" },
  { id: "PATH-018", code: "VD", name: "Vitamin D (25-OH)", category: "Pathology", description: "Calciferol level" },
  { id: "PATH-019", code: "MALARIA", name: "Malaria Antigen", category: "Pathology", description: "Rapid test for malaria" },
  { id: "PATH-020", code: "DENGUE", name: "Dengue NS1 / IgM", category: "Pathology", description: "Dengue fever markers" },
  { id: "PATH-021", code: "TYPI", name: "Typhoid IgM", category: "Pathology", description: "Enteric fever marker" },
  { id: "PATH-022", code: "HIV", name: "HIV 1 & 2 (Rapid)", category: "Pathology", description: "Screening test" },
  { id: "PATH-023", code: "HBsAG", name: "HBsAg", category: "Pathology", description: "Hepatitis B surface antigen" },
  { id: "PATH-024", code: "HCV", name: "Anti-HCV", category: "Pathology", description: "Hepatitis C antibody" },
  { id: "PATH-025", code: "URINE", name: "Urine Routine & Microscopy", category: "Pathology", description: "Physical, chemical, microscopic" },
  { id: "PATH-026", code: "STOOL", name: "Stool Routine", category: "Pathology", description: "Physical, chemical, microscopic" },
  { id: "PATH-027", code: "CSF", name: "CSF Analysis", category: "Pathology", description: "Cell count, protein, glucose" },
  { id: "PATH-028", code: "TOXI", name: "Toxicology Screen", category: "Pathology", description: "Drug/poison detection" },

  // Radiology tests
  { id: "RAD-001", code: "CXR", name: "Chest X-Ray (Portable)", category: "Radiology", description: "AP/Lateral view" },
  { id: "RAD-002", code: "XR-ABD", name: "X-Ray Abdomen (Erect)", category: "Radiology", description: "For obstruction/perforation" },
  { id: "RAD-003", code: "XR-PEL", name: "X-Ray Pelvis", category: "Radiology", description: "AP view" },
  { id: "RAD-004", code: "XR-SKULL", name: "X-Ray Skull", category: "Radiology", description: "AP/Lateral view" },
  { id: "RAD-005", code: "USG-ABD", name: "USG Abdomen", category: "Radiology", description: "Liver, GB, pancreas, spleen, kidneys" },
  { id: "RAD-006", code: "USG-PEL", name: "USG Pelvis", category: "Radiology", description: "Uterus, ovaries, bladder" },
  { id: "RAD-007", code: "USG-WHOLE", name: "USG Whole Abdomen", category: "Radiology", description: "Comprehensive abdominal scan" },
  { id: "RAD-008", code: "FAST", name: "FAST Scan", category: "Radiology", description: "Trauma abdomen scan" },
  { id: "RAD-009", code: "ECHO", name: "Echocardiography", category: "Radiology", description: "Cardiac structure and function" },
  { id: "RAD-010", code: "CT-HEAD", name: "CT Head (Non-contrast)", category: "Radiology", description: "For stroke/trauma" },
  { id: "RAD-011", code: "CT-HEAD-C", name: "CT Head (Contrast)", category: "Radiology", description: "With IV contrast" },
  { id: "RAD-012", code: "CT-CHEST", name: "CT Chest", category: "Radiology", description: "Lung parenchyma, mediastinum" },
  { id: "RAD-013", code: "CT-ABD", name: "CT Abdomen", category: "Radiology", description: "Abdominal organs" },
  { id: "RAD-014", code: "CT-PEL", name: "CT Pelvis", category: "Radiology", description: "Pelvic organs" },
  { id: "RAD-015", code: "CT-WHOLE", name: "CT Whole Body", category: "Radiology", description: "Polytrauma protocol" },
  { id: "RAD-016", code: "MRI-BRAIN", name: "MRI Brain", category: "Radiology", description: "Brain parenchyma" },
  { id: "RAD-017", code: "MRI-SPINE", name: "MRI Spine", category: "Radiology", description: "Cervical/Thoracic/Lumbar" },
  { id: "RAD-018", code: "MRI-ABD", name: "MRI Abdomen", category: "Radiology", description: "Abdominal organs" },
  { id: "RAD-019", code: "CT-ANGIO", name: "CT Angiography", category: "Radiology", description: "Vascular imaging" },
  { id: "RAD-020", code: "CT-CTPA", name: "CT Pulmonary Angiography (CTPA)", category: "Radiology", description: "For pulmonary embolism" },
];

export function getLabTestsByCategory(category: LabCategory) {
  return LAB_TEST_CATALOG.filter((t) => t.category === category);
}