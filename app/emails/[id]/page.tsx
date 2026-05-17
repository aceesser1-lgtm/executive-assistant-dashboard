'use client';

import Link from 'next/link';
import { EMAILS } from '@/lib/mockData';

export default function EmailDetail({ params }: { params: { id: string } }) {
  const email = EMAILS.find(e => e.id === params.id);

  if (!email) {
    return (
      <div>
        <Link href="/emails" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Inbox
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Email not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link href="/emails" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Inbox
      </Link>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{email.subject}</h1>
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-sm">From</p>
              <p className="font-semibold">{email.from}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">To</p>
              <p className="font-semibold">{email.to.join(', ')}</p>
            </div>
            {email.cc && email.cc.length > 0 && (
              <div>
                <p className="text-gray-600 text-sm">CC</p>
                <p className="font-semibold">{email.cc.join(', ')}</p>
              </div>
            )}
            <div>
              <p className="text-gray-600 text-sm">Date</p>
              <p className="font-semibold">{new Date(email.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{email.body}</p>
        </div>

        <div className="border-t mt-8 pt-6 flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            {email.starred ? '⭐ Starred' : '☆ Star'}
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}
