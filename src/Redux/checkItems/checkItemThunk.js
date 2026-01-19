import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

/* Create a checklist item */
export const addCheckItem = createAsyncThunk(
  "checkItems/addCheckItem",
  async ({ checklistId, name }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/checklists/${checklistId}/checkItems`,
        null,
        {
          params: {
            name,
            key: apiKey,
            token: apiToken,
          },
        },
      );
      return { checklistId, checkItem: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* Delete a checklist item */
export const removeCheckItem = createAsyncThunk(
  "checkItems/removeCheckItem",
  async ({ checklistId, checkItemId }, thunkAPI) => {
    try {
      await axios.delete(
        `${baseURL}/checklists/${checklistId}/checkItems/${checkItemId}`,
        {
          params: {
            key: apiKey,
            token: apiToken,
          },
        },
      );
      return { checklistId, checkItemId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* Fetch all check items for a checklist */
export const fetchCheckItems = createAsyncThunk(
  "checkItems/fetchCheckItems",
  async (checklistId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/checklists/${checklistId}/checkItems`,
        {
          params: {
            key: apiKey,
            token: apiToken,
          },
        },
      );
      return { checklistId, checkItems: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
