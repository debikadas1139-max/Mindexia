import { motion } from "framer-motion";

export default function SliderField({
  label,
  value,
  onChange,
  min = 0,
  max = 24,
  step = 0.1,
  unit = "hrs",
  lowLabel,
  highLabel,
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm text-mist-300">{label}</span>
        <motion.span
          key={value}
          initial={{ opacity: 0.4, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl text-mist-100"
        >
          {Number(value).toFixed(step < 1 ? 1 : 0)}
          <span className="ml-1 text-sm text-mist-400">{unit}</span>
        </motion.span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${pct}%` }}
        aria-label={label}
        aria-valuetext={`${value} ${unit}`}
        className="w-full cursor-pointer"
      />
      {(lowLabel || highLabel) && (
        <div className="mt-2 flex justify-between text-xs text-mist-400">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}
