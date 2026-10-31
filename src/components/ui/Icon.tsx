import { cn } from "@/lib/cn";

// 24px line icons, 1.5 stroke. Brand logos are deliberately absent: links use
// plain text labels, which are clearer and need no alt text.
const paths = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-down": "M12 5v14M6 13l6 6 6-6",
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
} as const;

export type IconName = keyof typeof paths;

type Props = {
  name: IconName;
  className?: string;
  /** Provide only when the icon is the sole content of a control. */
  title?: string;
};

export function Icon({ name, className, title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-[1.25em] shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
