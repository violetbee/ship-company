import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./services/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
