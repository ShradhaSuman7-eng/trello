import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaTrello, FaTimes, FaRegStar } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const { boards = [] } = useSelector((state) => state.boards);
  const location = useLocation();

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-14 left-0 h-[calc(100vh-56px)] w-64
        bg-gray-100 border-r border-gray-300 p-4 z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h3 className="font-semibold">Menu</h3>
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Main Links */}
        <ul className="space-y-2">
          <Link
            to="/"
            onClick={onClose}
            className={`flex items-center gap-2 p-2 rounded-md
              ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-200"
              }`}
          >
            <FaTrello />
            Boards
          </Link>

          <li className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer text-gray-700">
            <FaRegStar />
            Starred Boards
          </li>
        </ul>

        {/* Boards Section */}
        <h3 className="mt-6 mb-2 text-xs text-gray-600 font-semibold uppercase">
          Your Boards
        </h3>

        {boards.length > 0 ? (
          <ul className="space-y-1">
            {boards.map((board) => {
              const isActive = location.pathname === `/boards/${board.id}`;

              return (
                <li key={board.id}>
                  <Link
                    to={`/boards/${board.id}`}
                    onClick={onClose}
                    className={`block px-3 py-2 rounded-md text-sm truncate
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                          : "hover:bg-gray-200"
                      }`}
                  >
                    {board.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-2">No boards available</p>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
