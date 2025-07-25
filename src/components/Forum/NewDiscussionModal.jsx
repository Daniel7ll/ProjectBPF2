import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const NewDiscussionModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [category_name, setCategoryName] = useState('');
  const [category_color, setCategoryColor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

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
      onSuccess?.();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-10 relative">
        {/* Tombol close */}
        <button
          className="absolute top-4 right-6 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-1 text-center">💬 Buat Diskusi Baru</h2>

        {/* Text */}
        <p className="text-sm text-gray-500 mb-6 text-center">Isi form di bawah ini untuk memulai diskusi baru dan berbagi pemikiran dengan komunitas.</p>

        {/* Form input satu kolom */}
        <div className="flex flex-col gap-4">
          {/* Judul */}
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Judul Diskusi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Dropdown kategori */}
          <select
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-blue-500 outline-none"
            value={category_name}
            onChange={(e) => {
              const selected = categories.find(c => c.name === e.target.value);
              setCategoryName(selected?.name || '');
              setCategoryColor(selected?.color || '');
            }}
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Preview warna */}
          {category_color && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Warna Kategori:</span>
              <div
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: category_color }}
              />
            </div>
          )}

          {/* Konten */}
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows={6}
            placeholder="Tulis isi diskusimu di sini..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* CTA Button */}
        <button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-md text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Mengirim...' : 'Kirim Diskusi'}
        </button>
      </div>
    </div>
  );
};

export default NewDiscussionModal;
