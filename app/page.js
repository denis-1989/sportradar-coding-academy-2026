import CalendarView from './components/CalendarView';
import { getTodayYearMonth } from './lib/calendar';

export default function Page() {
  const { year, month } = getTodayYearMonth();

  return (
    <section>
      <h1 className="mt-2">Calendar</h1>
      <p className="mt-2">Use the buttons to change month</p>

      <div className="mt-4">
        <CalendarView initialYear={year} initialMonth={month} />
      </div>
    </section>
  );
}
