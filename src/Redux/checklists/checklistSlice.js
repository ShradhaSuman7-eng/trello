import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChecklists,
  addChecklist,
  removeChecklist,
} from "./checkListThunk";

const checklistSlice = createSlice({
  name: "checklists",
  initialState: {
    byCardId: {}, // store checklists per card
    loading: false,
    error: null,
  },
  reducers: {
    clearChecklists(state) {
      state.byCardId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch */
      .addCase(fetchChecklists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        state.loading = false;
        state.byCardId[action.meta.arg] = action.payload;
      })
      .addCase(fetchChecklists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Add */
      .addCase(addChecklist.fulfilled, (state, action) => {
        const cardId = action.payload.idCard;
        if (!state.byCardId[cardId]) state.byCardId[cardId] = [];
        state.byCardId[cardId].push(action.payload);
      })

      /* Delete */
      .addCase(removeChecklist.fulfilled, (state, action) => {
        const { checklistId, cardId } = action.payload;
        if (!state.byCardId[cardId]) return;
        state.byCardId[cardId] = state.byCardId[cardId].filter(
          (c) => c.id !== checklistId,
        );
      });
  },
});

export const { clearChecklists } = checklistSlice.actions;
export default checklistSlice.reducer;
