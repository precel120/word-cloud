import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SummaryScore } from "../views/game-view/types";
import { InitialStateType } from "./types";

const initialState: InitialStateType = {
  userName: "",
  score: { right: 0, missed: 0, wrong: 0 },
};

export const slice = createSlice({
  name: "wordcloud",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setScore: (state, action: PayloadAction<SummaryScore>) => {
      state.score = action.payload;
    },
  },
});

export const { setUserName, setScore } = slice.actions;

export default slice.reducer;
