export function formatDayOfMonth(isoDate: string): string {
  const date = new Date(isoDate);
  return String(date.getDate());
}

export function formatMonthAndYear(isoDate: string): string {
  const date = new Date(isoDate);
  const shortMonth = date.toLocaleString("en-US", { month: "short" });
  return `${shortMonth} - ${date.getFullYear()}`;
}
