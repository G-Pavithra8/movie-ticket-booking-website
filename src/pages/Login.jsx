import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      login(userWithoutPassword);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff1f2] to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to MovieBook
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#e50914] hover:text-[#ff6b6b]"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#ff9ba3] focus:border-[#ff9ba3]
                         transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#ff9ba3] focus:border-[#ff9ba3]
                         transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-lg font-semibold text-white
                       bg-[#e50914] hover:bg-[#ff6b6b]
                       transition-all shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
