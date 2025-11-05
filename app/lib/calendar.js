// Returns a Date object representing the first day (1st) of a given year/month
// month is 0-based: 0 = January, 11 = December
export function getMonthStart(year, month) {
  return new Date(year, month, 1);
}

// Returns number of days in a given year/month (month is 0-based)
export function getDaysInMonth(year, month) {
  // Create a date for "day 0" of next month → gives last day of current month
  return new Date(year, month + 1, 0).getDate();
}

// Returns Monday=1 ... Sunday=7 index for a given Date
// We’ll use Monday-first calendars (common in EU).
export function getWeekdayMonFirst(date) {
  const day = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat (JS default)
  return day === 0 ? 7 : day; // map Sunday(0) → 7
}

// Builds a 2D matrix (array of weeks), each week is an array of 7 cells
// A cell is either a number (day-of-month) or null for empty cells.
export function getMonthMatrix(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const first = getMonthStart(year, month);
  const firstWeekday = getWeekdayMonFirst(first); // 1..7 (Mon..Sun)

  const weeks = [];
  let currentWeek = new Array(7).fill(null);
  let dayCounter = 1;

  // Fill leading blanks for the first week
  // Example: if firstWeekday=3 → Mon(1), Tue(2) filled, day starts at index 2 (0-based)
  for (let i = 0; i < firstWeekday - 1; i++) {
    currentWeek[i] = null;
  }

  // Fill all days of the month
  for (let i = firstWeekday - 1; i < 7; i++) {
    currentWeek[i] = dayCounter++;
  }
  weeks.push(currentWeek);

  while (dayCounter <= daysInMonth) {
    const w = new Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      w[i] = dayCounter++;
    }
    weeks.push(w);
  }

  // If the last week is shorter than 7, it already contains nulls → fine
  return weeks;
}

// Convenience: returns {year, month} for "today", with month 0-based
export function getTodayYearMonth() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}
