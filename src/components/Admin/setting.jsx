import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user?.user) {
        const { data, error } = await supabase
          .from("admins")
          .select("name, email")
          .eq("id", user.user.id)
          .single();

        if (!error) {
          setAdminData(data);
        }
      }
      setLoading(false);
    };

    fetchAdminProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data: user } = await supabase.auth.getUser();

    if (user?.user) {
      const updates = { name: adminData.name };

      const { error } = await supabase
        .from("admins")
        .update(updates)
        .eq("id", user.user.id);

      if (password) {
        const { error: passError } = await supabase.auth.updateUser({
          password,
        });
        if (passError) {
          setMessage("❌ Gagal update password.");
        }
      }

      if (error) {
        setMessage("❌ Gagal update profil.");
      } else {
        setMessage("✅ Profil berhasil diperbarui.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6 font-sans ml-64 bg-[#f0f2f5] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#1877F2] to-[#0b5ed7] text-transparent bg-clip-text drop-shadow mb-6">
          👤 Edit Profil Admin
        </h1>

        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded-xl shadow-md border border-blue-200 grid grid-cols-1 gap-4"
        >
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={adminData.name}
            onChange={(e) =>
              setAdminData({ ...adminData, name: e.target.value })
            }
            className="border border-blue-300 p-3 rounded-xl"
            required
          />

          <input
            type="email"
            placeholder="Email (tidak dapat diubah)"
            value={adminData.email}
            disabled
            className="bg-gray-100 border border-blue-200 p-3 rounded-xl text-gray-600 cursor-not-allowed"
          />

          <input
            type="password"
            placeholder="Ubah Password (opsional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-blue-300 p-3 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-300"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.includes("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
