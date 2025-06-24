import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
  if (!isOpen || !discussion) return null;

  const [comments, setComments] = useState(discussion.commentList || []);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim() === '') return;
    const newEntry = {
      id: comments.length + 1,
      author: 'You',
      avatar: 'https://via.placeholder.com/30?text=U',
      content: newComment,
      date: new Date().toLocaleString()
    };
    setComments([...comments, newEntry]);
    setNewComment('');
  };

  const categoryColorClass = (() => {
    switch (discussion.category.color) {
      case 'red': return 'bg-red-100 text-red-700';
      case 'pink': return 'bg-pink-100 text-pink-700';
      case 'orange': return 'bg-orange-100 text-orange-700';
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'purple': return 'bg-purple-100 text-purple-700';
      case 'green': return 'bg-green-100 text-green-700';
      case 'gray': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  })();

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg shadow-2xl w-full max-w-6xl flex relative max-h-[90vh] overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Konten Utama */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">{discussion.title}</h2>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4 border-b pb-4">
              <span className={`${categoryColorClass} px-3 py-1 rounded-full text-xs font-semibold`}>
                {discussion.category.name}
              </span>
              <div className="flex items-center">
                <img src={discussion.member.avatar} alt={discussion.member.name} className="w-6 h-6 rounded-full mr-2" />
                <span>{discussion.member.name}</span>
              </div>
              <span>{discussion.date}</span>
            </div>

            <div className="prose max-w-none text-gray-800 leading-relaxed mb-6">
              <p>{discussion.content}</p>
            </div>

            <div className="flex items-center text-gray-500 text-base">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10z" clipRule="evenodd" />
                  </svg>
                  {discussion.views} Views
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a9.013 9.013 0 01-3-.419V15l-3 3v-3H2C.895 14 0 13.105 0 12V4c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2v8z" clipRule="evenodd" />
                  </svg>
                  {comments.length} Comments
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Komentar */}
          <div className="w-1/3 border-l p-4 flex flex-col bg-gray-50 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Komentar</h3>
            <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
              {comments.map((c) => (
                <div key={c.id} className="bg-white p-3 rounded shadow-sm">
                  <div className="flex items-center mb-1">
                    <img src={c.avatar} alt={c.author} className="w-6 h-6 rounded-full mr-2" />
                    <div className="text-sm text-gray-700 font-medium">{c.author}</div>
                  </div>
                  <p className="text-sm text-gray-600">{c.content}</p>
                  <div className="text-xs text-gray-400 mt-1">{c.date}</div>
                </div>
              ))}
            </div>

            {/* Input komentar */}
            <div className="mt-4">
              <textarea
                className="w-full p-2 border rounded resize-none text-sm"
                rows={3}
                placeholder="Tulis komentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 text-sm float-right"
              >
                Kirim
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
};

export default DiscussionModal;
