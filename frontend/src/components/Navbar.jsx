import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const storedPhoto = localStorage.getItem("photoURL");
    if (storedPhoto) setPhotoURL(storedPhoto);
  }, []);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-12">
        <div className="text-xl font-bold">IQ Insight</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/about" className="hover:text-gray-300">About</a></li>
          <li><a href="/service" className="hover:text-gray-300">Services</a></li>
          <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          {photoURL && (
            <li>
              <img
                src={photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </li>
          )}
        </ul>

        {/* Mobile Toggle Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 text-center">
          <li><a href="/" className="block hover:text-gray-300">Home</a></li>
          <li><a href="/about" className="block hover:text-gray-300">About</a></li>
          <li><a href="/service" className="block hover:text-gray-300">Services</a></li>
          <li><a href="/contact" className="block hover:text-gray-300">Contact</a></li>
          {photoURL && (
            <li className="flex justify-center">
              <img
                src={photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
