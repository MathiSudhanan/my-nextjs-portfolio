type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Variants are computed explicitly, so no merging is needed. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
