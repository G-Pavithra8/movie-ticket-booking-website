import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((u) => u.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      dob: formData.dob,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password, ...userWithoutPassword } = newUser;
    signup(userWithoutPassword);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff1f2] to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#e50914] hover:text-[#ff6b6b]"
            >
              Sign in
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
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
            { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
            { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.name !== 'phone' && field.name !== 'dob'}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#ff9ba3] focus:border-[#ff9ba3]
                           transition-all"
              />
            </div>
          ))}

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-lg font-semibold text-white
                       bg-[#e50914] hover:bg-[#ff6b6b]
                       transition-all shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
