/**
 * A custom, dependency-free mark: three nodes (a person's inputs)
 * converging into the two strokes of an "M" (the model reading them).
 * Reused at hero scale on Welcome and at wordmark scale in the
 * Assessment / Result headers.
 */
export function Glyph({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 46V18l18 16 18-16v28"
        stroke="currentColor"
        strokeWidth="4.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="18" r="3.2" fill="#5FD9CE" />
      <circle cx="50" cy="18" r="3.2" fill="#5FD9CE" />
      <circle cx="32" cy="34" r="3.2" fill="#E7B770" />
    </svg>
  );
}

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: "text-lg gap-2",
    md: "text-2xl gap-2.5",
    lg: "text-4xl gap-3",
  };
  const glyphSizes = { sm: 18, md: 24, lg: 34 };

  return (
    <div className={`flex items-center text-mist-100 ${sizes[size]} ${className}`}>
      <Glyph size={glyphSizes[size]} className="text-signal-violet shrink-0" />
      <span className="font-display font-medium tracking-tight">Mindexia</span>
    </div>
  );
}
