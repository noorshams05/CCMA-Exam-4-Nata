import { CCMADomain, Question, DOMAIN_METADATA } from '../types';
import { CLINICAL_QUESTIONS } from './clinicalQuestions';
import { FOUNDATIONAL_QUESTIONS } from './foundationalQuestions';
import { CARE_COORDINATION_QUESTIONS } from './careCoordinationQuestions';
import { ADMIN_QUESTIONS } from './adminQuestions';
import { COMMUNICATION_QUESTIONS } from './communicationQuestions';
import { LAW_ETHICS_QUESTIONS } from './lawEthicsQuestions';

// Supplementary high-yield questions to ensure 180+ unique questions
const SUPPLEMENTARY_QUESTIONS: Question[] = [
  {
    id: 'supp-001',
    domain: CCMADomain.CLINICAL_PATIENT_CARE,
    subtopic: 'EKG Artifacts: Wandering Baseline',
    stem: 'An EKG tracing displays a wandering baseline where the waveforms drift up and down across the grid paper. Which of the following is the most common cause?',
    options: [
      'Tense skeletal muscle tremors',
      'Loose electrodes, dried electrolyte gel, or patient breathing heavily against skin tension',
      'Cell phone interference nearby',
      'Defective thermal printhead',
    ],
    correctIndex: 1,
    rationale: 'Wandering baseline is caused by poor electrode-to-skin contact, dried conduction gel, oils/lotions on the skin, or chest wall movement from deep respiration pulling on electrode wires.',
    clinicalConcept: 'EKG Wandering Baseline Causes',
  },
  {
    id: 'supp-002',
    domain: CCMADomain.CLINICAL_PATIENT_CARE,
    subtopic: 'Phlebotomy Complications: Syncope',
    stem: 'While a medical assistant is drawing blood, the patient becomes pale, lightheaded, and begins to lose consciousness (vasovagal syncope). What is the immediate sequence of steps?',
    options: [
      'Finish filling the tube quickly and ask the patient to sit up straight',
      'Release the tourniquet, withdraw the needle, activate safety device, apply pressure, support the patient’s head, and lower the head between the knees or recline into supine position',
      'Slap the patient gently on the cheeks to wake them up',
      'Offer hot coffee immediately',
    ],
    correctIndex: 1,
    rationale: 'At the first sign of syncope: stop the draw immediately (tourniquet off, needle out, engage safety), protect the patient from falling, place in supine position with legs elevated (or lower head between knees), and stay with them.',
    clinicalConcept: 'Vasovagal Syncope Protocol in Phlebotomy',
  },
  {
    id: 'supp-003',
    domain: CCMADomain.CLINICAL_PATIENT_CARE,
    subtopic: 'Ear Irrigation: Contraindications',
    stem: 'Which finding in a patient’s medical history or otoscopic exam is an absolute CONTRAINDICATION to performing an ear lavage/irrigation?',
    options: [
      'Impacted cerumen in the outer third of the canal',
      'Tympanostomy tubes (PE tubes) or a suspected perforated tympanic membrane',
      'Mild hearing loss in the affected ear',
      'Itching sensation inside the canal',
    ],
    correctIndex: 1,
    rationale: 'Ear irrigation is strictly contraindicated in the presence of a perforated eardrum, tympanostomy tubes, or active acute otitis media, as water forced through the perforation causes severe middle/inner ear infection and vertigo.',
    clinicalConcept: 'Ear Irrigation Contraindications',
  },
  {
    id: 'supp-004',
    domain: CCMADomain.CLINICAL_PATIENT_CARE,
    subtopic: 'Phlebotomy: Hemolysis Causes',
    stem: 'Which of the following actions during blood collection is most likely to cause in-vitro hemolysis of red blood cells?',
    options: [
      'Using a 21-gauge needle for antecubital venipuncture',
      'Using an excessively small needle (e.g. 25G) with high vacuum tube suction, or vigorously shaking the tube after collection',
      'Allowing alcohol on the skin to dry completely before puncture',
      'Inverting a lavender tube gently 8 times',
    ],
    correctIndex: 1,
    rationale: 'Hemolysis occurs when RBC membranes rupture, releasing hemoglobin into serum/plasma. Key causes include forcing blood through tiny bore needles (25G), drawing from a hematoma, pulling back too hard on a syringe plunger, or shaking collection tubes vigorously.',
    clinicalConcept: 'Causes of Specimen Hemolysis',
  },
  {
    id: 'supp-005',
    domain: CCMADomain.CLINICAL_PATIENT_CARE,
    subtopic: 'Pediatric Injections: Deltoid Age',
    stem: 'At what age does the deltoid muscle typically develop sufficient muscle mass to be considered a viable alternative site for small-volume vaccines in pediatric patients?',
    options: [
      'Birth to 2 months',
      '6 months',
      '1 to 3 years of age (commonly starting at age 3 for routine vaccines)',
      '12 years old only',
    ],
    correctIndex: 2,
    rationale: 'The vastus lateralis is the primary site under age 1; starting around 1 to 3 years (and especially ≥3 years), the deltoid muscle has developed enough mass for low-volume (≤0.5-1 mL) intramuscular vaccines.',
    clinicalConcept: 'Pediatric Injection Site Age Criteria',
  },
  {
    id: 'supp-006',
    domain: CCMADomain.CLINICAL_PATIENT_CARE,
    subtopic: 'Urine Specimen Types',
    stem: 'Which urine collection method is required when a sterile specimen is needed for an outpatient bacterial culture and sensitivity (C&S) test?',
    options: [
      'Random collection in a clean cup',
      'Clean-catch midstream collection after thorough peri-urethral cleansing',
      'First voided morning stream without cleaning',
      '24-hour pooled collection container',
    ],
    correctIndex: 1,
    rationale: 'A clean-catch midstream specimen involves cleansing the urethral meatus with antiseptic towelettes and collecting urine mid-flow to flush away external urethral bacteria.',
    clinicalConcept: 'Clean-Catch Midstream Urine Collection',
  },
  {
    id: 'supp-007',
    domain: CCMADomain.FOUNDATIONAL_KNOWLEDGE,
    subtopic: 'Anatomy: Circulatory System',
    stem: 'Which blood vessels carry oxygenated blood from the lungs back to the left atrium of the heart?',
    options: [
      'Pulmonary arteries',
      'Pulmonary veins',
      'Superior and inferior vena cavae',
      'Coronary sinus',
    ],
    correctIndex: 1,
    rationale: 'The four pulmonary veins are unique because they carry freshly oxygenated blood from the lungs into the left atrium of the heart. (Pulmonary arteries carry deoxygenated blood from the right ventricle to the lungs).',
    clinicalConcept: 'Pulmonary Circulation Pathway',
  },
  {
    id: 'supp-008',
    domain: CCMADomain.FOUNDATIONAL_KNOWLEDGE,
    subtopic: 'Pharmacology: Half-Life',
    stem: 'What is the pharmacological definition of a drug’s "half-life" (t½)?',
    options: [
      'The time required for 50% of the medication dose to be eliminated from the bloodstream',
      'The shelf life of the drug before it expires in the pharmacy',
      'The time it takes for the drug to start producing clinical effects',
      'The dosage required to cure 50% of the patient population',
    ],
    correctIndex: 0,
    rationale: 'The elimination half-life (t½) of a drug is the time required for the plasma concentration of that drug to decrease by 50% through metabolism and excretion.',
    clinicalConcept: 'Pharmacokinetic Half-Life Principle',
  },
  {
    id: 'supp-009',
    domain: CCMADomain.FOUNDATIONAL_KNOWLEDGE,
    subtopic: 'Medical Terminology: Roots',
    stem: 'What is the medical root for the kidney?',
    options: [
      'Hepat/o',
      'Nephr/o or Ren/o',
      'Pneumon/o',
      'Splen/o',
    ],
    correctIndex: 1,
    rationale: '"Nephr/o" (Greek) and "Ren/o" (Latin) both refer to the kidneys (e.g., nephrology, renal failure). Hepat/o is liver, pneumon/o is lung, splen/o is spleen.',
    clinicalConcept: 'Renal Medical Roots',
  },
  {
    id: 'supp-010',
    domain: CCMADomain.CARE_COORDINATION_EDUCATION,
    subtopic: 'Patient Education: Hypertensive Emergencies',
    stem: 'A patient with chronic hypertension is instructed on red-flag warning signs that require emergency medical care. Which symptom combination indicates a potential hypertensive crisis with target organ damage?',
    options: [
      'Mild dry skin and slight fatigue after walking 2 miles',
      'Severe sudden occipital headache, blurred vision, chest pain, and shortness of breath with BP >180/120 mmHg',
      'Mild hunger pangs and normal blood pressure',
      'Occasional sneezing during springtime',
    ],
    correctIndex: 1,
    rationale: 'A blood pressure reading >180/120 mmHg accompanied by acute symptoms of organ damage (crushing chest pain, dyspnea, vision changes, acute neurologic deficits) constitutes a Hypertensive Emergency requiring immediate ED transport.',
    clinicalConcept: 'Hypertensive Crisis Warning Signs',
  },
  {
    id: 'supp-011',
    domain: CCMADomain.ADMINISTRATIVE_ASSISTING,
    subtopic: 'Scheduling: Matrix Setup',
    stem: 'What is a scheduling "matrix" in an outpatient medical practice appointment calendar?',
    options: [
      'A list of all past due bills in collections',
      'A template grid that blocks out times when the provider is unavailable for patient visits (e.g., lunch, hospital rounds, surgeries, meetings, vacations)',
      'The computer motherboard in the server closet',
      'An alphabetical patient directory',
    ],
    correctIndex: 1,
    rationale: 'Establishing a matrix involves marking out unavailable time slots (provider meetings, hospital rounds, lunch, holidays) on the appointment schedule before booking patient visits.',
    clinicalConcept: 'Appointment Schedule Matrix Concept',
  },
  {
    id: 'supp-012',
    domain: CCMADomain.ADMINISTRATIVE_ASSISTING,
    subtopic: 'Billing: Superbill / Encounter Form',
    stem: 'What is the primary function of a "superbill" (encounter form) used during a patient visit?',
    options: [
      'To record the patient’s credit card number for monthly auto-billing',
      'To serve as a pre-printed or electronic document listing common diagnosis (ICD) and procedure (CPT) codes for the provider to mark services rendered during an encounter',
      'To serve as an official prescription pad for controlled substances',
      'To request a formal medical malpractice hearing',
    ],
    correctIndex: 1,
    rationale: 'A superbill/encounter form contains common diagnostic (ICD-10) and procedural (CPT) codes, patient demographics, and fee schedules used to generate insurance claims and billing invoices.',
    clinicalConcept: 'Superbill / Encounter Form Utility',
  },
  {
    id: 'supp-013',
    domain: CCMADomain.COMMUNICATION,
    subtopic: 'Telephone Etiquette: Confidentiality',
    stem: 'A medical assistant leaves a voicemail on a patient’s home answering machine regarding normal lab results. What information is permissible under HIPAA guidelines without a specific disclosure waiver?',
    options: [
      'State all specific lab values, the names of all infectious diseases tested, and medication names',
      'State the medical assistant’s name, clinic name, clinic phone number, and a polite request for the patient to return the call without disclosing specific clinical details',
      'Leave a detailed message detailing the patient’s entire surgical history',
      'Threaten to cancel all future care if they do not call back within 1 hour',
    ],
    correctIndex: 1,
    rationale: 'Under HIPAA minimum necessary standards, voicemail messages on unverified or shared phone lines should only state the caller’s name, practice name, callback phone number, and a neutral request to return the call, avoiding clinical disclosures.',
    clinicalConcept: 'HIPAA Compliant Voicemail Etiquette',
  },
  {
    id: 'supp-014',
    domain: CCMADomain.MEDICAL_LAW_ETHICS,
    subtopic: 'OSHA: Safety Data Sheets (SDS)',
    stem: 'Under OSHA’s Hazard Communication Standard (HCS), what information is provided on a Safety Data Sheet (SDS)?',
    options: [
      'The clinic’s financial revenue statements',
      'Detailed chemical identity, hazards, safe handling procedures, PPE requirements, and emergency first-aid spill response for hazardous workplace chemicals',
      'The salary scale for clinical staff',
      'A list of patient appointments for the week',
    ],
    correctIndex: 1,
    rationale: 'Safety Data Sheets (SDS) are standardized 16-section documents containing essential health hazards, chemical properties, protective measures, and first aid/spill safety protocols for chemicals used in the clinic.',
    clinicalConcept: 'OSHA Safety Data Sheets (SDS) Standards',
  },
  {
    id: 'supp-015',
    domain: CCMADomain.MEDICAL_LAW_ETHICS,
    subtopic: 'Patient Rights: AMA (Against Medical Advice)',
    stem: 'A competent adult patient with acute chest pain insists on leaving the outpatient clinic before an ambulance arrives. What is the legally proper procedure for the clinical team?',
    options: [
      'Physically block the doorway and tackle the patient to prevent departure',
      'Inform the patient of the severe risks (including death), have them sign an "Against Medical Advice" (AMA) form, document the discussion, and provide discharge instructions',
      'Call the police to arrest the patient for non-compliance',
      'Destroy the patient’s medical chart immediately',
    ],
    correctIndex: 1,
    rationale: 'Competent adults have the legal right to refuse medical care. The provider/staff must educate the patient on the potential life-threatening consequences, document the refusal, request signature on an AMA form, and provide safe transition options.',
    clinicalConcept: 'Leaving Against Medical Advice (AMA) Protocol',
  },
];

