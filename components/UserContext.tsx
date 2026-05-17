'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/lib/types';

interface UserContextType {
  currentUser: User | null;
  switchUser: (userId: string) => void;
  users: User[];
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setCurrentUser({
        id: session.user.id || session.user.email || '',
        name: session.user.name || '',
        email: session.user.email || '',
        role: 'user',
        avatar: session.user.image || '',
      });
    }
  }, [session]);

  const switchUser = (userId: string) => {
    // In a multi-user scenario, this would switch between different user sessions
    // For now, it's handled by the session
  };

  if (!mounted || status === 'loading') {
    return <>{children}</>;
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        switchUser,
        users: currentUser ? [currentUser] : [],
        isLoading: status === 'loading',
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    return {
      currentUser: null,
      switchUser: () => {},
      users: [],
      isLoading: true,
    };
  }
  return context;
}
