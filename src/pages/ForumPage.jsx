import React, { useState, useEffect } from 'react';
import ForumHeader from '../components/Forum/ForumHeader';
import ForumSearchBar from '../components/Forum/ForumSearchBar';
import DiscussionList from '../components/Forum/DiscussionList';
import ForumSidebar from '../components/Forum/ForumSidebar';
import ForumPost from '../components/Forum/ForumPost';
import SideMenu from '../components/Forum/SideMenu';
import BannerSlideshow from '../components/Forum/BannerSlideshow';
import DiscussionModal from '../components/Forum/DiscussionModal';
import ForumFooter from '../components/Forum/ForumFooter';
import { supabase } from '../lib/supabaseClient';
import NewDiscussionModal from '../components/Forum/NewDiscussionModal'; // impor dulu


const ForumPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInMember, setLoggedInMember] = useState(null); // ✅
  
const [isPostModalOpen, setIsPostModalOpen] = useState(false);

const openPostModal = () => setIsPostModalOpen(true);
const closePostModal = () => setIsPostModalOpen(false);

  // Baca dari localStorage saat load
  useEffect(() => {
    const storedMember = localStorage.getItem('member');
    if (storedMember) {
      const parsed = JSON.parse(storedMember);
      console.log("✅ Member ditemukan:", parsed);
      setLoggedInMember(parsed);
    } else {
      console.log("❌ Tidak ada data member di localStorage");
    }
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openDiscussionModal = (discussion) => {
    setSelectedDiscussion(discussion);
    setIsModalOpen(true);
  };

  const closeDiscussionModal = () => {
    setIsModalOpen(false);
    setSelectedDiscussion(null);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setForumPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <ForumHeader onToggleSidebar={toggleMenu} />
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />

      <div className="flex-grow container mx-auto px-4 py-6 flex flex-col">
        <div className="flex-grow flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            <div className="mb-6">
              <BannerSlideshow />
            </div>

            <DiscussionList onDiscussionClick={openDiscussionModal} />

            {loading ? (
              <p className="text-gray-500">Memuat postingan...</p>
            ) : forumPosts.length === 0 ? (
              <p className="text-gray-500">Belum ada postingan forum.</p>
            ) : (
              forumPosts.map((post) => (
                <ForumPost key={post.id} post={post} />
              ))
            )}
          </div>

          {/* ⬇️ Kirim info login ke Sidebar */}
          <ForumSidebar member={loggedInMember} />
        </div>
      </div>

      <DiscussionModal
        isOpen={isModalOpen}
        onClose={closeDiscussionModal}
        discussion={selectedDiscussion}
      />
       <ForumFooter />
    </div>
  );
};

export default ForumPage;
