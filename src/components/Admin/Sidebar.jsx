import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserShield,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaNewspaper, // ✅ ikon berita
} from "react-icons/fa";
import PCRLogo from "../../assets/logo.jpg"; // logo PNG transparan

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-[#e6f0ff] flex flex-col px-5 py-8 font-sans shadow-md overflow-y-auto z-50">
      
      {/* LOGO FULL PRESISI */}
      <div className="flex justify-start items-center mb-10">
        <img
          src={PCRLogo}
          alt="PCR CONNECT"
          className="w-56 object-contain"
        />
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-6 text-[#1877f2] font-medium text-[16px]">
        <Link
          to="/admin"
          className="flex items-center gap-3 hover:bg-blue-100 px-2 py-2 rounded-lg transition"
        >
          <FaTachometerAlt className="text-xl" /> Dashboard
        </Link>
        <Link
          to="/admins"
          className="flex items-center gap-3 hover:bg-blue-100 px-2 py-2 rounded-lg transition"
        >
          <FaUserShield className="text-xl" /> Admins
        </Link>
        <Link
          to="/member"
          className="flex items-center gap-3 hover:bg-blue-100 px-2 py-2 rounded-lg transition"
        >
          <FaUsers className="text-xl" /> Members
        </Link>

        {/* ✅ Tambahan link ke News Manager */}
        <Link
          to="/news"
          className="flex items-center gap-3 hover:bg-blue-100 px-2 py-2 rounded-lg transition"
        >
          <FaNewspaper className="text-xl" /> News Manager
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 hover:bg-blue-100 px-2 py-2 rounded-lg transition"
        >
          <FaCog className="text-xl" /> Settings
        </Link>

        <div className="flex-grow" />

        <a
          href="#"
          className="flex items-center gap-3 text-red-500 hover:bg-red-100 px-2 py-2 rounded-lg transition"
        >
          <FaSignOutAlt className="text-xl" /> Sign Out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
