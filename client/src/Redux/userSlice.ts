import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: Boolean;
  allUser: [];
  user: {};
  goals: Object;
}

const initialState: UserState = {
  isLoggedIn: false,
  allUser: [],
  user: {},
  goals: {
    totalValueTarget: 1000000,
    cryptoPercentTarget: 20,
    stockPercentTarget: 70,
    cashPercentTarget: 10,
  },
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
    setUserGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, getAllUsers, setSingleUser, setUserGoals } =
  userSlice.actions;

export default userSlice.reducer;
