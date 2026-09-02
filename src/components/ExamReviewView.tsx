import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Flag,
  Bookmark,
  Filter,
  Search,
  BookOpen,
  Sparkles,
  Stethoscope,
  Brain,
  HeartHandshake,
  ClipboardList,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react';
import { CCMADomain, DOMAIN_METADATA, ExamResult, Question } from '../types';
import { toggleBookmarkedQuestion, getBookmarkedQuestionIds } from '../utils/storage';

interface ExamReviewViewProps {
  result: ExamResult;
  initialFilter?: 'all' | 'incorrect' | 'flagged';
  onBackToResults: () => void;
  onGoHome: () => void;
}

export const ExamReviewView: React.FC<ExamReviewViewProps> = ({
  result,
  initialFilter = 'all',
  onBackToResults,
  onGoHome,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'incorrect' | 'flagged'>(initialFilter);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarkedQuestionIds());

  const handleBookmark = (qId: string) => {
    toggleBookmarkedQuestion(qId);
    setBookmarkedIds(getBookmarkedQuestionIds());
  };

  const filteredQuestions = result.questions.filter((q, index) => {
    const userAnswer = result.userAnswers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    const isFlagged = !!result.flagged[q.id];

    // Filter type check
    if (filterType === 'incorrect' && isCorrect) return false;
    if (filterType === 'flagged' && !isFlagged) return false;

    // Domain filter check
    if (selectedDomain !== 'all' && q.domain !== selectedDomain) return false;

    // Search query
    if (searchQuery.trim()) {
      const qText = `${q.stem} ${q.subtopic} ${q.rationale} ${q.options.join(' ')}`.toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase())) return false;
    }

    return true;
  });

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

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-200 pb-4">
        <div>
          <button
            id="review-btn-back"
            onClick={onBackToResults}
            className="text-xs font-black text-pink-600 flex items-center gap-1.5 hover:text-pink-700 mb-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Score Report</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-pink-950 flex items-center gap-2">
            <span>🎀 Exam Review & Detailed Rationales</span>
          </h1>
          <p className="text-xs text-pink-700 font-medium">
            {result.title} • {result.scaledScore} / 500 Scaled ({result.isPassed ? 'Passed' : 'Needs Study'})
          </p>
        </div>

        <button
          id="review-btn-home"
          onClick={onGoHome}
          className="px-4 py-2 rounded-2xl bg-white border-2 border-pink-200 hover:bg-pink-50 text-pink-900 text-xs font-bold self-start sm:self-auto transition-all shadow-sm"
        >
          Return to Dashboard
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="luxury-card border-2 border-pink-200 rounded-3xl p-4 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-pink-100/90 p-1.5 rounded-2xl text-xs font-bold border border-pink-200">
            <button
              id="review-tab-all"
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                filterType === 'all'
                  ? 'bg-pink-500 text-white font-black shadow-sm'
                  : 'text-pink-800 hover:text-pink-950'
              }`}
            >
              All ({result.questions.length})
            </button>
            <button
              id="review-tab-incorrect"
              onClick={() => setFilterType('incorrect')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                filterType === 'incorrect'
                  ? 'bg-rose-500 text-white font-black shadow-sm'
                  : 'text-pink-800 hover:text-pink-950'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>
                Missed (
                {
                  result.questions.filter(
                    (q) => result.userAnswers[q.id] !== q.correctIndex
                  ).length
                }
                )
              </span>
            </button>
            <button
              id="review-tab-flagged"
              onClick={() => setFilterType('flagged')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                filterType === 'flagged'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-sm'
                  : 'text-pink-800 hover:text-pink-950'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Flagged ({Object.keys(result.flagged).length})</span>
            </button>
          </div>

          {/* Domain Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-pink-600" />
            <select
              id="review-select-domain"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-white border-2 border-pink-200 text-pink-900 text-xs rounded-2xl px-3.5 py-1.5 font-bold outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="all">All Domains ({result.questions.length})</option>
              {Object.values(DOMAIN_METADATA).map((meta) => {
                const count = result.questions.filter((q) => q.domain === meta.id).length;
                if (count === 0) return null;
                return (
                  <option key={meta.id} value={meta.id}>
                    {meta.shortName} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400" />
          <input
            id="review-search-input"
            type="text"
            placeholder="Search keywords, vitals, drugs, EKG leads, guidelines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border-2 border-pink-200 text-xs text-pink-950 placeholder-pink-400 outline-none focus:ring-2 focus:ring-pink-400 font-medium"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-8 text-center text-pink-800 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-pink-500" />
            <p className="font-bold text-sm text-pink-950">No questions match your current filters.</p>
            <p className="text-xs text-pink-700">Try selecting a different filter tab or clearing your search.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const originalIndex = result.questions.findIndex((item) => item.id === q.id);
            const userAnswer = result.userAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            const isUnanswered = userAnswer === undefined;
            const isFlagged = !!result.flagged[q.id];
            const isBookmarked = bookmarkedIds.includes(q.id);
            const meta = DOMAIN_METADATA[q.domain];

            return (
              <div
                key={q.id}
                id={`review-question-card-${q.id}`}
                className={`luxury-card border-2 rounded-3xl p-6 shadow-sm space-y-5 transition-all ${
                  isCorrect
                    ? 'border-pink-200 bg-white/90'
                    : 'border-rose-300 bg-rose-50/50'
                }`}
              >
                {/* Header: Question Number, Domain, Status Badge & Bookmark */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-pink-950 text-sm">
                      #{originalIndex + 1}
                    </span>

                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 border border-pink-200 text-[11px] font-bold text-pink-800">
                      {getDomainIcon(q.domain)}
                      <span>{meta.shortName}</span>
                    </div>

                    <span className="text-[11px] text-pink-700 font-semibold">
                      • {q.subtopic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Badge */}
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-black">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correct 🎀</span>
                      </span>
                    ) : isUnanswered ? (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold">
                        <span>Unanswered</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-black">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Incorrect</span>
                      </span>
                    )}

                    {isFlagged && (
                      <span className="p-1 rounded bg-amber-400 text-amber-950 text-xs font-bold" title="Flagged during test">
                        <Flag className="w-3.5 h-3.5 fill-current" />
                      </span>
                    )}

                    {/* Bookmark Toggle */}
                    <button
                      id={`btn-bookmark-${q.id}`}
                      onClick={() => handleBookmark(q.id)}
                      className={`p-1.5 rounded-xl border-2 text-xs transition-all ${
                        isBookmarked
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-white text-pink-600 hover:text-pink-950 border-pink-200'
                      }`}
                      title={isBookmarked ? 'Saved in Bookmarks' : 'Bookmark Question'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Stem */}
                <div className="text-pink-950 text-base font-bold leading-relaxed">
                  {q.stem}
                </div>

                {/* Choices */}
                <div className="space-y-2.5">
                  {q.options.map((optionText, optIdx) => {
                    const isUserChoice = userAnswer === optIdx;
                    const isCorrectAnswer = q.correctIndex === optIdx;

                    let rowStyle = 'bg-white/80 border-pink-200 text-pink-900';
                    let badgeStyle = 'bg-pink-100 text-pink-700 font-bold';

                    if (isCorrectAnswer) {
                      rowStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                      badgeStyle = 'bg-emerald-600 text-white font-black';
                    } else if (isUserChoice && !isCorrect) {
                      rowStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                      badgeStyle = 'bg-rose-600 text-white font-black';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-start justify-between rounded-2xl border-2 p-3.5 text-xs sm:text-sm ${rowStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs flex-shrink-0 ${badgeStyle}`}
                          >
                            {optionLetters[optIdx]}
                          </span>
                          <span className="leading-relaxed pt-0.5">{optionText}</span>
                        </div>

                        <div className="flex-shrink-0 pl-3">
                          {isCorrectAnswer && (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-black text-xs">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Correct Answer 🎀</span>
                            </span>
                          )}
                          {isUserChoice && !isCorrect && (
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold text-xs">
                              <XCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Your Selection</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Clinical Rationale Box */}
                <div className="p-4 rounded-2xl bg-pink-50/80 border-2 border-pink-200 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-pink-700">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span>Clinical Rationale & Exam Concept 🎀:</span>
                  </div>
                  <p className="text-pink-900 font-medium leading-relaxed">
                    {q.rationale}
                  </p>
                  {q.clinicalConcept && (
                    <div className="pt-1 text-[11px] text-pink-700 font-semibold">
                      <span>Core Concept:</span> {q.clinicalConcept}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
