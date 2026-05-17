'use client';

import { useState, useEffect } from 'react';

interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  purchaseDate: string;
  status: 'active' | 'maintenance' | 'retired';
  notes: string;
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    purchaseDate: '',
    status: 'active' as const,
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  // Mock equipment for demonstration
  useEffect(() => {
    setEquipment([
      {
        id: '1',
        name: 'Dell Laptop',
        type: 'Computer',
        location: 'Office Desk 1',
        purchaseDate: '2023-01-15',
        status: 'active',
        notes: 'Work laptop for manager',
      },
      {
        id: '2',
        name: 'Canon Printer',
        type: 'Printer',
        location: 'Print Room',
        purchaseDate: '2022-06-20',
        status: 'active',
        notes: 'Network printer for team',
      },
      {
        id: '3',
        name: 'Conference Phone',
        type: 'Communication',
        location: 'Conference Room A',
        purchaseDate: '2023-03-10',
        status: 'active',
        notes: 'Needs microphone replacement',
      },
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newEquipment: Equipment = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      location: formData.location,
      purchaseDate: formData.purchaseDate,
      status: formData.status,
      notes: formData.notes,
    };

    setEquipment([...equipment, newEquipment]);
    setFormData({
      name: '',
      type: '',
      location: '',
      purchaseDate: '',
      status: 'active',
      notes: '',
    });
    setLoading(false);
  };

  const handleStatusChange = (id: string, newStatus: Equipment['status']) => {
    setEquipment(
      equipment.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const maintenanceCount = equipment.filter(
    (item) => item.status === 'maintenance'
  ).length;

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'retired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Maintenance Alert */}
      {maintenanceCount > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-800 font-semibold">
            ⚠️ Equipment Maintenance: {maintenanceCount} item(s) need attention
          </p>
        </div>
      )}

      {/* Add Equipment Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Add Equipment
        </h2>
        <form onSubmit={handleAddEquipment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Dell Laptop"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Computer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Office Desk 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional notes or maintenance schedule..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
          >
            {loading ? 'Adding...' : 'Add Equipment'}
          </button>
        </form>
      </div>

      {/* Equipment List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Equipment Assets ({equipment.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {equipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          e.target.value as Equipment['status']
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )} border-none cursor-pointer`}
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="retired">Retired</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
