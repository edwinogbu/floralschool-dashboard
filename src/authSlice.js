// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    signup: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;


// // authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: false,
//     token: null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.token = action.payload;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.token = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export const selectAuth = (state) => state.auth;

// export default authSlice.reducer;
