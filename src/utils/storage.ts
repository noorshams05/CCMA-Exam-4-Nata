import { ExamResult, CCMADomain, UserStats } from '../types';

const STORAGE_KEYS = {
  EXAM_HISTORY: 'ccma_exam_history_v1',
  FLASHCARD_MASTERY: 'ccma_flashcard_mastery_v1',
  BOOKMARKED_QUESTIONS: 'ccma_bookmarked_questions_v1',
};

export function getExamHistory(): ExamResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse exam history from localStorage', err);
    return [];
  }
}

export function saveExamResult(result: ExamResult): void {
  try {
    const history = getExamHistory();
    const updated = [result, ...history].slice(0, 50); // Store up to last 50 attempts
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save exam result', err);
  }
}

export function clearExamHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.EXAM_HISTORY);
  } catch (err) {
    console.error('Failed to clear exam history', err);
  }
}

export function getFlashcardMastery(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FLASHCARD_MASTERY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}

export function saveFlashcardMastery(cardId: string, isMastered: boolean): void {
  try {
    const current = getFlashcardMastery();
    current[cardId] = isMastered;
    localStorage.setItem(STORAGE_KEYS.FLASHCARD_MASTERY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed to save flashcard mastery', err);
  }
}

export function resetAllFlashcardMastery(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.FLASHCARD_MASTERY);
  } catch (err) {
    console.error('Failed to reset flashcard mastery', err);
  }
}

export function getBookmarkedQuestionIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_QUESTIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function toggleBookmarkedQuestion(questionId: string): boolean {
  try {
    const current = getBookmarkedQuestionIds();
    const index = current.indexOf(questionId);
    let updated: string[];
    let isBookmarked: boolean;

    if (index >= 0) {
      updated = current.filter((id) => id !== questionId);
      isBookmarked = false;
    } else {
      updated = [...current, questionId];
      isBookmarked = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_QUESTIONS, JSON.stringify(updated));
    return isBookmarked;
  } catch (err) {
    console.error('Failed to toggle bookmark', err);
    return false;
  }
}

export function calculateAggregatedStats(history: ExamResult[]): {
  totalTests: number;
  averageScore: number;
  highestScore: number;
  passRate: number;
  totalQuestionsAnswered: number;
  overallWeakestDomain: CCMADomain | null;
  overallDomainProficiencies: Record<CCMADomain, { total: number; correct: number; percent: number }>;
} {
  if (history.length === 0) {
    return {
      totalTests: 0,
      averageScore: 0,
      highestScore: 0,
      passRate: 0,
      totalQuestionsAnswered: 0,
      overallWeakestDomain: null,
      overallDomainProficiencies: {
        [CCMADomain.CLINICAL_PATIENT_CARE]: { total: 0, correct: 0, percent: 0 },
        [CCMADomain.FOUNDATIONAL_KNOWLEDGE]: { total: 0, correct: 0, percent: 0 },
        [CCMADomain.CARE_COORDINATION_EDUCATION]: { total: 0, correct: 0, percent: 0 },
        [CCMADomain.ADMINISTRATIVE_ASSISTING]: { total: 0, correct: 0, percent: 0 },
        [CCMADomain.COMMUNICATION]: { total: 0, correct: 0, percent: 0 },
        [CCMADomain.MEDICAL_LAW_ETHICS]: { total: 0, correct: 0, percent: 0 },
      },
    };
  }

  const totalTests = history.length;
  const totalScore = history.reduce((sum, h) => sum + h.scaledScore, 0);
  const averageScore = Math.round(totalScore / totalTests);
  const highestScore = Math.max(...history.map((h) => h.scaledScore));
  const passCount = history.filter((h) => h.isPassed).length;
  const passRate = Math.round((passCount / totalTests) * 100);
  const totalQuestionsAnswered = history.reduce((sum, h) => sum + h.totalQuestions, 0);

  // Aggregate domain proficiencies across all attempts
  const domainTotals: Record<CCMADomain, { total: number; correct: number }> = {
    [CCMADomain.CLINICAL_PATIENT_CARE]: { total: 0, correct: 0 },
    [CCMADomain.FOUNDATIONAL_KNOWLEDGE]: { total: 0, correct: 0 },
    [CCMADomain.CARE_COORDINATION_EDUCATION]: { total: 0, correct: 0 },
    [CCMADomain.ADMINISTRATIVE_ASSISTING]: { total: 0, correct: 0 },
    [CCMADomain.COMMUNICATION]: { total: 0, correct: 0 },
    [CCMADomain.MEDICAL_LAW_ETHICS]: { total: 0, correct: 0 },
  };

  history.forEach((h) => {
    Object.values(h.domainScores).forEach((ds) => {
      domainTotals[ds.domain].total += ds.total;
      domainTotals[ds.domain].correct += ds.correct;
    });
  });

  const proficiencies: Record<CCMADomain, { total: number; correct: number; percent: number }> = {
    [CCMADomain.CLINICAL_PATIENT_CARE]: {
      total: domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].total,
      correct: domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].correct,
      percent:
        domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].correct /
                domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].total) *
                100
            )
          : 0,
    },
    [CCMADomain.FOUNDATIONAL_KNOWLEDGE]: {
      total: domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].total,
      correct: domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].correct,
      percent:
        domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].correct /
                domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].total) *
                100
            )
          : 0,
    },
    [CCMADomain.CARE_COORDINATION_EDUCATION]: {
      total: domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].total,
      correct: domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].correct,
      percent:
        domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].correct /
                domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].total) *
                100
            )
          : 0,
    },
    [CCMADomain.ADMINISTRATIVE_ASSISTING]: {
      total: domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].total,
      correct: domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].correct,
      percent:
        domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].correct /
                domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].total) *
                100
            )
          : 0,
    },
    [CCMADomain.COMMUNICATION]: {
      total: domainTotals[CCMADomain.COMMUNICATION].total,
      correct: domainTotals[CCMADomain.COMMUNICATION].correct,
      percent:
        domainTotals[CCMADomain.COMMUNICATION].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.COMMUNICATION].correct /
                domainTotals[CCMADomain.COMMUNICATION].total) *
                100
            )
          : 0,
    },
    [CCMADomain.MEDICAL_LAW_ETHICS]: {
      total: domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].total,
      correct: domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].correct,
      percent:
        domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].correct /
                domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].total) *
                100
            )
          : 0,
    },
  };

  const domainList = Object.entries(proficiencies).filter(([_, data]) => data.total > 0);
  domainList.sort((a, b) => a[1].percent - b[1].percent);
  const overallWeakestDomain = domainList.length > 0 ? (domainList[0][0] as CCMADomain) : null;

  return {
    totalTests,
    averageScore,
    highestScore,
    passRate,
    totalQuestionsAnswered,
    overallWeakestDomain,
    overallDomainProficiencies: proficiencies,
  };
}
