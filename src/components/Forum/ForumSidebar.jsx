// src/components/Forum/ForumSidebar.jsx
import React, { useEffect, useState } from 'react';
import ForumCategoryTag from './ForumCategoryTag';
import PopularDiscussionItem from './PopularDiscussionItem';
import { categories, popularDiscussions } from '../../data/forumData';
import NewDiscussionModal from './NewDiscussionModal';

const ForumSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Anda harus login sebagai user.");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="w-full lg:w-1/4 p-4 space-y-6 flex flex-col h-full">
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
        onSuccess={() => window.location.reload()} // Refresh halaman setelah kirim
      />

      <div className="bg-white rounded-lg shadow-md p-4 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <ForumCategoryTag key={index} category={category} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Diskusi Terpopuler</h3>
        <div className="space-y-2">
          {popularDiscussions.map((discussion) => (
            <PopularDiscussionItem key={discussion.id} title={discussion.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumSidebar;
