import React, { useState, useEffect, useRef } from "react";

const GuestHighlight = () => {
  const [popupContent, setPopupContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const highlights = [
    {
      title: "📢 Seminar Teknologi Terbaru",
      description: "Ikuti seminar dengan pembicara dari industri IT, terbuka untuk semua mahasiswa.",
    },
    {
      title: "🎨 JTI EXPO",
      description: "Ayo kunjungi pameran karya inovatif mahasiswa jurusan Teknik Informasi!",
    },
  ];

  const openPopup = (highlight) => {
    setPopupContent(highlight);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setPopupContent(null);
  };

  // Klik di luar popup untuk menutup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <section className="py-16 bg-blue-50 relative">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Event & Highlight</h2>
        <p className="text-gray-700 mb-8">Jangan lewatkan event seru di kampus yang bisa kamu ikuti lewat forum!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">{highlight.title}</h3>
              <p className="text-gray-600 mb-4">{highlight.description}</p>
              <button
                onClick={() => openPopup(highlight)}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>

        {/* Pop-up */}
        {isOpen && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div
              ref={popupRef}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 max-w-md w-full mx-4 animate-popup"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-700">{popupContent.title}</h3>
                <button onClick={closePopup} className="text-gray-500 hover:text-red-500 text-lg">&times;</button>
              </div>
              <p className="text-gray-700">{popupContent.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Animasi popup */}
      <style>{`
        @keyframes popup {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-popup {
          animation: popup 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default GuestHighlight;
