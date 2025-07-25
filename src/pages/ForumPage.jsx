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
import NewDiscussionModal from '../components/Forum/NewDiscussionModal';

const ForumPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInMember, setLoggedInMember] = useState(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const openPostModal = () => setIsPostModalOpen(true);
  const closePostModal = () => setIsPostModalOpen(false);

  // ⬇️ State untuk berita
  const [newsList, setNewsList] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Ambil member login dari localStorage
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

  // Toggle menu sidebar
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Buka/Tutup modal diskusi
  const openDiscussionModal = (discussion) => {
    setSelectedDiscussion(discussion);
    setIsModalOpen(true);
  };

  const closeDiscussionModal = () => {
    setIsModalOpen(false);
    setSelectedDiscussion(null);
  };

  // Fetch postingan forum
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

  // Fetch berita
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
      } else {
        setNewsList(data);
      }
      setLoadingNews(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <ForumHeader onToggleSidebar={toggleMenu} />
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />

      <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-00 overflow-hidden">

        <div className="flex-grow container mx-auto px-4 py-6 flex flex-col">
          <div className="flex-grow flex flex-col lg:flex-row gap-6 mt-6">
            <div className="w-full lg:w-3/4 flex flex-col gap-6">
              {/* Banner */}
              <div className="mb-6">
                <BannerSlideshow />
              </div>

              {/* ⬇️ Berita Terbaru */}
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Berita PCR Terbaru</h2>
                {loadingNews ? (
                  <p className="text-gray-500">Memuat berita...</p>
                ) : newsList.length === 0 ? (
                  <p className="text-gray-500">Belum ada berita.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newsList.map((news) => (
                      <div key={news.id} className="border rounded p-4 shadow-sm hover:shadow-md transition">
                        {news.image && (
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-40 object-cover rounded mb-2"
                          />
                        )}
                        <h3 className="font-medium text-lg">{news.title}</h3>
                        <p className="text-sm text-gray-600">{news.summary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* Diskusi */}
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

            {/* Sidebar */}
            <ForumSidebar member={loggedInMember} />
          </div>
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