// src/components/Forum/PopularDiscussionItem.jsx
import React from 'react';

const PopularDiscussionItem = ({ title }) => {
  return (
    <a href="#" className="text-blue-600 hover:underline text-sm block mb-1">
      {title}
    </a>
  );
};

export default PopularDiscussionItem;