
import type {
  BradenScaleForm,
  ComprehensiveAssessmentForm,
  MorseFallScaleForm,
  PainComfortAssessmentForm,
} from "@/types/nurse/ipd/nursing-assessment-types";

export const DEFAULT_COMPREHENSIVE_ASSESSMENT: ComprehensiveAssessmentForm = {
  patientUnderstandingOfHealth: "Understands",
  patientGoal: "Wants to get well soon and return to normal life.",
  levelOfConsciousness: "Alert",
  orientedTime: true,
  orientedPlace: true,
  orientedPerson: true,
  cognitiveStatus: "Cooperative",
  breathingPattern: "Regular",
  useOfAccessoryMuscles: false,
  breathSounds: "Clear",
  heartSounds: "S1 S2 Normal",
  peripheralPulses: "Present",
  capillaryRefill: "< 2 sec",
  appetite: "Good",
  nauseaVomiting: false,
  lastBowelMovement: "2024-05-20T09:00",
  urineOutput: "Adequate",
  urinaryPattern: "Normal",
  catheter: false,
  skinCondition: "Intact",
  pressureArea: false,
  mobilityLevel: "Ambulatory with Assistance",
  assistiveDevice: "None",
  activityTolerance: "Tolerated Well",
  moodAffect: "Calm",
  anxietyLevel: "Mild",
  supportSystem: "Family",
  nursingDiagnosis: ["Acute Pain", "Risk for Infection"],
  nursingInterventions: "Monitored vitals, ensured comfort, explained plan of care, encouraged fluid intake.",
};

export const DEFAULT_PAIN_COMFORT_ASSESSMENT: PainComfortAssessmentForm = {
  painPresent: true,
  painLocation: "Chest",
  painIntensity: "3",
  painCharacter: "Dull",
  painOnset: "Gradual",
  painDuration: "Intermittent",
  aggravatingFactors: "Deep breathing, movement",
  relievingFactors: "Rest, prescribed analgesic",
  nonVerbalPainIndicators: "None observed",
  currentAnalgesia: "Tab. Paracetamol 650mg",
  analgesiaEffectiveness: "Effective",
  sleepQuality: "Good",
  comfortMeasuresProvided: "Repositioning, warm blanket, explained procedure",
  patientSatisfactionWithPainControl: "Satisfied",
  reassessmentRequired: true,
};

export const DEFAULT_BRADEN_SCALE: BradenScaleForm = {
  sensoryPerception: "3",
  moisture: "3",
  activity: "2",
  mobility: "3",
  nutrition: "3",
  frictionShear: "2",
};

export const DEFAULT_MORSE_FALL_SCALE: MorseFallScaleForm = {
  historyOfFalling: "0",
  secondaryDiagnosis: "15",
  ambulatoryAid: "0",
  ivHeparinLock: "20",
  gait: "10",
  mentalStatus: "0",
};

export const BRADEN_OPTIONS = {
  sensoryPerception: [
    { value: "1", label: "1 - Completely Limited" },
    { value: "2", label: "2 - Very Limited" },
    { value: "3", label: "3 - Slightly Limited" },
    { value: "4", label: "4 - No Impairment" },
  ],
  moisture: [
    { value: "1", label: "1 - Constantly Moist" },
    { value: "2", label: "2 - Very Moist" },
    { value: "3", label: "3 - Occasionally Moist" },
    { value: "4", label: "4 - Rarely Moist" },
  ],
  activity: [
    { value: "1", label: "1 - Bedfast" },
    { value: "2", label: "2 - Chairfast" },
    { value: "3", label: "3 - Walks Occasionally" },
    { value: "4", label: "4 - Walks Frequently" },
  ],
  mobility: [
    { value: "1", label: "1 - Completely Immobile" },
    { value: "2", label: "2 - Very Limited" },
    { value: "3", label: "3 - Slightly Limited" },
    { value: "4", label: "4 - No Limitation" },
  ],
  nutrition: [
    { value: "1", label: "1 - Very Poor" },
    { value: "2", label: "2 - Probably Inadequate" },
    { value: "3", label: "3 - Adequate" },
    { value: "4", label: "4 - Excellent" },
  ],
  frictionShear: [
    { value: "1", label: "1 - Problem" },
    { value: "2", label: "2 - Potential Problem" },
    { value: "3", label: "3 - No Apparent Problem" },
  ],
};

export const MORSE_OPTIONS = {
  historyOfFalling: [
    { value: "0", label: "No" },
    { value: "25", label: "Yes" },
  ],
  secondaryDiagnosis: [
    { value: "0", label: "No" },
    { value: "15", label: "Yes" },
  ],
  ambulatoryAid: [
    { value: "0", label: "None / Bed Rest / Nurse Assist" },
    { value: "15", label: "Crutches / Cane / Walker" },
    { value: "30", label: "Furniture" },
  ],
  ivHeparinLock: [
    { value: "0", label: "No" },
    { value: "20", label: "Yes" },
  ],
  gait: [
    { value: "0", label: "Normal / Bedrest / Immobile" },
    { value: "10", label: "Weak" },
    { value: "20", label: "Impaired" },
  ],
  mentalStatus: [
    { value: "0", label: "Oriented to Own Ability" },
    { value: "15", label: "Forgets Limitations" },
  ],
};