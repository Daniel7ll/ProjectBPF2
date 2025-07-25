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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "Edit Berita" : "Tambah Berita"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4 mb-8"
      >
        <input
          type="text"
          placeholder="Judul"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Ringkasan"
          className="w-full border p-2 rounded"
          rows={3}
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="URL Gambar"
          className="w-full border p-2 rounded"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Simpan Perubahan" : "Tambah Berita"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Daftar Berita</h2>
      {loading ? (
        <p>Memuat berita...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white p-4 rounded shadow space-y-2 relative"
            >
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-32 object-cover rounded"
                />
              )}
              <h3 className="text-lg font-medium">{news.title}</h3>
              <p className="text-sm text-gray-600">{news.summary}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(news)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(news.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded"
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
