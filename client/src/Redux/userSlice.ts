import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: Boolean;
  allUser: [];
  user: {};
  username: String;
}

const initialState: UserState = {
  isLoggedIn: false,
  allUser: [],
  user: {},
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    getAllUsers: (state, action) => {
      state.allUser = action.payload;
    },
    setSingleUser: (state, action) => {
      state.user = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setUsername, getAllUsers, setSingleUser } =
  userSlice.actions;

export default userSlice.reducer;
