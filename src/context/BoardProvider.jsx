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

  // Create board
  const createBoard = async (name) => {
    try {
      setLoading(true);
      setError(null);

      const newBoard = await addBoards(name);

      // Ensure newBoard exists before adding
      if (newBoard) {
        setBoards((prev) => [...prev, newBoard]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create board");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all boards (SAFE)
  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllBoards();

      // GUARANTEE array
      if (Array.isArray(data)) {
        setStoreBoard(data);
      } else if (Array.isArray(data?.boards)) {
        setStoreBoard(data.boards);
      } else {
        console.error("Invalid boards response:", data);
        setStoreBoard([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch boards");
      setStoreBoard([]);
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
