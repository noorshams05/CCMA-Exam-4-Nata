import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  ArrowRight,
  BookOpen,
  Calendar,
  Filter,
  BarChart2,
  Sparkles,
} from 'lucide-react';
import { ExamResult } from '../types';
import { formatTime } from '../utils/scoring';
import { clearExamHistory } from '../utils/storage';

interface ScoreHistoryViewProps {
  history: ExamResult[];
  onReviewAttempt: (attempt: ExamResult) => void;
  onRefreshHistory: () => void;
  onGoHome: () => void;
}

export const ScoreHistoryView: React.FC<ScoreHistoryViewProps> = ({
  history,
  onReviewAttempt,
  onRefreshHistory,
  onGoHome,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'passed' | 'failed'>('all');

  const filteredHistory = history.filter((item) => {
    if (filterMode === 'passed') return item.isPassed;
    if (filterMode === 'failed') return !item.isPassed;
    return true;
  });

  const totalAttempts = history.length;
  const passedAttempts = history.filter((h) => h.isPassed).length;
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;
  const avgScaled =
    totalAttempts > 0
      ? Math.round(history.reduce((sum, h) => sum + h.scaledScore, 0) / totalAttempts)
      : 0;
  const highestScore = totalAttempts > 0 ? Math.max(...history.map((h) => h.scaledScore)) : 0;

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your test history? This cannot be undone.')) {
      clearExamHistory();
      onRefreshHistory();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeInUp">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-800 text-xs font-black mb-2 shadow-sm">
            <span>🎀</span>
            <span>Performance History Log</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pink-950 tracking-tight">
            CCMA Exam Attempt History 🎀
          </h1>
          <p className="text-sm text-pink-800/90 mt-1 font-medium">
            Review detailed question-by-question rationales and score trajectories from your previous test sessions.
          </p>
        </div>

        {totalAttempts > 0 && (
          <button
            id="hist-btn-clear"
            onClick={handleClearHistory}
            className="px-3.5 py-2 rounded-2xl border-2 border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all duration-300 ease-out hover:scale-[1.04] shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="luxury-card-interactive rounded-3xl p-5 space-y-1 animate-fadeInUp stagger-2">
          <span className="text-xs text-pink-700 font-bold block">
            Total Attempts
          </span>
          <span className="text-2xl font-black text-pink-950 font-mono">
            {totalAttempts}
          </span>
        </div>

        <div className="luxury-card-interactive rounded-3xl p-5 space-y-1 animate-fadeInUp stagger-3">
          <span className="text-xs text-pink-700 font-bold block">
            Average Scaled Score
          </span>
          <span
            className={`text-2xl font-black font-mono ${
              avgScaled >= 390
                ? 'text-emerald-700'
                : avgScaled > 0
                ? 'text-pink-600'
                : 'text-pink-300'
            }`}
          >
            {avgScaled > 0 ? `${avgScaled}` : '---'}
          </span>
        </div>

        <div className="luxury-card-interactive rounded-3xl p-5 space-y-1 animate-fadeInUp stagger-4">
          <span className="text-xs text-pink-700 font-bold block">
            Highest Score 🎀
          </span>
          <span
            className={`text-2xl font-black font-mono ${
              highestScore >= 390 ? 'text-emerald-700' : 'text-pink-950'
            }`}
          >
            {highestScore > 0 ? `${highestScore}` : '---'}
          </span>
        </div>

        <div className="luxury-card-interactive rounded-3xl p-5 space-y-1 animate-fadeInUp stagger-5">
          <span className="text-xs text-pink-700 font-bold block">
            Simulated Pass Rate
          </span>
          <span className="text-2xl font-black text-pink-950 font-mono">
            {totalAttempts > 0 ? `${passRate}%` : '---'}
          </span>
        </div>
      </div>

      {/* Attempts Table */}
      <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4 animate-fadeInUp stagger-2">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pink-100 pb-4">
          <h3 className="font-black text-pink-950 text-base flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-pink-600" />
            <span>Attempt Log 🎀</span>
          </h3>

          <div className="flex items-center gap-1.5 bg-pink-100/90 p-1.5 rounded-2xl border border-pink-200 text-xs font-bold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-xl transition-all duration-300 ease-out ${
                filterMode === 'all'
                  ? 'bg-pink-500 font-black shadow-sm text-white scale-[1.03]'
                  : 'text-pink-800 hover:text-pink-950'
              }`}
            >
              All ({history.length})
            </button>
            <button
              onClick={() => setFilterMode('passed')}
              className={`px-3 py-1 rounded-xl transition-all duration-300 ease-out ${
                filterMode === 'passed'
                  ? 'bg-emerald-600 font-black shadow-sm text-white scale-[1.03]'
                  : 'text-pink-800 hover:text-pink-950'
              }`}
            >
              Passed ({history.filter((h) => h.isPassed).length})
            </button>
            <button
              onClick={() => setFilterMode('failed')}
              className={`px-3 py-1 rounded-xl transition-all duration-300 ease-out ${
                filterMode === 'failed'
                  ? 'bg-rose-600 font-black shadow-sm text-white scale-[1.03]'
                  : 'text-pink-800 hover:text-pink-950'
              }`}
            >
              Needs Study ({history.filter((h) => !h.isPassed).length})
            </button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="py-12 text-center text-pink-800 space-y-3">
            <Clock className="w-8 h-8 mx-auto text-pink-400" />
            <p className="font-bold text-sm text-pink-950">No exam attempts found yet.</p>
            <button
              onClick={onGoHome}
              className="btn-shimmer px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs transition-all duration-300 ease-out hover:scale-[1.04] shadow-md"
            >
              Launch Practice Exam 🎀
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-pink-100 text-pink-700 uppercase tracking-wider font-black">
                  <th className="pb-3">Date & Time</th>
                  <th className="pb-3">Exam Title</th>
                  <th className="pb-3">Questions</th>
                  <th className="pb-3">Time Spent</th>
                  <th className="pb-3">Scaled Score</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-pink-50/60 transition-colors">
                    <td className="py-3.5 text-pink-800 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </td>
                    <td className="py-3.5 font-bold text-pink-950">
                      {item.title}
                    </td>
                    <td className="py-3.5 text-pink-900 font-mono font-bold">
                      {item.rawCorrectScored} / {item.totalScoredQuestions} ({item.rawScorePercent}%)
                    </td>
                    <td className="py-3.5 text-pink-900 font-mono font-bold">
                      {formatTime(item.timeSpentSeconds)}
                    </td>
                    <td className="py-3.5 font-mono font-black text-pink-950 text-sm">
                      {item.scaledScore} / 500
                    </td>
                    <td className="py-3.5">
                      {item.isPassed ? (
                        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-black">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Passed 🎀</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-xs font-black">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Needs Study</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        id={`hist-btn-review-${item.id}`}
                        onClick={() => onReviewAttempt(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-pink-50 border-2 border-pink-200 text-pink-900 font-bold transition-all inline-flex items-center gap-1 shadow-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-pink-600" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
