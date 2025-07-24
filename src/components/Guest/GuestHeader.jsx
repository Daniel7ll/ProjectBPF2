
import React from 'react';

const GuestHeader = () => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b-2">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"> {/* Padding Y disesuaikan agar tidak terlalu tinggi */}
        {/* Logo / Nama Guest */}
        {/* Menggunakan gaya Desgy Solutions untuk "Desgy Solutions" tetapi teks diubah menjadi "Guest WEBSITE" */}
        <div className="text-3xl font-bold text-black tracking-wide"> {/* Ukuran font dan margin disesuaikan */}
            Guest WEBSITE
        </div>

        {/* Navigation Menu (Gabungan dari Guest asli dan gaya Desgy) */}
        <nav className="hidden md:flex space-x-8 text-black text-lg font-semibold"> {/* Spacing disesuaikan */}
          {/* Menu Guest Asli */}
          <a href="#" className="hover:text-[#2762AE] transition">HOME</a>
          <a href="#" className="hover:text-[#2762AE] transition">MEMBER</a>
          <a href="#" className="hover:text-[#2762AE] transition">LOGIN ADMIN</a>

          {/* Anda bisa menambahkan item navigasi Desgy jika relevan di sini
              Contoh:
              <a href="#about" className="hover:text-[#2762AE] transition">About Us</a>
          */}
        </nav>

        {/* Login/Daftar Buttons (Dengan gaya Desgy Contact Us button) */}
        <div className="flex space-x-4"> {/* Spacing antar tombol */}
          {/* LOGIN Button */}
          <a
            href="#" // Ganti dengan path login Anda
            className="px-6 py-2 border-2 border-gray-300 rounded-full text-md font-semibold text-black hover:bg-red-500 hover:text-white transition flex items-center" // Ukuran padding, font, dan warna disesuaikan
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
            LOGIN
          </a>

          {/* DAFTAR Button */}
          <a
            href="#" // Ganti dengan path daftar Anda
            className="px-6 py-2 border-2 border-gray-300 rounded-full text-md font-semibold text-black hover:bg-green-500 hover:text-white transition flex items-center" // Ukuran padding, font, dan warna disesuaikan
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v3H6v2h3v3h2v-3h3v-2h-3V7z"></path></svg>
            DAFTAR
          </a>
        </div>
      </div>
    </header>
  );
};

export default GuestHeader;