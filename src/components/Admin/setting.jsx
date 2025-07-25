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
      const updates = {
        name: adminData.name,
      };

      const { error } = await supabase
        .from("admins")
        .update(updates)
        .eq("id", user.user.id);

      // Update password jika diisi
      if (password) {
        const { error: passError } = await supabase.auth.updateUser({
          password,
        });
        if (passError) {
          setMessage("Gagal update password.");
        }
      }

      if (error) {
        setMessage("Gagal update profil.");
      } else {
        setMessage("Profil berhasil diperbarui.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="ml-64 p-8 min-h-screen bg-gradient-to-tr from-[#f0f8ff] to-white font-sans">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Edit Profile Admin</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={adminData.name}
              onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (tidak dapat diubah)
            </label>
            <input
              type="email"
              value={adminData.email}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-blue-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubah Password
            </label>
            <input
              type="password"
              placeholder="Kosongkan jika tidak ingin mengubah"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-green-600 font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
