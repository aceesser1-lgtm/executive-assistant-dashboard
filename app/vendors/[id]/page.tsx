'use client';

import Link from 'next/link';
import { VENDORS } from '@/lib/mockData';
import { useState } from 'react';

export default function VendorDetail({ params }: { params: { id: string } }) {
  const vendor = VENDORS.find(v => v.id === params.id);
  const [notes, setNotes] = useState(vendor?.notes || '');

  if (!vendor) {
    return (
      <div>
        <Link href="/vendors" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Vendors
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Vendor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <Link href="/vendors" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Vendors
      </Link>

      <div className="bg-white rounded-lg shadow p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
            <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full capitalize">
              {vendor.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Contact Person</p>
                <p className="text-lg font-semibold">{vendor.contactPerson}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-lg font-semibold">
                  <a href={`mailto:${vendor.email}`} className="text-blue-600 hover:underline">
                    {vendor.email}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="text-lg font-semibold">
                  <a href={`tel:${vendor.phone}`} className="text-blue-600 hover:underline">
                    {vendor.phone}
                  </a>
                </p>
              </div>
              {vendor.website && (
                <div>
                  <p className="text-gray-600 text-sm">Website</p>
                  <p className="text-lg font-semibold">
                    <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {vendor.website}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-600 text-sm">Upcoming Service Dates</p>
                <p className="text-3xl font-bold text-blue-600">{vendor.serviceDates.length}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-lg font-semibold text-green-700">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Dates */}
      {vendor.serviceDates.length > 0 && (
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">📅 Service Dates</h2>
          <div className="space-y-3">
            {vendor.serviceDates.map(serviceDate => (
              <div key={serviceDate.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-lg">{new Date(serviceDate.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="font-semibold text-gray-700">{serviceDate.service}</p>
                  </div>
                </div>
                {serviceDate.notes && (
                  <p className="text-gray-600 text-sm">📝 {serviceDate.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">📝 Vendor Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="Add custom notes about this vendor..."
        />
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Save Notes
        </button>
      </div>
    </div>
  );
}
