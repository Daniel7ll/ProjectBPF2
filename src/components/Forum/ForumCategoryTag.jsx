// src/components/Forum/ForumCategoryTag.jsx
import React from 'react';

// Fungsi helper untuk mendapatkan warna Tailwind
const getCategoryColorClass = (colorName) => {
  switch (colorName) {
    case 'red': return 'bg-red-100 text-red-700 hover:bg-red-200';
    case 'pink': return 'bg-pink-100 text-pink-700 hover:bg-pink-200';
    case 'orange': return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
    case 'blue': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    case 'purple': return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
    case 'green': return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'gray': return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

const ForumCategoryTag = ({ category }) => {
  const colorClass = getCategoryColorClass(category.color);
  return (
    <button className={`${colorClass} px-4 py-2 rounded-md text-sm font-semibold transition-colors w-full text-left`}>
      {category.name}
    </button>
  );
};

export default ForumCategoryTag;