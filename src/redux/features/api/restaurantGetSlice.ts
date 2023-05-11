import { WEBSITE_URL } from "@/redux/constants";
import { Restaurant } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: WEBSITE_URL,
  }),

  tagTypes: ["Restaurant", "rating"],
  endpoints: (builder) => ({
    getRestaurants: builder.query<
      { restaurant: Restaurant[] },
      { name?: string; start?: number; take?: number }
    >({
      query: (payload) => {
        if (payload.name) {
          if (payload.start && payload.take) {
            return `/restaurants?name=${payload.name}&start=${payload.start}&take=${payload.take}`;
          } else {
            return `/restaurants?name=${payload.name}`;
          }
        } else {
          if (payload.start && payload.take) {
            return `/restaurants?start=${payload.start}&take=${payload.take}`;
          } else {
            return `/restaurants`;
          }
        }
      },
      providesTags: ["Restaurant"],
    }),
  }),
});
export const { useGetRestaurantsQuery} = restaurantApi;
