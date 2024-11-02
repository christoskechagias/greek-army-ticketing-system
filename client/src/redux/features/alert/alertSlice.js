import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: undefined,
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    alert: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { alert, resetState } = alertSlice.actions;
export default alertSlice.reducer;
