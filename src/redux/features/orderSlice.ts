import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderState = {
  status: string | null;
  orderId: string | null;
};

import Cookies from "js-cookie";
import { restaurantUserApi } from "./api/restaurantUserPutSlice";

const initialState = {
  status:
    typeof window !== "undefined" && Cookies.get("qcOrder")
      ? JSON.parse(Cookies.get("qcOrder") || "").status
      : null,
  orderId:
    typeof window !== "undefined" && Cookies.get("qcOrder")
      ? JSON.parse(Cookies.get("qcOrder") || "").orderId
      : null,
} as OrderState;

export const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.status = null;
      state.orderId = null;
    },
    updateOrderState: (state, action: PayloadAction<OrderState>) => {
      console.log("payload", action.payload);
      state.status = action.payload.status;
      state.orderId = action.payload.orderId;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      restaurantUserApi.endpoints.orderFood.matchFulfilled,
      (state, { payload }) => {
        let expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 10 * 60 * 1000);
        state.status = payload.data?.status;
        state.orderId = payload.data?.id;

        if (typeof window !== "undefined") {
          Cookies.remove("qcOrder");
          Cookies.set(
            "qcOrder",
            JSON.stringify({
              status: payload.data?.status,
              orderId: payload.data?.id,
            }),
            { expires: expirationDate }
          );
        }
      }
    );
    builder.addMatcher(
      restaurantUserApi.endpoints.payFood.matchFulfilled,
      (state, { payload }) => {
        console.log("🚀 ~ file: orderSlice.ts:47 ~ payload:", payload);
        state.status = payload.order?.status;
        state.orderId = payload.order?.id;

        if (typeof window !== "undefined") {
          Cookies.remove("qcOrder");
          Cookies.set(
            "qcOrder",
            JSON.stringify({
              status: payload.order?.status,
              orderId: payload.order?.id,
            })
          );

          localStorage.removeItem("qcCart");
        }
      }
    );
  },
});

export const { resetOrder, updateOrderState } = orderReducer.actions;
export default orderReducer.reducer;
