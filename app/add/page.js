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

  // feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setError('');
    setSuccess('');
    setLoading(true);

    const res = addEvent({ date, time, sport, teams });

    if (!res.ok) {
      setError(res.message || 'Could not add event');
      setLoading(false);
      return;
    }

    // optional: small confirmation before redirect
    setSuccess('Event added');
    // redirect to calendar to see the new marker
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
            <strong>Date</strong>
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

        {/* time (optional) */}
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
            placeholder="Football"
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
            disabled={loading}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              background: loading ? '#374151' : '#111827',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Adding…' : 'Add Event'}
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
