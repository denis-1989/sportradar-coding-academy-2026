import { formatYMD, getMonthMatrix } from '../lib/calendar';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Calendar({ year, month, dayIndex = {} }) {
  const weeks = getMonthMatrix(year, month);

  return (
    <div>
      {/* weekday headers */}
      <div
        className="row"
        style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}
      >
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            style={{ width: '14.28%', textAlign: 'center', fontWeight: 600 }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* month grid */}
      <div
        role="grid"
        aria-label="Month calendar"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
        }}
      >
        {weeks.map((week, wi) =>
          week.map((cell, di) => {
            const isEmpty = cell === null;
            const eventsForDay = !isEmpty ? dayIndex[cell] || [] : [];
            const hasEvents = eventsForDay.length > 0;

            // Build date string YYYY-MM-DD for linking
            const dateStr = !isEmpty
              ? formatYMD(new Date(year, month, cell))
              : null;

            return (
              <div
                key={`${wi}-${di}`}
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
                    {/* Day number */}
                    <span style={{ fontWeight: 600 }}>{cell}</span>

                    {/* Single centered event dot indicator */}
                    {hasEvents && (
                      <a
                        href={`/event/${dateStr}/0`}
                        aria-label="Open event details"
                        style={{
                          position: 'absolute',
                          left: '10%',
                          bottom: '8px',
                          width: '80%',
                          height: '8px',
                          background: '#2563eb',
                          borderRadius: '3px',
                        }}
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