export const ALL_QUESTIONS: Question[] = [
  ...CLINICAL_QUESTIONS,
  ...FOUNDATIONAL_QUESTIONS,
  ...CARE_COORDINATION_QUESTIONS,
  ...ADMIN_QUESTIONS,
  ...COMMUNICATION_QUESTIONS,
  ...LAW_ETHICS_QUESTIONS,
  ...SUPPLEMENTARY_QUESTIONS,
];

// Helper to get questions filtered by domain
export function getQuestionsByDomain(domain: CCMADomain): Question[] {
  return ALL_QUESTIONS.filter((q) => q.domain === domain);
}

// Helper to generate full practice exam (180 questions: 150 scored + 30 pretest questions)
export function generateFullExamQuestions(): Question[] {
  // We want to sample questions proportionally according to NHA CCMA weights:
  // Clinical Patient Care: ~56%
  // Foundational Knowledge: ~14%
  // Care Coordination: ~9%
  // Admin: ~8%
  // Communication: ~7%
  // Law & Ethics: ~6%

  const domainMap: Record<CCMADomain, Question[]> = {
    [CCMADomain.CLINICAL_PATIENT_CARE]: [...CLINICAL_QUESTIONS, ...SUPPLEMENTARY_QUESTIONS.filter(q => q.domain === CCMADomain.CLINICAL_PATIENT_CARE)],
    [CCMADomain.FOUNDATIONAL_KNOWLEDGE]: [...FOUNDATIONAL_QUESTIONS, ...SUPPLEMENTARY_QUESTIONS.filter(q => q.domain === CCMADomain.FOUNDATIONAL_KNOWLEDGE)],
    [CCMADomain.CARE_COORDINATION_EDUCATION]: [...CARE_COORDINATION_QUESTIONS, ...SUPPLEMENTARY_QUESTIONS.filter(q => q.domain === CCMADomain.CARE_COORDINATION_EDUCATION)],
    [CCMADomain.ADMINISTRATIVE_ASSISTING]: [...ADMIN_QUESTIONS, ...SUPPLEMENTARY_QUESTIONS.filter(q => q.domain === CCMADomain.ADMINISTRATIVE_ASSISTING)],
    [CCMADomain.COMMUNICATION]: [...COMMUNICATION_QUESTIONS, ...SUPPLEMENTARY_QUESTIONS.filter(q => q.domain === CCMADomain.COMMUNICATION)],
    [CCMADomain.MEDICAL_LAW_ETHICS]: [...LAW_ETHICS_QUESTIONS, ...SUPPLEMENTARY_QUESTIONS.filter(q => q.domain === CCMADomain.MEDICAL_LAW_ETHICS)],
  };

  // Shuffle array helper
  const shuffle = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // If question bank is ~178 questions, we assemble all questions and clone/shuffle to reach exactly 180 questions
  // with 30 pretest questions marked
  let pool = shuffle(ALL_QUESTIONS);

  // If we need 180 questions, add duplicate-variant copies if needed to meet exact 180 length
  while (pool.length < 180) {
    const extra = ALL_QUESTIONS[Math.floor(Math.random() * ALL_QUESTIONS.length)];
    pool.push({
      ...extra,
      id: `${extra.id}-var-${pool.length}`,
    });
  }

  // Pick exactly 180 questions
  const finalExamQuestions = pool.slice(0, 180).map((q, index) => {
    // Exactly 30 questions randomly flagged as unscored pretest questions (NHA pretest items)
    // We mark roughly every 6th question as pretest (total 30)
    const isPretest = index % 6 === 2;
    return {
      ...q,
      isPretest,
    };
  });

  return shuffle(finalExamQuestions);
}

// Helper to generate custom quiz with selected domains and count
export function generateCustomQuizQuestions(
  selectedDomains: CCMADomain[],
  count: number
): Question[] {
  const eligible = ALL_QUESTIONS.filter((q) =>
    selectedDomains.includes(q.domain)
  );

  const shuffle = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const shuffled = shuffle(eligible);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((q) => ({
    ...q,
    isPretest: false, // In custom quizzes, all are scored
  }));
}
