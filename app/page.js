import Calendar from './components/Calendar';
import { getTodayYearMonth } from './lib/calendar';
import { buildDayIndex, events } from './lib/events';

export default function Page() {
  // TEMPORARY: force July 2025 to see the Salzburg vs Sturm marker
  const year = 2025;
  const month = 6; // 0-based => 6 = July, 9 = October

  const dayIndex = buildDayIndex(events, year, month);

  return (
    <section>
      <h1 className="mt-2">Calendar</h1>
      <p className="mt-2">Showing July 2025 (temporary for testing).</p>
      <div className="mt-4">
        <Calendar year={year} month={month} dayIndex={dayIndex} />
      </div>
    </section>
  );
}
