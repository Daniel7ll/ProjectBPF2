import React from 'react';

const DiscussionRow = ({ discussion, onDiscussionClick }) => {
  const categoryColorClass = (() => {
    const color = discussion?.category?.color || 'gray'; // fallback jika null
      switch (color) {
        case 'red': return 'bg-red-100 text-red-700';
        case 'pink': return 'bg-pink-100 text-pink-700';
        case 'orange': return 'bg-orange-100 text-orange-700';
        case 'blue': return 'bg-blue-100 text-blue-700';
        case 'purple': return 'bg-purple-100 text-purple-700';
        case 'green': return 'bg-green-100 text-green-700';
        case 'gray': default: return 'bg-gray-100 text-gray-700';
    }
  })();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Judul Diskusi */}
      <td className="px-6 py-4 text-sm font-medium text-gray-900 w-2/5">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onDiscussionClick(discussion);
          }}
          className="text-blue-700 hover:underline"
        >
          {discussion.title}
        </a>
        <p className="text-gray-500 text-xs mt-1">{discussion.date}</p>
      </td>

      {/* Kategori */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`${categoryColorClass} px-3 py-1 rounded-full text-xs font-semibold`}>
          {discussion.category?.name || 'TIDAK BERKATEGORI'}
        </span>

      </td>

      {/* Member */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center">
          <img src={discussion.member.avatar} alt={discussion.member.name} className="w-8 h-8 rounded-full mr-2" />
          {discussion.member.name}
        </div>
      </td>

      {/* Views */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
          </svg>
          {discussion.views}
        </div>
      </td>

      {/* Comments */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a9.013 9.013 0 01-3-0.419V15l-3 3v-3H2C.895 14 0 13.105 0 12V4c0-1.105.895-2 2-2h16c1.105 0 2 .895 2 2v8z" clipRule="evenodd"></path>
          </svg>
          {discussion.comments}
        </div>
      </td>
    </tr>
  );
};

export default DiscussionRow;
