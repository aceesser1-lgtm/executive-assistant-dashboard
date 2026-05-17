'use client';

import { useUser } from '@/components/UserContext';
import { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  location?: string;
}

export default function CalendarPage() {
  const { currentUser } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4)); // May 2024
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    attendees: '',
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: (number | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e =>
      e.startTime.toISOString().startsWith(dateStr)
    );
  };

  const monthName = new Date(year, month).toLocaleString('default', {
    month: 'long',
  });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          startTime: formData.startTime,
          endTime: formData.endTime,
          attendees: formData.attendees
            .split(',')
            .map(a => a.trim())
            .filter(a => a),
        }),
      });

      if (response.ok) {
        const newEvent: CalendarEvent = {
          id: Date.now().toString(),
          title: formData.title,
          startTime: new Date(formData.startTime),
          endTime: new Date(formData.endTime),
          attendees: formData.attendees
            .split(',')
            .map(a => a.trim())
            .filter(a => a),
        };
        setEvents([...events, newEvent]);
        setFormData({
          title: '',
          startTime: '',
          endTime: '',
          attendees: '',
        });
        setShowCreateForm(false);
        alert('Event created successfully!');
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">📅 Calendar</h1>
          <p className="text-gray-600">
            Calendar for {currentUser?.name || 'User'}
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ New Event
        </button>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Team Meeting"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attendees (comma-separated emails)
              </label>
              <input
                type="text"
                name="attendees"
                value={formData.attendees}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email1@example.com, email2@example.com"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Previous
          </button>
          <h2 className="text-2xl font-bold">
            {monthName} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="font-bold text-center py-2 text-gray-700"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, idx) => {
            const eventsForDay = day ? getEventsForDay(day) : [];
            return (
              <div
                key={idx}
                className={`border rounded p-2 min-h-24 ${
                  day ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-100'
                }`}
              >
                {day && (
                  <>
                    <p className="font-semibold mb-1">{day}</p>
                    <div className="space-y-1">
                      {eventsForDay.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className="text-xs bg-blue-100 text-blue-700 p-1 rounded truncate"
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {eventsForDay.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{eventsForDay.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Upcoming Events List */}
        {events.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events
                .sort(
                  (a, b) =>
                    a.startTime.getTime() - b.startTime.getTime()
                )
                .map(event => (
                  <div key={event.id} className="p-4 bg-gray-50 rounded">
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-600">
                      {event.startTime.toLocaleString()} -{' '}
                      {event.endTime.toLocaleString()}
                    </p>
                    {event.attendees.length > 0 && (
                      <p className="text-sm text-gray-600">
                        👥 {event.attendees.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
