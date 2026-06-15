export function formatDateLabel(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function formatFullDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getWeekLabel(isoDate) {
  const date = new Date(isoDate);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.ceil((date - firstDayOfYear) / 86400000) + firstDayOfYear.getDay();
  const weekNumber = Math.ceil(pastDaysOfYear / 7);
  return `Semana ${weekNumber}`;
}
