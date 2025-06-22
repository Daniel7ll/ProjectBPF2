// src/pages/ForumPage.jsx
import React, { useState } from 'react';
import ForumHeader from '../components/Forum/ForumHeader';
import ForumSearchBar from '../components/Forum/ForumSearchBar';
import DiscussionList from '../components/Forum/DiscussionList';
import ForumSidebar from '../components/Forum/ForumSidebar';
import ForumPost from '../components/Forum/ForumPost';
import SideMenu from '../components/Forum/SideMenu';
import BannerSlideshow from '../components/Forum/BannerSlideshow'; // Impor komponen BannerSlideshow
import DiscussionModal from '../components/Forum/DiscussionModal'; // <-- Impor komponen modal baru

import { forumPosts } from '../data/forumPosts.jsx'; // Pastikan path dan ekstensi benar (.jsx)
import { discussions } from '../data/forumData.js'; // <-- Impor data 'discussions' untuk modal

const ForumPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // --- State untuk Modal Diskusi ---
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol visibilitas modal
  const [selectedDiscussion, setSelectedDiscussion] = useState(null); // State untuk menyimpan data diskusi yang akan ditampilkan

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Fungsi untuk Modal Diskusi ---
  const openDiscussionModal = (discussion) => {
    setSelectedDiscussion(discussion);
    setIsModalOpen(true);
  };

  const closeDiscussionModal = () => {
    setIsModalOpen(false);
    setSelectedDiscussion(null); // Reset diskusi yang dipilih setelah ditutup
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <ForumHeader onToggleSidebar={toggleMenu} />
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />

      <div className="flex-grow container mx-auto px-4 py-6 flex flex-col">
        <ForumSearchBar />
        
        <div className="flex-grow flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            {/* Komponen Slideshow Banner Iklan ditempatkan di sini */}
            <div className="mb-6"> {/* Margin bawah untuk spasi dari DiscussionList */}
              <BannerSlideshow />
            </div>
            
            {/* Meneruskan fungsi openDiscussionModal ke DiscussionList */}
            <DiscussionList onDiscussionClick={openDiscussionModal} /> 
            
            {forumPosts.map(post => (
              <ForumPost key={post.id} post={post} />
            ))}
          </div>

          <ForumSidebar />
        </div>
      </div>

      {/* --- Merender DiscussionModal secara kondisional --- */}
      {/* Modal hanya akan dirender ketika isModalOpen adalah true */}
      <DiscussionModal 
        isOpen={isModalOpen} 
        onClose={closeDiscussionModal} 
        discussion={selectedDiscussion} 
      />
    </div>
  );
};

export default ForumPage;