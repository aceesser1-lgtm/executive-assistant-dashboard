'use client';

import Link from 'next/link';
import { EVENTS } from '@/lib/mockData';

export default function EventsPage() {
  const eventsByDate = EVENTS.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">🎯 Events</h1>
          <p className="text-gray-600">Manage all events, guests, and checklists</p>
        </div>
        <Link
          href="/events/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New Event
        </Link>
      </div>

      <div className="space-y-4">
        {eventsByDate.map(event => {
          const pendingRsvps = event.guests.filter(g => g.rsvpStatus === 'pending').length;
          const acceptedRsvps = event.guests.filter(g => g.rsvpStatus === 'accepted').length;

          return (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold">{event.title}</h2>
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
                    {event.guests.length} guests
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{event.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Accepted</p>
                    <p className="font-semibold text-green-600">{acceptedRsvps}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pending</p>
                    <p className="font-semibold text-yellow-600">{pendingRsvps}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  {event.checklists.reduce((acc, cl) => acc + cl.items.length, 0)} checklist items
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
