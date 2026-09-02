import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, Award, X } from 'lucide-react';

interface HelloKittyCelebrationProps {
  show: boolean;
  message?: string;
  subMessage?: string;
  onClose?: () => void;
  autoCloseMs?: number;
}

export const HelloKittyCelebration: React.FC<HelloKittyCelebrationProps> = ({
  show,
  message = "Yay Nata! That's Correct! 🎀",
  subMessage = "Hello Kitty is so proud of you! Keep going! ✨",
  onClose,
  autoCloseMs = 3200,
}) => {
  const [visible, setVisible] = useState(show);

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
      {/* Floating backdrop blur & sparkle particles */}
      <div className="absolute inset-0 bg-pink-950/20 backdrop-blur-[2px] animate-fadeIn" />

      <div className="pointer-events-auto relative max-w-sm w-full bg-gradient-to-b from-[#fff0f6] via-[#ffe4ee] to-[#ffd1e3] border-2 border-pink-300 rounded-3xl p-6 shadow-[0_20px_60px_rgba(244,114,182,0.45)] text-center transform transition-all animate-fadeIn scale-100 space-y-4">
        {/* Top cute bow */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-10 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white rotate-3">
          <span className="text-xl">🎀</span>
        </div>

        {onClose && (
          <button
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-pink-200/80 hover:bg-pink-300 text-pink-700 flex items-center justify-center text-xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Hello Kitty Celebratory GIF & Image */}
        <div className="pt-2 relative flex justify-center">
          <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-md bg-white p-1 flex items-center justify-center">
            {/* Direct High-Quality Hello Kitty Joy / Celebration Animated GIF */}
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ4b2lzYWdxc20zbnc2YmFnd3A1dHZpd2w3M3l6NDVjYXAwZGkyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kZqbBT64ECtjy/giphy.gif"
              alt="Hello Kitty Celebration"
              className="w-full h-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback reliable Hello Kitty GIF if CDN blips
                const target = e.target as HTMLImageElement;
                target.src = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjR0OHpscmpsY3l1bjNvaGZlZ3A2N21obzZ4MmtiOHBkaHRvbDNmdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif";
              }}
            />
            {/* Sparkle badge */}
            <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white">
              <Sparkles className="w-3 h-3" />
              <span>+1 Correct</span>
            </div>
          </div>
        </div>

        {/* Celebratory Text */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-pink-600 bg-pink-100/90 px-3 py-1 rounded-full border border-pink-200">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            <span>100% Correct Rationale</span>
          </div>

          <h3 className="text-xl font-black text-pink-900 tracking-tight">
            {message}
          </h3>

          <p className="text-xs font-semibold text-pink-700/90 leading-relaxed px-2">
            {subMessage}
          </p>
        </div>

        {/* Small footer note */}
        <div className="pt-2 border-t border-pink-200/80 flex items-center justify-center gap-2 text-[11px] font-bold text-pink-600">
          <span>💖 Dedicated to Nata with Love 🎀</span>
        </div>
      </div>
    </div>
  );
};
