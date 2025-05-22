import { configureStore } from "@reduxjs/toolkit";
import { authReducer, menuReducer, productReducer } from "./utils";
export const store = configureStore({
  reducer: {
    products: productReducer,
    auths: authReducer,
    menus: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
