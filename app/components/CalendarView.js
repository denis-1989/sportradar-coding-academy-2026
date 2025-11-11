'use client';

import { useState } from 'react';
import { buildDayIndex, events, filterEvents, listSports } from '../lib/events';
import Calendar from './Calendar';

// Moves a month forward/backward
function addMonth(year, month, delta) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

// Formats the current header like "November 2025"
function formatMonthYear(year, month) {
  return new Date(year, month, 1).toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  });
}

export default function CalendarView({ initialYear, initialMonth }) {
  // State that controls which month is shown
  const [ym, setYm] = useState({ year: initialYear, month: initialMonth });

  // Filter state (sport and date range)
  const [sport, setSport] = useState('ALL');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Options for the sport dropdown
  const sportOptions = listSports(events);

  // Apply filters to the full list
  const filtered = filterEvents(events, { sport, from, to });

  // Build day → events index using the filtered list
  const dayIndex = buildDayIndex(filtered, ym.year, ym.month);

  // Month navigation handlers
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

  // Resets the filters to their initial values
  function clearFilters() {
    setSport('ALL');
    setFrom('');
    setTo('');
  }

  return (
    <section>
      {/* Filters bar */}
      <div className="filters card">
        <div className="row wrap">
          {/* Sport dropdown */}
          <label className="filter-item">
            <span className="label">Sport</span>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="input"
            >
              <option value="ALL">All sports</option>
              {sportOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          {/* From date */}
          <label className="filter-item">
            <span className="label">From</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input"
            />
          </label>

          {/* To date */}
          <label className="filter-item">
            <span className="label">To</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input"
            />
          </label>

          {/* Clear */}
          <button type="button" onClick={clearFilters} className="btn ghost">
            Clear
          </button>

          {/* Small hint with how many events match */}
          <div className="hint">{filtered.length} event(s) match</div>
        </div>
      </div>

      {/* Month header with controls */}
      <div className="row space-between mt-4">
        <h2 style={{ margin: 0 }}>{formatMonthYear(ym.year, ym.month)}</h2>
        <div className="row">
          <button
            onClick={prevMonth}
            aria-label="Previous month"
            className="btn ghost"
          >
            Prev
          </button>
          <button
            onClick={goToday}
            aria-label="Go to current month"
            className="btn ghost"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            aria-label="Next month"
            className="btn ghost"
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar grid (uses filtered index) */}
      <div className="mt-4">
        <Calendar year={ym.year} month={ym.month} dayIndex={dayIndex} />
      </div>
    </section>
  );
}
