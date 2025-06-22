// src/components/Forum/ForumSearchBar.jsx
import React, { useState } from 'react';

const ForumSearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
   <div className="sticky top-[72px] z-30 bg-white p-4 shadow-md flex flex-col md:flex-row items-center gap-4 rounded-lg">
      <div className="relative w-full md:w-auto">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-between w-full md:w-48 hover:bg-blue-700 transition-colors"
        >
          KATEGORI DISKUSI
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-full md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {/* Contoh Item Dropdown */}
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Semua Kategori</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Teknologi</a>
            {/* ... item lainnya */}
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Cari diskusi di sini..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default ForumSearchBar;