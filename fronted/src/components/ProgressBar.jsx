import { motion } from "framer-motion";

const STEPS = ["Profile", "Digital", "Rhythm", "Stress"];

export default function ProgressBar({ current }) {
  return (
    <div className="mx-auto flex w-full max-w-md items-center" role="list" aria-label="Assessment progress">
      {STEPS.map((label, i) => {
        const stepNumber = i + 1;
        const state =
          stepNumber < current ? "done" : stepNumber === current ? "active" : "upcoming";
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2" role="listitem" aria-current={state === "active"}>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors duration-300 ${
                  state === "upcoming"
                    ? "border-mist-400/25 text-mist-400"
                    : "border-signal-violet bg-signal-violet/15 text-mist-100"
                }`}
              >
                {String(stepNumber).padStart(2, "0")}
              </div>
              <span
                className={`text-[11px] transition-colors duration-300 ${
                  state === "upcoming" ? "text-mist-400" : "text-mist-100"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNumber !== STEPS.length && (
              <div className="mx-2 mb-5 h-px flex-1 bg-ink-600">
                <motion.div
                  className="h-full bg-signal-violet"
                  initial={{ width: "0%" }}
                  animate={{ width: stepNumber < current ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
