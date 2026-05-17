import type { Metadata } from 'next';
import { LayoutClient } from '@/components/LayoutClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'Executive Assistant Dashboard',
  description: 'Manage email, calendar, events, vendors, and tasks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
