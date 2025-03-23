import React from "react";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.gif"; // Change path as per your assets

const Footer = () => {
  return (
    <footer className="bg-white py-10  mt-24  border-t">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Roomie Logo" className="h-10 mb-2" />
          <p className="text-gray-600 font-medium">
            <strong>More than just a space,</strong> <br /> it’s where comfort feels like home.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Our Services</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li><a href="#" className="hover:text-gray-900">Find a Room</a></li>
            <li><a href="#" className="hover:text-gray-900">How It Works</a></li>
            <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Explore Roomie</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li><a href="#" className="hover:text-gray-900">List Your Property</a></li>
            <li><a href="#" className="hover:text-gray-900">Comfortable Living Spaces</a></li>
            <li><a href="#" className="hover:text-gray-900">Roommate Finder</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Who We Are</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li><a href="#" className="hover:text-gray-900">Credits</a></li>
            <li><a href="#" className="hover:text-gray-900">About Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-600 mt-8 border-t pt-4">
        © 2025 ROOMIE. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
