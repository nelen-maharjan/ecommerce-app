import React from 'react';

const MyOrders = () => {
  // Sample order data
  const orders = [
    {
      id: 1,
      date: '2024-11-01',
      status: 'Shipped',
      total: '$120.00',
    },
    {
      id: 2,
      date: '2024-11-05',
      status: 'Delivered',
      total: '$45.00',
    },
    {
      id: 3,
      date: '2024-11-10',
      status: 'Pending',
      total: '$75.00',
    },
    {
      id: 4,
      date: '2024-11-15',
      status: 'Cancelled',
      total: '$30.00',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700">Order ID</th>
              <th className="px-6 py-3 text-left text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-gray-700">Total</th>
              <th className="px-6 py-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-6 py-3">{order.id}</td>
                <td className="px-6 py-3">{order.date}</td>
                <td className="px-6 py-3">{order.status}</td>
                <td className="px-6 py-3">{order.total}</td>
                <td className="px-6 py-3">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* For mobile view, you can use a card layout instead of a table */}
      <div className="mt-8 block md:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 mb-4"
          >
            <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
            <p className="text-gray-600">Date: {order.date}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <p className="text-gray-600">Total: {order.total}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
