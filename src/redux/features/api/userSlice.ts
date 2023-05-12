import { WEBSITE_URL } from "@/redux/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userSlice = createApi({
  reducerPath: "userSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${WEBSITE_URL}/auth`,
  }),

  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    verifyOTP: builder.mutation({
      query: (payload) => ({
        url: `/otp?email=${payload.email}`,
        method: "PUT",
        query: payload.query,
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    signUP: builder.mutation({
      query: (payload) => ({
        url: `/signup`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useLoginUserMutation, useVerifyOTPMutation, useSignUPMutation } =
  userSlice;
