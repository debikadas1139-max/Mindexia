import { motion } from "framer-motion";
import { STRESS_OPTIONS } from "../constants.js";

const INTENSITY = { Low: 1, Medium: 2, High: 3, "Very High": 4 };

export default function StressSelector({ value, onChange }) {
  return (
    <div className="space-y-2.5" role="radiogroup" aria-label="Current stress level">
      {STRESS_OPTIONS.map(({ value: level, description }) => {
        const selected = value === level;
        return (
          <motion.button
            key={level}
            type="button"
            role="radio"
            aria-checked={selected}
            whileHover={{ x: 2 }}
            onClick={() => onChange(level)}
            className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors duration-200 ${
              selected
                ? "border-signal-violet bg-signal-violet/10"
                : "border-mist-400/12 hover:border-mist-400/30"
            }`}
          >
            <div className="flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className={`h-5 w-1 rounded-full transition-colors duration-200 ${
                    bar <= INTENSITY[level]
                      ? selected
                        ? "bg-signal-violet"
                        : "bg-mist-400"
                      : "bg-ink-600"
                  }`}
                />
              ))}
            </div>
            <div>
              <p className={`text-sm font-medium ${selected ? "text-mist-100" : "text-mist-200"}`}>
                {level}
              </p>
              <p className="text-xs text-mist-400">{description}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
