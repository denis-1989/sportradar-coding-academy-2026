'use client';

import { useState } from 'react';
import { buildDayIndex, events as allEvents } from '../lib/events';
import Calendar from './Calendar';

function addMonth(year, month, delta) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

function formatMonthYear(year, month) {
  return new Date(year, month, 1).toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  });
}

// Helper to check if filters are active
function hasActiveFilters(sport, from, to) {
  return (sport && sport !== 'all') || from || to;
}

export default function CalendarView({ initialYear, initialMonth }) {
  const [ym, setYm] = useState({ year: initialYear, month: initialMonth });

  // Filters state
  const [sport, setSport] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Filter events dynamically
  const filteredEvents = allEvents.filter((ev) => {
    if (sport !== 'all' && ev.sport !== sport) return false;
    if (from && ev.date < from) return false;
    if (to && ev.date > to) return false;
    return true;
  });

  const dayIndex = buildDayIndex(filteredEvents, ym.year, ym.month);

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

  // Reset filters function
  function resetFilters() {
    setSport('all');
    setFrom('');
    setTo('');
  }

  return (
    <section>
      <h1>Filters</h1>

      {/* FILTERS */}
      <div className="card filters">
        <div className="row wrap">
          {/* Sport */}
          <div className="filter-item">
            <label className="label">Sport</label>
            <select
              className="input"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="all">All sports</option>
              <option value="Football">Football</option>
              <option value="Ice Hockey">Ice Hockey</option>
            </select>
          </div>

          {/* From */}
          <div className="filter-item">
            <label className="label">From</label>
            <input
              type="date"
              className="input"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          {/* To */}
          <div className="filter-item">
            <label className="label">To</label>
            <input
              type="date"
              className="input"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          {/* Reset Filters */}
          <button
            type="button"
            className="btn outline"
            onClick={resetFilters}
            disabled={!hasActiveFilters(sport, from, to)}
            style={{ marginTop: '24px' }}
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* CALENDAR */}
      <h2 className="mt-4">{formatMonthYear(ym.year, ym.month)}</h2>

      <div className="row mt-2">
        <button className="btn outline" onClick={prevMonth}>
          Prev
        </button>
        <button className="btn outline" onClick={goToday}>
          Today
        </button>
        <button className="btn outline" onClick={nextMonth}>
          Next
        </button>
      </div>

      <div className="mt-4">
        <Calendar year={ym.year} month={ym.month} dayIndex={dayIndex} />
      </div>
    </section>
  );
}
