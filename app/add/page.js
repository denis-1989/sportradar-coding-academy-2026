'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addEvent } from '../lib/events';

export default function AddEventPage() {
  // form state
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sport, setSport] = useState('');
  const [teams, setTeams] = useState('');

  // feedback messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // navigation
  const router = useRouter();

  // handle submit
  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    // validate and add
    const res = addEvent({ date, time, sport, teams });

    // show error if something is wrong
    if (!res.ok) {
      setError(res.message || 'Could not add event');
      return;
    }

    // show success
    setSuccess('Event added');

    // go back to home to see the calendar
    router.push('/');
  }

  return (
    <section>
      <h1 className="mt-2">Add Event</h1>
      <p className="mt-2">Fill the fields and submit</p>

      <form onSubmit={onSubmit} className="mt-4" style={{ maxWidth: 520 }}>
        {/* date */}
        <div className="mt-2">
          <label htmlFor="date">
            <strong>Date</strong> <span style={{ color: '#64748b' }}></span>
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1"
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
            }}
          />
        </div>

        {/* time */}
        <div className="mt-2">
          <label htmlFor="time">
            <strong>Time</strong> <span style={{ color: '#64748b' }}></span>
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1"
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
            }}
          />
        </div>

        {/* sport */}
        <div className="mt-2">
          <label htmlFor="sport">
            <strong>Sport</strong>
          </label>
          <input
            id="sport"
            type="text"
            placeholder="Sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
            className="mt-1"
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
            }}
          />
        </div>

        {/* teams */}
        <div className="mt-2">
          <label htmlFor="teams">
            <strong>Teams or participants</strong>
          </label>
          <input
            id="teams"
            type="text"
            placeholder="Enter teams"
            value={teams}
            onChange={(e) => setTeams(e.target.value)}
            required
            className="mt-1"
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
            }}
          />
        </div>

        {/* messages */}
        {error && (
          <p className="mt-2" style={{ color: '#ef4444' }}>
            {error}
          </p>
        )}
        {success && (
          <p className="mt-2" style={{ color: '#16a34a' }}>
            {success}
          </p>
        )}

        {/* actions */}
        <div className="row mt-4" style={{ gap: 12 }}>
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              background: '#111827',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Add Event
          </button>

          <a
            href="/"
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              background: 'white',
              color: '#111827',
              textDecoration: 'none',
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    </section>
  );
}
