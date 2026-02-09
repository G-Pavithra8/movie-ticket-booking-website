import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome to MovieBook. By accessing or using our platform, you agree
          to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Use of the Platform
        </h2>
        <p className="text-gray-600">
          MovieBook is intended for personal use only. Users must not misuse
          the platform or attempt to access restricted areas.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. Ticket Booking
        </h2>
        <p className="text-gray-600">
          All bookings made through MovieBook are subject to availability.
          Once confirmed, tickets cannot be transferred.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. User Responsibility
        </h2>
        <p className="text-gray-600">
          Users are responsible for maintaining the confidentiality of their
          account information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Changes to Terms
        </h2>
        <p className="text-gray-600">
          We reserve the right to update these terms at any time without prior
          notice.
        </p>

      </div>
    </div>
  );
};

export default Terms;
