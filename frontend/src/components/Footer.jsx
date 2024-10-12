import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-8">
      <div className="container mx-auto">
        <div className="border-t border-gray-700 pt-6">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} My Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
