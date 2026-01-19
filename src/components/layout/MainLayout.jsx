import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import HomePage from "../pages/HomePage";
import Lists from "../model/Lists/Lists";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col ">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 pt-16 px-4 md:px-6 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/boards/:boardId" element={<Lists />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
