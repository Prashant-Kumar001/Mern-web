import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in based on localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // Ensure state is updated when token is removed
    }
  }, [location]); // Also watch `location` to re-check login status on route changes

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  // Clear localStorage and update state when logging out
  const handleLogout = () => {
    setIsLoggedIn(false); 
    handleLinkClick(); 
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="text-white p-4 z-50 bg-gray-950 shadow-md w-full mx-auto">
      <div className="container mx-auto flex max-w-7xl justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Links */}
        <div className={`flex flex-col md:flex-row md:space-x-6 absolute md:static bg-gray-950 w-full md:w-auto transition-transform duration-300 ease-in-out ${isOpen ? 'top-16' : 'top-[-400px]'} md:top-0`}>
          <Link to="/" onClick={handleLinkClick} className="flex items-center py-2 px-4 hover:text-gray-400">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/about" onClick={handleLinkClick} className="flex items-center py-2 px-4 hover:text-gray-400">
            <FaInfoCircle className="mr-2" /> About
          </Link>
          <Link to="/contact" onClick={handleLinkClick} className="flex items-center py-2 px-4 hover:text-gray-400">
            <FaEnvelope className="mr-2" /> Contact
          </Link>
          <Link to="/services" onClick={handleLinkClick} className="flex items-center py-2 px-4 hover:text-gray-400">
            <FaEnvelope className="mr-2" /> services
          </Link>

          {/* Conditional rendering based on login status */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={handleLinkClick} className="flex items-center py-2 px-4 hover:text-gray-400">
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <Link to="/signup" onClick={handleLinkClick} className="flex items-center py-2 px-4 hover:text-gray-400">
                <FaUserPlus className="mr-2" /> Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="mr-2  flex items-center text-gray-500 text-xl md:text-lg font-bold md:font-medium justify-center">{localStorage.getItem("name")}</span>
              <Link to="/logout" onClick={handleLogout} className="flex items-center py-2 px-4 hover:text-gray-400">
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
