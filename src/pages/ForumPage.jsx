import React from 'react';
import ForumHeader from '../components/Forum/ForumHeader';
import ForumSearchBar from '../components/Forum/ForumSearchBar';
import DiscussionList from '../components/Forum/DiscussionList';
import ForumSidebar from '../components/Forum/ForumSidebar';

const ForumPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <ForumHeader />
      <div className="container mx-auto px-4 py-6">
        <ForumSearchBar />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <DiscussionList />
          <ForumSidebar />
        </div>
      </div>
    </div>
  );
};

export default ForumPage;