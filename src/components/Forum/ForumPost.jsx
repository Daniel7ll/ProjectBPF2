// src/components/Forum/ForumPost.jsx
import React from 'react';

const ForumPost = ({ post }) => {
  const {
    channel_name,
    channel_link,
    author,
    timestamp,
    caption,
    type,
    embed_url,
    image_url,
    upvotes,
    downvotes,
    views,
    comments,
    shares,
    last_reply_time,
    last_reply_from
  } = post;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-blue-600 p-1 rounded mr-2 flex items-center justify-center">
            {/* Default icon */}
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16z"></path>
            </svg>
          </div>
          <span className="text-gray-900 font-semibold mr-2">{channel_name}</span>
          <a href={channel_link || "#"} className="text-blue-500 text-sm hover:underline">Gabung</a>
        </div>
        <div className="text-gray-500 text-sm">
          {author} • {timestamp}
        </div>
      </div>

      {/* Caption */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{caption}</h3>

      {/* Media */}
      <div className="relative w-full rounded-lg overflow-hidden mb-4">
        {type === 'video' && embed_url ? (
          <div className="aspect-video w-full h-full">
            <iframe
              className="w-full h-full"
              src={embed_url}
              title="Embedded YouTube Video"
              allowFullScreen
            />
          </div>
        ) : type === 'image' && image_url ? (
          <img src={image_url} alt="Post" className="w-full h-auto object-cover" />
        ) : null}
      </div>

      {/* Interaksi */}
      <div className="flex items-center justify-between text-gray-500 text-lg mb-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">{upvotes} 👍</div>
          <div className="flex items-center">{downvotes} 👎</div>
          <div className="flex items-center">{views} 👁️</div>
          <div className="flex items-center">{comments} 💬</div>
          <div className="flex items-center">{shares} 🔗</div>
        </div>
        <div className="text-sm">
          Balasan terakhir {last_reply_time} dari {last_reply_from}
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
