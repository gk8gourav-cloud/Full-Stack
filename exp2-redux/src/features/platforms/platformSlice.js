import { createSlice } from "@reduxjs/toolkit";

const platformSlice = createSlice({
  name: "platform",
  initialState: {
    selected: "Twitter",
    limits: {
      Twitter: 280,
      LinkedIn: 500,
      Instagram: 2200,
    },
  },
  reducers: {
    setPlatform: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setPlatform } = platformSlice.actions;
export default platformSlice.reducer;