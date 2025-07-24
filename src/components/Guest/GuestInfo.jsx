// src/components/Guest/GuestInfo.jsx
import React from 'react';

const GuestInfo = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        
        {/* Bagian Kiri: Gambar tanpa border / radius / shadow */}
        <div className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5 ml-[-46px]">
          <div className="relative w-full pb-[100%]">
            <img 
              src="../img/karakter.png"
              alt="Politeknik Caltex Riau"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Bagian Kanan: Quote dan Info */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-gray-900">
            Bersama Membangun Ruang Diskusi Mahasiswa PCR
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Forum ini hadir untuk menghubungkan ide, aspirasi, dan kolaborasi seluruh mahasiswa Politeknik Caltex Riau. Mari berbagi, bertanya, dan beraksi bersama!
          </p>
          <div className="w-24 h-1 bg-blue-500 mb-4"></div>
          <p className="text-xl font-semibold text-gray-800">
            Tim Forum Mahasiswa PCR
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuestInfo;
