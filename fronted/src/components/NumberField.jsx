import { Minus, Plus } from "lucide-react";

export default function NumberField({ label, value, onChange, min, max, step = 1, error }) {
  function clamp(n) {
    if (Number.isNaN(n)) return value;
    return Math.min(max, Math.max(min, n));
  }

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm text-mist-300">{label}</label>
      <div
        className={`flex items-center rounded-xl border bg-ink-800/70 transition-colors duration-200 ${
          error ? "border-signal-amber/70" : "border-mist-400/15 focus-within:border-signal-violet"
        }`}
      >
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(clamp(value - step))}
          className="px-3.5 py-3.5 text-mist-400 transition-colors hover:text-mist-100"
        >
          <Minus size={15} />
        </button>
        <input
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          className="w-full bg-transparent py-3.5 text-center text-mist-100 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(clamp(value + step))}
          className="px-3.5 py-3.5 text-mist-400 transition-colors hover:text-mist-100"
        >
          <Plus size={15} />
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-signal-amber">{error}</p>}
    </div>
  );
}
