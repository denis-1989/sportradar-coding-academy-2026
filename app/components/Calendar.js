import { formatYMD, getMonthMatrix } from '../lib/calendar';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Calendar({ year, month, dayIndex = {} }) {
  // Generate calendar grid structure (weeks -> days)
  const weeks = getMonthMatrix(year, month);

  return (
    <div>
      {/* Weekday header row */}
      <div className="row space-between" style={{ marginBottom: '0.5rem' }}>
        {WEEKDAYS.map((name) => (
          <div
            key={name}
            style={{
              width: '14.28%',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar month grid */}
      <div
        role="grid"
        aria-label="Month calendar"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
        }}
      >
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndexKey) => {
            const isEmpty = day === null;
            const eventsForDay = !isEmpty ? dayIndex[day] || [] : [];
            const hasEvents = eventsForDay.length > 0;

            // Format date string used for event detail page links
            const dateStr = !isEmpty
              ? formatYMD(new Date(year, month, day))
              : null;

            return (
              <div
                key={`${weekIndex}-${dayIndexKey}`}
                role="gridcell"
                aria-disabled={isEmpty ? 'true' : 'false'}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '6px',
                  background: isEmpty ? '#f5f5f5' : 'white',
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
              >
                {!isEmpty && (
                  <>
                    {/* Display calendar day number */}
                    <span className="day-number">{day}</span>

                    {/* Event bar indicator (stretched bar instead of dot) */}
                    {hasEvents && (
                      <a
                        href={`/event/${dateStr}/0`}
                        aria-label="View event details"
                        className="event-bar"
                      />
                    )}
                  </>
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
