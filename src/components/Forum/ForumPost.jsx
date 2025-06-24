// src/components/Forum/ForumPost.jsx
import React from 'react';

// Komponen ini sekarang menerima 'post' sebagai prop
const ForumPost = ({ post }) => {
  // Destructuring data dari objek post
  const { channel, author, timestamp, caption, media, interactions, lastReply, type } = post;

  return (
    <div className="bg-white rounded-lg shadow-md p-4"> {/* Kontainer utama postingan */}
      {/* Header Postingan */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Logo Channel */}
          <div className="bg-blue-600 p-1 rounded mr-2 flex items-center justify-center">
            {channel.icon} {/* Menggunakan ikon dari data */}
          </div>
          <span className="text-gray-900 font-semibold mr-2">{channel.name}</span>
          <a href={channel.link} className="text-blue-500 text-sm hover:underline">Gabung</a>
        </div>
        <div className="text-gray-500 text-sm">
          {author} • {timestamp}
        </div>
      </div>

      {/* Judul/Caption Postingan */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {caption}
      </h3>

      {/* Area Media (Conditional Rendering: Video atau Gambar) */}
      {/* Ganti seluruh bagian ini mulai dari <div className="relative w-full ..."> */}
      <div className="relative w-full rounded-lg overflow-hidden mb-4">
        {/* Jika tipe video dan ada embedUrl, tampilkan iframe */}
        {type === 'video' && media.embedUrl ? (
          <div className="aspect-video w-full h-full">
            <iframe
              className="w-full h-full"
              src={media.embedUrl}
              title="Embedded YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : type === 'image' && media.imageUrl ? (
          // Jika gambar
          <img
            src={media.imageUrl}
            alt="Post Image"
            className="w-full h-auto object-cover"
          />
        ) : null}
      </div>


      {/* Footer Interaksi (Icons) */}
      <div className="flex items-center justify-between text-gray-500 text-lg mb-2">
        <div className="flex items-center space-x-4">
          <button className="flex items-center hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            {interactions.upvotes}
          </button>
          <button className="flex items-center hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414L10 16.414l-4.707-4.707a1 1 0 011.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            {interactions.downvotes}
          </button>
          <button className="flex items-center hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5zm0 2h10v6H5V6zm0 8h10l-2 2H7l-2-2z"></path></svg>
            {interactions.views}
          </button>
          <button className="flex items-center hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a9.013 9.013 0 01-3-0.419V15l-3 3v-3H2C.895 14 0 13.105 0 12V4c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2v8z" clipRule="evenodd"></path></svg>
            {interactions.comments}
          </button>
          <button className="flex items-center hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 14.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM5.25 14.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path><path fillRule="evenodd" d="M5.25 14.75H2.25V12.75H5.25V14.75zM12.75 14.75H9.75V12.75H12.75V14.75zM12.75 8.25H9.75V6.25H12.75V8.25z" clipRule="evenodd"></path></svg>
            Bagikan
          </button>
        </div>
        <div className="text-gray-500 text-sm">
          Balasan terakhir {lastReply.time} dari {lastReply.from}
        </div>
      </div>
    </div>
  );
};

export default ForumPost;