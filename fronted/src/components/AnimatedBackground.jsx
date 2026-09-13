import { useMemo } from "react";

/**
 * A quiet field of drifting points plus two slow concentric rings.
 * Pure CSS animation (no per-frame JS) so it stays cheap on low-power
 * devices, and everything freezes under prefers-reduced-motion via the
 * global stylesheet rule.
 */
export default function AnimatedBackground({ variant = "field" }) {
  const points = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 7,
        duration: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {points.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-mist-300/40 animate-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {variant === "field" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[560px] w-[560px] rounded-full border border-signal-violet/10 animate-spin-slow" />
          <div className="absolute inset-0 m-auto h-[380px] w-[380px] rounded-full border border-signal-cyan/10 animate-spin-slower" />
          <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-signal-violet shadow-glow" />
        </div>
      )}
    </div>
  );
}
