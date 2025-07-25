import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserShield,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaNewspaper,
} from "react-icons/fa";
import PCRLogo from "../../assets/logo.jpg";

// Komponen link sidebar dengan active style
const SidebarLink = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition duration-200 ${
        isActive
          ? "bg-blue-200 text-blue-900 font-semibold"
          : "hover:bg-blue-100 text-[#0e175f]"
      }`
    }
  >
    <span className="text-lg">{icon}</span>
    <span>{children}</span>
  </NavLink>
);

const Sidebar = () => {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/guest";
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-[#e6f0ff] flex flex-col px-6 py-8 shadow-md font-sans z-50 overflow-y-auto justify-between">
      <div>
        {/* Logo */}
        <div className="flex justify-start items-center mb-8">
          <img src={PCRLogo} alt="PCR CONNECT" className="w-52 object-contain" />
        </div>

        {/* Judul Menu */}
        <div className="text-[#0e175f] font-bold uppercase text-sm tracking-wide mb-2 px-1">
          Main Menu
        </div>

        {/* Menu Navigasi */}
        <nav className="flex flex-col gap-2 text-[#1877f2] font-medium text-[15px]">
          <SidebarLink to="/admin" icon={<FaTachometerAlt />}>Dashboard</SidebarLink>
          <SidebarLink to="/admins" icon={<FaUserShield />}>Admins</SidebarLink>
          <SidebarLink to="/member" icon={<FaUsers />}>Members</SidebarLink>
          <SidebarLink to="/news" icon={<FaNewspaper />}>News Manager</SidebarLink>
          <SidebarLink to="/settings" icon={<FaCog />}>Settings</SidebarLink>
        </nav>
      </div>

      {/* Logout (di bagian bawah sidebar) */}
      <div className="mt-10">
        <hr className="mb-4 border-blue-200" />
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg transition duration-200 w-full"
        >
          <FaSignOutAlt className="text-xl" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
