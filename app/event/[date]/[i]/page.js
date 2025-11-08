import { events } from '../../../lib/events';

export const dynamic = 'force-dynamic';

// find event by date + index (0-based within that date)
function getEventByDateAndIndex(dateStr, idx) {
  const list = events.filter((ev) => ev.date === dateStr);
  if (idx < 0 || idx >= list.length) return null;
  return list[idx];
}

export default async function EventDetailPage({ params }) {
  const { date, i } = await params;
  const idx = Number(i);
  const ev = getEventByDateAndIndex(date, idx);

  if (!ev) {
    return (
      <section>
        <h1>Event not found</h1>
        <p>
          No event at this URL. <a href="/">← Back to Calendar</a>
        </p>
      </section>
    );
  }

  return (
    <section className="container">
      <a href="/" className="back-link">
        ← Back to Calendar
      </a>

      <div className="card">
        <h1 className="mt-2">Event Details</h1>

        {/* semantic list for labels and values */}
        <dl className="event-meta">
          <dt>Date:</dt>
          <dd>{ev.date}</dd>

          {ev.time && (
            <>
              <dt>Time:</dt>
              <dd>{ev.time}</dd>
            </>
          )}

          <dt>Sport:</dt>
          <dd>{ev.sport}</dd>

          <dt>Teams / Participants:</dt>
          <dd>{ev.teams}</dd>
        </dl>
      </div>
    </section>
  );
}
