import './globals.css';
import ReduxProvider from './Provider';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Shopping App',
  description: 'Shopping App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <main style={{ padding: '0 20px' }}>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
