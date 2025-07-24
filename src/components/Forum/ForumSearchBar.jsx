import React, { useState } from 'react';

const ForumSearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue); // kirim ke parent
    }
  };

  return (
    <div className="sticky top-[72px] z-30 bg-white p-4 shadow-md flex flex-col md:flex-row items-center gap-4 rounded-lg">
      {/* Kategori bisa dibiarkan dulu */}
      <div className="relative flex-grow">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cari diskusi di sini..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onSearch(inputValue)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ForumSearchBar;
