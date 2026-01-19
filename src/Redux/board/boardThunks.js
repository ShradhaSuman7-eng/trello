import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBoard, getBoards } from "../../services/Board/boardApi";
// Fetch all boards
export const fetchBoards = createAsyncThunk(
  "board/fetchBoards",
  async (_, thunkAPI) => {
    try {
      const data = await getBoards();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Add new board
export const createBoard = createAsyncThunk(
  "board/createBoard",
  async (boardName, thunkAPI) => {
    try {
      const data = await addBoard(boardName);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
