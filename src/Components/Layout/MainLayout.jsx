import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Boards from "../pages/Boards";
import BoardLists from "../pages/Lists/BoaredLists";

const MainLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardLists />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainLayout;
