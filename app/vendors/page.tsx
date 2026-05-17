'use client';

import Link from 'next/link';
import { VENDORS } from '@/lib/mockData';
import { useState, useMemo } from 'react';

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(VENDORS.map(v => v.category))).sort();

  const filteredVendors = useMemo(() => {
    return VENDORS.filter(vendor => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || vendor.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold mb-2">🏢 Vendors Database</h1>
      <p className="text-gray-600 mb-6">Manage vendors and service providers</p>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, contact, or email..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No vendors found matching your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVendors.map(vendor => (
            <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold">{vendor.name}</h2>
                  <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full capitalize">
                    {vendor.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Contact</p>
                    <p className="font-semibold">{vendor.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold text-blue-600">{vendor.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold">{vendor.phone}</p>
                  </div>
                </div>

                {vendor.serviceDates.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded text-sm mb-3">
                    <p className="font-semibold text-blue-700 mb-1">Upcoming Services</p>
                    <ul className="text-blue-600 space-y-1">
                      {vendor.serviceDates.slice(0, 2).map(sd => (
                        <li key={sd.id}>📅 {new Date(sd.date).toLocaleDateString()}</li>
                      ))}
                      {vendor.serviceDates.length > 2 && (
                        <li>+{vendor.serviceDates.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                )}

                <p className="text-sm text-gray-600 truncate">
                  {vendor.notes}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-gray-500 text-sm">
        Showing {filteredVendors.length} of {VENDORS.length} vendors
      </div>
    </div>
  );
}
