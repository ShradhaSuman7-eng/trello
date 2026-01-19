import { createSlice } from "@reduxjs/toolkit";
import { createLists, fetchLists, deleteListBoard } from "./listThunk";

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 Fetch Lists
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Create List
      .addCase(createLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload);
      })
      .addCase(createLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Delete List
      .addCase(deleteListBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = state.lists.filter((list) => list.id !== action.payload);
      })

      .addCase(deleteListBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listSlice.reducer;
