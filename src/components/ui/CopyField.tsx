"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

// The value is always visible as selectable text, so copying never depends on the
// clipboard API (some browsers and in-app views refuse it).
export function CopyField({
  value,
  label,
  compact = false,
}: {
  value: string;
  label: string;
  /** Smaller text for use inside cards. */
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fall back to selecting the text so the visitor can press Ctrl+C.
      const selection = window.getSelection();
      if (textRef.current && selection) {
        selection.selectAllChildren(textRef.current);
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span
        ref={textRef}
        className={compact ? "break-all text-base font-medium text-fg-strong" : "type-h3 break-all text-fg-strong"}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-control border border-line-strong px-4 text-[0.9375rem] font-medium text-fg-strong transition-colors duration-(--duration-fast) ease-settle hover:border-accent hover:text-accent"
      >
        <Icon name={copied ? "check" : "copy"} />
        {copied ? "Copied" : `Copy ${label}`}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied to the clipboard` : ""}
      </span>
    </div>
  );
}
