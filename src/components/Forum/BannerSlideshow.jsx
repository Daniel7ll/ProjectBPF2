// src/components/Forum/BannerSlideshow.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bannerData } from '../../data/bannerData.js'; // Pastikan sudah .js

const imageVariants = {
  enter: { opacity: 0, x: 100 }, // Posisi awal saat masuk
  center: { opacity: 1, x: 0 }, // Posisi tengah (terlihat)
  exit: { opacity: 0, x: -100 }, // Posisi saat keluar
};

const BannerSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = bannerData.banners; // Akses array banners dari JSON
  const intervalTime = 5000; // Ganti gambar setiap 5 detik

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, intervalTime);

    return () => clearInterval(timer); // Cleanup timer saat komponen di-unmount
  }, [banners.length, intervalTime]); // Dependency array

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  if (!banners || banners.length === 0) {
    return null; // Jangan tampilkan apa-apa jika tidak ada banner
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-md bg-white">
      <AnimatePresence initial={false} mode='wait'>
        <motion.img
          key={banners[currentIndex].id} // Key unik untuk setiap gambar agar animasi berjalan
          src={banners[currentIndex].imageUrl}
          alt={banners[currentIndex].altText}
          // --- PERUBAHAN DI SINI ---
          className="w-full h-[550px] object-contain"
          // Anda bisa mencoba h-64 atau h-[250px] jika ingin lebih tinggi lagi
          // Jika Anda ingin gambar mengisi seluruh lebar dan tinggi container tanpa terpotong, tetapi dengan ruang kosong (letterboxing), gunakan object-contain.
          // Jika ingin mengisi penuh dan terpotong, gunakan object-cover (seperti sebelumnya).
          // --- AKHIR PERUBAHAN ---
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Panah Navigasi Kiri */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      {/* Panah Navigasi Kanan */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      {/* Indikator Titik (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
            } transition-colors`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerSlideshow;