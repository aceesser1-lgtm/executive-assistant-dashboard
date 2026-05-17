'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/components/UserContext';
import { useSession } from 'next-auth/react';

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export default function EmailsPage() {
  const { currentUser } = useUser();
  const { data: session } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);
  const [showCompose, setShowCompose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ to: '', subject: '', message: '' });
        setShowCompose(false);
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch emails from API
    if (session?.user?.email) {
      setEmails([]);
    }
  }, [session]);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">📧 Emails</h1>
          <p className="text-gray-600">
            Inbox for {currentUser?.name || 'User'}
          </p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ✏️ Compose
        </button>
      </div>

      {/* Compose Form */}
      {showCompose && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">New Email</h2>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="email"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="recipient@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message..."
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Email List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {emails.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No emails found. Start composing an email to send messages.
            </div>
          ) : (
            emails.map((email) => (
              <Link key={email.id} href={`/emails/${email.id}`}>
                <div className={`p-6 hover:bg-gray-50 transition cursor-pointer ${!email.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-lg truncate">
                          {email.from}
                        </span>
                        {!email.read && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            New
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-gray-900 truncate">
                        {email.subject}
                      </p>
                      <p className="text-gray-600 text-sm mt-1 truncate">
                        {email.body}
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm whitespace-nowrap">
                      {new Date(email.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
