const layers = [
  { name: "Client", tech: "React · TypeScript" },
  { name: "Edge", tech: "Next.js · Node.js" },
  { name: "Services", tech: ".NET · Spring Boot" },
  { name: "Data", tech: "SQL Server · PostgreSQL" },
] as const;

// A halo in the page colour behind each glyph keeps the labels readable over a photograph.
const halo = {
  paintOrder: "stroke",
  stroke: "var(--color-bg)",
  strokeWidth: 4,
  strokeLinejoin: "round",
} as const;

const SPINE_X = 36;
const FIRST_LAYER_Y = 84;
const LAYER_GAP = 96;
const description = `A four-layer system stack, from top to bottom: ${layers
  .map((layer) => `${layer.name}, ${layer.tech}`)
  .join("; ")}.`;

/**
 * The staff as the spine of a system: one vertical line crossed by four layers.
 * The staff is the brand's martial half; the layers are its architectural half.
 * Draws once on load (CSS only); fully visible with reduced motion.
 */
export function HeroDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 440"
      role="img"
      aria-label={description}
      className={className}
      fill="none"
    >
      <path
        d={`M${SPINE_X} 16V424`}
        pathLength={1}
        className="animate-draw stroke-accent"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {[16, 424].map((y, i) => (
        <circle
          key={y}
          cx={SPINE_X}
          cy={y}
          r={3.5}
          className="animate-fade fill-accent"
          style={{ "--delay": `${900 + i * 120}ms` } as React.CSSProperties}
        />
      ))}

      {layers.map((layer, i) => {
        const y = FIRST_LAYER_Y + i * LAYER_GAP;
        const delay = `${240 + i * 170}ms`;
        return (
          <g key={layer.name}>
            <path
              d={`M${SPINE_X - 10} ${y}H${SPINE_X + 10}`}
              pathLength={1}
              className="animate-draw stroke-accent"
              strokeWidth={1.5}
              style={{ "--delay": delay } as React.CSSProperties}
            />
            <path
              d={`M${SPINE_X + 10} ${y}H312`}
              pathLength={1}
              className="animate-draw stroke-line-strong"
              strokeWidth={1}
              strokeDasharray="1"
              style={{ "--delay": delay } as React.CSSProperties}
            />
            <g
              className="animate-fade"
              style={{ "--delay": `${420 + i * 170}ms` } as React.CSSProperties}
            >
              <text
                x={64}
                y={y - 14}
                className="fill-accent font-mono"
                fontSize={12}
                letterSpacing="0.14em"
                style={halo}
              >
                {layer.name.toUpperCase()}
              </text>
              <text x={64} y={y + 22} className="fill-fg-strong font-mono" fontSize={15} style={halo}>
                {layer.tech}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
