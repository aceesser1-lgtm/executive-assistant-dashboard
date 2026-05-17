'use client';

import Link from 'next/link';
import { EVENTS } from '@/lib/mockData';
import { useState } from 'react';

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = EVENTS.find(e => e.id === params.id);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  if (!event) {
    return (
      <div>
        <Link href="/events" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Events
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Event not found</p>
        </div>
      </div>
    );
  }

  const toggleCheckedItem = (itemId: string) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(itemId)) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    setCheckedItems(newSet);
  };

  const acceptedGuests = event.guests.filter(g => g.rsvpStatus === 'accepted');
  const pendingGuests = event.guests.filter(g => g.rsvpStatus === 'pending');
  const declinedGuests = event.guests.filter(g => g.rsvpStatus === 'declined');

  return (
    <div className="max-w-4xl">
      <Link href="/events" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Events
      </Link>

      <div className="bg-white rounded-lg shadow p-8 mb-6">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-700 text-lg mb-6">{event.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-600 text-sm">Date</p>
            <p className="text-xl font-semibold">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Location</p>
            <p className="text-xl font-semibold">📍 {event.location}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Organizer</p>
            <p className="text-xl font-semibold">{event.organizer}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Guests</p>
            <p className="text-xl font-semibold">{event.guests.length}</p>
          </div>
        </div>

        {event.notes && (
          <div className="p-4 bg-blue-50 rounded-lg mb-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">Notes</p>
            <p className="text-gray-700">{event.notes}</p>
          </div>
        )}
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-lg shadow p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6">👥 Guest List</h2>

        {acceptedGuests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Accepted ({acceptedGuests.length})</h3>
            <div className="space-y-2">
              {acceptedGuests.map(guest => (
                <div key={guest.id} className="p-3 bg-green-50 rounded flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{guest.name}</p>
                    <p className="text-sm text-gray-600">{guest.email}</p>
                    {guest.dietaryRestrictions && (
                      <p className="text-sm text-orange-600 mt-1">🍽️ {guest.dietaryRestrictions}</p>
                    )}
                  </div>
                  <span className="text-green-700 font-semibold">✓ Accepted</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pendingGuests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-yellow-700 mb-3">Pending Response ({pendingGuests.length})</h3>
            <div className="space-y-2">
              {pendingGuests.map(guest => (
                <div key={guest.id} className="p-3 bg-yellow-50 rounded flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{guest.name}</p>
                    <p className="text-sm text-gray-600">{guest.email}</p>
                  </div>
                  <span className="text-yellow-700 font-semibold">⏳ Pending</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {declinedGuests.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-3">Declined ({declinedGuests.length})</h3>
            <div className="space-y-2">
              {declinedGuests.map(guest => (
                <div key={guest.id} className="p-3 bg-red-50 rounded flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{guest.name}</p>
                    <p className="text-sm text-gray-600">{guest.email}</p>
                  </div>
                  <span className="text-red-700 font-semibold">✕ Declined</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checklists */}
      {event.checklists.length > 0 && (
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">✅ Checklists</h2>
          <div className="space-y-6">
            {event.checklists.map(checklist => (
              <div key={checklist.id}>
                <h3 className="text-lg font-semibold mb-3">{checklist.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Due: {new Date(checklist.dueDate).toLocaleDateString()}</p>
                <div className="space-y-2">
                  {checklist.items.map(item => (
                    <label key={item.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item.id)}
                        onChange={() => toggleCheckedItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={`${checkedItems.has(item.id) ? 'line-through text-gray-500' : ''}`}>
                          {item.text}
                        </p>
                        {item.assignee && (
                          <p className="text-sm text-gray-600">Assigned to: {item.assignee}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
