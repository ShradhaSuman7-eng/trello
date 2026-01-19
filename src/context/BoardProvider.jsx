import React, { createContext, useEffect, useState } from "react";
import { addBoards } from "../services/boards/addBoard";
import { getAllBoards } from "../services/boards/getAllBoards";

// Create context
export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [storeBoard, setStoreBoard] = useState([]);
  const [lists, setLists] = useState([]);
  const [showCard, setShowCard] = useState(null);
  const [checkLists, setCheckLists] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to create a board
  const createBoard = async (name) => {
    try {
      setLoading(true);
      setError(null);
      const newBoard = await addBoards(name);
      setBoards((prev) => [...prev, newBoard]);
      console.log("Created fron Provider");
    } catch (err) {
      console.error(err);
      setError("Failed to create board");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all Board
  const fetchBoards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBoards();

      if (Array.isArray(data)) {
        setStoreBoard(data);
      } else {
        console.error("Invalid boards response:", data);
        setStoreBoard([]);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <BoardContext.Provider
      value={{
        boards,
        setBoards,
        lists,
        setLists,
        showCard,
        setShowCard,
        loading,
        error,
        createBoard,
        storeBoard,
        checkLists,
        setCheckLists,
        checkItems,
        setCheckItems,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
