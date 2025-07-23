import { motion } from "framer-motion";
import { FaUsers, FaTools, FaProjectDiagram } from "react-icons/fa";

export default function GuestTopTopic() {
  const data = [
    {
      id: 1,
      title: "Tentang Forum",
      desc: "Forum resmi mahasiswa Politeknik Caltex Riau sebagai wadah untuk saling berdiskusi, berbagi ide, dan membangun kolaborasi positif.",
      icon: (
        <FaUsers className="text-blue-500 group-hover:text-blue-900 text-2xl transition duration-300" />
      ),
      bg: "bg-blue-100",
    },
    {
      id: 2,
      title: "Fitur Forum",
      desc: "Nikmati berbagai fitur seperti topik khusus, ruang tanya-jawab, dan dukungan interaktif untuk ide dan karya mahasiswa.",
      icon: (
        <FaTools className="text-pink-400 group-hover:text-blue-900 text-2xl transition duration-300" />
      ),
      bg: "bg-pink-100",
    },
    {
      id: 3,
      title: "Kontribusi Mahasiswa",
      desc: "Jelajahi proyek, ide, dan karya nyata mahasiswa yang lahir dari diskusi dan kolaborasi di forum ini.",
      icon: (
        <FaProjectDiagram className="text-orange-300 group-hover:text-blue-900 text-2xl transition duration-300" />
      ),
      bg: "bg-orange-100",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Forum Mahasiswa PCR
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              Wadah Diskusi, Kolaborasi, dan Inovasi
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col transition duration-300 ease-in-out hover:bg-blue-900 hover:text-white group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.id * 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-white transition duration-300">
                  {item.title}
                </h3>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.bg} group-hover:bg-white transition duration-300`}
                >
                  {item.icon}
                </div>
                <p className="text-gray-600 mb-4 group-hover:text-gray-100 transition duration-300">
                  {item.desc}
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-medium text-sm hover:underline mt-auto group-hover:text-blue-200 transition duration-300"
                >
                  Jelajahi Selengkapnya &gt;
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
