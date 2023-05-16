import { Menu, Orders, Restaurant } from "@prisma/client";

export type UserResponse = {
  id: string;
  email: string;
  phone: string;
  disable: boolean;
  name: string;
  like: { restaurantId: string }[];
  location: any;
  dislike: { restaurantId: string }[];
  orders: [];
  loginInfo: [];
  verified: boolean;
  OTP: number;
  password: string;
  photo: string | null;
  balance: number;
  locationId: string | null;
  paymentId: string | null;
  preferencesId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RestaurantResponse = {
  id: string;
  name: string;
  verified: boolean;
  loadingImage: string;
  ratingAmount: string | null;
  location: any;
  menu: [];
  orders: [];
  category: { id: string; type: string }[];
  available: boolean;
  slug: string;
  photo: string;
  like: { restaurantId: string }[];
  dislike: { restaurantId: string }[];
  rating: string | null;
  createdAt: Date;
  updatedAt: Date;
  locationId: string | null;
  restaurantAdminId: string | null;
};

export type Order = {
  id: string;
  restaurantId: string;
  status: string;
  total: number;
  rider: [];
  foodOrder: {
    menu: {
      id: string;
      name: string;
      price: string;
      photo: string;
    };
  }[];
}[];

export interface IOrder extends Orders {
  rider: {
    location: Location | null;
    name: string;
    phone: string;
    photo: string | null;
  } | null;
  restaurant: Restaurant;
  foodOrder: {
    menu: Menu;
    quantity: number;
  }[];
}
[];
