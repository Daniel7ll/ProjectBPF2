// src/components/Forum/ForumSidebar.jsx
import React, { useEffect, useState } from 'react';
import ForumCategoryTag from './ForumCategoryTag';
import PopularDiscussionItem from './PopularDiscussionItem';
import NewDiscussionModal from './NewDiscussionModal';
import { supabase } from '../../lib/supabaseClient';

const ForumSidebar = ({ onCategorySelect }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [popularDiscussions, setPopularDiscussions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: 'Umum', color: 'bg-blue-100 text-blue-800' },
    { name: 'Teknologi', color: 'bg-green-100 text-green-800' },
    { name: 'Game', color: 'bg-purple-100 text-purple-800' },
    { name: 'Berita', color: 'bg-yellow-100 text-yellow-800' },
  ];

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.role === 'user') {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Gagal parse user:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPopularDiscussions = async () => {
      const { data, error } = await supabase
        .from('discussions')
        .select('id, title')
        .order('views', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Gagal mengambil diskusi populer:', error.message);
      } else {
        setPopularDiscussions(data);
      }
    };

    fetchPopularDiscussions();
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Anda harus login sebagai user.");
    } else {
      setShowModal(true);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    if (onCategorySelect) onCategorySelect(category.name);
  };

  return (
    <div className="w-full lg:w-1/4 p-4 space-y-6 flex flex-col h-full">
      {/* Tombol Posting */}
      <button
        onClick={handleClick}
        disabled={!isLoggedIn}
        className={`font-semibold py-3 px-6 rounded-lg w-full text-center shadow-md transition-colors flex-shrink-0 ${
          isLoggedIn
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-400 text-white cursor-not-allowed'
        }`}
      >
        POSTING DISKUSI BARU
      </button>

      <NewDiscussionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => window.location.reload()}
      />

      {/* Kategori */}
      <div className="bg-white rounded-lg shadow-md p-4 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`text-sm font-medium px-3 py-1 rounded-full shadow transition-colors ${category.color} ${selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Diskusi Terpopuler */}
      <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Diskusi Terpopuler</h3>
        <div className="space-y-2">
          {popularDiscussions.map((discussion) => (
            <PopularDiscussionItem
              key={discussion.id}
              title={discussion.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumSidebar;
