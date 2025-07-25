import React from 'react';
import bgImage from '../../assets/rpc.jpg';
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Gambar */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay biru semi-transparan + blur */}
      <div className="absolute inset-0 z-10 bg-[#77BEF0]/50 backdrop-blur-md" />

      {/* Konten Footer */}
      <div className="relative z-20 max-w-screen-xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">

        {/* Kolom 1: Kontak */}
        <div className="bg-white text-[#1E3A8A] rounded-md p-6 shadow-md space-y-6 h-[300px]">
          {/* Kontak */}
          <div className="flex items-start gap-4">
            <div className="bg-[#00A8FF] rounded-full p-3 text-white text-xl">
              <FaPhone />
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold text-base">Kontak</p>
              <p>(0765) 53939</p>
              <p>(0765) 554224</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="bg-[#00A8FF] rounded-full p-3 text-white text-xl">
              <FaEnvelope />
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold text-base">Email</p>
              <p>pmb@pcr.ac.id</p>
              <p>pcr@pcr.ac.id</p>
            </div>
          </div>

          {/* Alamat */}
          <div className="flex items-start gap-4">
            <div className="bg-[#00A8FF] rounded-full p-3 text-white text-xl">
              <FaMapMarkerAlt />
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold text-base">Alamat</p>
              <p>Jl. Umbansari No.1 Rumbai</p>
              <p>Pekanbaru-Riau 28265</p>
            </div>
          </div>
        </div>

        {/* Kolom 2: Beranda */}
        <div>
          <h2 className="text-base font-bold mb-2">Beranda</h2>
          <a href="/guest" className="hover:underline text-gray-200">
            Masuk ke Halaman Utama
          </a>
        </div>

        {/* Kolom 3: Media Sosial */}
        <div className="space-y-4">
          <h2 className="text-base font-bold">Media Sosial</h2>
          <p className="text-sm text-gray-300">
            Tetap terhubung dengan Media Sosial kami
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Kolom 4: Peta */}
        <div className="bg-white text-[#1E3A8A] rounded-md p-6 shadow-md h-[300px]">
          <div className="w-full h-full rounded-md overflow-hidden">
            <iframe
              title="Lokasi PCR"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7289929620674!2d101.4254466146999!3d0.5070688996363909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5aea9ad0e037f%3A0x71b0b59b83e89e0e!2sPoliteknik%20Caltex%20Riau!5e0!3m2!1sen!2sid!4v1655219997777!5m2!1sen!2sid"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bawah */}
      <div className="relative z-20 bg-[#77BEF0]/90 py-4 text-center text-sm text-gray-200 border-t border-white/10">
        <p>
          © 2025{' '}
          <a
            href="https://www.pcr.ac.id"
            className="text-white font-semibold hover:underline"
          >
            Politeknik Caltex Riau
          </a>{' '}
          - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
