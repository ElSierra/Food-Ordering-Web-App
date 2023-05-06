import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import NavBar from "./components/header/navBar";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../chakra/themes";

export const metadata = {
  title: "Quick Chop | Order",
  description:
    "Quickchop is your go-to online food delivery service, offering a wide selection of tasty dishes from your favorite restaurants. Browse our menu, choose your favorite meals, and enjoy fast delivery right to your doorstep. With Quickchop, satisfying your cravings has never been easier.",
  keywords:
    "food delivery, online ordering, fast delivery, restaurant delivery, online food ordering, order food online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
