import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Play, Zap, RotateCcw, BookOpen, Award, ArrowRight, Stethoscope, Brain,
  HeartHandshake, ClipboardList, MessageSquare, ShieldAlert, CalendarClock,
  Target, TrendingUp, Clock, CheckCircle2, XCircle, Sparkles
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

const iconFor = (domain: CCMADomain) => {
  switch (domain) {
    case CCMADomain.CLINICAL_PATIENT_CARE: return Stethoscope;
    case CCMADomain.FOUNDATIONAL_KNOWLEDGE: return Brain;
    case CCMADomain.CARE_COORDINATION_EDUCATION: return HeartHandshake;
    case CCMADomain.ADMINISTRATIVE_ASSISTING: return ClipboardList;
    case CCMADomain.COMMUNICATION: return MessageSquare;
    case CCMADomain.MEDICAL_LAW_ETHICS: return ShieldAlert;
    default: return Stethoscope;
  }
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartFullExam, onOpenQuizSetup, onStartTargetedDomainQuiz, onOpenFlashcards,
  onOpenStudyGuide, onOpenHistory, onReviewAttempt, stats, recentAttempts,
}) => {
  const EXAM_DATE = new Date('2026-09-23T00:00:00');
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);

  const msRemaining = EXAM_DATE.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(msRemaining / 86400000));
  const hoursLeft = msRemaining > 0 ? Math.max(0, Math.floor((msRemaining / 3600000) % 24)) : 0;
  const minutesLeft = msRemaining > 0 ? Math.max(0, Math.floor((msRemaining / 60000) % 60)) : 0;
  const examHasPassed = msRemaining <= 0;
  const weakestMeta = stats.overallWeakestDomain ? DOMAIN_METADATA[stats.overallWeakestDomain] : null;
  const weakestName = weakestMeta?.name || 'your lowest-scoring domain';
  const scoreWidth = stats.averageScore > 0 ? Math.min(100, Math.max(8, ((stats.averageScore - 200) / 300) * 100)) : 0;

  const gameplan = examHasPassed
    ? ['Review your latest misses while the logic is still fresh.', 'Keep one targeted domain drill in your daily rotation.', 'Use flashcards for fast terminology recall.']
    : daysLeft > 14
      ? [`Start with ${weakestName}.`, 'Complete one full 180-question simulation this week.', 'Review every missed rationale instead of memorizing answers.', 'Keep a 15-minute flashcard block each day.']
      : daysLeft > 3
        ? [`Prioritize ${weakestName}.`, 'Complete 1–2 timed simulations for stamina.', 'Revisit flagged and repeatedly missed questions.', 'Protect sleep, hydration and pacing.']
        : ['Light review only.', 'Scan cheat sheets and repeat-miss rationales.', 'Confirm exam-day logistics and ID.', 'Protect sleep and arrive early.'];

  const examDateLabel = EXAM_DATE.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="dashboard-luxe">
      <motion.section className="hero-luxe" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: [0.16,1,.3,1] }}>
        <div className="hero-luxe__grid">
          <div>
            <div className="eyebrow"><span className="bow-mark" /><span>NHA CCMA · HELLO KITTY EDITION</span><Sparkles className="w-3.5 h-3.5" /></div>
            <h1>Study like it’s a <em>private academy.</em></h1>
            <p>A focused board-prep system for Nata: full-length simulation, custom drills, flashcards, cheat sheets, scaled scoring and performance tracking—wrapped in a polished Hello Kitty-inspired experience.</p>
            <div className="hero-actions">
              <button onClick={onStartFullExam} className="hero-btn hero-btn--primary btn-shimmer"><Play className="w-4 h-4 fill-current" /> Launch 180-Q Simulation</button>
              <button onClick={onOpenQuizSetup} className="hero-btn hero-btn--ghost"><Zap className="w-4 h-4" /> Build a Custom Quiz</button>
              <button onClick={onOpenFlashcards} className="hero-btn hero-btn--ghost"><RotateCcw className="w-4 h-4" /> Open Flashcards</button>
            </div>
          </div>

          <motion.aside className="readiness-panel" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .14, duration: .5 }}>
            <div className="readiness-top"><span>Readiness index</span><span>Pass cut · 390</span></div>
            <div className="readiness-score"><strong>{stats.averageScore > 0 ? stats.averageScore : '—'}</strong><span>/ 500 SCALED</span></div>
            <div className="progress-track">
              <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${scoreWidth}%` }} transition={{ delay: .25, duration: .9, ease: [0.16,1,.3,1] }} />
              <span className="progress-cut" style={{ left: `${((390 - 200) / 300) * 100}%` }} />
            </div>
            <div className="readiness-stats">
              <div className="readiness-stat"><span>Tests completed</span><strong>{stats.totalTests}</strong></div>
              <div className="readiness-stat"><span>Pass rate</span><strong>{stats.totalTests ? `${stats.passRate}%` : '—'}</strong></div>
              <div className="readiness-stat"><span>Highest score</span><strong>{stats.highestScore || '—'}</strong></div>
              <div className="readiness-stat"><span>Questions answered</span><strong>{stats.totalQuestionsAnswered}</strong></div>
            </div>
          </motion.aside>
        </div>
      </motion.section>

      <div className="dashboard-grid">
        <motion.section className="editorial-card" initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true, amount:.2 }} transition={{ duration:.45 }}>
          <div className="editorial-card__label"><CalendarClock className="w-4 h-4" /> Exam day</div>
          <h2>{examHasPassed ? 'Exam day has arrived.' : 'The countdown is live.'}</h2>
          <p>{examDateLabel}</p>
          {!examHasPassed && <div className="countdown"><div><strong>{daysLeft}</strong><span>Days</span></div><div><strong>{hoursLeft}</strong><span>Hours</span></div><div><strong>{minutesLeft}</strong><span>Minutes</span></div></div>}
        </motion.section>

        <motion.section className="editorial-card" initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true, amount:.2 }} transition={{ delay:.06,duration:.45 }}>
          <div className="editorial-card__label"><Target className="w-4 h-4" /> Current study plan</div>
          <h2>What matters next.</h2>
          <div className="gameplan-list">{gameplan.map((g,i)=><div className="gameplan-row" key={g}><b>{String(i+1).padStart(2,'0')}</b><span>{g}</span></div>)}</div>
        </motion.section>
      </div>

      {weakestMeta && (
        <motion.section className="editorial-card" initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
          <div className="section-header">
            <div><div className="editorial-card__label">Priority intervention</div><h2>{weakestMeta.name}</h2><p>{stats.overallDomainProficiencies[weakestMeta.id].percent}% proficiency · {weakestMeta.weightPercent}% of the blueprint</p></div>
            <button className="hero-btn hero-btn--primary" style={{ background:'#22191e', color:'#fff' }} onClick={() => onStartTargetedDomainQuiz(weakestMeta.id)}>Practice now <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.section>
      )}

      <section>
        <div className="section-header">
          <div><div className="eyebrow" style={{color:'#b53e68'}}>DOMAIN INTELLIGENCE</div><h2>Master the blueprint.</h2><p>One clean view of every tested area. Tap a card to drill that domain.</p></div>
          <button onClick={onOpenStudyGuide} className="section-link"><BookOpen className="w-4 h-4" /> Open cheat sheets</button>
        </div>
        <div className="domain-grid" style={{ marginTop: 18 }}>
          {Object.values(DOMAIN_METADATA).map((meta, idx) => {
            const Icon = iconFor(meta.id);
            const prof = stats.overallDomainProficiencies[meta.id];
            const questionCount = ALL_QUESTIONS.filter(q => q.domain === meta.id).length;
            return (
              <motion.button key={meta.id} onClick={() => onStartTargetedDomainQuiz(meta.id)} className="domain-card" initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true, amount:.15 }} transition={{ delay:Math.min(idx*.045,.22),duration:.4 }}>
                <div className="domain-card__top"><span className="domain-icon"><Icon className="w-5 h-5" /></span><span className="domain-weight">{meta.weightPercent}% weight</span></div>
                <h3>{meta.name}</h3><p>{meta.description}</p>
                <div className="domain-card__bottom"><span>{questionCount} questions</span><strong>{prof?.total ? `${prof.percent}% mastered` : 'Not tested yet'}</strong></div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="quick-strip">
        <button className="quick-card" onClick={onOpenQuizSetup}><Zap className="w-5 h-5" /><strong>Precision practice</strong><span>Choose domains, question count, timer and feedback style.</span></button>
        <button className="quick-card" onClick={onOpenFlashcards}><RotateCcw className="w-5 h-5" /><strong>Recall studio</strong><span>Cycle through terminology and clinical facts with focused repetition.</span></button>
        <button className="quick-card" onClick={onOpenStudyGuide}><BookOpen className="w-5 h-5" /><strong>Clinical reference</strong><span>Fast-access cheat sheets for labs, procedures, calculations and law.</span></button>
      </section>

      <section className="editorial-card">
        <div className="section-header">
          <div><div className="editorial-card__label"><TrendingUp className="w-4 h-4" /> Performance archive</div><h2>Recent attempts.</h2></div>
          {recentAttempts.length > 0 && <button onClick={onOpenHistory} className="section-link">View full score log <ArrowRight className="w-4 h-4" /></button>}
        </div>
        {recentAttempts.length === 0 ? (
          <div style={{ padding:'34px 0 8px', textAlign:'center' }}><Clock className="w-6 h-6" style={{margin:'0 auto 10px',color:'#b46a86'}}/><p>No attempts yet. Your performance history will appear here after your first quiz.</p></div>
        ) : (
          <div style={{ overflowX:'auto', marginTop:18 }}><table className="w-full text-left text-xs"><thead><tr><th className="pb-3">Date</th><th className="pb-3">Session</th><th className="pb-3">Score</th><th className="pb-3">Status</th><th className="pb-3 text-right">Review</th></tr></thead><tbody>
            {recentAttempts.slice(0,5).map(a => <tr key={a.id} className="border-t border-pink-100"><td className="py-4">{new Date(a.timestamp).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</td><td className="py-4 font-bold">{a.title}<small className="block mt-1 opacity-60">{a.totalQuestions} Qs · {formatTime(a.timeSpentSeconds)}</small></td><td className="py-4 font-black">{a.scaledScore} / 500</td><td className="py-4">{a.isPassed ? <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><CheckCircle2 className="w-4 h-4"/>Passed</span> : <span className="inline-flex items-center gap-1 text-rose-700 font-bold"><XCircle className="w-4 h-4"/>Study</span>}</td><td className="py-4 text-right"><button className="section-link ml-auto" onClick={()=>onReviewAttempt(a)}>Review <ArrowRight className="w-3.5 h-3.5"/></button></td></tr>)}
          </tbody></table></div>
        )}
      </section>

      <div className="quick-strip">
        <button className="quick-card" onClick={onOpenHistory}><Award className="w-5 h-5"/><strong>Score log</strong><span>Track scaled scores, pass rate and trend over time.</span></button>
        <button className="quick-card" onClick={onOpenStudyGuide}><BookOpen className="w-5 h-5"/><strong>Board blueprint</strong><span>Review the domains and reference material without leaving study mode.</span></button>
        <button className="quick-card" onClick={onStartFullExam}><Play className="w-5 h-5"/><strong>Full simulation</strong><span>180 questions, three hours, exam-style pacing.</span></button>
      </div>
    </div>
  );
};
