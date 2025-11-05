import { getMonthMatrix } from '../lib/calendar';

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

      {/* grid */}
      <div
        role="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
        }}
      >
        {weeks.map((week, wi) =>
          week.map((cell, di) => {
            const isEmpty = cell === null;
            const hasEvents = !isEmpty && dayIndex[cell];

            return (
              <div
                key={`${wi}-${di}`}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '6px',
                  background: isEmpty ? '#f5f5f5' : 'white',
                }}
              >
                {!isEmpty && (
                  <>
                    <span>{cell}</span>
                    {hasEvents && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 5,
                          right: 5,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#0ea5e9',
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
