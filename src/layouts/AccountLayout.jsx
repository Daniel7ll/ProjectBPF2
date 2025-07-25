import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ForumHeader from '../components/Forum/ForumHeader';
import ForumFooter from '../components/Forum/ForumFooter';

const AccountLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ForumHeader toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <ForumFooter />
    </div>
  );
};

export default AccountLayout;
