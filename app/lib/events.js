// Required events from assignment:
export const events = [
  {
    date: '2025-07-18',
    time: '18:30',
    sport: 'Football',
    teams: 'Salzburg vs. Sturm',
  },
  {
    date: '2025-10-23',
    time: '09:45',
    sport: 'Ice Hockey',
    teams: 'KAC vs. Capitals',
  },
];

export function buildDayIndex(events, year, month) {
  const index = {};

  for (const ev of events) {
    const d = new Date(ev.date + 'T00:00:00');
    const y = d.getFullYear();
    const m = d.getMonth();
    const day = d.getDate();

    if (y === year && m === month) {
      if (!index[day]) index[day] = [];
      index[day].push(ev);
    }
  }

  return index;
}
