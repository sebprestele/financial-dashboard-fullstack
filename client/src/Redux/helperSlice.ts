import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface HelperState {
  modalState: Boolean;
  altModalState: Boolean;
  activeItem: String;
}

const initialState: HelperState = {
  modalState: false,
  altModalState: false,
  activeItem: "Dashboard",
};

export const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setModalState: (state) => {
      state.modalState = !state.modalState;
    },
    setAltModalState: (state) => {
      state.altModalState = !state.altModalState;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalState, setAltModalState, setActiveItem } =
  helperSlice.actions;

export default helperSlice.reducer;
