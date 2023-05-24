import { WEBSITE_URL } from "@/redux/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'
export const userAuthApi = createApi({
  reducerPath: "userAuthSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${WEBSITE_URL}/auth`,
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

  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    }),
    logOut: builder.query({
      query: () => "/logout",
      providesTags: ["User"],
    }),
    photoPost: builder.mutation({
      query: (payload) => ({
        url: `/upload-preview`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useGetUserQuery , useLogOutQuery, usePhotoPostMutation} = userAuthApi;
