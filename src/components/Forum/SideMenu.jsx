// src/components/Forum/SideMenu.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Definisi varian animasi untuk Framer Motion
const sidebarVariants = {
  hidden: { x: '-100%', opacity: 0 }, // Dimulai dari luar layar kiri, transparan
  visible: { x: '0%', opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } }, // Masuk ke dalam layar
  exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } } // Keluar dari layar
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay (untuk background gelap saat sidebar terbuka) */}
          <motion.div
            className="fixed inset-0 bg-black z-40" // z-40 agar di bawah sidebar (z-50)
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose} // Menutup sidebar saat overlay diklik
          />

          {/* Sidebar Menu */}
          <motion.nav
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-6"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Tombol Tutup (opsional, bisa diganti dengan klik overlay) */}
            <button onClick={onClose} className="self-end text-gray-700 hover:text-gray-900 text-2xl mb-8">
              &times; {/* Simbol 'x' untuk tutup */}
            </button>

            {/* Menu Navigasi */}
            <ul className="space-y-4">
              <li><a href="/" onClick={onClose} className="block text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors">Home</a></li>
              <li><a href="/account" onClick={onClose} className="block text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors">Member</a></li>
              <li><a href="/admin" onClick={onClose} className="block text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors">Login Admin</a></li>
              <li><a href="/guest" onClick={onClose} className="block text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors">Tentang Forum</a></li>
              {/* <li><a href="#blog" onClick={onClose} className="block text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors">Blog</a></li>
              <li><a href="#testimonial" onClick={onClose} className="block text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors">Testimonial</a></li>
              <li><a href="#contact" onClick={onClose} className="block text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors">Contact Us</a></li> */}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;