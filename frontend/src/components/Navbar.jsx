import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">IQ Checker</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/about" className="hover:text-gray-300">About</a></li>
          <li><a href="/service" className="hover:text-gray-300">Services</a></li>
          <li><a href="/" className="hover:text-gray-300">Contact</a></li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 text-center">
          <li><a href="/" className="block hover:text-gray-300">Home</a></li>
          <li><a href="/about" className="block hover:text-gray-300">About</a></li>
          <li><a href="/service" className="block hover:text-gray-300">Services</a></li>
          <li><a href="#" className="block hover:text-gray-300">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}
