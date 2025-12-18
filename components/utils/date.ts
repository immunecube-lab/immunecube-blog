export function formatYmd(v?: string | Date) {
  if (!v) return "";
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatYmdDot(v?: string | Date) {
  const s = formatYmd(v);
  return s ? s.replaceAll("-", ".") : "";
}
