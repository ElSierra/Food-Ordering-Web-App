import  cartDataReducer  from '@/redux/features/cartSlice';
import { userSlice } from "./features/api/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import { userAuthApi } from "./features/api/authUserSlice";
import { createWrapper } from "next-redux-wrapper";
import userDataReducer from "./features/authSlice";
import { restaurantApi } from "./features/api/restaurantGetSlice";
import { restaurantUserApi } from "./features/api/restaurantUserPutSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    cartReducer,
    [userSlice.reducerPath]: userSlice.reducer,

    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [restaurantUserApi.reducerPath]: restaurantUserApi.reducer,
    userDataReducer, cartDataReducer
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userSlice.middleware)
      .concat(userAuthApi.middleware)
      .concat(restaurantApi.middleware)
      .concat(restaurantUserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
