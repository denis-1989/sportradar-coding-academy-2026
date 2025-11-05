import { events } from '../../../lib/events';

export const dynamic = 'force-dynamic';

// find event by date + index (0-based within that date)
function getEventByDateAndIndex(dateStr, idx) {
  const list = events.filter((ev) => ev.date === dateStr);
  if (idx < 0 || idx >= list.length) return null;
  return list[idx];
}

export default function EventDetailPage({ params }) {
  const { date, i } = params;
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
    <section>
      <p>
        <a href="/">← Back to Calendar</a>
      </p>
      <h1 className="mt-2">Event Details</h1>
      <div className="mt-2">
        <p>
          <strong>Date:</strong> {ev.date}
        </p>
        {ev.time && (
          <p>
            <strong>Time:</strong> {ev.time}
          </p>
        )}
        <p>
          <strong>Sport:</strong> {ev.sport}
        </p>
        <p>
          <strong>Teams / Participants:</strong> {ev.teams}
        </p>
      </div>
    </section>
  );
}
