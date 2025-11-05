import Calendar from './components/Calendar';
import { getTodayYearMonth } from './lib/calendar';

export default function Page() {
  const { year, month } = getTodayYearMonth();

  return (
    <section>
      <h1 className="mt-2">Calendar</h1>
      <p className="mt-2">Showing the current month.</p>
      <div className="mt-4">
        <Calendar year={year} month={month} />
      </div>
    </section>
  );
}
