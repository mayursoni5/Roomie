import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchSection = () => {
  return (
    <div className="flex flex-col items-center mt-16 px-6 w-full">
      {/* Search Bar Container */}
      <div className="relative bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-4 w-full max-w-3xl flex flex-col md:flex-row items-center border border-gray-200 space-y-3 md:space-y-0 md:space-x-4">
        
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search for a city, area, or apartment..."
          className="w-full md:flex-1 bg-transparent outline-none px-4 py-3 text-gray-700 text-lg placeholder-gray-500 border border-gray-300 rounded-xl md:rounded-none md:border-none"
        />

        {/* Search Button */}
        <button className="w-full md:w-auto bg-green-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-green-600 transition duration-300">
          <IoSearch className="text-xl" />
          <span className="hidden md:inline">Find a Place</span>
        </button>
      </div>

      {/* 🔥 Popular Cities Section */}
    {/* Top Cities Section */}
<div className="mt-4 text-gray-700 text-sm md:text-base text-center flex flex-wrap justify-center items-center gap-2">
  <span className="font-semibold text-gray-800">Top Cities:</span>
  <a href="#bangalore" className=" hover:underline font-medium">Bangalore</a>
  <span className="text-gray-500">|</span>
  <a href="#hyderabad" className="hover:underline font-medium">Hyderabad</a>
  <span className="text-gray-500">|</span>
  <a href="#pune" className=" hover:underline font-medium">Pune</a>
  <a href="#more" className=" hover:text-blue-800 ml-2">→</a>
</div>

    </div>
  );
};

export default SearchSection;
