import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-6 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-wrap">
        
        {/* Logo & Name */}
        <div className="text-xl font-bold flex justify-center md:justify-start">
          🧠 IQ Insight
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
          <a href="/about" className="hover:text-yellow-300 transition">About</a>
          <a href="/service" className="hover:text-yellow-300 transition">Services</a>
          <a href="/contact" className="hover:text-yellow-300 transition">Feedback</a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} IQ Insight. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
