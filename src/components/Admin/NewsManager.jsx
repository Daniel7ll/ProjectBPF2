import React, { useEffect, useState } from "react";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} from "../../lib/newsService";

const NewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNews();
      setNewsList(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading news:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNews(editingId, formData);
      } else {
        await createNews(formData);
      }
      setFormData({ title: "", summary: "", image: "" });
      setEditingId(null);
      fetchNews();
    } catch (err) {
      console.error("Submit error:", err.message);
    }
  };

  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      summary: news.summary,
      image: news.image,
    });
    setEditingId(news.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus berita ini?")) {
      try {
        await deleteNews(id);
        fetchNews();
      } catch (err) {
        console.error("Delete error:", err.message);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Manajemen Berita 📰</h1>
        <p className="text-gray-500 mt-2">Tambah, edit, dan hapus berita kampus dengan mudah</p>
      </div>

      {/* Form */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-xl mb-10">
        <h2 className="text-2xl text-white font-semibold mb-4">
          {editingId ? "✏️ Edit Berita" : "➕ Tambah Berita"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Judul Berita"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Ringkasan Berita"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL Gambar"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingId ? "💾 Simpan Perubahan" : "📤 Tambah Berita"}
          </button>
        </form>
      </div>

      {/* News List */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🗂️ Daftar Berita</h2>
      {loading ? (
        <p className="text-gray-600">Memuat berita...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex flex-col"
            >
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-lg font-bold text-gray-800">{news.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{news.summary}</p>
              <div className="flex justify-end gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(news)}
                  className="bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(news.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsManager;
