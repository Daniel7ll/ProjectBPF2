// src/components/Forum/ForumSidebar.jsx
import React from 'react';
import ForumCategoryTag from './ForumCategoryTag';
import PopularDiscussionItem from './PopularDiscussionItem';
import { categories, popularDiscussions } from '../../data/forumData'; // Import data

const ForumSidebar = () => {
  return (
    // Tambahkan flex flex-col h-full agar komponen ini mengisi tinggi yang tersedia
    <div className="w-full lg:w-1/4 p-4 space-y-6 flex flex-col h-full">
      {/* Button Posting Diskusi Baru */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full text-center shadow-md transition-colors flex-shrink-0">
        POSTING DISKUSI BARU
      </button>

      {/* Kategori Section */}
      <div className="bg-white rounded-lg shadow-md p-4 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <ForumCategoryTag key={index} category={category} />
          ))}
        </div>
      </div>

      {/* Diskusi Terpopuler Section */}
      {/* Tambahkan flex-grow agar bagian ini mengisi sisa ruang vertikal */}
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