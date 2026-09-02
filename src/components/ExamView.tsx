import React, { useState, useEffect, useCallback } from 'react';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Grid,
  X,
  Sparkles,
  BookOpen,
  Pause,
  Play,
  Stethoscope,
  Brain,
  HeartHandshake,
  ClipboardList,
  MessageSquare,
  ShieldAlert,
  Heart,
} from 'lucide-react';
import { CCMADomain, DOMAIN_METADATA, ExamSessionState, Question } from '../types';
import { formatTime } from '../utils/scoring';
import { HelloKittyCelebration } from './HelloKittyCelebration';

interface ExamViewProps {
  session: ExamSessionState;
  onAnswerQuestion: (questionId: string, optionIndex: number) => void;
  onToggleFlag: (questionId: string) => void;
  onToggleEliminateOption: (questionId: string, optionIndex: number) => void;
  onJumpToQuestion: (index: number) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSubmitExam: () => void;
  onQuitExam: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  session,
  onAnswerQuestion,
  onToggleFlag,
  onToggleEliminateOption,
  onJumpToQuestion,
  onNextQuestion,
  onPrevQuestion,
  onSubmitExam,
  onQuitExam,
}) => {
  const [showNavigator, setShowNavigator] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showRefSheet, setShowRefSheet] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationVariant, setCelebrationVariant] = useState<'correct' | 'incorrect'>('correct');

  const currentQ = session.questions[session.currentIndex];
  const domainMeta = DOMAIN_METADATA[currentQ.domain];
  const selectedAnswer = session.selectedAnswers[currentQ.id];
  const isFlagged = !!session.flaggedQuestions[currentQ.id];
  const eliminatedList = session.eliminatedOptions[currentQ.id] || [];

  const totalAnswered = Object.keys(session.selectedAnswers).length;
  const totalQuestions = session.questions.length;
  const progressPercent = Math.round((totalAnswered / totalQuestions) * 100);
  const unansweredCount = totalQuestions - totalAnswered;

  // Reset rationale & celebration display on question change
  useEffect(() => {
    setShowCelebration(false);
  }, [session.currentIndex]);

  const handleSelectOption = (idx: number) => {
    onAnswerQuestion(currentQ.id, idx);
    // Always pop up a Hello Kitty reaction — happy & sunny when correct,
    // sad with rain clouds when incorrect — so every answer gets a clear verdict.
    setCelebrationVariant(idx === currentQ.correctIndex ? 'correct' : 'incorrect');
    setShowCelebration(true);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSubmitConfirm || showNavigator || showRefSheet) return;

      if (e.key === '1' || e.key === 'a' || e.key === 'A') {
        handleSelectOption(0);
      } else if (e.key === '2' || e.key === 'b' || e.key === 'B') {
        handleSelectOption(1);
      } else if (e.key === '3' || e.key === 'c' || e.key === 'C') {
        handleSelectOption(2);
      } else if (e.key === '4' || e.key === 'd' || e.key === 'D') {
        handleSelectOption(3);
      } else if (e.key === 'f' || e.key === 'F') {
        onToggleFlag(currentQ.id);
      } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        if (session.currentIndex < session.questions.length - 1) {
          onNextQuestion();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
        if (session.currentIndex > 0) {
          onPrevQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentQ.id,
    currentQ.correctIndex,
    session.currentIndex,
    session.questions.length,
    showSubmitConfirm,
    showNavigator,
    showRefSheet,
    onToggleFlag,
    onNextQuestion,
    onPrevQuestion,
  ]);

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

  const optionLabels = ['A', 'B', 'C', 'D'];
  const isSelectedCorrect = selectedAnswer === currentQ.correctIndex;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#fff5f8] text-[#3b0724] flex flex-col justify-between">
      {/* Hello Kitty Reaction Modal — sunny & cheering when right, rainy & sad when wrong */}
      <HelloKittyCelebration
        show={showCelebration}
        onClose={() => setShowCelebration(false)}
        variant={celebrationVariant}
        message={
          celebrationVariant === 'correct'
            ? "Yay Nata! That's Correct! 🎀"
            : 'Aw, not quite, Nata 🌧️'
        }
        subMessage={
          celebrationVariant === 'correct'
            ? 'Hello Kitty is cheering for you! Another point for your CCMA certification! ✨'
            : "Hello Kitty is sad, but she believes in you — check the explanation below and you'll get the next one!"
        }
      />

      {/* Top Test Header & Progress Bar */}
      <div className="bg-white/90 border-b border-pink-200 sticky top-16 z-30 shadow-md backdrop-blur-md">
        {/* Progress meter line */}
        <div className="w-full bg-pink-100 h-2">
          <div
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 h-full transition-all duration-300 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Question Counter & Domain Tag */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-pink-950 text-base sm:text-lg flex items-center gap-1.5">
                <span>🎀</span>
                <span>Question {session.currentIndex + 1}</span>
              </span>
              <span className="text-pink-600 text-xs sm:text-sm font-mono font-bold">of {totalQuestions}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-xs font-bold text-pink-800">
              {getDomainIcon(currentQ.domain)}
              <span>{domainMeta.shortName}</span>
            </div>
          </div>

          {/* Center/Right: Timer, Reference, Navigator & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Countdown Timer */}
            {session.isTimed && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-mono font-extrabold text-xs sm:text-sm border-2 transition-colors ${
                  session.timeRemainingSeconds <= 900 // <15 mins
                    ? 'bg-rose-100 border-rose-400 text-rose-700 animate-pulse'
                    : 'bg-pink-50 border-pink-200 text-pink-900'
                }`}
              >
                <Clock className="w-4 h-4 text-pink-600" />
                <span>{formatTime(session.timeRemainingSeconds)}</span>
              </div>
            )}

            {/* Quick Reference Sheet modal toggle */}
            <button
              id="exam-btn-ref-sheet"
              onClick={() => setShowRefSheet(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-800 border-2 border-pink-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Clinical Reference Sheet (Order of draw, vitals, etc.)"
            >
              <BookOpen className="w-4 h-4 text-pink-600" />
              <span className="hidden sm:inline">Reference</span>
            </button>

            {/* Flag for Review */}
            <button
              id="exam-btn-flag-toggle"
              onClick={() => onToggleFlag(currentQ.id)}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 border-2 transition-all shadow-sm ${
                isFlagged
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'
                  : 'bg-white text-pink-700 border-pink-200 hover:bg-pink-50 hover:text-pink-900'
              }`}
            >
              <Flag className={`w-4 h-4 ${isFlagged ? 'fill-amber-950' : 'text-amber-500'}`} />
              <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>

            {/* Question Navigator Button */}
            <button
              id="exam-btn-open-nav"
              onClick={() => setShowNavigator(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-800 border-2 border-pink-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Grid className="w-4 h-4 text-pink-600" />
              <span className="hidden sm:inline">Grid ({totalAnswered}/{totalQuestions})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Body */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 flex flex-col justify-between">
        <div className="luxury-card rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(244,114,182,0.22)] space-y-6 border-2 border-pink-200">
          {/* Question Stem */}
          <div className="text-pink-950 text-base sm:text-lg font-display font-bold leading-relaxed tracking-tight">
            {currentQ.stem}
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="space-y-3.5 pt-2">
            {currentQ.options.map((optionText, idx) => {
              const isSelected = selectedAnswer === idx;
              const isEliminated = eliminatedList.includes(idx);
              const isCorrectAnswer = idx === currentQ.correctIndex;
              const hasAnswered = selectedAnswer !== undefined;
              const isWrongSelected = hasAnswered && isSelected && !isCorrectAnswer;
              const isRevealedCorrect = hasAnswered && isCorrectAnswer;

              let cardClass = 'bg-white/80 border-pink-200 hover:border-pink-400 text-pink-900 hover:bg-pink-50/70';
              if (isEliminated) {
                cardClass = 'opacity-35 bg-pink-50/50 border-dashed border-pink-200';
              } else if (isRevealedCorrect) {
                cardClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-[0_4px_20px_rgba(16,185,129,0.28)] font-bold';
              } else if (isWrongSelected) {
                cardClass = 'bg-rose-50 border-rose-500 text-rose-950 shadow-[0_4px_20px_rgba(244,63,94,0.28)] font-bold';
              } else if (hasAnswered) {
                cardClass = 'bg-white/50 border-pink-100 text-pink-400';
              } else if (isSelected) {
                cardClass = 'bg-pink-50 border-pink-500 text-pink-950 shadow-[0_4px_20px_rgba(244,63,94,0.25)] font-bold';
              }

              let letterClass = 'bg-pink-100 border border-pink-200 text-pink-700 group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white';
              if (isRevealedCorrect) {
                letterClass = 'bg-emerald-500 text-white shadow-md';
              } else if (isWrongSelected) {
                letterClass = 'bg-rose-500 text-white shadow-md';
              } else if (isSelected) {
                letterClass = 'bg-pink-500 text-white shadow-md';
              }

              return (
                <div
                  key={idx}
                  id={`option-${currentQ.id}-${idx}`}
                  className={`group relative flex items-center justify-between rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 cursor-pointer ${cardClass}`}
                  onClick={() => {
                    if (!isEliminated) {
                      handleSelectOption(idx);
                    }
                  }}
                >
                  <div className="flex items-start gap-4 flex-1 pr-4">
                    {/* Option Letter Indicator */}
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs flex-shrink-0 transition-all ${letterClass}`}
                    >
                      {optionLabels[idx]}
                    </div>
                    {/* Option Text */}
                    <span
                      className={`text-sm sm:text-base leading-relaxed ${
                        isEliminated ? 'line-through text-pink-400' : ''
                      }`}
                    >
                      {optionText}
                    </span>
                  </div>

                  {/* Right/Wrong verdict icon once answered */}
                  {isRevealedCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mr-2" />
                  )}
                  {isWrongSelected && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mr-2" />
                  )}

                  {/* Strike-out (Eliminator) button */}
                  <button
                    id={`btn-strike-${currentQ.id}-${idx}`}
                    type="button"
                    title={isEliminated ? 'Restore option' : 'Cross out / Eliminate option'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleEliminateOption(currentQ.id, idx);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs transition-colors flex-shrink-0 font-bold ${
                      isEliminated
                        ? 'text-rose-600 bg-rose-100 border border-rose-200 hover:bg-rose-200'
                        : 'text-pink-400 hover:text-pink-700 hover:bg-pink-100'
                    }`}
                  >
                    <span className="font-mono text-[11px]">
                      {isEliminated ? 'Undo' : 'Strike'}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right/Wrong Verdict + Clinical Explanation Banner — always shown once answered */}
          {selectedAnswer !== undefined && (
            <div
              className={`p-5 rounded-3xl border-2 space-y-3 animate-fadeIn shadow-md ${
                isSelectedCorrect
                  ? 'bg-gradient-to-r from-emerald-50 via-white to-pink-50 border-emerald-300'
                  : 'bg-gradient-to-r from-rose-50 via-white to-pink-50 border-rose-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div
                  className={`w-16 h-16 bg-white rounded-2xl p-1 border-2 shadow-sm flex items-center justify-center flex-shrink-0 ${
                    isSelectedCorrect ? 'border-emerald-300' : 'border-rose-300'
                  }`}
                >
                  <img
                    src={
                      isSelectedCorrect
                        ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ4b2lzYWdxc20zbnc2YmFnd3A1dHZpd2w3M3l6NDVjYXAwZGkyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kZqbBT64ECtjy/giphy.gif'
                        : 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdyYTczNjdoN2h0a2FsN3NzNGRocTgyMHE4OXJkc3l2YWo5dzQxeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/umk922zX3bVDEyE19D/giphy.gif'
                    }
                    alt={isSelectedCorrect ? 'Hello Kitty Right Answer' : 'Hello Kitty Sad'}
                    className="w-full h-full object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = isSelectedCorrect
                        ? 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjR0OHpscmpsY3l1bjNvaGZlZ3A2N21obzZ4MmtiOHBkaHRvbDNmdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif'
                        : 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmY2dnNnajUwOWRteW9uaWZ4YnJ5bHZyOHlhOWthNnBoNWxxcXo3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VJ5fjfkHj3hydAeWdb/giphy.gif';
                    }}
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div
                    className={`inline-flex items-center gap-1 text-xs font-black px-3 py-0.5 rounded-full border shadow-sm ${
                      isSelectedCorrect
                        ? 'text-emerald-700 bg-white/90 border-emerald-200'
                        : 'text-rose-700 bg-white/90 border-rose-200'
                    }`}
                  >
                    {isSelectedCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    )}
                    <span>{isSelectedCorrect ? 'Correct Answer! 🎀' : 'Incorrect — Not This One 🌧️'}</span>
                  </div>
                  <h4 className={`text-base font-display font-black ${isSelectedCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {isSelectedCorrect
                      ? 'Great job Nata! You nailed this clinical concept! ✨'
                      : "That's alright, Nata — every miss is a step closer to passing! 💪"}
                  </h4>
                </div>
              </div>

              <div className="pt-3 border-t border-pink-100/80 space-y-1.5 text-left">
                <div className="flex items-center gap-2 font-black text-emerald-700 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Correct Answer: Option {optionLabels[currentQ.correctIndex]} — {currentQ.options[currentQ.correctIndex]}
                  </span>
                </div>
                {!isSelectedCorrect && (
                  <div className="flex items-center gap-2 font-black text-rose-700 text-xs sm:text-sm">
                    <XCircle className="w-4 h-4" />
                    <span>
                      You Chose: Option {optionLabels[selectedAnswer]} — {currentQ.options[selectedAnswer]}
                    </span>
                  </div>
                )}
                <p className="text-pink-800 font-medium text-xs sm:text-sm leading-relaxed pt-1">
                  {currentQ.rationale}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="py-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="exam-btn-prev"
              onClick={onPrevQuestion}
              disabled={session.currentIndex === 0}
              className="px-4 py-2.5 rounded-2xl border-2 border-pink-200 bg-white hover:bg-pink-50 disabled:opacity-30 disabled:pointer-events-none text-pink-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              id="exam-btn-next"
              onClick={onNextQuestion}
              disabled={session.currentIndex === totalQuestions - 1}
              className="px-4 py-2.5 rounded-2xl border-2 border-pink-200 bg-white hover:bg-pink-50 disabled:opacity-30 disabled:pointer-events-none text-pink-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="exam-btn-submit-test"
              onClick={() => setShowSubmitConfirm(true)}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs sm:text-sm shadow-[0_4px_20px_rgba(244,63,94,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] border-2 border-white"
            >
              Finish & Score Exam 🎀
            </button>
          </div>
        </div>
      </main>

      {/* Question Navigator Modal Drawer */}
      {showNavigator && (
        <div className="fixed inset-0 z-50 bg-pink-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-pink-300 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="font-black text-pink-950 text-base flex items-center gap-1.5">
                  <span>🎀 Question Navigator</span>
                </h3>
                <p className="text-xs text-pink-600 font-mono font-bold">
                  {totalAnswered} of {totalQuestions} answered • {Object.keys(session.flaggedQuestions).length} flagged
                </p>
              </div>
              <button
                id="exam-nav-close"
                onClick={() => setShowNavigator(false)}
                className="p-2 rounded-xl text-pink-600 hover:text-pink-900 hover:bg-pink-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-pink-500" />
                <span className="text-pink-900">Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-pink-100 border border-pink-200" />
                <span className="text-pink-700">Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-400" />
                <span className="text-amber-900">Flagged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border-2 border-pink-600" />
                <span className="text-pink-900">Current</span>
              </div>
            </div>

            {/* Grid of all question buttons */}
            <div className="overflow-y-auto flex-1 p-1 grid grid-cols-6 sm:grid-cols-10 gap-2 font-mono text-xs">
              {session.questions.map((q, idx) => {
                const isAns = session.selectedAnswers[q.id] !== undefined;
                const isFlg = !!session.flaggedQuestions[q.id];
                const isCurr = session.currentIndex === idx;

                let bgClass = 'bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100';
                if (isFlg) {
                  bgClass = 'bg-amber-400 text-amber-950 font-black shadow-sm';
                } else if (isAns) {
                  bgClass = 'bg-pink-500 text-white font-extrabold shadow-sm';
                }

                return (
                  <button
                    key={q.id}
                    id={`nav-btn-q-${idx + 1}`}
                    onClick={() => {
                      onJumpToQuestion(idx);
                      setShowNavigator(false);
                    }}
                    className={`h-9 rounded-xl flex items-center justify-center transition-all ${bgClass} ${
                      isCurr ? 'ring-2 ring-pink-600 ring-offset-2 ring-offset-white font-black scale-105' : ''
                    } hover:scale-105`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-pink-100 pt-3 flex justify-end">
              <button
                id="exam-nav-done"
                onClick={() => setShowNavigator(false)}
                className="px-4 py-2 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-xs transition-colors"
              >
                Close Navigator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-pink-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-pink-300 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 border-2 border-pink-300 text-pink-600 flex items-center justify-center mx-auto text-2xl">
              🎀
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-black text-pink-950 text-lg">
                Ready to score your CCMA exam?
              </h3>
              <p className="text-xs text-pink-700 leading-relaxed font-medium">
                You have answered <span className="font-bold text-pink-950">{totalAnswered}</span> of <span className="font-bold text-pink-950">{totalQuestions}</span> questions.
              </p>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2 font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
                <span>
                  You have <span className="font-bold">{unansweredCount} unanswered questions</span>. Unanswered questions receive 0 credit.
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="exam-btn-cancel-submit"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2.5 rounded-2xl border-2 border-pink-200 text-pink-800 font-bold text-xs hover:bg-pink-50 transition-colors"
              >
                Return to Exam
              </button>
              <button
                id="exam-btn-confirm-submit"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  onSubmitExam();
                }}
                className="px-4 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-black text-xs shadow-md transition-colors border-2 border-white"
              >
                Confirm Submission 🎀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reference Sheet Modal */}
      {showRefSheet && (
        <div className="fixed inset-0 z-50 bg-pink-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-pink-300 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎀</span>
                <h3 className="font-black text-pink-950 text-base">
                  Clinical Reference Sheet
                </h3>
              </div>
              <button
                id="ref-sheet-close"
                onClick={() => setShowRefSheet(false)}
                className="p-1.5 rounded-xl text-pink-600 hover:text-pink-900 hover:bg-pink-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-4 text-xs text-pink-900">
              {/* Order of Draw Quick Table */}
              <div className="p-4 bg-pink-50/80 border border-pink-200 rounded-2xl space-y-2">
                <h4 className="font-black text-pink-950 uppercase tracking-wider text-[11px]">
                  Venipuncture Order of Draw (CLSI)
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-pink-800 font-medium">
                  <li><span className="font-bold text-amber-600">Yellow:</span> SPS / Blood Cultures (Invert 8-10x)</li>
                  <li><span className="font-bold text-sky-600">Light Blue:</span> Sodium Citrate (PT/INR, PTT; Invert 3-4x)</li>
                  <li><span className="font-bold text-rose-600">Red / Gold (SST):</span> Clot activator / Gel separator (BMP, CMP, Lipids; Invert 5x)</li>
                  <li><span className="font-bold text-emerald-600">Green:</span> Heparin (Ammonia, Electrolytes; Invert 8-10x)</li>
                  <li><span className="font-bold text-purple-600">Lavender:</span> K2 EDTA (CBC, ESR, Hgb A1c; Invert 8-10x)</li>
                  <li><span className="font-bold text-slate-600">Gray:</span> Sodium Fluoride / Potassium Oxalate (Glucose, GTT; Invert 8-10x)</li>
                </ol>
              </div>

              {/* Injection Specs Quick Table */}
              <div className="p-4 bg-pink-50/80 border border-pink-200 rounded-2xl space-y-2">
                <h4 className="font-black text-pink-950 uppercase tracking-wider text-[11px]">
                  Injection Angles & Needle Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-3 bg-white rounded-xl border border-pink-200">
                    <span className="font-black block text-emerald-700">IM (Intramuscular)</span>
                    <span>Angle: 90°</span><br />
                    <span>Gauge: 20-23G</span><br />
                    <span>Length: 1 - 1.5 in</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-pink-200">
                    <span className="font-black block text-pink-600">SubQ (Subcutaneous)</span>
                    <span>Angle: 45° (or 90°)</span><br />
                    <span>Gauge: 25-27G</span><br />
                    <span>Length: 3/8 - 5/8 in</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-pink-200">
                    <span className="font-black block text-purple-600">ID (Intradermal)</span>
                    <span>Angle: 10-15°</span><br />
                    <span>Gauge: 26-27G</span><br />
                    <span>Length: 3/8 - 1/2 in</span>
                  </div>
                </div>
              </div>

              {/* Vital Signs Quick Table */}
              <div className="p-4 bg-pink-50/80 border border-pink-200 rounded-2xl space-y-1.5 font-medium">
                <h4 className="font-black text-pink-950 uppercase tracking-wider text-[11px]">
                  Adult Normal Vital Sign Reference
                </h4>
                <p>• BP: &lt;120 / &lt;80 mmHg</p>
                <p>• HR: 60 - 100 bpm</p>
                <p>• Respiratory Rate: 12 - 20 breaths/min</p>
                <p>• Oral Temp: 97.6°F - 99.6°F (37°C)</p>
                <p>• BMI: Normal = 18.5 - 24.9 kg/m²</p>
              </div>
            </div>

            <div className="pt-2 border-t border-pink-100 flex justify-end">
              <button
                id="ref-sheet-done-btn"
                onClick={() => setShowRefSheet(false)}
                className="px-4 py-2 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs transition-colors"
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
