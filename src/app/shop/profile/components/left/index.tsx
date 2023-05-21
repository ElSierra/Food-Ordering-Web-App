"use client";

import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftSide() {
  const rightBorder = useColorModeValue("#30303023", "#303030");
  const buttonBg = useColorModeValue(
    "rgba(0, 0, 0, 0.08)",
    "rgba(255, 255, 255, 0.08)"
  );
  const buttonTextColor = useColorModeValue("black", "white");

  const pathname = usePathname();
  return (
    <Box
      mt={{ base: "80px", lg: "80px" }}
      position={"fixed"}
      h="100vh"
      overflow={"auto"}
      style={{ scrollbarWidth: "none" }}
      css={{
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-track": {
          width: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "",
          borderRadius: "",
        },
      }}
      w={{ base: "20%", lg: "15%" }}
      pl="20px"
      pt="20px"
      pr="20px"
      borderRight={{ base: "", lg: `1px solid ${rightBorder}` }}
    >
      <Box>
        <HStack>
          <Avatar size={"xs"} />
          <Text fontSize={"sm"}>My account</Text>
        </HStack>
        <Box ml="22px" mt="20px">
          <Link href={"/shop/profile/"}>
            {" "}
            <Button
              w="100%"
              size={"sm"}
              bg={pathname !== "/shop/profile" ? "none" : buttonBg}
              justifyContent={"left"}
              color={
                pathname !== "/shop/profile"
                  ? "rgb(99, 111, 130)"
                  : buttonTextColor
              }
            >
              My Profile
            </Button>
          </Link>
          <Link href={"/shop/profile/location"}>
            <Button
              bg={pathname !== "/shop/profile/location" ? "none" : buttonBg}
              color={
                pathname !== "/shop/profile/location"
                  ? "rgb(99, 111, 130)"
                  : buttonTextColor
              }
              mt="10px"
              w="100%"
              size={"sm"}
              justifyContent={"left"}
            >
              My Location
            </Button>
          </Link>

          <Link href={"/shop/profile/wallet"}>
            <Button
              bg={pathname !== "/shop/profile/wallet" ? "none" : buttonBg}
              mt="10px"
              w="100%"
              color={
                pathname !== "/shop/profile/wallet"
                  ? "rgb(99, 111, 130)"
                  : buttonTextColor
              }
              size={"sm"}
              justifyContent={"left"}
            >
              My Wallet
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
