import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          DUASA CSR
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-semibold text-lg">
          <li>
            <Link
              to="hero"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
            >
              Home
            </Link>
          </li>
         
          <li>
            <Link
              to="gallery"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="donate"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
            >
              Donate
            </Link>
          </li>
         
          <li>
            <Link
              to="contact"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu (Toggled by hamburger) */}
      <div
        className={`md:hidden fixed inset-0 bg-black flex items-center justify-center transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="space-y-6 text-white text-xl font-semibold">
          <li>
            <Link
              to="hero"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          
          <li>
            <Link
              to="gallery"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="donate"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              Donate
            </Link>
          </li>
          
          <li>
            <Link
              to="contact"
              smooth
              duration={500}
              className="hover:text-blue-500 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;