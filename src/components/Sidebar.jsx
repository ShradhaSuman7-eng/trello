import React, { useContext } from "react";
import { FaTrello, FaRegStar, FaTimes } from "react-icons/fa";
import { BoardContext } from "../context/BoardProvider";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const { storeBoard } = useContext(BoardContext);
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-14 left-0 h-[calc(100vh-56px)] w-64 bg-gray-100 border-r border-gray-300 p-4 z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h3 className="font-semibold">Menu</h3>
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>

        <ul className="space-y-2">
          <Link
            to={"/"}
            className="flex items-center gap-2 p-2 rounded-md bg-blue-100 text-blue-700 cursor-pointer"
          >
            <FaTrello />
            Boards
          </Link>
          <li className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer">
            <FaRegStar />
            Starred Boards
          </li>
        </ul>

        <h3 className="mt-6 mb-2 text-sm text-gray-600 font-semibold uppercase">
          Your Boards
        </h3>

        <div>
          {storeBoard.length > 0 ? (
            <ul className="space-y-1 ">
              {storeBoard.map((board) => (
                <li key={board.id}>
                  <Link
                    to={`/boards/${board.id}`}
                    onClick={onClose}
                    className={`block p-2 rounded-md text-sm truncate
                      
                    `}
                  >
                    {board.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No boards available</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
