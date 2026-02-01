import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#fafafa] shadow-2xl z-50
transform transition-transform duration-300 ease-in-out will-change-transform
${isOpen ? 'translate-x-0' : '-translate-x-full'}`}

      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-[#e50914] drop-shadow-sm">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 transition-colors"
              aria-label="Close sidebar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium hover:bg-[#fff1f2] rounded-lg transition-colors"
                    >

                      <svg className="w-5 h-5 text-[#e50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/orders"
                      onClick={onClose}
                     className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium
hover:bg-[#fff1f2] rounded-lg transition-colors">

                      <svg className="w-5 h-5 text-[#e50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                      </svg>
                      Orders
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/help"
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium
                        hover:bg-[#fff1f2] rounded-lg transition-colors"
                        >
                      <svg className="w-5 h-5 text-[#e50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3" />
                      </svg>
                      Help & Support
                    </Link>
                  </li>

                  <li className="pt-4 border-t border-gray-300">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 font-semibold hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                      </svg>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/help"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-gray-800 font-medium hover:bg-[#fff1f2] transition-colors"
                  >
                                     <svg
  className="w-5 h-5 text-[#e50914] flex-shrink-0"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8.228 9c.549-1.165 2.03-2 3.772-2
       2.21 0 4 1.343 4 3
       0 1.4-1.278 2.575-2.5 3
       -.993.34-1.5 1-1.5 2m0 3h.01"
  />
</svg>



                    Help & Support
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
