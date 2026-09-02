import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar, AppTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { ExamView } from './components/ExamView';
import { ExamResultView } from './components/ExamResultView';
import { ExamReviewView } from './components/ExamReviewView';
import { QuizSetupView } from './components/QuizSetupView';
import { FlashcardsView } from './components/FlashcardsView';
import { StudyGuideView } from './components/StudyGuideView';
import { ScoreHistoryView } from './components/ScoreHistoryView';
import { CCMADomain, ExamMode, ExamResult, ExamSessionState, Question } from './types';
import { generateFullExamQuestions, generateCustomQuizQuestions } from './data/allQuestions';
import { calculateExamScore } from './utils/scoring';
import {
  getExamHistory,
  saveExamResult,
  calculateAggregatedStats,
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('dashboard');
  const [examSession, setExamSession] = useState<ExamSessionState | null>(null);
  const [currentResult, setCurrentResult] = useState<ExamResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [targetDomainForQuiz, setTargetDomainForQuiz] = useState<CCMADomain | undefined>(undefined);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [pendingTab, setPendingTab] = useState<AppTab | null>(null);

  // History and aggregated stats
  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => getExamHistory());
  const stats = calculateAggregatedStats(examHistory);

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const refreshHistory = useCallback(() => {
    const updated = getExamHistory();
    setExamHistory(updated);
  }, []);

  // Handle Exam countdown timer
  useEffect(() => {
    if (examSession && examSession.isTimed && !examSession.isPaused) {
      timerRef.current = setInterval(() => {
        setExamSession((prev) => {
          if (!prev) return null;
          if (prev.timeRemainingSeconds <= 1) {
            // Time is up! Submit automatically
            return {
              ...prev,
              timeRemainingSeconds: 0,
            };
          }
          return {
            ...prev,
            timeRemainingSeconds: prev.timeRemainingSeconds - 1,
          };
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [examSession?.isTimed, examSession?.isPaused]);

  // Handle auto submission if time reaches 0
  useEffect(() => {
    if (examSession && examSession.isTimed && examSession.timeRemainingSeconds === 0) {
      handleFinalSubmitExam();
    }
  }, [examSession?.timeRemainingSeconds]);

  // Launch Full 180-Question Exam Simulator (3 Hours)
  const handleStartFullExam = () => {
    const questions = generateFullExamQuestions();
    const totalTime = 180 * 60; // 3 hours in seconds (10,800 seconds)

    const session: ExamSessionState = {
      isFullExam: true,
      mode: ExamMode.FULL_EXAM,
      title: 'Full NHA CCMA Exam Simulator (180 Qs)',
      questions,
      currentIndex: 0,
      selectedAnswers: {},
      flaggedQuestions: {},
      eliminatedOptions: {},
      timeRemainingSeconds: totalTime,
      totalTimeAllocatedSeconds: totalTime,
      isTimed: true,
      isPaused: false,
      instantFeedback: false,
      startedAt: Date.now(),
    };

    setExamSession(session);
    setCurrentTab('exam');
  };

  // Launch Custom Quiz
  const handleStartCustomQuiz = (options: {
    selectedDomains: CCMADomain[];
    questionCount: number;
    isTimed: boolean;
    timeLimitMinutes: number;
    instantFeedback: boolean;
  }) => {
    const questions = generateCustomQuizQuestions(options.selectedDomains, options.questionCount);
    const totalTimeSeconds = options.isTimed ? options.timeLimitMinutes * 60 : 0;

    let modeTitle = `Practice Quiz (${questions.length} Qs)`;
    if (options.selectedDomains.length === 1) {
      modeTitle = `${options.selectedDomains[0]} (${questions.length} Qs)`;
    }

    const session: ExamSessionState = {
      isFullExam: false,
      mode: ExamMode.PRACTICE_QUIZ,
      title: modeTitle,
      questions,
      currentIndex: 0,
      selectedAnswers: {},
      flaggedQuestions: {},
      eliminatedOptions: {},
      timeRemainingSeconds: totalTimeSeconds,
      totalTimeAllocatedSeconds: totalTimeSeconds,
      isTimed: options.isTimed,
      isPaused: false,
      instantFeedback: options.instantFeedback,
      startedAt: Date.now(),
    };

    setExamSession(session);
    setCurrentTab('exam');
  };

  // Quick launch for targeted weakest domain
  const handleStartTargetedDomainQuiz = (domain: CCMADomain) => {
    setTargetDomainForQuiz(domain);
    setCurrentTab('quiz-setup');
  };

  // Exam Interaction Handlers
  const handleAnswerQuestion = useCallback((questionId: string, optionIndex: number) => {
    setExamSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [questionId]: optionIndex,
        },
      };
    });
  }, []);

  const handleToggleFlag = useCallback((questionId: string) => {
    setExamSession((prev) => {
      if (!prev) return null;
      const currentFlag = !!prev.flaggedQuestions[questionId];
      return {
        ...prev,
        flaggedQuestions: {
          ...prev.flaggedQuestions,
          [questionId]: !currentFlag,
        },
      };
    });
  }, []);

  const handleToggleEliminateOption = useCallback(
    (questionId: string, optionIndex: number) => {
      setExamSession((prev) => {
        if (!prev) return null;
        const currentList = prev.eliminatedOptions[questionId] || [];
        const updated = currentList.includes(optionIndex)
          ? currentList.filter((idx) => idx !== optionIndex)
          : [...currentList, optionIndex];
        return {
          ...prev,
          eliminatedOptions: {
            ...prev.eliminatedOptions,
            [questionId]: updated,
          },
        };
      });
    },
    []
  );

  const handleJumpToQuestion = useCallback((index: number) => {
    setExamSession((prev) => (prev ? { ...prev, currentIndex: index } : null));
  }, []);

  const handleNextQuestion = useCallback(() => {
    setExamSession((prev) => {
      if (!prev) return null;
      if (prev.currentIndex < prev.questions.length - 1) {
        return { ...prev, currentIndex: prev.currentIndex + 1 };
      }
      return prev;
    });
  }, []);

  const handlePrevQuestion = useCallback(() => {
    setExamSession((prev) => {
      if (!prev) return null;
      if (prev.currentIndex > 0) {
        return { ...prev, currentIndex: prev.currentIndex - 1 };
      }
      return prev;
    });
  }, []);

  // Submit Exam and Calculate Results
  const handleFinalSubmitExam = () => {
    if (!examSession) return;

    const timeSpent = examSession.isTimed
      ? examSession.totalTimeAllocatedSeconds - examSession.timeRemainingSeconds
      : Math.round((Date.now() - examSession.startedAt) / 1000);

    const result = calculateExamScore(
      examSession.questions,
      examSession.selectedAnswers,
      examSession.mode,
      examSession.title,
      Math.max(10, timeSpent),
      examSession.flaggedQuestions
    );

    // Save to storage
    saveExamResult(result);
    refreshHistory();

    setCurrentResult(result);
    setExamSession(null);
    setCurrentTab('history'); // We'll show the result view
  };

  const handleRetakeExam = () => {
    if (!currentResult) return;
    const isFull = currentResult.totalQuestions >= 150;
    if (isFull) {
      handleStartFullExam();
    } else {
      const domains = Object.keys(currentResult.domainScores) as CCMADomain[];
      const activeDomains = domains.filter((d) => currentResult.domainScores[d].total > 0);
      handleStartCustomQuiz({
        selectedDomains: activeDomains.length > 0 ? activeDomains : Object.values(CCMADomain),
        questionCount: currentResult.totalQuestions,
        isTimed: true,
        timeLimitMinutes: Math.round(currentResult.totalQuestions * 1.2),
        instantFeedback: false,
      });
    }
  };

  // Exit Exam Modal trigger
  const handlePromptExitExam = (targetTab?: AppTab) => {
    setPendingTab(targetTab || 'dashboard');
    setShowExitConfirm(true);
  };

  const handleConfirmExitExam = () => {
    setShowExitConfirm(false);
    setExamSession(null);
    if (pendingTab) {
      setCurrentTab(pendingTab);
      setPendingTab(null);
    } else {
      setCurrentTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen text-pink-950 flex flex-col font-sans selection:bg-pink-300 selection:text-pink-950">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (examSession && currentTab === 'exam' && tab !== 'exam') {
            handlePromptExitExam(tab);
          } else {
            setCurrentTab(tab);
          }
        }}
        activeExamInProgress={!!examSession}
        onPromptExitExam={() => handlePromptExitExam('dashboard')}
        averageScore={stats.averageScore}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {currentTab === 'dashboard' && (
          <DashboardView
            onStartFullExam={handleStartFullExam}
            onOpenQuizSetup={() => {
              setTargetDomainForQuiz(undefined);
              setCurrentTab('quiz-setup');
            }}
            onStartTargetedDomainQuiz={handleStartTargetedDomainQuiz}
            onOpenFlashcards={() => setCurrentTab('flashcards')}
            onOpenStudyGuide={() => setCurrentTab('study-guide')}
            onOpenHistory={() => setCurrentTab('history')}
            onReviewAttempt={(attempt) => {
              setCurrentResult(attempt);
              setReviewFilter('all');
              setCurrentTab('review');
            }}
            stats={stats}
            recentAttempts={examHistory}
          />
        )}

        {currentTab === 'exam' && examSession && (
          <ExamView
            session={examSession}
            onAnswerQuestion={handleAnswerQuestion}
            onToggleFlag={handleToggleFlag}
            onToggleEliminateOption={handleToggleEliminateOption}
            onJumpToQuestion={handleJumpToQuestion}
            onNextQuestion={handleNextQuestion}
            onPrevQuestion={handlePrevQuestion}
            onSubmitExam={handleFinalSubmitExam}
            onQuitExam={() => handlePromptExitExam('dashboard')}
          />
        )}

        {currentTab === 'quiz-setup' && (
          <QuizSetupView
            defaultDomain={targetDomainForQuiz}
            onStartQuiz={handleStartCustomQuiz}
          />
        )}

        {currentTab === 'flashcards' && <FlashcardsView />}

        {currentTab === 'study-guide' && <StudyGuideView />}

        {currentTab === 'history' && (
          currentResult ? (
            <ExamResultView
              result={currentResult}
              onReviewAll={() => {
                setReviewFilter('all');
                setCurrentTab('review');
              }}
              onReviewIncorrectOnly={() => {
                setReviewFilter('incorrect');
                setCurrentTab('review');
              }}
              onRetake={handleRetakeExam}
              onTargetWeakDomain={(domain) => {
                setTargetDomainForQuiz(domain);
                setCurrentTab('quiz-setup');
              }}
              onGoHome={() => setCurrentTab('dashboard')}
            />
          ) : (
            <ScoreHistoryView
              history={examHistory}
              onReviewAttempt={(attempt) => {
                setCurrentResult(attempt);
                setReviewFilter('all');
                setCurrentTab('review');
              }}
              onRefreshHistory={refreshHistory}
              onGoHome={() => setCurrentTab('dashboard')}
            />
          )
        )}

        {currentTab === 'review' && currentResult && (
          <ExamReviewView
            result={currentResult}
            initialFilter={reviewFilter}
            onBackToResults={() => setCurrentTab('history')}
            onGoHome={() => setCurrentTab('dashboard')}
          />
        )}
      </div>

      {/* Confirmation modal for quitting an in-progress exam */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-pink-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="luxury-card rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="font-display font-bold text-pink-950 text-lg">
              Leave Exam in Progress? 🎀
            </h3>
            <p className="text-xs text-pink-800/80 leading-relaxed font-medium">
              If you leave now, your current exam session answers will be discarded and will not be scored.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2.5 rounded-xl border-2 border-pink-200 bg-white text-pink-800 font-bold text-xs hover:bg-pink-50 transition-all duration-300 ease-out hover:scale-[1.03]"
              >
                Resume Exam
              </button>
              <button
                onClick={handleConfirmExitExam}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-950/30 transition-all duration-300 ease-out hover:scale-[1.03]"
              >
                Discard & Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
