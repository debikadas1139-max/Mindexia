import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MAX_SCALE = 10;
const RADIUS = 84;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function interpretation(score) {
  // Interface-only interpretation of the numeric score. Not a clinical
  // category — purely a plain-language description of where the number
  // sits on the model's 0–10 scale.
  if (score >= 7.5) return "Your patterns are trending steady and well-balanced.";
  if (score >= 5.5) return "Your patterns look reasonably balanced, with some room to breathe.";
  if (score >= 3.5) return "Your patterns suggest a few areas worth paying closer attention to.";
  return "Your patterns suggest this stretch has been a difficult one.";
}

export default function ScoreReveal({ score }) {
  const [display, setDisplay] = useState(0);
  const clamped = Math.max(0, Math.min(MAX_SCALE, score));

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let frame;

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(clamped * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  const offset = CIRCUMFERENCE * (1 - clamped / MAX_SCALE);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <svg viewBox="0 0 192 192" className="h-full w-full -rotate-90">
          <circle cx="96" cy="96" r={RADIUS} fill="none" stroke="#171C30" strokeWidth="10" />
          <motion.circle
            cx="96"
            cy="96"
            r={RADIUS}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8477F2" />
              <stop offset="100%" stopColor="#5FD9CE" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-5xl text-mist-100">{display.toFixed(2)}</span>
          <span className="text-sm text-mist-400">out of {MAX_SCALE}</span>
        </div>
      </div>
      <p className="mt-6 max-w-xs text-sm text-mist-300">{interpretation(clamped)}</p>
    </div>
  );
}
