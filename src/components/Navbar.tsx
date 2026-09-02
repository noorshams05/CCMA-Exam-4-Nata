import React from 'react';
import {
  Stethoscope,
  BookOpen,
  Zap,
  RotateCcw,
  BarChart3,
  FileSpreadsheet,
  Award,
  CheckCircle2,
  Heart,
  Sparkles,
} from 'lucide-react';

export type AppTab =
  | 'dashboard'
  | 'exam'
  | 'quiz-setup'
  | 'flashcards'
  | 'study-guide'
  | 'history'
  | 'review';

interface NavbarProps {
  currentTab: AppTab;
  onNavigate: (tab: AppTab) => void;
  activeExamInProgress: boolean;
  onPromptExitExam: () => void;
  averageScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  activeExamInProgress,
  onPromptExitExam,
  averageScore,
}) => {
  const handleNavClick = (tab: AppTab) => {
    if (activeExamInProgress && currentTab === 'exam' && tab !== 'exam') {
      onPromptExitExam();
      return;
    }
    onNavigate(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 border-b border-pink-200 text-[#4a1d34] shadow-[0_4px_25px_rgba(244,114,182,0.18)] backdrop-blur-xl">
      {/* Top dedicated Hello Kitty luxury note for Nata */}
      <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 py-2 px-4 text-center text-xs shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <div className="flex items-center gap-2.5 px-4 py-1 rounded-full bg-white/90 text-pink-700 font-extrabold text-xs shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-pink-100">
            <span className="text-base">🎀</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="tracking-tight text-pink-800 text-sm font-black">I love you Nata</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-base">🎀</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div
            id="nav-brand-logo"
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center font-extrabold text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] group-hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] group-hover:scale-105 transition-all duration-300 border-2 border-white">
              <span className="text-xl">🎀</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg tracking-tight text-pink-950 group-hover:text-pink-600 transition-colors">
                  CCMA <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Mastery</span>
                </h1>
                <span className="bg-pink-100 text-pink-700 border border-pink-300 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <span>Hello Kitty Edition</span>
                  <span>✨</span>
                </span>
              </div>
              <p className="text-[11px] text-pink-600/80 hidden sm:block tracking-tight font-semibold">
                NHA Board Simulation for Nata 💖
              </p>
            </div>
          </div>

          {/* Desktop Nav items */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold">
            <button
              id="nav-btn-dashboard"
              onClick={() => handleNavClick('dashboard')}
              className={`px-4 py-2 rounded-2xl transition-all duration-200 flex items-center gap-2 ${
                currentTab === 'dashboard'
                  ? 'bg-pink-500 text-white font-black shadow-[0_4px_15px_rgba(236,72,153,0.35)]'
                  : 'text-pink-900/80 hover:bg-pink-100/70 hover:text-pink-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              id="nav-btn-quick-quiz"
              onClick={() => handleNavClick('quiz-setup')}
              className={`px-4 py-2 rounded-2xl transition-all duration-200 flex items-center gap-2 ${
                currentTab === 'quiz-setup'
                  ? 'bg-pink-500 text-white font-black shadow-[0_4px_15px_rgba(236,72,153,0.35)]'
                  : 'text-pink-900/80 hover:bg-pink-100/70 hover:text-pink-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Practice Quiz</span>
            </button>

            <button
              id="nav-btn-flashcards"
              onClick={() => handleNavClick('flashcards')}
              className={`px-4 py-2 rounded-2xl transition-all duration-200 flex items-center gap-2 ${
                currentTab === 'flashcards'
                  ? 'bg-pink-500 text-white font-black shadow-[0_4px_15px_rgba(236,72,153,0.35)]'
                  : 'text-pink-900/80 hover:bg-pink-100/70 hover:text-pink-900'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Flashcards</span>
            </button>

            <button
              id="nav-btn-study-guide"
              onClick={() => handleNavClick('study-guide')}
              className={`px-4 py-2 rounded-2xl transition-all duration-200 flex items-center gap-2 ${
                currentTab === 'study-guide'
                  ? 'bg-pink-500 text-white font-black shadow-[0_4px_15px_rgba(236,72,153,0.35)]'
                  : 'text-pink-900/80 hover:bg-pink-100/70 hover:text-pink-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Cheat Sheets</span>
            </button>

            <button
              id="nav-btn-history"
              onClick={() => handleNavClick('history')}
              className={`px-4 py-2 rounded-2xl transition-all duration-200 flex items-center gap-2 ${
                currentTab === 'history'
                  ? 'bg-pink-500 text-white font-black shadow-[0_4px_15px_rgba(236,72,153,0.35)]'
                  : 'text-pink-900/80 hover:bg-pink-100/70 hover:text-pink-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Score Log</span>
            </button>
          </nav>

          {/* Right Action / Pass Gauge indicator */}
          <div className="flex items-center gap-4">
            {averageScore > 0 ? (
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-pink-700 font-extrabold flex items-center gap-1">
                  Avg Scaled Score
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-xl font-mono font-black ${
                      averageScore >= 390 ? 'text-emerald-600 drop-shadow-sm' : 'text-pink-600'
                    }`}
                  >
                    {averageScore}
                  </span>
                  <span className="text-xs text-pink-500 font-mono font-bold">/ 500</span>
                  {averageScore >= 390 && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" />
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex flex-col items-end bg-pink-100/80 px-3.5 py-1.5 rounded-2xl border border-pink-200">
                <span className="text-[9px] uppercase tracking-widest text-pink-700 font-bold">
                  Target Cut Score
                </span>
                <span className="text-xs font-mono font-extrabold text-pink-900">390+ / 500 (Pass 🎀)</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-pink-200 text-xs text-pink-900">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`py-1.5 px-3 rounded-xl transition-all font-bold ${
              currentTab === 'dashboard' ? 'text-white bg-pink-500' : 'text-pink-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick('quiz-setup')}
            className={`py-1.5 px-3 rounded-xl transition-all font-bold ${
              currentTab === 'quiz-setup' ? 'text-white bg-pink-500' : 'text-pink-700'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => handleNavClick('flashcards')}
            className={`py-1.5 px-3 rounded-xl transition-all font-bold ${
              currentTab === 'flashcards' ? 'text-white bg-pink-500' : 'text-pink-700'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => handleNavClick('study-guide')}
            className={`py-1.5 px-3 rounded-xl transition-all font-bold ${
              currentTab === 'study-guide' ? 'text-white bg-pink-500' : 'text-pink-700'
            }`}
          >
            Guides
          </button>
          <button
            onClick={() => handleNavClick('history')}
            className={`py-1.5 px-3 rounded-xl transition-all font-bold ${
              currentTab === 'history' ? 'text-white bg-pink-500' : 'text-pink-700'
            }`}
          >
            Log
          </button>
        </div>
      </div>
    </header>
  );
};
