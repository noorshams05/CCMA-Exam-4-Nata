import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, X, CloudRain } from 'lucide-react';

interface HelloKittyCelebrationProps {
  show: boolean;
  message?: string;
  subMessage?: string;
  onClose?: () => void;
  autoCloseMs?: number;
  /** 'correct' = sunny, cheering Hello Kitty. 'incorrect' = sad Hello Kitty with rain clouds. */
  variant?: 'correct' | 'incorrect';
}

const RAIN_DROPS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 6.3) % 100,
  delay: (i % 8) * 0.15,
  duration: 0.7 + (i % 5) * 0.12,
}));

export const HelloKittyCelebration: React.FC<HelloKittyCelebrationProps> = ({
  show,
  message = "Yay Nata! That's Correct! 🎀",
  subMessage = "Hello Kitty is so proud of you! Keep going! ✨",
  onClose,
  autoCloseMs = 3200,
  variant = 'correct',
}) => {
  const [visible, setVisible] = useState(show);
  const isCorrect = variant === 'correct';

  useEffect(() => {
    setVisible(show);
    if (show && autoCloseMs > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, autoCloseMs);
      return () => clearTimeout(timer);
    }
  }, [show, autoCloseMs, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      {/* Floating backdrop blur */}
      <div
        className={`absolute inset-0 backdrop-blur-[2px] animate-fadeIn ${
          isCorrect ? 'bg-pink-950/20' : 'bg-slate-900/35'
        }`}
      />

      <div
        className={`pointer-events-auto relative max-w-sm w-full border-2 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] text-center transform transition-all animate-fadeIn scale-100 space-y-4 overflow-hidden ${
          isCorrect
            ? 'bg-gradient-to-b from-[#fff0f6] via-[#ffe4ee] to-[#ffd1e3] border-pink-300'
            : 'bg-gradient-to-b from-[#e9edf5] via-[#dde3ef] to-[#cfd7e6] border-slate-400'
        }`}
      >
        {/* Rain overlay for wrong answers */}
        {!isCorrect && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {RAIN_DROPS.map((drop, i) => (
              <span
                key={i}
                className="rain-drop"
                style={{
                  left: `${drop.left}%`,
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Top bow (correct) or storm cloud (incorrect) */}
        {isCorrect ? (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-10 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white rotate-3">
            <span className="text-xl">🎀</span>
          </div>
        ) : (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 storm-cloud">
            <CloudRain className="w-14 h-14 text-slate-500 drop-shadow-md" fill="#94a3b8" strokeWidth={1.5} />
          </div>
        )}

        {onClose && (
          <button
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors z-10 ${
              isCorrect
                ? 'bg-pink-200/80 hover:bg-pink-300 text-pink-700'
                : 'bg-slate-300/80 hover:bg-slate-400 text-slate-700'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Hello Kitty GIF */}
        <div className="pt-2 relative flex justify-center">
          <div
            className={`relative w-36 h-36 rounded-2xl overflow-hidden border-2 shadow-md bg-white p-1 flex items-center justify-center ${
              isCorrect ? 'border-pink-300' : 'border-slate-400'
            }`}
          >
            {isCorrect ? (
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ4b2lzYWdxc20zbnc2YmFnd3A1dHZpd2w3M3l6NDVjYXAwZGkyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kZqbBT64ECtjy/giphy.gif"
                alt="Hello Kitty Celebration"
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjR0OHpscmpsY3l1bjNvaGZlZ3A2N21obzZ4MmtiOHBkaHRvbDNmdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif";
                }}
              />
            ) : (
              <img
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdyYTczNjdoN2h0a2FsN3NzNGRocTgyMHE4OXJkc3l2YWo5dzQxeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/umk922zX3bVDEyE19D/giphy.gif"
                alt="Hello Kitty Sad in the Rain"
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmY2dnNnajUwOWRteW9uaWZ4YnJ5bHZyOHlhOWthNnBoNWxxcXo3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VJ5fjfkHj3hydAeWdb/giphy.gif";
                }}
              />
            )}
            {/* Corner badge */}
            <div
              className={`absolute -bottom-2 -right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white ${
                isCorrect ? 'bg-pink-500' : 'bg-slate-500'
              }`}
            >
              {isCorrect ? (
                <>
                  <Sparkles className="w-3 h-3" />
                  <span>+1 Correct</span>
                </>
              ) : (
                <>
                  <CloudRain className="w-3 h-3" />
                  <span>Missed It</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1.5 relative z-[1]">
          <div
            className={`inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
              isCorrect
                ? 'text-pink-600 bg-pink-100/90 border-pink-200'
                : 'text-slate-600 bg-slate-200/80 border-slate-300'
            }`}
          >
            {isCorrect ? (
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            ) : (
              <CloudRain className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>{isCorrect ? '100% Correct Rationale' : "Don't Worry, Nata"}</span>
          </div>

          <h3 className={`text-xl font-display font-black tracking-tight ${isCorrect ? 'text-pink-900' : 'text-slate-800'}`}>
            {message}
          </h3>

          <p className={`text-xs font-semibold leading-relaxed px-2 ${isCorrect ? 'text-pink-700/90' : 'text-slate-600'}`}>
            {subMessage}
          </p>
        </div>

        {/* Footer */}
        <div
          className={`pt-2 border-t flex items-center justify-center gap-2 text-[11px] font-bold relative z-[1] ${
            isCorrect ? 'border-pink-200/80 text-pink-600' : 'border-slate-300/80 text-slate-500'
          }`}
        >
          <span>💖 Dedicated to Nata with Love 🎀</span>
        </div>
      </div>
    </div>
  );
};
