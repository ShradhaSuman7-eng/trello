import { createSlice } from "@reduxjs/toolkit";
import {
  addCheckItem,
  removeCheckItem,
  fetchCheckItems,
} from "./checkItemThunk";

const checkItemSlice = createSlice({
  name: "checkItems",
  initialState: {
    byChecklistId: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearCheckItems(state) {
      state.byChecklistId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch */
      .addCase(fetchCheckItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckItems.fulfilled, (state, action) => {
        state.loading = false;
        const { checklistId, checkItems } = action.payload;
        state.byChecklistId[checklistId] = checkItems;
      })
      .addCase(fetchCheckItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Add */
      .addCase(addCheckItem.fulfilled, (state, action) => {
        const { checklistId, checkItem } = action.payload;
        if (!state.byChecklistId[checklistId])
          state.byChecklistId[checklistId] = [];
        state.byChecklistId[checklistId].push(checkItem);
      })

      /* Delete */
      .addCase(removeCheckItem.fulfilled, (state, action) => {
        const { checklistId, checkItemId } = action.payload;
        if (!state.byChecklistId[checklistId]) return;
        state.byChecklistId[checklistId] = state.byChecklistId[
          checklistId
        ].filter((item) => item.id !== checkItemId);
      });
  },
});

export const { clearCheckItems } = checkItemSlice.actions;
export default checkItemSlice.reducer;
