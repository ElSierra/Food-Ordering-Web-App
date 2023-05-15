import { WEBSITE_URL } from "@/redux/constants";

export type orderFood = {
  menuList: {
    id: string;
    quantity: number;
  }[];
  restaurantId: string;
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const restaurantUserApi = createApi({
  reducerPath: "restaurantUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: WEBSITE_URL,
    prepareHeaders: (headers) => {
      // Get the access token from the state
      const token = Cookies.get("qs_token");
      // If we have a token, set it in the header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["rating", "order"],
  endpoints: (builder) => ({
    rateRestaurant: builder.query<
      { msg: Number },
      { restaurant: string; like: boolean }
    >({
      query: (payload) => {
        return `/rate-restaurant?restaurant=${payload.restaurant}&like=${payload.like}`;
      },
      providesTags: ["rating"],
    }),
    orderFood: builder.mutation({
      query: (payload) => ({
        url: "/order-food",
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["order"],
    }),
    payFood: builder.mutation({
      query: (payload) => ({
        url: "/make-payment",
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});
export const {
  useRateRestaurantQuery,
  useOrderFoodMutation,
  usePayFoodMutation,
} = restaurantUserApi;
