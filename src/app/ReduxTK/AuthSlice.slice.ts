import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User.type";
const initialState = {
  isLogin: false,
  error: false,
  user: [],
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<User>) => {
      state.isLogin = true;
    },
    loginSuccess: (state, actions: PayloadAction) => {
      state.isLogin = false;
    },
    loginFail: (state, actions: PayloadAction) => {
      state.isLogin = false;
    },
  },
});
export const { login, loginSuccess, loginFail } = AuthSlice.actions;
// const selectBlogs = (state: RootState) => state.blog.blog;
export default AuthSlice.reducer;
