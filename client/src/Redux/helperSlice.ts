import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface HelperState {
  modalState: Boolean;
}

const initialState: HelperState = {
  modalState: false,
};

export const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setModalState: (state) => {
      state.modalState = !state.modalState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalState } = helperSlice.actions;

export default helperSlice.reducer;
