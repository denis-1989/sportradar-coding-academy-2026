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

export function addEvent({ date, time, sport, teams }) {
  // Step 1
  // Check required fields
  // Date sport and teams must not be empty
  if (!date || !sport || !teams) {
    return {
      ok: false,
      message: 'Please fill date sport and teams',
    };
  }

  // Step 2
  // Simple date format check
  // This task does not require advanced validation
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormat.test(date)) {
    return {
      ok: false,
      message: 'Date must be YYYY-MM-DD',
    };
  }

  // Step 3
  // Time is optional
  // If user enters a time we check a simple format
  const timeFormat = /^\d{2}:\d{2}$/;
  if (time && !timeFormat.test(time)) {
    return {
      ok: false,
      message: 'Time must be HH:MM',
    };
  }

  // Step 4
  // Add the new event to the in memory list
  // This does not save to a database
  // It stays only while the app is running
  events.push({
    date,
    time,
    sport,
    teams,
  });

  // Step 5
  // Return success result
  return { ok: true };
}
