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

            // Build the YYYY-MM-DD for this cell
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
                }}
              >
                {!isEmpty && (
                  <>
                    {/* day number */}
                    <span style={{ fontWeight: 600 }}>{cell}</span>

                    {/* clickable markers (one per event): /event/[date]/[index] */}
                    {hasEvents && (
                      <div
                        aria-label={`${eventsForDay.length} event(s)`}
                        style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                          alignItems: 'flex-end',
                        }}
                      >
                        {eventsForDay.map((_, idx) => (
                          <a
                            key={idx}
                            href={`/event/${dateStr}/${idx}`}
                            title="Open event details"
                            style={{
                              display: 'inline-block',
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: '#0ea5e9',
                            }}
                          />
                        ))}
                      </div>
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
