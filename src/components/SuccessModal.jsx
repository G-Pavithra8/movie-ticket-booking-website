import React from 'react';
import { useBooking } from '../context/BookingContext';

const SuccessModal = ({ onClose }) => {
  const { bookingData } = useBooking();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scale-in">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Successfully Booked!</h2>
          <p className="text-gray-600 mb-6">
            Your tickets have been booked successfully. Booking details have been sent to your
            email.
          </p>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Movie:</span>
                <span className="font-medium text-gray-800">{bookingData.movie?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-800">
                  {bookingData.date &&
                    new Date(bookingData.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Showtime:</span>
                <span className="font-medium text-gray-800">{bookingData.showtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium text-gray-800">
                  {bookingData.seats?.sort().join(', ')}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold text-[#e50914]">₹{bookingData.totalAmount}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#e50914] text-white rounded-lg font-semibold hover:bg-[#ff9ba3] transition-colors"
          >
            View My Orders
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
