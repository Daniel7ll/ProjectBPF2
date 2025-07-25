import React, { useState } from "react";

const Category = () => {
  const categories = [
    {
      id: 1,
      title: "Akademik",
      icon: "📚",
      desc: "Diskusi tugas, kuliah, dan penelitian.",
      shortDesc: "Tempat diskusi akademis seperti kuliah dan riset.",
    },
    {
      id: 2,
      title: "Organisasi & UKM",
      icon: "🎭",
      desc: "Berbagi kegiatan organisasi dan UKM kampus.",
      shortDesc: "Cerita dan info kegiatan kampus dari organisasi/UKM.",
    },
    {
      id: 3,
      title: "Karier & Magang",
      icon: "💼",
      desc: "Info magang, lowongan, dan tips karier.",
      shortDesc: "Siapkan masa depanmu dengan tips karier dan magang.",
    },
    {
      id: 4,
      title: "Hobi & Komunitas",
      icon: "🎮",
      desc: "Diskusi hobi, game, dan komunitas.",
      shortDesc: "Temukan teman sehobi dan komunitas menarik.",
    },
    {
      id: 5,
      title: "Event Kampus",
      icon: "🎉",
      desc: "Info event, lomba, dan kegiatan kampus.",
      shortDesc: "Jangan lewatkan event dan lomba kampus terbaru!",
    },
    {
      id: 6,
      title: "Lain-Lain",
      icon: "📝",
      desc: "Info terkait informasi kampus lainnya.",
      shortDesc: "Topik bebas seputar kampus dan sekitarnya.",
    },
  ];

  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => {
    setActiveId(id === activeId ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Kategori Topik Diskusi
          </h2>
          <p className="text-gray-600">
            Pilih kategori sesuai minatmu dan mulai berdiskusi!
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <div
                key={cat.id}
                className={`rounded-2xl p-6 text-center shadow-lg transition-all duration-500 ease-in-out transform cursor-pointer ${
                  isActive
                    ? "absolute top-0 left-0 right-0 mx-auto z-50 bg-white scale-110 w-full sm:w-[500px] min-h-[320px]"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                onClick={() => handleClick(cat.id)}
              >
                <div className={`text-5xl mb-4 ${isActive ? "text-blue-600" : ""}`}>
                  {cat.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isActive ? "text-gray-900" : "text-white"}`}>
                  {cat.title}
                </h3>

                {/* shortDesc & desc pakai gaya font yang sama */}
                {isActive && (
                  <p className={`mb-2 ${isActive ? "text-gray-700" : "text-blue-100"}`}>
                    {cat.shortDesc}
                  </p>
                )}

                <p className={`${isActive ? "text-gray-700" : "text-blue-100"} mb-4`}>
                  {cat.desc}
                </p>

                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveId(null);
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Tutup
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
