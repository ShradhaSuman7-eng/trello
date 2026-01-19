import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board/boardSlice";
import listReducer from "./lists/listSlice";
import cardReducer from "./card/cardSlice";
import checklistsReducer from "./checklists/checklistSlice";
import checkItemsReducer from "./checkItems/checkItemSlice";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
    cards: cardReducer,
    checklists: checklistsReducer,
    checkItems: checkItemsReducer,
  },
});
