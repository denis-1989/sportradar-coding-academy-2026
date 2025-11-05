'use client';

import { useState } from 'react';
import { buildDayIndex, events } from '../lib/events';
import Calendar from './Calendar';

// helper to move months
function addMonth(year, month, delta) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

// format like July 2025
function formatMonthYear(year, month) {
  return new Date(year, month, 1).toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  });
}

export default function CalendarView({ initialYear, initialMonth }) {
  // state for which month is shown
  const [ym, setYm] = useState({ year: initialYear, month: initialMonth });

  // rebuild the day index for the shown month
  const dayIndex = buildDayIndex(events, ym.year, ym.month);

  // handlers
  function prevMonth() {
    setYm((cur) => addMonth(cur.year, cur.month, -1));
  }
  function nextMonth() {
    setYm((cur) => addMonth(cur.year, cur.month, 1));
  }
  function goToday() {
    const now = new Date();
    setYm({ year: now.getFullYear(), month: now.getMonth() });
  }

  return (
    <section>
      {/* month header with controls */}
      <div className="row space-between">
        <h2 style={{ margin: 0 }}>{formatMonthYear(ym.year, ym.month)}</h2>

        <div className="row">
          <button
            onClick={prevMonth}
            aria-label="Previous month"
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Prev
          </button>

          <button
            onClick={goToday}
            aria-label="Go to current month"
            className="mt-0"
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Today
          </button>

          <button
            onClick={nextMonth}
            aria-label="Next month"
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* calendar grid */}
      <div className="mt-4">
        <Calendar year={ym.year} month={ym.month} dayIndex={dayIndex} />
      </div>
    </section>
  );
}
