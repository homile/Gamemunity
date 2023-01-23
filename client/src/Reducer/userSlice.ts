import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    uid: "",
    accessToken: "",
  },
  reducers: {
    loginUser: (state, actions) => {
      state.displayName = actions.payload.displayName;
      state.uid = actions.payload.uid;
      state.accessToken = actions.payload.accessToken;
    },
    clearUser: (state) => {
      state.displayName = "";
      state.uid = "";
      state.accessToken = "";
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
