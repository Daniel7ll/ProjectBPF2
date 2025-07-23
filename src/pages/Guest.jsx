import React from "react";
import GuestHero from "../components/Guest/GuestHero";
import GuestTopTopic from "../components/Guest/GuestTopTopic";
import GuestInfo from "../components/Guest/GuestInfo";
import Category from "../components/Guest/category";
import GuestHighlight from "../components/Guest/GuestHighlight";
import GuestFooter from "../components/Guest/GuestFooter";
import ForumHeader from "../components/Forum/ForumHeader";
import GuestLeaderboard from "../components/Guest/GuestLeaderboard";
const Guest = () => {
  return (
    <>
      <ForumHeader />
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
