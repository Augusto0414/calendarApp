import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid?: string;
  name?: string;
  email?: string;
}

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: User;
  errorMessage?: string;
}

const initialState: AuthState = {
  status: "checking", // Estado inicial
  user: {}, // Usuario vacío al inicio
  errorMessage: undefined, // Sin errores inicialmente
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    logout: (state, action: PayloadAction<string | undefined>) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = action.payload; // Mensaje opcional de error
    },
    checkingCredentials: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators
export const { login, logout, checkingCredentials, clearErrorMessage } = AuthSlice.actions;

export default AuthSlice.reducer;
