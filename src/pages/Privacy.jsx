import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4">
          At MovieBook, we value your privacy. This policy outlines how we
          collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-600">
          We may collect basic user information such as name and email for
          improving our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. Use of Information
        </h2>
        <p className="text-gray-600">
          Collected information is used only to provide better user experience
          and service updates.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Data Security
        </h2>
        <p className="text-gray-600">
          We implement standard security practices to protect user data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Policy Updates
        </h2>
        <p className="text-gray-600">
          This privacy policy may be updated periodically. Continued use of
          the platform implies acceptance.
        </p>

      </div>
    </div>
  );
};

export default Privacy;
