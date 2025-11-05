import { getMonthMatrix } from '../lib/calendar';

// Utility: simple weekday labels (Mon-first)
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Renders a month grid for given year/month (0-based month)
export default function Calendar({ year, month }) {
  const weeks = getMonthMatrix(year, month);

  return (
    <div>
      {/* Weekday header row */}
      <div
        className="row"
        style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}
        aria-hidden="true"
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

      {/* Grid: 7 columns, N rows */}
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
            return (
              <div
                role="gridcell"
                key={`${wi}-${di}`}
                aria-disabled={isEmpty ? 'true' : 'false'}
                style={{
                  aspectRatio: '1 / 1',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  background: isEmpty ? '#f8fafc' : '#fff',
                }}
              >
                {!isEmpty && (
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {cell}
                  </span>
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
