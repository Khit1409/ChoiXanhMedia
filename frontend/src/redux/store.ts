import { configureStore } from "@reduxjs/toolkit";
import { authReducer, productReducer } from "./utils";
export const store = configureStore({
  reducer: {
    products: productReducer,
    auths: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
