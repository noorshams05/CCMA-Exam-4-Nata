import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Home,
  Check,
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
import { formatTime } from '../utils/scoring';

interface ExamResultViewProps {
  result: ExamResult;
  onReviewAll: () => void;
  onReviewIncorrectOnly: () => void;
  onRetake: () => void;
  onTargetWeakDomain: (domain: CCMADomain) => void;
  onGoHome: () => void;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  result,
  onReviewAll,
  onReviewIncorrectOnly,
  onRetake,
  onTargetWeakDomain,
  onGoHome,
}) => {
  // Fire confetti celebration if passed!
  useEffect(() => {
    if (result.isPassed) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fde047'],
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [result.isPassed]);

  const getDomainIcon = (domain: CCMADomain, color?: string) => {
    const style = color ? { color } : undefined;
    switch (domain) {
      case CCMADomain.CLINICAL_PATIENT_CARE:
        return <Stethoscope className="w-4 h-4" style={style} />;
      case CCMADomain.FOUNDATIONAL_KNOWLEDGE:
        return <Brain className="w-4 h-4" style={style} />;
      case CCMADomain.CARE_COORDINATION_EDUCATION:
        return <HeartHandshake className="w-4 h-4" style={style} />;
      case CCMADomain.ADMINISTRATIVE_ASSISTING:
        return <ClipboardList className="w-4 h-4" style={style} />;
      case CCMADomain.COMMUNICATION:
        return <MessageSquare className="w-4 h-4" style={style} />;
      case CCMADomain.MEDICAL_LAW_ETHICS:
        return <ShieldAlert className="w-4 h-4" style={style} />;
      default:
        return <Stethoscope className="w-4 h-4" style={style} />;
    }
  };

  const weakestMeta = DOMAIN_METADATA[result.weakestDomain];
  const incorrectCount = result.questions.filter(
    (q) => result.userAnswers[q.id] !== q.correctIndex
  ).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Score Hero Card */}
      <div
        className={`animate-fadeInUp rounded-3xl border-2 p-6 sm:p-8 text-pink-950 shadow-[0_20px_50px_rgba(244,114,182,0.25)] relative overflow-hidden ${
          result.isPassed
            ? 'bg-gradient-to-br from-white via-pink-50 to-rose-100 border-pink-300'
            : 'bg-gradient-to-br from-white via-pink-50 to-rose-100 border-rose-300'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 border border-pink-200 shadow-sm">
              <span className="text-sm">🎀</span>
              {result.isPassed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Passing Score Achieved!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span className="text-rose-700">Below 390 Pass Cut-off</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-pink-950">
              {result.title} 🎀
            </h1>
            <p className="text-pink-800 text-sm max-w-xl leading-relaxed font-medium">
              {result.isPassed
                ? 'Congratulations Nata! Your score exceeds the NHA Certified Clinical Medical Assistant passing standard (390 / 500). Hello Kitty is so proud of you!'
                : 'Keep practicing Nata! Focus on the targeted domains below to boost your score above the 390 passing threshold.'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-pink-700 font-bold">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-pink-500" />
                <span>Time Spent: {formatTime(result.timeSpentSeconds)}</span>
              </div>
              <div>•</div>
              <div>
                <span>Raw Score: {result.rawCorrectScored} / {result.totalScoredQuestions} ({result.rawScorePercent}%)</span>
              </div>
            </div>
          </div>

          {/* Scaled Score Hero Badge with Hello Kitty Illustration */}
          <div className="bg-white border-2 border-pink-200 rounded-3xl p-6 text-center min-w-[220px] space-y-2 shadow-md">
            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border border-pink-200 bg-pink-50 p-1 flex items-center justify-center">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ4b2lzYWdxc20zbnc2YmFnd3A1dHZpd2w3M3l6NDVjYXAwZGkyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kZqbBT64ECtjy/giphy.gif"
                alt="Hello Kitty Result"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs text-pink-700 font-black uppercase tracking-wider block">
              NHA Scaled Score
            </span>
            <div
              className={`text-5xl font-black font-mono tracking-tight ${
                result.isPassed ? 'text-emerald-700' : 'text-pink-600'
              }`}
            >
              {result.scaledScore}
            </div>
            <span className="text-xs text-pink-600 block font-mono font-bold">
              / 500 (Passing = 390)
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fadeInUp stagger-2">
        <button
          id="result-btn-review-all"
          onClick={onReviewAll}
          className="p-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-900 font-bold text-xs sm:text-sm border-2 border-pink-200 flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:scale-[1.03] shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-pink-600" />
          <span>Review All Answers ({result.questions.length})</span>
        </button>

        {incorrectCount > 0 && (
          <button
            id="result-btn-review-incorrect"
            onClick={onReviewIncorrectOnly}
            className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs sm:text-sm border-2 border-rose-200 flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:scale-[1.03]"
          >
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Review Missed ({incorrectCount})</span>
          </button>
        )}

        <button
          id="result-btn-retake"
          onClick={onRetake}
          className="p-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-900 font-bold text-xs sm:text-sm border-2 border-pink-200 flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:scale-[1.03] shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-pink-600" />
          <span>Retake Exam</span>
        </button>

        <button
          id="result-btn-go-home"
          onClick={onGoHome}
          className="btn-shimmer p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:scale-[1.03] shadow-md border-2 border-white"
        >
          <Home className="w-4 h-4" />
          <span>Dashboard 🎀</span>
        </button>
      </div>

      {/* Weak Area Diagnostic Banner */}
      {weakestMeta && result.domainScores[result.weakestDomain].total > 0 && (
        <div className="luxury-card-interactive rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fadeInUp stagger-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-pink-100 border border-pink-200 text-pink-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-pink-950 text-sm">
                Recommended Focus Area: {weakestMeta.name} 🎀
              </h4>
              <p className="text-xs text-pink-800/80 mt-0.5 font-medium">
                You scored {result.domainScores[result.weakestDomain].percentage}% in this domain. Targeted drills will quickly boost your board score.
              </p>
            </div>
          </div>

          <button
            id="result-btn-target-domain"
            onClick={() => onTargetWeakDomain(result.weakestDomain)}
            className="btn-shimmer px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs flex items-center gap-1.5 whitespace-nowrap transition-all duration-300 ease-out hover:scale-[1.04] shadow-sm"
          >
            <span>Practice {weakestMeta.shortName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Domain by Domain Breakdown */}
      <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeInUp stagger-4">
        <div>
          <h3 className="font-black text-pink-950 text-lg flex items-center gap-2">
            <span>🎀 Domain-by-Domain Proficiency Breakdown</span>
          </h3>
          <p className="text-xs text-pink-700 font-medium">
            Compare your performance against the official NHA CCMA 7-domain blueprint weights.
          </p>
        </div>

        <div className="space-y-4">
          {(Object.values(result.domainScores) as import('../types').DomainScoreSummary[])
            .filter((ds) => ds.total > 0)
            .map((ds, idx) => {
              const meta = DOMAIN_METADATA[ds.domain];
              const isPassingInDomain = ds.percentage >= 72;

              return (
                <div
                  key={ds.domain}
                  className={`luxury-card-interactive rounded-2xl p-4 space-y-2.5 animate-fadeInUp stagger-${Math.min(idx + 1, 7)}`}
                  style={{ borderColor: `${meta.accentColor}40` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-lg border"
                        style={{ backgroundColor: `${meta.accentColor}18`, borderColor: `${meta.accentColor}40` }}
                      >
                        {getDomainIcon(ds.domain, meta.accentColor)}
                      </span>
                      <span className="font-bold text-pink-950 text-sm">
                        {meta.name}
                      </span>
                      <span
                        className="text-[11px] font-black px-2.5 py-0.5 rounded-full border font-mono"
                        style={{ backgroundColor: `${meta.accentColor}14`, borderColor: `${meta.accentColor}40`, color: meta.accentColor }}
                      >
                        {meta.weightPercent}% Weight
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span className="text-pink-700">
                        {ds.correct} / {ds.total} correct
                      </span>
                      <span
                        className={`text-sm font-black ${
                          isPassingInDomain
                            ? 'text-emerald-700'
                            : 'text-rose-600'
                        }`}
                      >
                        {ds.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Meter */}
                  <div className="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${ds.percentage}%`,
                        background: isPassingInDomain
                          ? `linear-gradient(to right, ${meta.accentColor}99, ${meta.accentColor})`
                          : 'linear-gradient(to right, #fb7185, #f43f5e)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
