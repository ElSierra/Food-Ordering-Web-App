import { userSlice } from "./features/api/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

import { userAuthApi } from "./features/api/authUserSlice";
import { createWrapper } from "next-redux-wrapper";
import userDataReducer from "./features/authSlice";
import { restaurantApi } from "./features/api/restaurantGetSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    userDataReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userSlice.middleware)
      .concat(userAuthApi.middleware)
      .concat(restaurantApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
