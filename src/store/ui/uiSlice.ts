import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface uiState {
  isDateModalOpen: boolean;
}

const initialState: uiState = {
  isDateModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenDateModal: (state: uiState) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state: uiState) => {
      state.isDateModalOpen = false;
    },
    onChangeDateModal: (state: uiState, action: PayloadAction<boolean>) => {
      state.isDateModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal, onChangeDateModal } = uiSlice.actions;

export default uiSlice.reducer;
