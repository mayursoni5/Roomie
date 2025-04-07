import React from "react";
import logo from "../assets/logo.gif";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 sm:px-10 py-4 shadow-md bg-white">
      {/* Logo */}
      <img src={logo} className="h-12 sm:h-16 w-auto" alt="Logo" />

      {/* Buttons (Hidden on Small Screens) */}
      <div className="hidden sm:flex gap-4">
        <button className="bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 w-28 sm:w-36 rounded-full
                           hover:bg-gray-700 hover:scale-105 hover:shadow-lg 
                           hover:shadow-gray-500/50 transition duration-300 ease-in-out">
          Listings
        </button>

        <button onClick ={()=>navigate("/Listing")}className="bg-green-500 text-white px-6 sm:px-8 py-2 sm:py-3 w-28 sm:w-36 rounded-full 
                           hover:bg-green-600 hover:scale-105 hover:shadow-lg 
                           hover:shadow-green-500/50 transition duration-300 ease-in-out">
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button (Visible on Small Screens) */}
      <button className="sm:hidden bg-gray-800 text-white px-4 py-2 rounded-full">
        ☰
      </button>
    </div>
  );
};

export default Navbar;
