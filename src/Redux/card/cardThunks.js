import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCard,
  getAllCards,
  deleteCard,
  getCard,
} from "../../services/Cards/cardsApi";

/* 🔹 Fetch all cards of a list */
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (listId, thunkAPI) => {
    try {
      const data = await getAllCards(listId);
      return { listId, cards: data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* 🔹 Create card */
export const createCardThunk = createAsyncThunk(
  "cards/createCard",
  async ({ listId, cardName }, thunkAPI) => {
    try {
      const data = await createCard(listId, cardName);
      return data; // full card object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* 🔹 Get single card (optional – modal/details view) */
export const fetchCardById = createAsyncThunk(
  "cards/fetchCardById",
  async (cardId, thunkAPI) => {
    try {
      const data = await getCard(cardId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* 🔹 Delete card */
export const deleteCardThunk = createAsyncThunk(
  "cards/deleteCard",
  async (cardId, thunkAPI) => {
    try {
      await deleteCard(cardId);
      return cardId; // ✅ IMPORTANT
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
