import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    content: "",
    drafts: [],
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    saveDraft: (state) => {
      if (state.content.trim() !== "") {
        state.drafts.push(state.content);
      }
    },
    deleteDraft: (state, action) => {
      state.drafts.splice(action.payload, 1);
    },
  },
});

export const { setContent, saveDraft, deleteDraft } = postSlice.actions;
export default postSlice.reducer;