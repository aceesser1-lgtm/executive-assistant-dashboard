'use client';

import Link from 'next/link';
import { useUser } from '@/components/UserContext';
import { EMAILS, EVENTS, TASKS } from '@/lib/mockData';

export default function Dashboard() {
  const { currentUser } = useUser();

  // Calculate stats
  const unreadEmails = EMAILS.filter(e => e.userId === currentUser.id && !e.read).length;
  const pendingRsvps = EVENTS.flatMap(e => e.guests).filter(g => g.rsvpStatus === 'pending').length;
  const upcomingEvents = EVENTS.length;
  const todaysTasks = TASKS.filter(t => {
    const today = new Date();
    return t.dueDate.toDateString() === today.toDateString();
  }).length;

  const stats = [
    {
      label: 'Unread Emails',
      value: unreadEmails,
      icon: '✉️',
      href: '/emails',
    },
    {
      label: 'Pending RSVPs',
      value: pendingRsvps,
      icon: '👥',
      href: '/events',
    },
    {
      label: 'Upcoming Events',
      value: upcomingEvents,
      icon: '🎯',
      href: '/events',
    },
    {
      label: "Today's Tasks",
      value: todaysTasks,
      icon: '✅',
      href: '/tasks',
    },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold mb-2">Welcome, {currentUser.name}</h1>
      <p className="text-gray-600 mb-8">Here's your executive assistant dashboard overview</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">🚀 Quick Links</h2>
          <div className="space-y-3">
            <Link href="/emails" className="block p-3 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition">
              View Emails
            </Link>
            <Link href="/calendar" className="block p-3 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition">
              Check Calendar
            </Link>
            <Link href="/events" className="block p-3 bg-green-50 text-green-700 rounded hover:bg-green-100 transition">
              Manage Events
            </Link>
            <Link href="/vendors" className="block p-3 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition">
              Browse Vendors
            </Link>
            <Link href="/tasks" className="block p-3 bg-red-50 text-red-700 rounded hover:bg-red-100 transition">
              Review Tasks
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">📋 Current User Info</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Name</p>
              <p className="font-semibold">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-semibold">{currentUser.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Role</p>
              <p className="font-semibold capitalize">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
