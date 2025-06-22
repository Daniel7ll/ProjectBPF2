// src/components/Forum/ForumHeader.jsx
import React from 'react';
import { HiMenu } from 'react-icons/hi'; // Impor ikon HiMenu dari react-icons

// Menerima prop onToggleSidebar dari parent (ForumPage.jsx)
const ForumHeader = ({ onToggleSidebar }) => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b-2">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Grup Kiri: Tombol Hamburger + Logo Forum */}
        <div className="flex items-center">
          {/* Tombol Hamburger untuk membuka sidebar */}
          {/* Kelas 'md:hidden' akan menyembunyikan tombol ini di layar menengah ke atas */}
          <button 
            onClick={onToggleSidebar} 
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors mr-4" 
            aria-label="Toggle navigation menu"
          >
            <HiMenu className="w-6 h-6 text-gray-700" /> 
          </button>

          {/* Logo / Nama Forum */}
          <div className="text-3xl font-bold text-black tracking-wide">
              FORUM WEBSITE
          </div>
        </div>

        {/* Navigation Menu */}
        {/* Kelas 'hidden md:flex' akan menyembunyikan menu ini di layar kecil */}
        <nav className="hidden md:flex space-x-8 text-black text-lg font-semibold flex-grow justify-center">
          <a href="#" className="hover:text-[#2762AE] transition">HOME</a>
          <a href="#" className="hover:text-[#2762AE] transition">MEMBER</a>
          <a href="#" className="hover:text-[#2762AE] transition">LOGIN ADMIN</a>
          <a href="/guest" className="hover:text-[#2762AE] transition">TENTANG FORUM</a>
          {/* Contoh: <a href="#about" className="hover:text-[#2762AE] transition">About Us</a> */}
        </nav>

        {/* Login/Daftar Buttons */}
        <div className="flex space-x-4">
          <a
            href="#" 
            className="px-6 py-2 border-2 border-gray-300 rounded-full text-md font-semibold text-black hover:bg-red-500 hover:text-white transition flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
            LOGIN
          </a>
          <a
            href="#"
            className="px-6 py-2 border-2 border-gray-300 rounded-full text-md font-semibold text-black hover:bg-green-500 hover:text-white transition flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v3H6v2h3v3h2v-3h3v-2h-3V7z"></path></svg>
            DAFTAR
          </a>
        </div>
      </div>
    </header>
  );
};

export default ForumHeader;