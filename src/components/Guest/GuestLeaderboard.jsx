import React from "react";

const GuestLeaderboard = () => {
  const topContributors = [
    { id: 1, name: "Budi", points: 120, role: "Teknik Informatika" },
    { id: 2, name: "Siti", points: 100, role: "Manajemen Informatika" },
    { id: 3, name: "Andi", points: 90, role: "Teknik Elektronika" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          🏆 Leaderboard Mahasiswa Aktif
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topContributors.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow p-6 text-center hover:bg-blue-50 transition"
            >
              <p className="text-2xl font-bold text-blue-600">{user.name}</p>
              <p className="text-sm text-gray-500 mb-2">{user.role}</p>
              <p className="text-lg font-semibold">
                {user.points} Poin
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestLeaderboard;
