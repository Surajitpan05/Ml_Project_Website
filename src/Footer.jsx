import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-50 via-white to-green-100 text-emerald-700 py-10 px-6 border-t border-emerald-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Left Side - Project Title */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-emerald-800 tracking-wide">
            Group or Solo? The Project Pairing Dilemma
          </h3>
          <p className="text-emerald-600 text-sm mt-2">
            Helping faculty create balanced teams through smart insights 🌿
          </p>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold">
          <a
            href="#about"
            className="text-emerald-700 hover:text-emerald-900 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#upload"
            className="text-emerald-700 hover:text-emerald-900 transition-colors duration-300"
          >
            Upload
          </a>
          <a
            href="#contact"
            className="text-emerald-700 hover:text-emerald-900 transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Right Side - Copyright */}
        <div className="text-center md:text-right text-emerald-600 text-sm">
          <p>© {new Date().getFullYear()} Group or Solo? The Project Pairing Dilemma</p>
          <p className="text-emerald-500">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
