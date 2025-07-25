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
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNews();
      setNewsList(data);
    } catch (err) {
      console.error("Error loading news:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNews(editingId, formData);
        setStatus("✅ Berita berhasil diupdate.");
      } else {
        await createNews(formData);
        setStatus("✅ Berita berhasil ditambahkan.");
      }
      setFormData({ title: "", summary: "", image: "" });
      setEditingId(null);
      fetchNews();
    } catch (err) {
      console.error("Submit error:", err.message);
      setStatus("❌ Gagal menyimpan berita.");
    }
  };

  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      summary: news.summary,
      image: news.image,
    });
    setEditingId(news.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus berita ini?")) {
      try {
        await deleteNews(id);
        setStatus("✅ Berita berhasil dihapus.");
        fetchNews();
      } catch (err) {
        console.error("Delete error:", err.message);
        setStatus("❌ Gagal menghapus berita.");
      }
    }
  };

  return (
    <div className="p-6 font-sans ml-64 bg-[#f0f2f5] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#1877F2] to-[#0b5ed7] text-transparent bg-clip-text drop-shadow mb-6">
          📰 {editingId ? "Edit Berita" : "Tambah Berita"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border border-blue-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Judul"
            value={formData.title}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl"
            required
          />
          <input
            type="text"
            name="summary"
            placeholder="Ringkasan"
            value={formData.summary}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl"
          />
          <input
            type="text"
            name="image"
            placeholder="URL Gambar (opsional)"
            value={formData.image}
            onChange={handleInputChange}
            className="border border-blue-300 p-3 rounded-xl md:col-span-2"
          />
          <button
            type="submit"
            className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl transition duration-300 md:col-span-2"
          >
            {editingId ? "Simpan Perubahan" : "Tambah Berita"}
          </button>
        </form>

        {status && (
          <p
            className={`text-center mb-4 font-medium ${
              status.includes("Gagal") ? "text-red-600" : "text-green-600"
            }`}
          >
            {status}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <p className="col-span-full text-center">Memuat berita...</p>
          ) : newsList.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 italic">
              Belum ada berita.
            </p>
          ) : (
            newsList.map((news) => (
              <div
                key={news.id}
                className="bg-white p-4 rounded-xl shadow-md border border-blue-100 space-y-2"
              >
                {news.image && (
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <h3 className="text-lg font-bold">{news.title}</h3>
                <p className="text-sm text-gray-600">{news.summary}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(news)}
                    className="text-sm px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(news.id)}
                    className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsManager;
