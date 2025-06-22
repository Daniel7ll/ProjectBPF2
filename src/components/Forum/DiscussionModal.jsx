// src/components/Forum/DiscussionModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.9, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const DiscussionModal = ({ isOpen, onClose, discussion }) => {
  // Jangan render jika modal tidak terbuka atau tidak ada data diskusi
  if (!isOpen || !discussion) return null; 

  const categoryColorClass = (() => {
    switch (discussion.category.color) {
      case 'red': return 'bg-red-100 text-red-700';
      case 'pink': return 'bg-pink-100 text-pink-700';
      case 'orange': return 'bg-orange-100 text-orange-700';
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'purple': return 'bg-purple-100 text-purple-700';
      case 'green': return 'bg-green-100 text-green-700';
      case 'gray': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  })();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black z-[90] flex items-center justify-center p-4" // Z-index lebih tinggi dari sidebar (z-50)
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose} // Tutup modal saat overlay diklik
      >
        {/* Konten Modal */}
        <motion.div
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto" // overflow-y-auto untuk konten panjang
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutupnya
        >
          {/* Tombol Tutup */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>

          {/* Header Diskusi */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{discussion.title}</h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4 border-b pb-4">
            {/* --- BARIS YANG DIPERBAIKI --- */}
            <span className={`${categoryColorClass} px-3 py-1 rounded-full text-xs font-semibold`}>
            {/* --- AKHIR BARIS YANG DIPERBAIKI --- */}
              {discussion.category.name}
            </span>
            <div className="flex items-center">
              <img src={discussion.member.avatar} alt={discussion.member.name} className="w-6 h-6 rounded-full mr-2" />
              <span>{discussion.member.name}</span>
            </div>
            <span>{discussion.date}</span>
          </div>

          {/* Isi Konten Diskusi (menggunakan kelas 'prose' jika @tailwindcss/typography terinstal) */}
          <div className="prose max-w-none text-gray-800 leading-relaxed mb-6">
            <p>{discussion.content}</p>
          </div>

          {/* Bagian Interaksi (Views, Comments) */}
          <div className="flex items-center text-gray-500 text-base">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                {discussion.views} Views
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a9.013 9.013 0 01-3-0.419V15l-3 3v-3H2C.895 14 0 13.105 0 12V4c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2v8z" clipRule="evenodd"></path></svg>
                {discussion.comments} Comments
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiscussionModal;