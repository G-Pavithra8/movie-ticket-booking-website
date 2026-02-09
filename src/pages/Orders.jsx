import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

 useEffect(() => {
  if (!isAuthenticated || !user?.email) return;

  const storedOrders = JSON.parse(
    localStorage.getItem('orders') || '[]'
  );

  const userOrders = storedOrders
    .filter(order => order.userEmail === user.email)
    .reverse(); // newest first

  setOrders(userOrders);
}, [isAuthenticated, user]);


  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your orders</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-[#ffb3ba] text-white rounded-lg hover:bg-[#ff9ba3] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-2">No orders yet</p>
            <p className="text-gray-500 mb-4">Start booking tickets to see your orders here</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-[#ffb3ba] text-white rounded-lg hover:bg-[#ff9ba3] transition-colors"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {order.movie?.title || order.movie}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Date:</span>{' '}
                        {order.date &&
                          new Date(order.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {order.showtime || order.time}
                      </div>
                      <div>
                        <span className="font-medium">Seats:</span>{' '}
                        {Array.isArray(order.seats) ? order.seats.sort().join(', ') : order.seats}
                      </div>
                      <div>
                        <span className="font-medium">Amount:</span> ₹
                        {order.totalAmount || order.amount}
                      </div>
                      {order.paymentMethod && (
                        <div>
                          <span className="font-medium">Payment:</span> {order.paymentMethod}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
