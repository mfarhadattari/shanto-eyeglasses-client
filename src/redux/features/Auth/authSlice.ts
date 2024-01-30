import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface IUser {
  _id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    refreshAuthToken: (state, action: PayloadAction<Partial<IAuthState>>) => {
      state.accessToken = action.payload.accessToken as string;
      state.user = action.payload.user as IUser;
    },
  },
});

export const { setUser, logout, refreshAuthToken } = authSlice.actions;

const persistConfig = {
  key: "eye-dmf-auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedAuthReducer;
