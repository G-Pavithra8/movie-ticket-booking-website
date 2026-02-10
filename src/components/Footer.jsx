import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-[#d1343c] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white">MovieBook</h3>
            <p className="text-sm mt-3 text-gray-400 leading-relaxed">
              Book movie tickets instantly. Discover movies, view details,
              and reserve seats with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500">Home</Link></li>
              <li><Link to="/profile" className="hover:text-red-500">My Profile</Link></li>
              <li><Link to="/orders" className="hover:text-red-500">My Bookings</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-red-500">Help Center & Support</Link></li>
              <li><Link to="/terms" className="hover:text-red-500">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-red-500">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social */}
         
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} MovieBook. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Designed for Internship Project 🎬
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
