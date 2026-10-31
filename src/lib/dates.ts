/** "Apr 2005". Dates from Sanity are plain YYYY-MM-DD, so read them as UTC to avoid a day shifting. */
export function formatMonthYear(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "1 yr 10 mo", "8 mo", "6 yr". Counts whole months from the first day of the start month. */
export function formatDuration(startIso: string, endIso: string | null): string {
  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : new Date();
  const totalMonths = Math.max(
    1,
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth()) + 1,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return [years ? `${years} yr` : null, months ? `${months} mo` : null].filter(Boolean).join(" ");
}
