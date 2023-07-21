import React from "react";
import PostsTable from "../admin/PostsTable";
import Sidebar from "./Sidebar";

function DashboardMain({children}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      {children}
    </div>
  );
}

export default DashboardMain;
