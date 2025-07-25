import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import AdminLoginModal from '../Auth/AuthModal';
import MemberAuthModal from '../Auth/MemberAuthModal';
import { useAuth } from '../../assets/contexts/AuthContext';

const ForumHeader = ({ onToggleSidebar }) => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Kiri: Logo + Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Toggle Sidebar"
          >
            <HiMenu className="w-7 h-7 text-gray-700" />
          </button>

          <div className="flex items-center">
            <img
              src="src/assets/PCR-connect.png"
              alt="Forum Logo"
              className="h-12 w-auto object-contain"
            />
            <span className="ml-2 text-2xl font-bold text-[#2762AE] hidden sm:inline">PCR Connect</span>
          </div>
        </div>

        {/* Tengah: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[17px] font-semibold text-gray-700">
          <a href="/" className="hover:text-[#2762AE] transition">Beranda</a>
          <a href="/account" className="hover:text-[#2762AE] transition">Akun</a>
          <button
            onClick={() => setAdminModalOpen(true)}
            className="hover:text-[#2762AE] transition"
          >
            Login Admin
          </button>
          <a href="/guest" className="hover:text-[#2762AE] transition">Tentang Forum</a>
        </nav>

        {/* Kanan: Login/Logout Member */}
        <div className="flex items-center gap-4">
          {!user ? (
            <button
              onClick={() => setMemberModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-base font-medium text-gray-800 hover:bg-blue-600 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
              </svg>
              Login / Daftar
            </button>
          ) : (
            <>
              <span className="text-base text-gray-700 font-medium hidden sm:inline">
                👤 {user.username || user.email}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <AdminLoginModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
      <MemberAuthModal isOpen={memberModalOpen} onClose={() => setMemberModalOpen(false)} />
    </header>
  );
};

export default ForumHeader;