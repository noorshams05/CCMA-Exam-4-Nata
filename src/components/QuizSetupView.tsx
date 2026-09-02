import React, { useState } from 'react';
import {
  Zap,
  Clock,
  BookOpen,
  CheckSquare,
  Square,
  Layers,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Brain,
  HeartHandshake,
  ClipboardList,
  MessageSquare,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { CCMADomain, DOMAIN_METADATA } from '../types';
import { ALL_QUESTIONS } from '../data/allQuestions';

interface QuizSetupViewProps {
  onStartQuiz: (options: {
    selectedDomains: CCMADomain[];
    questionCount: number;
    isTimed: boolean;
    timeLimitMinutes: number;
    instantFeedback: boolean;
  }) => void;
  defaultDomain?: CCMADomain;
}

export const QuizSetupView: React.FC<QuizSetupViewProps> = ({
  onStartQuiz,
  defaultDomain,
}) => {
  const [selectedDomains, setSelectedDomains] = useState<CCMADomain[]>(
    defaultDomain ? [defaultDomain] : Object.values(CCMADomain)
  );
  const [questionCount, setQuestionCount] = useState<number>(25);
  const [isTimed, setIsTimed] = useState<boolean>(true);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(false);

  const toggleDomain = (domain: CCMADomain) => {
    if (selectedDomains.includes(domain)) {
      if (selectedDomains.length > 1) {
        setSelectedDomains(selectedDomains.filter((d) => d !== domain));
      }
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const selectAllDomains = () => {
    setSelectedDomains(Object.values(CCMADomain));
  };

  const availableQuestionsCount = ALL_QUESTIONS.filter((q) =>
    selectedDomains.includes(q.domain)
  ).length;

  const actualQuestionCount = Math.min(questionCount, availableQuestionsCount);

  const handleLaunch = () => {
    onStartQuiz({
      selectedDomains,
      questionCount: actualQuestionCount,
      isTimed,
      timeLimitMinutes: isTimed ? timeLimitMinutes : 0,
      instantFeedback,
    });
  };

  const getDomainIcon = (domain: CCMADomain) => {
    switch (domain) {
      case CCMADomain.CLINICAL_PATIENT_CARE:
        return <Stethoscope className="w-4 h-4 text-pink-600" />;
      case CCMADomain.FOUNDATIONAL_KNOWLEDGE:
        return <Brain className="w-4 h-4 text-rose-500" />;
      case CCMADomain.CARE_COORDINATION_EDUCATION:
        return <HeartHandshake className="w-4 h-4 text-pink-500" />;
      case CCMADomain.ADMINISTRATIVE_ASSISTING:
        return <ClipboardList className="w-4 h-4 text-fuchsia-500" />;
      case CCMADomain.COMMUNICATION:
        return <MessageSquare className="w-4 h-4 text-pink-500" />;
      case CCMADomain.MEDICAL_LAW_ETHICS:
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      default:
        return <Stethoscope className="w-4 h-4 text-pink-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-800 text-xs font-black mb-2 shadow-sm">
          <span>🎀</span>
          <span>Custom CCMA Practice Builder</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-pink-950 tracking-tight">
          Create Custom Practice Quiz 🎀
        </h1>
        <p className="text-sm text-pink-800/90 mt-1 font-medium">
          Configure a targeted quiz by selecting specific NHA domains, question volume, timing, and instant clinical rationales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Domain Selection & Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Domain Selection */}
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-pink-950 text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-pink-600" />
                <span>Select Exam Domains</span>
              </h2>
              <button
                id="quiz-btn-select-all"
                type="button"
                onClick={selectAllDomains}
                className="text-xs font-black text-pink-600 hover:text-pink-700 transition-colors"
              >
                Select All 7 Domains
              </button>
            </div>

            <div className="space-y-2.5">
              {Object.values(DOMAIN_METADATA).map((meta) => {
                const isChecked = selectedDomains.includes(meta.id);
                const count = ALL_QUESTIONS.filter((q) => q.domain === meta.id).length;

                return (
                  <div
                    key={meta.id}
                    id={`quiz-domain-select-${meta.id}`}
                    onClick={() => toggleDomain(meta.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'border-pink-400 bg-pink-50 shadow-[0_4px_14px_rgba(244,114,182,0.2)]'
                        : 'border-pink-100 bg-white/80 opacity-80 hover:opacity-100 hover:border-pink-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-pink-600 flex-shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-pink-300 flex-shrink-0" />
                      )}
                      <div className="flex items-center gap-2">
                        {getDomainIcon(meta.id)}
                        <div>
                          <span className="font-bold text-pink-950 text-xs sm:text-sm block">
                            {meta.name}
                          </span>
                          <span className="text-[11px] text-pink-700 font-medium">
                            {meta.weightPercent}% exam weight • {count} questions in bank
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="font-black text-pink-950 text-base">
              Question Count 🎀
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {[10, 25, 50, 80].map((count) => (
                <button
                  key={count}
                  id={`quiz-btn-count-${count}`}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`p-3 rounded-2xl border-2 font-mono font-black text-sm transition-all ${
                    questionCount === count
                      ? 'border-pink-400 bg-pink-500 text-white shadow-md'
                      : 'border-pink-200 bg-white text-pink-900 hover:bg-pink-50'
                  }`}
                >
                  {count} Qs
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & Mode Mode Options */}
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="font-black text-pink-950 text-base">
              Learning Mode & Timing
            </h2>

            <div className="space-y-3">
              {/* Instant Feedback Toggle */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl border-2 border-pink-100 bg-white/80 cursor-pointer hover:border-pink-200 transition-colors">
                <input
                  id="quiz-check-instant-feedback"
                  type="checkbox"
                  checked={instantFeedback}
                  onChange={(e) => setInstantFeedback(e.target.checked)}
                  className="mt-1 rounded text-pink-600 focus:ring-pink-500 h-4 w-4 bg-pink-50 border-pink-300"
                />
                <div>
                  <span className="font-bold text-pink-950 text-xs sm:text-sm block">
                    Study Mode (Immediate Clinical Rationale)
                  </span>
                  <span className="text-xs text-pink-700 leading-relaxed font-medium">
                    View in-depth explanation and test rationale immediately after answering each question.
                  </span>
                </div>
              </label>

              {/* Timer Toggle */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl border-2 border-pink-100 bg-white/80 cursor-pointer hover:border-pink-200 transition-colors">
                <input
                  id="quiz-check-timed"
                  type="checkbox"
                  checked={isTimed}
                  onChange={(e) => setIsTimed(e.target.checked)}
                  className="mt-1 rounded text-pink-600 focus:ring-pink-500 h-4 w-4 bg-pink-50 border-pink-300"
                />
                <div className="flex-1">
                  <span className="font-bold text-pink-950 text-xs sm:text-sm block">
                    Timed Quiz Mode
                  </span>
                  <span className="text-xs text-pink-700 leading-relaxed font-medium">
                    Set a countdown clock to practice clinical pacing under pressure (~1 min per question).
                  </span>

                  {isTimed && (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xs font-bold text-pink-900">
                        Time limit:
                      </span>
                      <div className="flex items-center gap-2">
                        {[15, 30, 45, 60].map((mins) => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => setTimeLimitMinutes(mins)}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border-2 transition-all ${
                              timeLimitMinutes === mins
                                ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                                : 'bg-white text-pink-800 border-pink-200 hover:bg-pink-50'
                            }`}
                          >
                            {mins}m
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Col: Summary & Launch CTA */}
        <div className="space-y-6">
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-5 sticky top-24">
            <h3 className="font-black text-lg text-pink-950 flex items-center gap-2">
              <span>🎀 Quiz Summary</span>
            </h3>

            <div className="space-y-3 text-xs text-pink-900 font-medium">
              <div className="flex justify-between border-b border-pink-100 pb-2">
                <span className="text-pink-700">Domains Selected:</span>
                <span className="font-bold text-pink-950">{selectedDomains.length} / 6</span>
              </div>
              <div className="flex justify-between border-b border-pink-100 pb-2">
                <span className="text-pink-700">Total Questions:</span>
                <span className="font-black text-pink-600 font-mono text-sm">
                  {actualQuestionCount}
                </span>
              </div>
              <div className="flex justify-between border-b border-pink-100 pb-2">
                <span className="text-pink-700">Estimated Duration:</span>
                <span className="font-bold text-pink-950">
                  {isTimed ? `${timeLimitMinutes} minutes` : 'Untimed'}
                </span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-pink-700">Mode:</span>
                <span className="font-bold text-pink-950">
                  {instantFeedback ? 'Study (Instant Rationale)' : 'Exam (Score at End)'}
                </span>
              </div>
            </div>

            <button
              id="quiz-btn-start-now"
              type="button"
              onClick={handleLaunch}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(244,114,182,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] border-2 border-white"
            >
              <span>Start Practice Quiz 🎀</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
