'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // Helper that returns true if a link matches the active path
  function isActive(path) {
    return pathname === path;
  }

  return (
    <header className="site-header">
      <div className="container">
        {/* Brand / Logo */}
        <Link href="/" className="brand">
          Sport Calendar
        </Link>

        {/* Navigation links */}
        <nav className="nav">
          <Link
            href="/"
            className={isActive('/') ? 'nav-link active' : 'nav-link'}
          >
            Calendar
          </Link>

          <Link
            href="/add"
            className={isActive('/add') ? 'nav-link active' : 'nav-link'}
          >
            Add Event
          </Link>
        </nav>
      </div>
    </header>
  );
}
