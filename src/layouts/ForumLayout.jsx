import React from "react";
import GuestHeader from "../components/Guest/GuestHeader";
import Forum from "../pages/ForumPage";

const ForumLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">

      <Forum />
      
      <main className="flex-grow">{children}</main>
      
    </div>
  );
};

export default ForumLayout;
