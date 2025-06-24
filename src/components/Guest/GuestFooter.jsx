import React from "react";
import { FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";

const GuestFooter = () => {
  return (
    <footer className="bg-blue-600 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-8">
        
        {/* Kontak */}
        <div>
          <p className="font-semibold text-lg">Kontak Admin Forum</p>
          <p className="text-sm">forum@pcr.ac.id</p>
          <p className="text-sm">+62 821-5949-5854</p>
        </div>

        {/* Call to action */}
        <div>
          <p className="font-semibold text-lg mb-2">Punya ide? Ayo berdiskusi!</p>
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition">
            Mulai Diskusi →
          </button>

           {/* Social Media */}
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-300 flex items-center gap-1"
    >
      <FaInstagram className="text-xl" /> Instagram
    </a>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-300 flex items-center gap-1"
    >
      <FaLinkedin className="text-xl" /> LinkedIn
    </a>
    <a
      href="https://t.me/yourgroup"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-300 flex items-center gap-1"
    >
      <FaTelegram className="text-xl" /> Telegram
    </a>
  </div>
</div>

        {/* Alamat + Logo */}
        <div className="flex flex-col items-center md:items-end">
          <p className="font-semibold text-lg">Kampus</p>
          <p className="text-sm">Politeknik Caltex Riau</p>
          <p className="text-sm mb-2">Jl. Umban Sari (Patin) No.1 Rumbai, Pekanbaru</p>
          <img 
            src="/img/logoPCR.png" 
            alt="Logo PCR" 
            className="w-24 md:w-32 mt-3" 
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-xs">
        <p>© {new Date().getFullYear()} Forum Mahasiswa PCR. Semua hak dilindungi.</p>
        <p className="mt-1">Syarat & Ketentuan</p>
      </div>

      {/* Background Teks */}
      <div className="absolute bottom-[-20px] left-0 right-0 text-center font-black text-[50px] md:text-[80px] opacity-10 leading-none select-none pointer-events-none">
        BERDISKUSI BERSAMA, MAJU BERSAMA
      </div>
    </footer>
  );
};

export default GuestFooter;
