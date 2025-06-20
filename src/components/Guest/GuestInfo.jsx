// src/components/Guest/GuestInfo.jsx
import React from 'react';

const GuestInfo = () => {
  return (
    <section className="py-16 px-4 bg-white"> {/* Bagian utama dengan padding dan latar belakang putih */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        
        {/* Bagian Kiri: Gambar Profil */}
        <div className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5 ml-[-46px]">
          <div className="relative w-full pb-[100%] rounded-2xl overflow-hidden shadow-xl"> {/* Rasio aspek 1:1 dan sudut membulat */}
            {/* Ganti URL gambar ini dengan gambar Javi Pastor atau gambar lain yang Anda miliki */}
            <img 
              src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSdsrvUs2jyc0BwI1KFoQIaSa9jjmBCSQGLjCdZUM2_skS-lUnNC7XIdyPA_BiAZyYzLjimxYeJyw-m9mo" // Placeholder, ganti dengan URL gambar asli
              alt="Javi Pastor - CEO"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Bagian Kanan: Quote dan Info */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-gray-900">
            Dedicated to help peoples design needs.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Quis ipsum suspendisse ultrices gravida risus commodo viverra maecenas accumsan lacus vel facilisis
          </p>
          <div className="w-24 h-1 bg-blue-500 mb-4"></div> {/* Garis pemisah */}
          <p className="text-xl font-semibold text-gray-800">
            Cathy Hills, CEO
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuestInfo;