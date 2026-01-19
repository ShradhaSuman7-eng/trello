import { createAsyncThunk } from "@reduxjs/toolkit";
import { createList, getLists, deleteList } from "../../services/Lists/listApi";

export const createLists = createAsyncThunk(
  "lists/createList",
  async ({ listName, boardId }, thunkAPI) => {
    try {
      const data = await createList(listName, boardId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchLists = createAsyncThunk(
  "lists/getLists",
  async (boardId, thunkAPI) => {
    try {
      const data = await getLists(boardId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const deleteListBoard = createAsyncThunk(
  "lists/deleteList",
  async (listId, thunkAPI) => {
    try {
      await deleteList(listId); // API call
      return listId; // ✅ reducer-friendly payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
