import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    if (trimmed !== "") {
      navigate(`/Listing?location=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-28 px-6 w-full">
      <div className="relative bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-4 w-full max-w-3xl flex flex-col md:flex-row items-center border border-gray-200 space-y-3 md:space-y-0 md:space-x-4">

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city, area, or apartment..."
          className="w-full md:flex-1 bg-transparent outline-none px-4 py-3 text-gray-700 text-lg placeholder-gray-500 border border-gray-300 rounded-xl md:rounded-none md:border-none"
        />

        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-green-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-green-600 transition duration-300"
        >
          <IoSearch className="text-xl" />
          <span className="hidden md:inline">Find a Place</span>
        </button>

      </div>
    </div>
  );
};

export default SearchSection;
