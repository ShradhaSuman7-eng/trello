import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, createBoard } from "./boardThunks";

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET BOARDS
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD BOARD
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default boardSlice.reducer;
