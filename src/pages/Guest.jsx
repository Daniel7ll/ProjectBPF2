import React, { useState } from "react";
import GuestHero from "../components/Guest/GuestHero";
import GuestTopTopic from "../components/Guest/GuestTopTopic";
import GuestInfo from "../components/Guest/GuestInfo";
import Category from "../components/Guest/category";
import GuestHighlight from "../components/Guest/GuestHighlight";
import GuestFooter from "../components/Guest/GuestFooter";
import ForumHeader from "../components/Forum/ForumHeader";
import SideMenu from "../components/Forum/SideMenu";
import GuestLeaderboard from "../components/Guest/GuestLeaderboard";

const Guest = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Tambahkan state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // ✅ Fungsi toggle
  };

  return (
    <>
      <ForumHeader onToggleSidebar={toggleMenu} /> {/* Pastikan ini sesuai props */}
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      
      <div className="bg-gray-100 px-4">
        <GuestHero />
      </div>
      
      <GuestTopTopic />
      <GuestHighlight />
      <Category />
      <GuestInfo />
      <GuestFooter />
    </>
  );
};

export default Guest;