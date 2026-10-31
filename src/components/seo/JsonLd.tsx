/**
 * Structured data for search engines. `<` is escaped so a value containing "</script>"
 * can never end the tag early (JSON.stringify does not do this on its own).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
