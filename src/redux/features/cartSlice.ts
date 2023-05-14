import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type CartState = {
  data: {name: string, price: string, photo: string,amount: string }[];
};

const initialState = {
  data:
    typeof window !== "undefined" && localStorage.getItem("qcCart")
      ? JSON.parse(localStorage.getItem("qcCart") || "")
      : [],
} as CartState;

export const cartDataReducer = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = [];
    },
    updateState: (state, action: PayloadAction<any>) => {
      console.log("payload", action.payload);
      state.data = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cartData,
      };
    },
  },
});

export const { updateState, reset } = cartDataReducer.actions;
export default cartDataReducer.reducer;
