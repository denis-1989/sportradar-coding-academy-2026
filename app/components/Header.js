'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  function isActive(href) {
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <header className="site-header" role="banner">
      <div className="container row space-between">
        <Link href="/" className="brand">
          Sport Calendar
        </Link>

        <nav aria-label="Main">
          <ul className="nav">
            <li>
              <Link
                href="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Calendar
              </Link>
            </li>
            <li>
              <Link
                href="/add"
                className={`nav-link ${isActive('/add') ? 'active' : ''}`}
              >
                Add Event
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
