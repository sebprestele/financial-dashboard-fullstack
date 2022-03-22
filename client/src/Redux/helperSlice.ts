import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface HelperState {
  modalState: Boolean;
  altModalState: Boolean;
}

const initialState: HelperState = {
  modalState: false,
  altModalState: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { setModalState, setAltModalState } = helperSlice.actions;

export default helperSlice.reducer;
