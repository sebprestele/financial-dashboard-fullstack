import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: Boolean;
  allUser: [];
  user: {};
  username: String;
  userImage: String;
}

const initialState: UserState = {
  isLoggedIn: false,
  allUser: [],
  user: {},
  username: "",
  userImage: "",
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
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsLoggedIn,
  setUsername,
  getAllUsers,
  setSingleUser,
  setUserImage,
} = userSlice.actions;

export default userSlice.reducer;
