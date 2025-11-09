import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-green-100 shadow-lg z-50 border-b border-green-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with icon */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🤝</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Project Pairing Dilemma
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-2">
          <a 
            href="#About" 
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-all duration-200"
          >
            About
          </a>
          <a 
            href="#upload" 
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-all duration-200"
          >
            Upload
          </a>
          <a 
            href="#contact" 
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-all duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
