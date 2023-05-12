import { WEBSITE_URL } from "@/redux/constants";
import { Restaurant } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RestaurantResponse } from "../../../../interface/prisma";
export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: WEBSITE_URL,
  }),

  tagTypes: ["Restaurant", "rating"],
  endpoints: (builder) => ({
    getRestaurants: builder.query<
      { restaurant: RestaurantResponse[] },
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
    getSingleRestaurant: builder.query<
      { restaurant: RestaurantResponse[] },
      { id: string }
    >({
      query: (payload) => {
        return `/restaurants/${payload.id}`;
      },
      providesTags: ["Restaurant"],
    }),
  }),
});
export const { useGetRestaurantsQuery, useGetSingleRestaurantQuery } =
  restaurantApi;
