import { ProfileCircle, Wallet1, Location } from "iconsax-react";

export const mobileList = [
  {
    route: "",
    icon: <ProfileCircle />,
  },
  {
    route: "location",
    icon: <Location />,
  },
  {
    route: "wallet",
    icon: <Wallet1 />,
  },
];

export const desktopList = [
  { name: "My Profile", route: "" },
  { name: "My Location", route: "location" },
  { name: "My Wallet", route: "wallet" },
];
