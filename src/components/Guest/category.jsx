import React from "react";

const Category = () => {
  const categories = [
    { id: 1, title: "Akademik", icon: "📚", desc: "Diskusi tugas, kuliah, dan penelitian." },
    { id: 2, title: "Organisasi & UKM", icon: "🎭", desc: "Berbagi kegiatan organisasi dan UKM kampus." },
    { id: 3, title: "Karier & Magang", icon: "💼", desc: "Info magang, lowongan, dan tips karier." },
    { id: 4, title: "Hobi & Komunitas", icon: "🎮", desc: "Diskusi hobi, game, dan komunitas." },
    { id: 5, title: "Event Kampus", icon: "🎉", desc: "Info event, lomba, dan kegiatan kampus." },
    { id: 6, title: "Lain-Lain", icon: "📝", desc: "Info terkait informasi kampus lainnya." },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-6 text-center shadow-lg transition duration-300 ease-in-out flex flex-col items-center justify-center min-h-[220px]"
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
              <p className="text-blue-100 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
