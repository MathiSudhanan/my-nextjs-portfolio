import { cn } from "@/lib/cn";

const RINGS = [40, 80, 120, 160, 200, 240];

const xy = (radius: number, angle: number) => ({
  x: Number((radius * Math.cos(angle)).toFixed(2)),
  y: Number((radius * Math.sin(angle)).toFixed(2)),
});

const radial = (count: number, from: number, to: number) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i * 2 * Math.PI) / count;
    return { angle, a: xy(from, angle), b: xy(to, angle) };
  });

const SPOKES = radial(8, 40, 240);
const TICKS = radial(48, 240, 250);

// Two squares rotated 45 degrees to each other inscribe an eight-pointed star in
// the middle ring: the footwork diagram of Silambam, drawn as plain geometry.
const square = (offset: number) =>
  [0, 1, 2, 3]
    .map((i) => {
      const { x, y } = xy(120, offset + (i * Math.PI) / 2);
      return `${x},${y}`;
    })
    .join(" ");
const SQUARE_A = square(0);
const SQUARE_B = square(Math.PI / 4);

/**
 * Concentric circular geometry. Decorative: render it large, behind content, at
 * low opacity. It is hidden from assistive technology.
 */
export function Mandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-256 -256 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
      focusable="false"
      className={cn("text-accent/10", className)}
    >
      {RINGS.map((r) => (
        <circle key={r} r={r} vectorEffect="non-scaling-stroke" />
      ))}
      <circle r={220} strokeDasharray="2 10" vectorEffect="non-scaling-stroke" />
      <polygon points={SQUARE_A} vectorEffect="non-scaling-stroke" />
      <polygon points={SQUARE_B} vectorEffect="non-scaling-stroke" />
      {SPOKES.map(({ angle, a, b }) => (
        <line key={angle} x1={a.x} y1={a.y} x2={b.x} y2={b.y} vectorEffect="non-scaling-stroke" />
      ))}
      {TICKS.map(({ angle, a, b }) => (
        <line key={angle} x1={a.x} y1={a.y} x2={b.x} y2={b.y} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
