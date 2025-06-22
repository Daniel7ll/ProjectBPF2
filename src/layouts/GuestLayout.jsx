import React from "react";
import GuestHeader from "../components/Guest/GuestHeader";
import Guest from "../pages/Guest";



const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Guest />      
      
      
      <main className="flex-grow">{children}</main>
      
    </div>
  );
};

export default GuestLayout;
