import React from 'react';
import { Outlet } from 'react-router-dom';
import { DefaultSidebar } from "./pages/Navbar/SidebarWithContentSeparator"

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <DefaultSidebar />
      <main className="flex-1 p-4">
        <Outlet /> {/* Renders the routed content */}
      </main>
    </div>
  );
};

export default AdminLayout;
