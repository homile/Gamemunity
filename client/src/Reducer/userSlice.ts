import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    uid: "",
    accessToken: "",
    photoURL: "",
    isLoading: false,
  },
  reducers: {
    loginUser: (state, actions) => {
      state.displayName = actions.payload.displayName;
      state.uid = actions.payload.uid;
      state.accessToken = actions.payload.accessToken;
      state.photoURL = actions.payload.photoURL;
      state.isLoading = true;
    },
    clearUser: (state) => {
      state.displayName = "";
      state.uid = "";
      state.accessToken = "";
      state.photoURL = "";
      state.isLoading = false;
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
