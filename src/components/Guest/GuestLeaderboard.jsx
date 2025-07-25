import React, { useState, useEffect, useRef } from "react";

const GuestLeaderboard = () => {
  const topContributors = [
    { id: 1, name: "Budi", points: 120, role: "Teknik Informatika", desc: "Aktif dalam lomba dan komunitas kampus." },
    { id: 2, name: "Siti", points: 100, role: "Manajemen Informatika", desc: "Kontributor utama pada seminar teknologi." },
    { id: 3, name: "Andi", points: 90, role: "Teknik Elektronika", desc: "Juara proyek inovasi elektronik 2025." },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const popupRef = useRef();

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setSelectedUser(null);
      }
    }
    if (selectedUser) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedUser]);

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          🏆 Leaderboard Mahasiswa Aktif
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topContributors.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="bg-white rounded-2xl shadow p-6 text-center cursor-pointer transition transform hover:scale-105"
            >
              <p className="text-2xl font-bold text-blue-600">{user.name}</p>
              <p className="text-sm text-gray-500 mb-2">{user.role}</p>
              <p className="text-lg font-semibold">{user.points} Poin</p>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-white shadow-lg rounded-2xl p-6 w-[90%] max-w-md animate-popup"
          >
            <h3 className="text-2xl font-bold mb-2 text-center text-blue-600">{selectedUser.name}</h3>
            <p className="text-gray-600 text-center mb-1">{selectedUser.role}</p>
            <p className="text-center font-semibold mb-3">{selectedUser.points} Poin</p>
            <p className="text-gray-500 text-sm text-center">{selectedUser.desc}</p>
            <div className="text-center mt-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="text-sm text-red-500 hover:underline"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-popup {
          animation: scaleUp 0.3s ease-out;
        }

        @keyframes scaleUp {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default GuestLeaderboard;