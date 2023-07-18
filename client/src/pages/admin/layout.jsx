import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

function layout({ children }) {
  return (
    <div className="bg-gray-100 h-screen">
      <div>
        <AdminSidebar children={children} />
      </div>
    </div>
  );
}

export default layout;
