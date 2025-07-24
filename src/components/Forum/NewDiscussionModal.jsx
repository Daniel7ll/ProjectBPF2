// src/components/Forum/NewDiscussionModal.jsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const NewDiscussionModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [category_name, setCategoryName] = useState('');
  const [category_color, setCategoryColor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ List kategori dengan warna
  const categories = [
    { name: 'Umum', color: '#3498db' },
    { name: 'Teknologi', color: '#2ecc71' },
    { name: 'Game', color: '#e74c3c' },
    { name: 'Berita', color: '#f39c12' },
  ];

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase.from('discussions').insert({
      title,
      category_name,
      category_color,
      content,
      views: 0,
      date: new Date(),
      member_name: user.name,
      member_avatar: 'https://i.pravatar.cc/150?u=' + user.email,
    });

    setLoading(false);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      alert('Gagal menambahkan diskusi: ' + error.message);
    } else {
      alert('Diskusi berhasil ditambahkan!');
      onSuccess?.(); // refresh data
      onClose();     // tutup modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Tambah Diskusi Baru</h2>

        {/* Judul */}
        <input
          className="w-full border p-2 mb-2"
          placeholder="Judul Diskusi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Dropdown kategori */}
        <label className="block mb-2 font-semibold">Kategori</label>
        <select
          className="w-full border p-2 mb-2"
          value={category_name}
          onChange={(e) => {
            const selected = categories.find(c => c.name === e.target.value);
            setCategoryName(selected.name);
            setCategoryColor(selected.color);
          }}
        >
          <option value="">-- Pilih Kategori --</option>
          {categories.map(cat => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Preview warna kategori */}
        {category_color && (
          <div className="flex items-center mb-4">
            <span className="text-sm mr-2">Warna:</span>
            <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: category_color }}
            />
          </div>
        )}

        {/* Konten */}
        <textarea
          className="w-full border p-2 mb-4"
          rows={4}
          placeholder="Isi Diskusi"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Tombol aksi */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Batal</button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDiscussionModal;
