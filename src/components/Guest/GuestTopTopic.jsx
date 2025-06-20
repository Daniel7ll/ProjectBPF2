// src/components/Guest/GuestTopTopic.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // UNCOMMENTED
import { guestTopics } from "../../data/guestTopics"; // Import dari file data dummy baru
import { ChevronLeft, ChevronRight } from "lucide-react"; // UNCOMMENTED

export default function GuestTopTopic() {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(guestTopics.length / itemsPerPage);
  const [page, setPage] = useState(0);

  // Fungsi untuk navigasi (tetap sama)
  const next = () => setPage((prev) => (prev + 1) % totalPages);
  const prev = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  // Menghitung item yang akan ditampilkan pada halaman saat ini
  const currentItems = guestTopics.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Articles
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Our latest post.
          </h2>
        </div>

        {/* Blog Posts Grid with Navigation */}
        <div className="relative">
          {/* Left Button */}
          {/* Tampilkan tombol hanya jika ada lebih dari satu halaman */}
          {totalPages > 1 && (
            <button
              onClick={prev}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition duration-300 ease-in-out hidden md:block" // Desain tombol disesuaikan
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          )}

          {/* Right Button */}
          {/* Tampilkan tombol hanya jika ada lebih dari satu halaman */}
          {totalPages > 1 && (
            <button
              onClick={next}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition duration-300 ease-in-out hidden md:block" // Desain tombol disesuaikan
              aria-label="Next Page"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          )}

          <div className="overflow-hidden">
            {/* AnimatePresence untuk animasi keluar/masuk */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page} // Key diubah sesuai halaman untuk memicu animasi
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ x: 300, opacity: 0 }} // Animasi masuk dari kanan
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }} // Animasi keluar ke kiri
                transition={{ duration: 0.4 }}
              >
                {currentItems.map((topic) => ( // Menggunakan currentItems dan key={topic.id}
                  <div
                    key={topic.id} // Gunakan ID sebagai key
                    className="bg-white rounded-3xl p-6 shadow-lg flex flex-col items-start"
                  >
                    {/* Gambar dengan '5 min read' overlay */}
                    <div className="relative w-full mb-6">
                      <img
                        src={topic.image}
                        alt={topic.title}
                        className="w-full h-56 object-cover rounded-2xl"
                      />
                      <span className="absolute bottom-4 right-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                        {topic.readTime}
                      </span>
                    </div>

                    {/* Konten Teks */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-1">
                      Published on {topic.publishedOn}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {topic.date}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Indikator halaman opsional jika diperlukan */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full ${
                page === i ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}