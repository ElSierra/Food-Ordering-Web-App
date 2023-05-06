import { WEBSITE_URL } from "@/redux/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'
export const userAuthApi = createApi({
  reducerPath: "userAuthSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: WEBSITE_URL,
    prepareHeaders: (headers) => {
      // Get the access token from the state
      const token = Cookies.get('qs_token')
      // If we have a token, set it in the header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  
  }),

  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["Post"],
    }),
    logOut: builder.query({
      query: () => "/logout",
      providesTags: ["Post"],
    }),
  }),
});
export const { useGetUserQuery , useLogOutQuery} = userAuthApi;
