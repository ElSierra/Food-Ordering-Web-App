import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import NavBar from "./components/header/navBar";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../chakra/themes";



export const metadata = {
  title: "Quick Chop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar  />
      {children}
    </>
  );
}
