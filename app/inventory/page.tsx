'use client';

import { useState, useEffect } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  reorderLevel: number;
  unitCost: string;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    reorderLevel: 10,
    unitCost: '',
  });
  const [loading, setLoading] = useState(false);

  // Mock items for demonstration
  useEffect(() => {
    setItems([
      {
        id: '1',
        name: 'Printer Paper (Ream)',
        quantity: 15,
        reorderLevel: 5,
        unitCost: '5.99',
      },
      {
        id: '2',
        name: 'Sticky Notes (Pack)',
        quantity: 3,
        reorderLevel: 10,
        unitCost: '2.50',
      },
      {
        id: '3',
        name: 'Pens (Box)',
        quantity: 20,
        reorderLevel: 8,
        unitCost: '8.00',
      },
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'reorderLevel'
        ? parseInt(value)
        : value,
    });
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: formData.name,
      quantity: formData.quantity,
      reorderLevel: formData.reorderLevel,
      unitCost: formData.unitCost,
    };

    setItems([...items, newItem]);
    setFormData({
      name: '',
      quantity: 0,
      reorderLevel: 10,
      unitCost: '',
    });
    setLoading(false);
  };

  const lowStockItems = items.filter(
    (item) => item.quantity <= item.reorderLevel
  );

  return (
    <div className="space-y-8">
      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
          <p className="text-amber-800 font-semibold">
            ⚠️ Low Stock Alert: {lowStockItems.length} item(s)
          </p>
          <ul className="mt-2 text-amber-700 text-sm">
            {lowStockItems.map((item) => (
              <li key={item.id}>
                {item.name}: {item.quantity} units (reorder at{' '}
                {item.reorderLevel})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Item Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Add Inventory Item
        </h2>
        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Printer Paper"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reorder Level
              </label>
              <input
                type="number"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Cost ($)
              </label>
              <input
                type="text"
                name="unitCost"
                value={formData.unitCost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5.99"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
          >
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Inventory Items ({items.length})
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
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Reorder Level
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Unit Cost
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.reorderLevel}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${item.unitCost}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {item.quantity <= item.reorderLevel ? (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        In Stock
                      </span>
                    )}
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
