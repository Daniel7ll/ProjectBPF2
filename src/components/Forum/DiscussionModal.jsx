import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../assets/contexts/AuthContext'; // ⬅️ Tambahkan ini

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const DiscussionModal = ({ isOpen, onClose, discussion }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth(); // ⬅️ Dapatkan user login dari context

  useEffect(() => {
    const fetchComments = async () => {
      if (!discussion?.id) return;
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('comments')
          .select('*')
          .eq('discussion_id', discussion.id)
          .order('created_at', { ascending: true });

        if (fetchError) throw fetchError;
        setComments(data || []);
      } catch (err) {
        setError('Gagal memuat komentar. Silakan coba lagi.');
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchComments();
    } else {
      setComments([]);
      setNewComment('');
      setError(null);
    }
  }, [isOpen, discussion?.id]);

const handleSubmit = async () => {
  if (newComment.trim() === '' || isSubmitting || !user) return;

  setIsSubmitting(true);
  try {
    const newEntry = {
      content: newComment,
      discussion_id: discussion.id,
      user_id: user.id,
      author: user.user_metadata?.full_name || user.email,
      avatar: `https://placehold.co/40x40?text=${user.email[0].toUpperCase()}`,
      date: new Date().toISOString()
    };
    console.log("📤 Inserting comment:", newEntry);

    const { data: insertedComment, error: insertError } = await supabase
      .from('comments')
      .insert([newEntry])
      .select()
      .single();

    if (insertError) throw insertError;

    setComments(prev => [...prev, insertedComment]);
    setNewComment('');
  } catch (err) {
    console.error("❌ Submission error:", err);
    alert(`Gagal mengirim komentar. Error: ${err.message || err.details}`);
  } finally {
    setIsSubmitting(false);
  }
};



  const categoryColorClass = (() => {
    if (!discussion?.category_color) return 'bg-gray-100 text-gray-700';
    switch (discussion.category_color) {
      case 'red': return 'bg-red-100 text-red-700';
      case 'pink': return 'bg-pink-100 text-pink-700';
      case 'orange': return 'bg-orange-100 text-orange-700';
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'purple': return 'bg-purple-100 text-purple-700';
      case 'green': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  })();

  if (!isOpen || !discussion) return null;

  const renderCommentContent = () => {
    if (loading) return <p className="text-sm text-gray-500 text-center py-4">Memuat komentar...</p>;
    if (error) return <p className="text-sm text-red-500 text-center py-4">{error}</p>;
    if (comments.length === 0) return <p className="text-sm text-gray-500 text-center py-4">Belum ada komentar.</p>;

    return comments.map((c) => (
      <div key={c.id} className="bg-white p-3 rounded shadow-sm">
        <div className="flex items-center mb-1">
          <img src={c.avatar} alt={c.author} className="w-6 h-6 rounded-full mr-2" />
          <div className="text-sm text-gray-700 font-medium">{c.author}</div>
        </div>
        <p className="text-sm text-gray-600 break-words">{c.content}</p>
        <div className="text-xs text-gray-400 mt-1">
          {new Date(c.created_at).toLocaleString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </div>
      </div>
    ));
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden" animate="visible" exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg shadow-2xl w-full max-w-6xl flex relative max-h-[90vh] overflow-hidden"
          variants={modalVariants}
          initial="hidden" animate="visible" exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Kiri: Konten diskusi */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold z-10"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">{discussion.title}</h2>

            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4 border-b pb-4">
              <span className={`${categoryColorClass} px-3 py-1 rounded-full text-xs font-semibold`}>
                {discussion.category_name}
              </span>
              <div className="flex items-center">
                <img src={discussion.member_avatar} alt={discussion.member_name} className="w-6 h-6 rounded-full mr-2" />
                <span>{discussion.member_name}</span>
              </div>
              <span>{new Date(discussion.date).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}</span>
            </div>

            <div className="prose max-w-none text-gray-800 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: discussion.content }} />

            <div className="flex items-center text-gray-500 text-base">
              <div className="flex items-center space-x-4">
                <div className="flex items-center" title="Views">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  {discussion.views}
                </div>
                <div className="flex items-center" title="Comments">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  {comments.length}
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: Komentar */}
          <div className="w-1/3 border-l p-4 flex flex-col bg-gray-50 max-h-[90vh]">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 sticky top-0 bg-gray-50 py-2">Komentar</h3>
            <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
              {renderCommentContent()}
            </div>

            {/* Komentar Input (Hanya untuk member yang login) */}
            <div className="mt-4 pt-4 border-t">
              {user ? (
                <>
                  <textarea
                    className="w-full p-2 border rounded resize-none text-sm"
                    rows={3}
                    placeholder={`Tulis komentar sebagai ${user.username || user.email}...`}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 text-sm float-right disabled:bg-blue-400 disabled:cursor-not-allowed"
                    disabled={isSubmitting || newComment.trim() === ''}
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim'}
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-600">Silakan <strong>login sebagai member</strong> untuk menulis komentar.</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
};

export default DiscussionModal;
