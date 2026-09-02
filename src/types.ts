export enum CCMADomain {
  CLINICAL_PATIENT_CARE = 'CLINICAL_PATIENT_CARE',
  FOUNDATIONAL_KNOWLEDGE = 'FOUNDATIONAL_KNOWLEDGE',
  CARE_COORDINATION_EDUCATION = 'CARE_COORDINATION_EDUCATION',
  ADMINISTRATIVE_ASSISTING = 'ADMINISTRATIVE_ASSISTING',
  COMMUNICATION = 'COMMUNICATION',
  MEDICAL_LAW_ETHICS = 'MEDICAL_LAW_ETHICS',
}

export interface DomainMeta {
  id: CCMADomain;
  name: string;
  shortName: string;
  weightPercent: number;
  description: string;
  color: string; // Tailwind color class / badge style
  accentColor: string;
  iconName: string;
}

export const DOMAIN_METADATA: Record<CCMADomain, DomainMeta> = {
  [CCMADomain.CLINICAL_PATIENT_CARE]: {
    id: CCMADomain.CLINICAL_PATIENT_CARE,
    name: 'Clinical Patient Care',
    shortName: 'Clinical Care',
    weightPercent: 56,
    description: 'Vitals, phlebotomy, EKG, injections, infection control, wound care, point-of-care testing & patient prep',
    color: 'emerald',
    accentColor: '#10b981',
    iconName: 'Stethoscope',
  },
  [CCMADomain.FOUNDATIONAL_KNOWLEDGE]: {
    id: CCMADomain.FOUNDATIONAL_KNOWLEDGE,
    name: 'Foundational Knowledge & Basic Science',
    shortName: 'Foundational Science',
    weightPercent: 14,
    description: 'Anatomy, physiology, organ systems, medical terminology, pharmacology calculations & pathophysiology',
    color: 'blue',
    accentColor: '#3b82f6',
    iconName: 'Brain',
  },
  [CCMADomain.CARE_COORDINATION_EDUCATION]: {
    id: CCMADomain.CARE_COORDINATION_EDUCATION,
    name: 'Patient Care Coordination & Education',
    shortName: 'Care Coordination',
    weightPercent: 9,
    description: 'Transition of care, preventative health screenings, patient compliance & lifestyle/diet education',
    color: 'purple',
    accentColor: '#8b5cf6',
    iconName: 'HeartHandshake',
  },
  [CCMADomain.ADMINISTRATIVE_ASSISTING]: {
    id: CCMADomain.ADMINISTRATIVE_ASSISTING,
    name: 'Administrative Assisting',
    shortName: 'Administrative',
    weightPercent: 8,
    description: 'Scheduling, ICD-10/CPT coding, billing, insurance precertification, EHR management & referrals',
    color: 'amber',
    accentColor: '#f59e0b',
    iconName: 'ClipboardList',
  },
  [CCMADomain.COMMUNICATION]: {
    id: CCMADomain.COMMUNICATION,
    name: 'Communication',
    shortName: 'Communication',
    weightPercent: 7,
    description: 'Therapeutic communication, active listening, de-escalation, overcoming barriers & interprofessional handoffs',
    color: 'cyan',
    accentColor: '#06b6d4',
    iconName: 'MessageSquare',
  },
  [CCMADomain.MEDICAL_LAW_ETHICS]: {
    id: CCMADomain.MEDICAL_LAW_ETHICS,
    name: 'Medical Law & Ethics',
    shortName: 'Law & Ethics',
    weightPercent: 6,
    description: 'HIPAA privacy/security, OSHA bloodborne pathogens, consent, scope of practice & mandatory reporting',
    color: 'rose',
    accentColor: '#f43f5e',
    iconName: 'ShieldAlert',
  },
};

export interface Question {
  id: string;
  domain: CCMADomain;
  subtopic: string;
  stem: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3
  rationale: string;
  isPretest?: boolean; // Unscored pretest question (mimicking NHA 30 pretest questions)
  clinicalConcept?: string;
}

export interface Flashcard {
  id: string;
  domain: CCMADomain;
  subtopic: string;
  term: string;
  definition: string;
  clinicalNote: string;
  tag: string;
  clinicalConcept?: string;
}

export enum ExamMode {
  FULL_EXAM = 'FULL_EXAM',
  PRACTICE_QUIZ = 'PRACTICE_QUIZ',
  CUSTOM_DRILL = 'CUSTOM_DRILL',
}

export interface ExamSessionState {
  isFullExam: boolean;
  mode: ExamMode;
  title: string;
  questions: Question[];
  currentIndex: number;
  selectedAnswers: Record<string, number>; // questionId -> selectedOptionIndex
  flaggedQuestions: Record<string, boolean>; // questionId -> boolean
  eliminatedOptions: Record<string, number[]>; // questionId -> array of option indexes eliminated
  timeRemainingSeconds: number;
  totalTimeAllocatedSeconds: number;
  isTimed: boolean;
  isPaused: boolean;
  instantFeedback: boolean;
  startedAt: number;
}

export interface DomainScoreSummary {
  domain: CCMADomain;
  total: number;
  correct: number;
  percentage: number;
}

export interface ExamResult {
  id: string;
  timestamp: number;
  title: string;
  mode: ExamMode;
  totalQuestions: number;
  totalScoredQuestions: number;
  rawCorrectScored: number;
  rawScorePercent: number;
  scaledScore: number; // 200 - 500 scale
  isPassed: boolean; // Passing score >= 390
  timeSpentSeconds: number;
  domainScores: Record<CCMADomain, DomainScoreSummary>;
  weakestDomain: CCMADomain;
  strongestDomain: CCMADomain;
  questions: Question[];
  userAnswers: Record<string, number>;
  flagged: Record<string, boolean>;
}

export interface UserStats {
  totalTestsTaken: number;
  totalQuestionsAnswered: number;
  averageScaledScore: number;
  highestScaledScore: number;
  passCount: number;
  failCount: number;
  recentAttempts: ExamResult[];
  flashcardMastery: Record<string, boolean>; // flashcardId -> mastered
  bookmarkedQuestionIds: string[];
}
