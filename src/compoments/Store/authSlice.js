import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: localStorage.getItem('status') === 'true' ? 'true' : 'false',  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.status = 'true';
      localStorage.setItem('status', 'true');
    },
    logOut: (state) => {
      state.status = 'false';
      localStorage.setItem('status', 'false');
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
