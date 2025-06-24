import React from "react";

const GuestHighlight = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Event & Highlight</h2>
        <p className="text-gray-700 mb-8">Jangan lewatkan event seru di kampus yang bisa kamu ikuti lewat forum!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Highlight 1 */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">📢 Seminar Teknologi Terbaru</h3>
            <p className="text-gray-600 mb-4">Ikuti seminar dengan pembicara dari industri IT, terbuka untuk semua mahasiswa.</p>
            <a href="#" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Lihat Detail</a>
          </div>

          {/* Highlight 2 */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">🎨 JTI EXPO</h3>
            <p className="text-gray-600 mb-4">Ayo kunjungi pameran karya inovatif mahasiswa jurusan Teknik Informasi!</p>
            <a href="#" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Lihat Detail</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GuestHighlight;
