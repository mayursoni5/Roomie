import React, { useState } from "react";
import logo from "../assets/logo.gif";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // state for mobile menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-6 sm:px-10 py-4">
        {/* Logo */}
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="h-12 sm:h-16 w-auto cursor-pointer"
          alt="Logo"
        />

        {/* Buttons (Hidden on Small Screens) */}
        <div className="hidden sm:flex gap-4">
          <button    onClick={() => navigate("/listing")} className="bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 w-28 sm:w-36 rounded-full
                             hover:bg-gray-700 hover:scale-105 hover:shadow-lg 
                             hover:shadow-gray-500/50 transition duration-300 ease-in-out">
            Listings
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="bg-green-500 text-white px-6 sm:px-8 py-2 sm:py-3 w-28 sm:w-36 rounded-full 
                             hover:bg-green-600 hover:scale-105 hover:shadow-lg 
                             hover:shadow-green-500/50 transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden bg-gray-800 text-white px-4 py-2 rounded-full"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
  <div className="absolute top-full right-4 mt-2 w-44 bg-white rounded-lg shadow-md border border-gray-200 sm:hidden flex flex-col z-50 py-2">
    <button
      onClick={() => {
        setMenuOpen(false);
        navigate("/listing");
      }}
      className="text-sm px-4 py-2 mx-2 mb-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition duration-200"
    >
      Listings
    </button>

    <button
      onClick={() => {
        navigate("/auth");
        setMenuOpen(false);
      }}
      className="text-sm px-4 py-2 mx-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition duration-200"
    >
      Get Started
    </button>
  </div>
)}
    </div>
  );
};

export default Navbar;
