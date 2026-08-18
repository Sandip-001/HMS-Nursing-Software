
export interface ComprehensiveAssessmentForm {
  patientUnderstandingOfHealth: string;
  patientGoal: string;
  levelOfConsciousness: string;
  orientedTime: boolean;
  orientedPlace: boolean;
  orientedPerson: boolean;
  cognitiveStatus: string;
  breathingPattern: string;
  useOfAccessoryMuscles: boolean;
  breathSounds: string;
  heartSounds: string;
  peripheralPulses: string;
  capillaryRefill: string;
  appetite: string;
  nauseaVomiting: boolean;
  lastBowelMovement: string;
  urineOutput: string;
  urinaryPattern: string;
  catheter: boolean;
  skinCondition: string;
  pressureArea: boolean;
  mobilityLevel: string;
  assistiveDevice: string;
  activityTolerance: string;
  moodAffect: string;
  anxietyLevel: string;
  supportSystem: string;
  nursingDiagnosis: string[];
  nursingInterventions: string;
}

export interface PainComfortAssessmentForm {
  painPresent: boolean;
  painLocation: string;
  painIntensity: string;
  painCharacter: string;
  painOnset: string;
  painDuration: string;
  aggravatingFactors: string;
  relievingFactors: string;
  nonVerbalPainIndicators: string;
  currentAnalgesia: string;
  analgesiaEffectiveness: string;
  sleepQuality: string;
  comfortMeasuresProvided: string;
  patientSatisfactionWithPainControl: string;
  reassessmentRequired: boolean;
}

export interface BradenScaleForm {
  sensoryPerception: string;
  moisture: string;
  activity: string;
  mobility: string;
  nutrition: string;
  frictionShear: string;
}

export interface MorseFallScaleForm {
  historyOfFalling: string;
  secondaryDiagnosis: string;
  ambulatoryAid: string;
  ivHeparinLock: string;
  gait: string;
  mentalStatus: string;
}