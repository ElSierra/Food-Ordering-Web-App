export interface user {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  phone: string;
  location: {
    latitude: string,
    longitude: string,
    boolean : string
  };
  photo: string;
  OTP: string;
  payment: string;
  preferences: any;
  balance: string;
}

export const riderResponse = {
  id: true,
  email: true,
  name: true,
  verified: true,
  phone: true,
  location: true,
  photo: true,
  OTP: true,
  preferences: true,
  balance: true,
  orders: {
    include: {
      user: {
        select: {
          location: true,
          phone: true,
          email: true,
        },
      },
      restaurant: {
        select: {
          location: true,
        },
      },
    },
  },
};
