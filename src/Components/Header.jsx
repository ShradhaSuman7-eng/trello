import React from "react";
import { FaTrello, FaBars } from "react-icons/fa";

const Header = ({ onMenuClick }) => {
  return (
    <header className="w-full h-14 bg-[#026AA7] flex items-center justify-between px-4 shadow-md fixed top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button className="text-white text-xl md:hidden" onClick={onMenuClick}>
          <FaBars />
        </button>

        <FaTrello className="text-white text-2xl" />
        <h1 className="text-white text-xl font-bold hidden sm:block">Trello</h1>
      </div>
    </header>
  );
};

export default Header;
