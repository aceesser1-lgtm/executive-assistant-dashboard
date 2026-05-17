'use client';

import Link from 'next/link';
import { useUser } from './UserContext';
import { use } from 'react';

function NavigationContent() {
  const { currentUser, switchUser, users } = useUser();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">EA Dashboard</h1>
        <p className="text-slate-400 text-sm">Executive Assistant Manager</p>
      </div>

      {/* User Switcher */}
      <div className="mb-8 p-4 bg-slate-800 rounded-lg">
        <p className="text-sm text-slate-400 mb-3">Current User</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
            {currentUser.name[0]}
          </div>
          <span className="font-medium">{currentUser.name}</span>
        </div>
        <select
          value={currentUser.id}
          onChange={(e) => switchUser(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 text-sm"
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        <Link href="/" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          📊 Dashboard
        </Link>
        <Link href="/emails" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          ✉️ Emails
        </Link>
        <Link href="/calendar" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          📅 Calendar
        </Link>
        <Link href="/events" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          🎯 Events
        </Link>
        <Link href="/vendors" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          🏢 Vendors
        </Link>
        <Link href="/tasks" className="block px-4 py-2 rounded hover:bg-slate-800 transition">
          ✅ Tasks
        </Link>
      </nav>
    </aside>
  );
}

export default function Navigation() {
  return <NavigationContent />;
}
