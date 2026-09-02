import { CCMADomain, Question, ExamResult, DomainScoreSummary, ExamMode } from '../types';

export function calculateExamScore(
  questions: Question[],
  userAnswers: Record<string, number>,
  mode: ExamMode,
  title: string,
  timeSpentSeconds: number,
  flagged: Record<string, boolean> = {}
): ExamResult {
  // Scored questions (for full exam, questions marked isPretest === true are unscored pretest items)
  const scoredQuestions = questions.filter((q) => !q.isPretest);
  const totalScored = scoredQuestions.length > 0 ? scoredQuestions.length : questions.length;
  
  let rawCorrectScored = 0;
  scoredQuestions.forEach((q) => {
    if (userAnswers[q.id] === q.correctIndex) {
      rawCorrectScored++;
    }
  });

  const rawScorePercent = totalScored > 0 ? (rawCorrectScored / totalScored) * 100 : 0;
  const rawRatio = totalScored > 0 ? rawCorrectScored / totalScored : 0;

  // NHA Scaled Score Formula (200 - 500 scale, 390 passing threshold at ~72% raw score)
  let scaledScore = 200;
  const passingThreshold = 0.72; // 72% is the standard NHA raw passing cut-score

  if (rawRatio <= 0) {
    scaledScore = 200;
  } else if (rawRatio < passingThreshold) {
    scaledScore = Math.round(200 + (rawRatio / passingThreshold) * 190);
  } else {
    const abovePass = (rawRatio - passingThreshold) / (1 - passingThreshold);
    scaledScore = Math.round(390 + abovePass * 110);
  }

  // Bound within 200 - 500
  scaledScore = Math.max(200, Math.min(500, scaledScore));
  const isPassed = scaledScore >= 390;

  // Domain breakdown
  const domainTotals: Record<CCMADomain, { total: number; correct: number }> = {
    [CCMADomain.CLINICAL_PATIENT_CARE]: { total: 0, correct: 0 },
    [CCMADomain.FOUNDATIONAL_KNOWLEDGE]: { total: 0, correct: 0 },
    [CCMADomain.CARE_COORDINATION_EDUCATION]: { total: 0, correct: 0 },
    [CCMADomain.ADMINISTRATIVE_ASSISTING]: { total: 0, correct: 0 },
    [CCMADomain.COMMUNICATION]: { total: 0, correct: 0 },
    [CCMADomain.MEDICAL_LAW_ETHICS]: { total: 0, correct: 0 },
  };

  // Evaluate across all answered questions in this exam
  questions.forEach((q) => {
    domainTotals[q.domain].total++;
    if (userAnswers[q.id] === q.correctIndex) {
      domainTotals[q.domain].correct++;
    }
  });

  const domainScores: Record<CCMADomain, DomainScoreSummary> = {
    [CCMADomain.CLINICAL_PATIENT_CARE]: {
      domain: CCMADomain.CLINICAL_PATIENT_CARE,
      total: domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].total,
      correct: domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].correct,
      percentage:
        domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].correct /
                domainTotals[CCMADomain.CLINICAL_PATIENT_CARE].total) *
                100
            )
          : 0,
    },
    [CCMADomain.FOUNDATIONAL_KNOWLEDGE]: {
      domain: CCMADomain.FOUNDATIONAL_KNOWLEDGE,
      total: domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].total,
      correct: domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].correct,
      percentage:
        domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].correct /
                domainTotals[CCMADomain.FOUNDATIONAL_KNOWLEDGE].total) *
                100
            )
          : 0,
    },
    [CCMADomain.CARE_COORDINATION_EDUCATION]: {
      domain: CCMADomain.CARE_COORDINATION_EDUCATION,
      total: domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].total,
      correct: domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].correct,
      percentage:
        domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].correct /
                domainTotals[CCMADomain.CARE_COORDINATION_EDUCATION].total) *
                100
            )
          : 0,
    },
    [CCMADomain.ADMINISTRATIVE_ASSISTING]: {
      domain: CCMADomain.ADMINISTRATIVE_ASSISTING,
      total: domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].total,
      correct: domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].correct,
      percentage:
        domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].correct /
                domainTotals[CCMADomain.ADMINISTRATIVE_ASSISTING].total) *
                100
            )
          : 0,
    },
    [CCMADomain.COMMUNICATION]: {
      domain: CCMADomain.COMMUNICATION,
      total: domainTotals[CCMADomain.COMMUNICATION].total,
      correct: domainTotals[CCMADomain.COMMUNICATION].correct,
      percentage:
        domainTotals[CCMADomain.COMMUNICATION].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.COMMUNICATION].correct /
                domainTotals[CCMADomain.COMMUNICATION].total) *
                100
            )
          : 0,
    },
    [CCMADomain.MEDICAL_LAW_ETHICS]: {
      domain: CCMADomain.MEDICAL_LAW_ETHICS,
      total: domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].total,
      correct: domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].correct,
      percentage:
        domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].total > 0
          ? Math.round(
              (domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].correct /
                domainTotals[CCMADomain.MEDICAL_LAW_ETHICS].total) *
                100
            )
          : 0,
    },
  };

  // Find weakest and strongest domains (only considering domains with >0 questions)
  const activeDomains = Object.values(domainScores).filter((d) => d.total > 0);
  activeDomains.sort((a, b) => a.percentage - b.percentage);

  const weakestDomain = activeDomains[0]?.domain || CCMADomain.CLINICAL_PATIENT_CARE;
  const strongestDomain =
    activeDomains[activeDomains.length - 1]?.domain || CCMADomain.CLINICAL_PATIENT_CARE;

  return {
    id: `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    title,
    mode,
    totalQuestions: questions.length,
    totalScoredQuestions: totalScored,
    rawCorrectScored,
    rawScorePercent: Math.round(rawScorePercent * 10) / 10,
    scaledScore,
    isPassed,
    timeSpentSeconds,
    domainScores,
    weakestDomain,
    strongestDomain,
    questions,
    userAnswers,
    flagged,
  };
}

// Format seconds into MM:SS or HH:MM:SS
export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
