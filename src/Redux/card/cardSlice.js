import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCards,
  createCardThunk,
  deleteCardThunk,
  fetchCardById,
} from "./cardThunks";

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cardsByList: {}, // { listId: [] }
    selectedCard: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedCard: (state) => {
      state.selectedCard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= FETCH CARDS ================= */
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cardsByList[action.payload.listId] = action.payload.cards;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CREATE CARD ================= */
      .addCase(createCardThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCardThunk.fulfilled, (state, action) => {
        state.loading = false;
        const card = action.payload;

        if (!state.cardsByList[card.idList]) {
          state.cardsByList[card.idList] = [];
        }

        state.cardsByList[card.idList].push(card);
      })
      .addCase(createCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE CARD ================= */
      .addCase(deleteCardThunk.fulfilled, (state, action) => {
        const cardId = action.payload;

        Object.keys(state.cardsByList).forEach((listId) => {
          state.cardsByList[listId] = state.cardsByList[listId].filter(
            (card) => card.id !== cardId,
          );
        });
      })

      /* ================= FETCH SINGLE CARD ================= */
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCard = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCard } = cardSlice.actions;
export default cardSlice.reducer;
