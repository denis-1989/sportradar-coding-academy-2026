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

/**
 * Build a day index for a given month.
 * Example result: { 7: [event, event], 12: [event] }
 */
export function buildDayIndex(list, year, month) {
  const index = {};

  for (const ev of list) {
    const d = new Date(ev.date + 'T00:00:00');
    if (Number.isNaN(d.getTime())) continue;

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

/**
 * Add a new event in memory (no persistence).
 * Returns { ok: true, event } or { ok: false, message }
 */
export function addEvent({ date, time, sport, teams }) {
  // normalize simple strings
  const clean = {
    date: (date || '').trim(),
    time: (time || '').trim(),
    sport: (sport || '').trim(),
    teams: (teams || '').trim(),
  };

  // required fields
  if (!clean.date || !clean.sport || !clean.teams) {
    return { ok: false, message: 'Please fill date, sport and teams' };
  }

  // date format YYYY-MM-DD
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormat.test(clean.date)) {
    return { ok: false, message: 'Date must be YYYY-MM-DD' };
  }

  // time is optional; if present must be HH:MM
  if (clean.time && !/^\d{2}:\d{2}$/.test(clean.time)) {
    return { ok: false, message: 'Time must be HH:MM' };
  }

  // create and push
  const ev = {
    date: clean.date,
    time: clean.time || undefined, // omit empty string
    sport: clean.sport,
    teams: clean.teams,
  };

  events.push(ev);

  return { ok: true, event: ev };
}
