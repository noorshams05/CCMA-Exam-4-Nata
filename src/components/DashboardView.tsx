import React from 'react';
import {
  Play,
  Zap,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Brain,
  HeartHandshake,
  ClipboardList,
  MessageSquare,
  ShieldAlert,
  Heart,
  Sparkles,
} from 'lucide-react';
import { CCMADomain, DOMAIN_METADATA, ExamResult } from '../types';
import { ALL_QUESTIONS } from '../data/allQuestions';
import { formatTime } from '../utils/scoring';

interface DashboardViewProps {
  onStartFullExam: () => void;
  onOpenQuizSetup: () => void;
  onStartTargetedDomainQuiz: (domain: CCMADomain) => void;
  onOpenFlashcards: () => void;
  onOpenStudyGuide: () => void;
  onOpenHistory: () => void;
  onReviewAttempt: (attempt: ExamResult) => void;
  stats: {
    totalTests: number;
    averageScore: number;
    highestScore: number;
    passRate: number;
    totalQuestionsAnswered: number;
    overallWeakestDomain: CCMADomain | null;
    overallDomainProficiencies: Record<CCMADomain, { total: number; correct: number; percent: number }>;
  };
  recentAttempts: ExamResult[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartFullExam,
  onOpenQuizSetup,
  onStartTargetedDomainQuiz,
  onOpenFlashcards,
  onOpenStudyGuide,
  onOpenHistory,
  onReviewAttempt,
  stats,
  recentAttempts,
}) => {
  const getDomainIcon = (domain: CCMADomain) => {
    switch (domain) {
      case CCMADomain.CLINICAL_PATIENT_CARE:
        return <Stethoscope className="w-5 h-5 text-pink-600" />;
      case CCMADomain.FOUNDATIONAL_KNOWLEDGE:
        return <Brain className="w-5 h-5 text-rose-500" />;
      case CCMADomain.CARE_COORDINATION_EDUCATION:
        return <HeartHandshake className="w-5 h-5 text-pink-500" />;
      case CCMADomain.ADMINISTRATIVE_ASSISTING:
        return <ClipboardList className="w-5 h-5 text-fuchsia-500" />;
      case CCMADomain.COMMUNICATION:
        return <MessageSquare className="w-5 h-5 text-pink-500" />;
      case CCMADomain.MEDICAL_LAW_ETHICS:
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-pink-600" />;
    }
  };

  const weakestMeta = stats.overallWeakestDomain ? DOMAIN_METADATA[stats.overallWeakestDomain] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Readiness Header */}
      <div className="luxury-card rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(244,114,182,0.25)] relative overflow-hidden border-2 border-pink-200">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl pointer-events-none animate-pulseGlow" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-80 h-80 bg-rose-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-300 text-pink-700 text-xs font-black shadow-sm">
              <span className="text-sm">🎀</span>
              <span>Hello Kitty NHA CCMA Exam Prep</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-pink-950 leading-tight">
              CCMA Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">Exam Simulator</span> 🎀
            </h1>
            <p className="text-pink-900/80 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              Master the official NHA CCMA certification with 180 questions, 3-hour timer, clinical vignettes, scaled scoring (200-500, passing = 390), and celebratory Hello Kitty rewards for every right answer!
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="dash-btn-full-exam"
                onClick={onStartFullExam}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm sm:text-base flex items-center gap-2.5 shadow-[0_4px_25px_rgba(244,63,94,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border-2 border-white"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Launch Full 180-Q Exam (3 Hrs)</span>
              </button>

              <button
                id="dash-btn-custom-quiz"
                onClick={onOpenQuizSetup}
                className="px-5 py-3.5 rounded-2xl bg-white/90 hover:bg-pink-50 text-pink-900 font-bold text-sm border-2 border-pink-200 hover:border-pink-300 flex items-center gap-2 transition-all duration-200 shadow-sm"
              >
                <Zap className="w-4 h-4 text-pink-500" />
                <span>Custom Domain Quiz</span>
              </button>

              <button
                id="dash-btn-flashcards"
                onClick={onOpenFlashcards}
                className="px-5 py-3.5 rounded-2xl bg-white/90 hover:bg-pink-50 text-pink-900 font-bold text-sm border-2 border-pink-200 hover:border-pink-300 flex items-center gap-2 transition-all duration-200 shadow-sm"
              >
                <RotateCcw className="w-4 h-4 text-rose-500" />
                <span>Flashcards (60+ Terms)</span>
              </button>
            </div>
          </div>

          {/* Readiness Score Card */}
          <div className="bg-white/95 border-2 border-pink-200 rounded-3xl p-6 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs text-pink-700">
              <span className="font-extrabold uppercase tracking-widest text-[10px] text-pink-800 flex items-center gap-1">
                <span>🎀</span> Readiness Score
              </span>
              <span className="font-mono text-[11px] font-bold text-pink-600">Cut: 390 / 500</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                  stats.averageScore >= 390
                    ? 'text-emerald-600 drop-shadow-sm'
                    : stats.averageScore > 0
                    ? 'text-pink-600 drop-shadow-sm'
                    : 'text-pink-300'
                }`}
              >
                {stats.averageScore > 0 ? stats.averageScore : '---'}
              </span>
              <span className="text-pink-600/80 text-xs font-bold">/ 500 scaled</span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-pink-100 h-3.5 rounded-full overflow-hidden relative border border-pink-200 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    stats.averageScore >= 390
                      ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500'
                      : stats.averageScore > 0
                      ? 'bg-gradient-to-r from-pink-400 to-rose-500'
                      : 'bg-pink-200'
                  }`}
                  style={{
                    width: `${
                      stats.averageScore > 0
                        ? Math.min(100, Math.max(10, ((stats.averageScore - 200) / 300) * 100))
                        : 0
                    }%`,
                  }}
                />
                {/* 390 Threshold Marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-pink-700 shadow-[0_0_4px_rgba(244,63,94,0.8)]"
                  style={{ left: `${((390 - 200) / 300) * 100}%` }}
                  title="Pass Mark (390)"
                />
              </div>
              <div className="flex justify-between text-[10px] text-pink-600 font-mono font-bold">
                <span>200 (Min)</span>
                <span className="text-pink-700 font-black">390 (Passing Cut)</span>
                <span>500 (Max)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-pink-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-pink-700 block text-[10px] uppercase tracking-wider font-extrabold">Tests Completed</span>
                <span className="font-black text-pink-950 text-base font-mono">{stats.totalTests}</span>
              </div>
              <div>
                <span className="text-pink-700 block text-[10px] uppercase tracking-wider font-extrabold">Pass Rate</span>
                <span className="font-black text-pink-950 text-base font-mono">
                  {stats.totalTests > 0 ? `${stats.passRate}%` : '---'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weakest Domain Alert if available */}
      {weakestMeta && (
        <div className="bg-pink-100/90 border-2 border-pink-300 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-pink-200 text-pink-700 flex-shrink-0 border border-pink-300">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-pink-700">
                  Target Study Area 🎀
                </span>
                <span className="text-xs text-pink-600 font-mono font-bold">
                  ({stats.overallDomainProficiencies[weakestMeta.id].percent}% proficiency)
                </span>
              </div>
              <h3 className="font-black text-pink-950 text-base">
                {weakestMeta.name} ({weakestMeta.weightPercent}% of real exam)
              </h3>
              <p className="text-xs text-pink-800/80 mt-0.5 font-medium">
                Strengthen your mastery in this domain to maximize your board exam score.
              </p>
            </div>
          </div>

          <button
            id="dash-btn-target-weak"
            onClick={() => onStartTargetedDomainQuiz(weakestMeta.id)}
            className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md transition-all whitespace-nowrap"
          >
            <span>Practice {weakestMeta.shortName} (20 Qs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 7 NHA CCMA Domains Breakdown Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-pink-950 flex items-center gap-2">
              <span>🎀 NHA CCMA Exam Domain Mastery</span>
            </h2>
            <p className="text-xs text-pink-700 font-medium">
              Exam proportions based on the official NHA 7-domain blueprint. Click any card to launch practice.
            </p>
          </div>
          <button
            id="dash-btn-open-guide-all"
            onClick={onOpenStudyGuide}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Cheat Sheets</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(DOMAIN_METADATA).map((domainMeta) => {
            const domainQuestions = ALL_QUESTIONS.filter((q) => q.domain === domainMeta.id);
            const prof = stats.overallDomainProficiencies[domainMeta.id];
            const hasData = prof && prof.total > 0;

            return (
              <div
                key={domainMeta.id}
                id={`domain-card-${domainMeta.id}`}
                onClick={() => onStartTargetedDomainQuiz(domainMeta.id)}
                className="luxury-card-interactive rounded-3xl p-6 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-2xl bg-pink-100/90 border border-pink-200 group-hover:border-pink-400 group-hover:bg-pink-200/80 transition-all">
                      {getDomainIcon(domainMeta.id)}
                    </div>
                    <span className="text-[11px] font-black px-3 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-200 font-mono">
                      {domainMeta.weightPercent}% Weight
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-pink-950 text-base group-hover:text-pink-600 transition-colors">
                      {domainMeta.name}
                    </h3>
                    <p className="text-xs text-pink-800/80 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                      {domainMeta.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-pink-100 space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-pink-600 font-semibold">
                      {domainQuestions.length} Questions Bank
                    </span>
                    <span
                      className={`font-black ${
                        hasData
                          ? prof.percent >= 75
                            ? 'text-emerald-600'
                            : prof.percent >= 60
                            ? 'text-amber-600'
                            : 'text-rose-600'
                          : 'text-pink-400'
                      }`}
                    >
                      {hasData ? `${prof.percent}% Mastered` : 'Not tested yet'}
                    </span>
                  </div>

                  <div className="w-full bg-pink-100 border border-pink-200 h-2.5 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        hasData
                          ? prof.percent >= 75
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                            : prof.percent >= 60
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                            : 'bg-gradient-to-r from-rose-400 to-pink-500'
                          : 'bg-pink-200'
                      }`}
                      style={{ width: `${hasData ? prof.percent : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Exam History & Exam Structure Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Attempts Table */}
        <div className="lg:col-span-2 luxury-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-pink-950 text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-pink-600" />
              <span>Recent Test Attempts</span>
            </h3>
            {recentAttempts.length > 0 && (
              <button
                id="dash-btn-view-all-history"
                onClick={onOpenHistory}
                className="text-xs font-extrabold text-pink-600 hover:text-pink-700 transition-colors"
              >
                View Full Log ({recentAttempts.length})
              </button>
            )}
          </div>

          {recentAttempts.length === 0 ? (
            <div className="py-8 text-center text-pink-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center mx-auto text-pink-500">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-pink-900">No practice attempts recorded yet.</p>
              <p className="text-xs max-w-sm mx-auto text-pink-700/90 font-medium">
                Take a quick 10-question quiz or launch the 180-question practice exam to start tracking your score history.
              </p>
              <button
                id="dash-btn-start-first-quiz"
                onClick={onOpenQuizSetup}
                className="px-5 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs transition-all inline-block shadow-md border-2 border-white"
              >
                Take First Quick Quiz 🎀
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-pink-200 text-pink-700 uppercase text-[10px] tracking-wider font-extrabold">
                    <th className="pb-2.5 font-extrabold">Date</th>
                    <th className="pb-2.5 font-extrabold">Mode / Title</th>
                    <th className="pb-2.5 font-extrabold">Scaled Score</th>
                    <th className="pb-2.5 font-extrabold">Status</th>
                    <th className="pb-2.5 font-extrabold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-100">
                  {recentAttempts.slice(0, 5).map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-pink-50/80 transition-colors">
                      <td className="py-3 text-pink-800 font-semibold">
                        {new Date(attempt.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3 font-bold text-pink-950">
                        {attempt.title}
                        <span className="text-[10px] text-pink-600 block font-mono font-medium">
                          {attempt.totalQuestions} Qs • {formatTime(attempt.timeSpentSeconds)}
                        </span>
                      </td>
                      <td className="py-3 font-mono font-black text-pink-900">
                        {attempt.scaledScore} / 500
                        <span className="text-[10px] text-pink-600 block font-normal">
                          ({attempt.rawScorePercent}%)
                        </span>
                      </td>
                      <td className="py-3">
                        {attempt.isPassed ? (
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 font-black text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Passed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 font-bold text-[11px]">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Needs Study</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          id={`dash-btn-review-attempt-${attempt.id}`}
                          onClick={() => onReviewAttempt(attempt)}
                          className="px-3.5 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 border border-pink-200 font-bold transition-all"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* NHA CCMA Exam Blueprint Reference Card */}
        <div className="luxury-card rounded-3xl p-6 space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🎀</span>
            <h3 className="font-black text-pink-950 text-sm">
              Official NHA CCMA Specs
            </h3>
          </div>

          <div className="space-y-2.5 text-pink-900/90 leading-relaxed font-medium">
            <div className="flex justify-between border-b border-pink-100 pb-2">
              <span className="text-pink-700 font-semibold">Total Items:</span>
              <span className="font-bold text-pink-950">180 Questions</span>
            </div>
            <div className="flex justify-between border-b border-pink-100 pb-2">
              <span className="text-pink-700 font-semibold">Scored vs Pretest:</span>
              <span className="font-bold text-pink-950">150 Scored + 30 Pretest</span>
            </div>
            <div className="flex justify-between border-b border-pink-100 pb-2">
              <span className="text-pink-700 font-semibold">Allotted Time:</span>
              <span className="font-bold text-pink-950">3 Hours (180 mins)</span>
            </div>
            <div className="flex justify-between border-b border-pink-100 pb-2">
              <span className="text-pink-700 font-semibold">Passing Cut Score:</span>
              <span className="font-black text-emerald-700 font-mono">
                390 / 500 (Scale 200-500)
              </span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-pink-700 font-semibold">Primary Domain:</span>
              <span className="font-bold text-pink-950">Clinical Care (56%)</span>
            </div>
          </div>

          <div className="p-4 bg-pink-100/90 border border-pink-200 rounded-2xl text-pink-800 text-[11px] leading-relaxed font-medium">
            <span className="font-black text-pink-900">Pro-tip 💖:</span> In the full simulator mode, 30 unscored pretest questions are mixed in just like the real NHA test center experience.
          </div>
        </div>
      </div>
    </div>
  );
};
