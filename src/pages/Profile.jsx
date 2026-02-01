import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your profile</p>
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-[#ffb3ba] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.name || 'User'}
              </h2>
              <p className="text-gray-600">{user?.email || 'No email provided'}</p>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-gray-800 mt-1">{user?.name || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-800 mt-1">{user?.email || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <p className="text-gray-800 mt-1">{user?.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Date of Birth</label>
              <p className="text-gray-800 mt-1">{user?.dob || 'Not provided'}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-2 bg-[#ffb3ba] text-white rounded-lg hover:bg-[#ff9ba3] transition-colors"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
