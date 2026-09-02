import React, { useState } from 'react';
import {
  RotateCw,
  CheckCircle2,
  XCircle,
  Shuffle,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  BookOpen,
  Award,
  Layers,
  Heart,
} from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcards';
import { CCMADomain, DOMAIN_METADATA } from '../types';
import { getFlashcardMastery, saveFlashcardMastery, resetAllFlashcardMastery } from '../utils/storage';
import { HelloKittyCelebration } from './HelloKittyCelebration';

export const FlashcardsView: React.FC = () => {
  const [deck, setDeck] = useState(FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteryMap, setMasteryMap] = useState<Record<string, boolean>>(getFlashcardMastery());
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [showCelebration, setShowCelebration] = useState(false);

  // Filter deck based on domain and search
  const filteredCards = deck.filter((card) => {
    if (selectedDomain !== 'all' && card.domain !== selectedDomain) return false;
    if (searchQuery.trim()) {
      const text = `${card.term} ${card.definition} ${card.tag || ''} ${card.subtopic}`.toLowerCase();
      if (!text.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isCurrentMastered = currentCard ? !!masteryMap[currentCard.id] : false;

  const masteredCount = deck.filter((c) => masteryMap[c.id]).length;
  const masteryPercent = Math.round((masteredCount / deck.length) * 100);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleMarkMastered = (mastered: boolean) => {
    if (!currentCard) return;
    saveFlashcardMastery(currentCard.id, mastered);
    setMasteryMap(getFlashcardMastery());
    if (mastered) {
      setShowCelebration(true);
    }
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleResetMastery = () => {
    if (window.confirm('Reset all flashcard mastery progress?')) {
      resetAllFlashcardMastery();
      setMasteryMap({});
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Hello Kitty Cheer on Mastery */}
      <HelloKittyCelebration
        show={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="Yay Nata! Concept Mastered! 🎀"
        subMessage="Hello Kitty loves seeing you master medical terms! 💖"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-black mb-2 shadow-sm">
            <span>🎀</span>
            <span>Hello Kitty Active Recall</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-pink-950 tracking-tight">
            CCMA Clinical Flashcards 🎀
          </h1>
          <p className="text-sm text-pink-800/90 mt-1 font-medium">
            Master the order of draw, injection specs, EKG lead placements, and medical law for Nata!
          </p>
        </div>

        {/* Mode Switch & Shuffle */}
        <div className="flex items-center gap-2">
          <button
            id="fc-btn-shuffle"
            onClick={handleShuffle}
            className="p-3 rounded-2xl border-2 border-pink-200 bg-white hover:bg-pink-50 text-pink-800 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Shuffle className="w-4 h-4 text-pink-600" />
            <span>Shuffle</span>
          </button>

          <button
            id="fc-btn-toggle-view"
            onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
            className="p-3 rounded-2xl border-2 border-pink-200 bg-white hover:bg-pink-50 text-pink-800 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Layers className="w-4 h-4 text-pink-600" />
            <span>{viewMode === 'card' ? 'Browse List' : 'Single Card'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Filters Bar */}
      <div className="luxury-card rounded-3xl p-6 space-y-4 border-2 border-pink-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-pink-900">
              Deck Mastery: <strong className="text-pink-600 font-black">{masteredCount}</strong> / {deck.length} ({masteryPercent}%) 🎀
            </span>
            {masteredCount > 0 && (
              <button
                id="fc-btn-reset-mastery"
                onClick={handleResetMastery}
                className="text-pink-500 hover:text-rose-600 text-[11px] underline font-bold transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-pink-600" />
              <select
                id="fc-select-domain"
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="bg-white border-2 border-pink-200 text-pink-900 text-xs rounded-2xl px-3.5 py-1.5 font-bold outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="all">All Domains ({deck.length})</option>
                {Object.values(DOMAIN_METADATA).map((meta) => (
                  <option key={meta.id} value={meta.id}>
                    {meta.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-pink-100 border border-pink-200 h-3 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${masteryPercent}%` }}
          />
        </div>

        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400" />
          <input
            id="fc-search-input"
            type="text"
            placeholder="Search flashcards by term, additive, angle, or guideline..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border-2 border-pink-200 text-xs text-pink-950 placeholder-pink-400 outline-none focus:ring-2 focus:ring-pink-400 transition-all font-medium"
          />
        </div>
      </div>

      {viewMode === 'card' ? (
        filteredCards.length === 0 ? (
          <div className="p-12 text-center text-pink-700 luxury-card rounded-3xl font-bold">
            No flashcards match your search criteria.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Interactive 3D Card */}
            <div
              id="fc-card-container"
              onClick={handleFlip}
              className="relative min-h-[340px] sm:min-h-[380px] w-full rounded-3xl p-8 sm:p-10 cursor-pointer shadow-[0_20px_50px_rgba(244,114,182,0.25)] border-2 border-pink-200 transition-all flex flex-col justify-between select-none luxury-card hover:border-pink-400 group"
            >
              {/* Card Top Metadata */}
              <div className="flex items-center justify-between text-xs border-b border-pink-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-800 font-extrabold text-[11px] flex items-center gap-1">
                    <span>🎀</span>
                    <span>{currentCard.tag || currentCard.subtopic}</span>
                  </span>
                  <span className="text-pink-600 font-bold">
                    {DOMAIN_METADATA[currentCard.domain]?.shortName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-pink-700 font-mono text-xs font-bold">
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                  {isCurrentMastered && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-black text-xs bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Mastered</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Center Content */}
              <div className="py-6 text-center space-y-4">
                {!isFlipped ? (
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase tracking-widest text-pink-600">
                      Medical Concept / Term
                    </span>
                    <h3 className="text-xl sm:text-3xl font-black text-pink-950 tracking-tight leading-snug">
                      {currentCard.term}
                    </h3>
                    <p className="text-xs text-pink-600 font-bold flex items-center justify-center gap-1.5 pt-4">
                      <RotateCw className="w-3.5 h-3.5 text-pink-500" />
                      <span>Click card to flip & view clinical definition 🎀</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-left animate-fadeIn">
                    <span className="text-xs font-black uppercase tracking-widest text-pink-600 block text-center">
                      Clinical Definition & Details
                    </span>
                    <div className="text-sm sm:text-base text-pink-950 leading-relaxed font-semibold whitespace-pre-line bg-pink-50/80 p-5 rounded-2xl border-2 border-pink-200">
                      {currentCard.definition}
                    </div>
                    {currentCard.clinicalNote && (
                      <div className="p-4 bg-gradient-to-r from-pink-100 to-rose-100 border border-pink-300 rounded-2xl text-xs text-pink-900 leading-relaxed shadow-sm">
                        <span className="font-black block text-pink-950 mb-0.5">
                          Clinical Key / Mnemonic 🎀:
                        </span>
                        {currentCard.clinicalNote}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Bottom Hint */}
              <div className="border-t border-pink-100 pt-3 flex items-center justify-between text-xs text-pink-600 font-semibold">
                <span>Domain: {DOMAIN_METADATA[currentCard.domain]?.name}</span>
                <span className="font-mono text-[11px] text-pink-700 font-bold">
                  {isFlipped ? 'Definition View' : 'Question View'}
                </span>
              </div>
            </div>

            {/* Bottom Controls: Prev, Mastery buttons, Next */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                id="fc-btn-prev"
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-2xl border-2 border-pink-200 bg-white hover:bg-pink-50 text-pink-800 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  id="fc-btn-learning"
                  onClick={() => handleMarkMastered(false)}
                  className="px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-extrabold text-xs flex items-center gap-1.5 transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Still Learning</span>
                </button>

                <button
                  id="fc-btn-mastered"
                  onClick={() => handleMarkMastered(true)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md border-2 border-white"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Got It / Mastered 🎀</span>
                </button>
              </div>

              <button
                id="fc-btn-next"
                onClick={handleNext}
                className="px-4 py-2.5 rounded-2xl border-2 border-pink-200 bg-white hover:bg-pink-50 text-pink-800 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      ) : (
        /* List / Grid Mode for quick scanning */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCards.map((card) => {
            const isMastered = !!masteryMap[card.id];
            return (
              <div
                key={card.id}
                className="luxury-card rounded-3xl p-5 space-y-3 shadow-md flex flex-col justify-between border-2 border-pink-200"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black px-3 py-0.5 rounded-full bg-pink-100 border border-pink-200 text-pink-800">
                      {card.tag || card.subtopic}
                    </span>
                    <button
                      onClick={() => handleMarkMastered(!isMastered)}
                      className={`text-xs font-black flex items-center gap-1 transition-colors ${
                        isMastered
                          ? 'text-emerald-700'
                          : 'text-pink-600 hover:text-pink-900'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isMastered ? 'Mastered 🎀' : 'Mark Mastered'}</span>
                    </button>
                  </div>
                  <h4 className="font-black text-pink-950 text-base">
                    {card.term}
                  </h4>
                  <p className="text-xs text-pink-900 whitespace-pre-line leading-relaxed font-medium">
                    {card.definition}
                  </p>
                </div>

                {card.clinicalNote && (
                  <div className="p-3 bg-pink-50 rounded-2xl text-[11px] text-pink-900 border border-pink-200 font-medium">
                    <span className="font-black text-pink-950">Clinical Key: </span>
                    {card.clinicalNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
