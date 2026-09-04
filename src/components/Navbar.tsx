import React from 'react';
import { BarChart3, Zap, RotateCcw, FileSpreadsheet, Award, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export type AppTab = 'dashboard' | 'exam' | 'quiz-setup' | 'flashcards' | 'study-guide' | 'history' | 'review';

interface NavbarProps {
  currentTab: AppTab;
  onNavigate: (tab: AppTab) => void;
  activeExamInProgress: boolean;
  onPromptExitExam: () => void;
  averageScore: number;
}

const items: Array<{ id: AppTab; label: string; short: string; icon: React.ElementType }> = [
  { id: 'dashboard', label: 'Dashboard', short: 'Home', icon: BarChart3 },
  { id: 'quiz-setup', label: 'Practice Quiz', short: 'Quiz', icon: Zap },
  { id: 'flashcards', label: 'Flashcards', short: 'Cards', icon: RotateCcw },
  { id: 'study-guide', label: 'Cheat Sheets', short: 'Guides', icon: FileSpreadsheet },
  { id: 'history', label: 'Score Log', short: 'Scores', icon: Award },
];

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, activeExamInProgress, onPromptExitExam, averageScore }) => {
  const handleNavClick = (tab: AppTab) => {
    if (activeExamInProgress && currentTab === 'exam' && tab !== 'exam') {
      onPromptExitExam();
      return;
    }
    onNavigate(tab);
  };

  return (
    <header className="premium-nav sticky top-0 z-50">
      <div className="love-ribbon">
        <div className="love-ribbon__inner">
          <span className="bow-mark" aria-hidden="true" />
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>I love you Nata</span>
          <Sparkles className="w-3.5 h-3.5" />
          <span className="bow-mark" aria-hidden="true" />
        </div>
      </div>

      <div className="nav-shell">
        <button onClick={() => handleNavClick('dashboard')} className="brand-lockup" aria-label="Go to dashboard">
          <motion.span whileHover={{ rotate: -7, scale: 1.06 }} className="brand-bow-wrap">
            <span className="bow-mark bow-mark--large" aria-hidden="true" />
          </motion.span>
          <span className="brand-copy">
            <span className="brand-title">CCMA<span>♡</span>MASTER</span>
            <span className="brand-subtitle">NHA BOARD PREP · HELLO KITTY EDITION</span>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {items.map(({ id, label, icon: Icon }) => {
            const active = currentTab === id;
            return (
              <button key={id} onClick={() => handleNavClick(id)} className={`nav-pill ${active ? 'is-active' : ''}`}>
                {active && <motion.span layoutId="nav-active" className="nav-pill__active" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="score-chip">
          <span>{averageScore > 0 ? 'AVERAGE' : 'PASS CUT'}</span>
          <strong className={averageScore >= 390 ? 'is-passing' : ''}>{averageScore > 0 ? averageScore : '390+'}</strong>
          <small>/ 500</small>
          {averageScore >= 390 && <CheckCircle2 className="w-4 h-4" />}
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {items.map(({ id, short, icon: Icon }) => (
          <button key={id} onClick={() => handleNavClick(id)} className={currentTab === id ? 'is-active' : ''}>
            <Icon className="w-4 h-4" />
            <span>{short}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};
