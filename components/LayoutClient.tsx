'use client';

import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './UserContext';
import Navigation from './Navigation';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </UserProvider>
    </SessionProvider>
  );
}
