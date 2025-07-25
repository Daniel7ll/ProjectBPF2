import React from "react";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";
import { Outlet } from "react-router-dom";
import FooterAdmin from "../components/Admin/FooterAdmin";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <Outlet />
        <FooterAdmin />
      </div>
    </div>
  );
};

export default AdminLayout;
