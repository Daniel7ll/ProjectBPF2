import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import AdminLoginModal from '../Auth/AuthModal';
import MemberAuthModal from '../Auth/MemberAuthModal';
import { useAuth } from '../../assets/contexts/AuthContext'; // ⬅️ pastikan ini

const ForumHeader = ({ onToggleSidebar }) => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const { user, logout } = useAuth(); // ⬅️ akses user dan logout dari context

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b-2">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Kiri: Logo + Toggle */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors mr-4"
            aria-label="Toggle navigation menu"
          >
            <HiMenu className="w-6 h-6 text-gray-700" />
          </button>

          <div className="text-3xl font-bold text-black tracking-wide">
            <img src="src/assets/PCR-connect.png" alt="Forum Logo" className="h-18 w-40 inline-block" />
          </div>
        </div>

        {/* Tengah: Menu Navigasi */}
        <nav className="hidden md:flex space-x-8 text-black text-lg font-semibold flex-grow justify-center">
          <a href="/" className="hover:text-[#2762AE] transition">HOME</a>
          {/* <a href="#" className="hover:text-[#2762AE] transition">MEMBER</a> */}
          <a
            href="#"
            onClick={() => setAdminModalOpen(true)}
            className="hover:text-[#2762AE] transition"
          >
            Login Admin
          </a>
          <a href="/guest" className="hover:text-[#2762AE] transition">TENTANG FORUM</a>
        </nav>

        {/* Kanan: Login/Logout Member */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <button
              onClick={() => setMemberModalOpen(true)}
              className="px-6 py-2 border-2 border-gray-300 rounded-full text-md font-semibold text-black hover:bg-blue-500 hover:text-white transition flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
              </svg>
              Login / Daftar Member
            </button>
          ) : (
            <>
              <span className="text-md font-medium text-gray-700">
                👤 {user.username || user.email}
              </span>
              <button
                onClick={() => {
                  console.log("Logout button clicked");
                  logout();
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Modal Login Admin & Member */}
        <AdminLoginModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
        <MemberAuthModal isOpen={memberModalOpen} onClose={() => setMemberModalOpen(false)} />
      </div>
    </header>
  );
};

export default ForumHeader;
