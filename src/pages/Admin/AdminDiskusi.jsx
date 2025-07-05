import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"; // Pastikan path ini sesuai!

const AdminDiskusi = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [forums, setForums] = useState([]);

  // Ambil data diskusi dari Supabase
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("forums")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setForums(data);
  };

  // Submit data baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("forums").insert([
      {
        title,
        content,
      },
    ]);

    if (!error) {
      setTitle("");
      setContent("");
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold">Kelola Diskusi</h2>

      {/* Form Tambah Diskusi */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Tambah Diskusi Baru</h3>
        <input
          type="text"
          placeholder="Judul Diskusi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Isi Diskusi"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Tambah
        </button>
      </form>

      {/* Daftar Diskusi */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Daftar Diskusi</h3>
        <ul className="space-y-4">
          {forums.map((f) => (
            <li key={f.id} className="border-b pb-2">
              <h4 className="font-semibold">{f.title}</h4>
              <p className="text-sm text-gray-600">{f.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDiskusi;
