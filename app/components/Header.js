export default function Header() {
  return (
    <header className="site-header">
      <div className="container row space-between">
        <a href="/" aria-label="Go to calendar home">
          <strong>Sport Calendar</strong>
        </a>

        <nav aria-label="Main navigation">
          <div className="row">
            <a href="/" data-test-id="nav-calendar">
              Calendar
            </a>
            <a href="/add" data-test-id="nav-add">
              Add Event
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
