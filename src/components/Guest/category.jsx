import React from "react";

const Category = () => {
  const categories = [
    { id: 1, title: "TIDAK BERKATEGORI", icon: "📂", desc: "" },
    { id: 2, title: "INTERNET MARKETING", icon: "🌐", desc: "" },
    { id: 3, title: "PEMROGRAMAN WEB", icon: "💻", desc: "" },
    { id: 4, title: "DESIGNER", icon: "🎨", desc: "" },
    { id: 5, title: "ANDROID & IOS DEVELOPER", icon: "📱", desc: "" },
    { id: 6, title: "SOSIAL MEDIA", icon: "📢", desc: "" },
    { id: 7, title: "HACKING", icon: "🛡️", desc: "" },
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
