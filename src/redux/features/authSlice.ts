import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userAuthApi } from "./api/authUserSlice";

export type UserState = {
  data: { user: User } | null;
  loading: boolean;
  error: any | null;
};

const initialState = {
  data: null,
  error: null,
  loading: false,
} as UserState;

export const userDataReducer = createSlice({
  name: "userData",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = null;

      state.error = null;
      state.loading = false;
    },
    updateState: (state, action: PayloadAction<any>) => {
      console.log("payload", action.payload);
      state.data = { user: action.payload.data };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userAuthApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      }
    );

    builder.addMatcher(
      userAuthApi.endpoints.getUser.matchPending,
      (state, { payload }) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      userAuthApi.endpoints.getUser.matchRejected,
      (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      }
    );
  },
});

export const { updateState, reset } = userDataReducer.actions;
export default userDataReducer.reducer;
