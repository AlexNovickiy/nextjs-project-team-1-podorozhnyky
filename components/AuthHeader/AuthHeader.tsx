import React from 'react';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Podorozhnyky
        </Link>
      </nav>
    </header>
  );
}
