import Calendar from './components/Calendar';
import { getTodayYearMonth } from './lib/calendar';
import { buildDayIndex, events } from './lib/events';

export default function Page() {
  const { year, month } = getTodayYearMonth();
  const dayIndex = buildDayIndex(events, year, month);

  return (
    <section>
      <h1 className="mt-2">Calendar</h1>
      <p className="mt-2">Showing current month and event markers.</p>
      <div className="mt-4">
        <Calendar year={year} month={month} dayIndex={dayIndex} />
      </div>
    </section>
  );
}
