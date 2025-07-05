// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '100px 20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: 10 }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Sorry, the page you’re looking for doesn’t exist or couldn’t be loaded.
      </p>
      <Link href="/" style={{
        marginTop: '20px',
        display: 'inline-block',
        background: '#0070f3',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold',
      }}>
        🏠 Go to Home
      </Link>
    </div>
  );
}
