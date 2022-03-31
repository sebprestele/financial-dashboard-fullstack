import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface HelperState {
  modalState: Boolean;
  altModalState: Boolean;
  dropZoneOpenState: Boolean;
  activeItem: String;
  goalsModalState: Boolean;
}

const initialState: HelperState = {
  modalState: false,
  altModalState: false,
  dropZoneOpenState: false,
  activeItem: "Dashboard",
  goalsModalState: false,
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
    setDropzoneOpenState: (state) => {
      state.dropZoneOpenState = !state.dropZoneOpenState;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setGoalsModalState: (state) => {
      state.goalsModalState = !state.goalsModalState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setModalState,
  setAltModalState,
  setDropzoneOpenState,
  setActiveItem,
  setGoalsModalState,
} = helperSlice.actions;

export default helperSlice.reducer;
