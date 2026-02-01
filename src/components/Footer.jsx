import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-500 border-t border-gray-300 mt-16">


      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* App Name */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white drop-shadow-sm">
              MovieBook
            </h3>
            <p className="text-sm text-gray-900 mt-1">
              Your one-stop destination for movie tickets
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <Link
              to="/help"
              className="text-sm font-medium text-gray-700 hover:text-[#e50914] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/help"
              className="text-sm font-medium text-gray-700 hover:text-[#e50914] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm font-medium text-gray-600">
            © {new Date().getFullYear()} MovieBook. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
