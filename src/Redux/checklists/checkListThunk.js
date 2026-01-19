import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createChecklist,
  deleteChecklist,
  getAllCheckLists,
} from "../../services/CheckLists/checklistAPI";

/* Fetch checklists of a card */
export const fetchChecklists = createAsyncThunk(
  "checklists/fetchChecklists",
  async (cardId, thunkAPI) => {
    try {
      return await getAllCheckLists(cardId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* Create checklist */
export const addChecklist = createAsyncThunk(
  "checklists/addChecklist",
  async ({ cardId, name }, thunkAPI) => {
    try {
      return await createChecklist(cardId, name);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* Delete checklist */
export const removeChecklist = createAsyncThunk(
  "checklists/removeChecklist",
  async ({ checklistId, cardId }, thunkAPI) => {
    try {
      await deleteChecklist(checklistId);
      return { checklistId, cardId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
