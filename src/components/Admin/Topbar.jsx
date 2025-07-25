import React from "react";

const Topbar = () => {
  return (
    <div className="h-20 ml-64 bg-white px-6 flex items-center justify-between border-b border-blue-100 shadow-sm font-poppins">
      <input
        type="text"
        placeholder="🔍 Cari sesuatu..."
        className="border border-blue-200 px-4 py-2 rounded-xl w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
      />
      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-600 font-medium">🌐 Eng (US)</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full border border-blue-200 shadow-sm"
        />
      </div>
    </div>
  );
};

export default Topbar;
