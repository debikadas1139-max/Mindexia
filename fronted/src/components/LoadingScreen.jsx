import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MESSAGES = [
  "Reading your digital rhythm...",
  "Understanding your daily habits...",
  "Mapping lifestyle patterns...",
  "Generating your Mindexia score...",
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-signal-violet/25 animate-spin-slow" />
        <span className="absolute inset-3 rounded-full border-2 border-signal-cyan/25 animate-spin-slower" />
        <span className="h-3 w-3 rounded-full bg-signal-violet shadow-glow animate-pulse-soft" />
      </div>

      <div>
        <p className="mb-2 font-display text-lg italic text-mist-300" aria-hidden="true">
          Analyzing your patterns
        </p>
        <div className="h-6 overflow-hidden" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-mist-100"
            >
              {MESSAGES[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
