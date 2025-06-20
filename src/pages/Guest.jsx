import React from "react";
import GuestHero from "../components/Guest/GuestHero";
import GuestTopTopic from "../components/Guest/GuestTopTopic";
import GuestInfo from "../components/Guest/GuestInfo";
import GuestHeader from "../components/Guest/GuestHeader";


const Guest = () => {
  return (
    <> 
      <GuestHeader />
      <div className="bg-gray-100 px-4">
        <GuestHero />
        {/* Komponen lain bisa ditambahkan di sini jika perlu */}
      </div>
      {/* Pindahkan GuestTopTopic ke dalam Fragment yang sama */}
      <div><GuestTopTopic /></div>
      <div><GuestInfo /></div>
    </>
  );
};

export default Guest;