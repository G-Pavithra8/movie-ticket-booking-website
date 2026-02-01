import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Header = ({ onSidebarToggle }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-[#fafafa] shadow-md z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* App Title */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-[#e50914] hover:text-[#ff6b6b] drop-shadow-sm transition-colors"
            >
              MovieBook
            </Link>

            {/* Search Bar - Center (Desktop) */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <SearchBar />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#e50914] transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-4 py-2 text-xs sm:text-sm font-semibold bg-[#e50914] text-white rounded-lg hover:bg-[#ff6b6b] shadow-sm transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-800 hidden sm:inline">
                    {user?.name || user?.email}
                  </span>
                </div>
              )}

              {/* Sidebar Toggle */}
              <button
                onClick={onSidebarToggle}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden border-t border-gray-300 px-4 py-3">
            <SearchBar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
