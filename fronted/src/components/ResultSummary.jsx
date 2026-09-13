import { motion } from "framer-motion";

function Bar({ label, value, max, unit }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-mist-400/10 bg-ink-800/50 px-4 py-3.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-mist-400">{label}</span>
        <span className="text-sm text-mist-100">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-ink-600">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-signal-violet to-signal-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function ResultSummary({ formData }) {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Bar label="Digital usage" value={formData.avgDailyUsageHours} max={24} unit=" hrs/day" />
        <Bar label="Sleep" value={formData.sleepHours} max={24} unit=" hrs" />
        <Bar label="Study" value={formData.studyHours} max={24} unit=" hrs" />
        <Bar label="Physical activity" value={formData.physicalActivityHours} max={24} unit=" hrs" />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        {[
          ["Stress", formData.stressLevel],
          ["Platform", formData.platform],
          ["Country", formData.country],
          ["Level", formData.academicLevel],
        ].map(([label, val]) => (
          <div key={label} className="rounded-xl border border-mist-400/10 bg-ink-800/50 px-3.5 py-3">
            <p className="text-xs text-mist-400">{label}</p>
            <p className="mt-1 text-mist-100">{val || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
