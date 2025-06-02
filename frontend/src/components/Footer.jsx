import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo & Name */}
        <div className="text-lg font-semibold mb-4 md:mb-0">
        🧠 IQ Insight
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
        <a href="/about" className="hover:text-yellow-300 transition">About</a>
        <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
        <a href="/service" className="hover:text-yellow-300 transition">Service</a>
        </div>
    </div>

    {/* Bottom text */}
    <div className="text-center text-xs text-gray-400 mt-4">
        © {new Date().getFullYear()} IQ Insight. All rights reserved.
    </div>
    </footer>
  )
}

export default Footer
