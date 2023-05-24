"use client";

import { CartState } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  Center,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BagHappy, Home, Profile, Receipt21, Setting2 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BottomBar() {
  const cart = useAppSelector(
    (state: { cartDataReducer: CartState }) => state.cartDataReducer
  );
  const bg = useColorModeValue("#FFFFFF", "#000000");
  const pathname = usePathname();
  console.log("bottomBar", pathname);
  return (
    <Flex
      w="100%"
      position={"fixed"}
      bottom={0}
      display={{ base: "flex", lg: "none" }}
      bgColor={bg}
      align={"center"}
      justify={"space-evenly"}
      flexDirection={"row"}
      pt="10px"
      pb="10px"
    >
      <Link href={"/shop"}>
        <Center>
          <IconButton
            bg="transparent"
            aria-label={"Home"}
            icon={<Home variant={pathname === "/shop" ? "Bulk" : "Outline"} />}
          />
        </Center>
      </Link>
      <Link href={"/shop/cart"}>
        <Center>
          {/* <Text position={"absolute"}>{cart.data?.length}</Text> */}
          <IconButton
            bg="transparent"
            aria-label={"Cart"}
            icon={
              <BagHappy
                variant={pathname === "/shop/cart" ? "Bulk" : "Outline"}
              />
            }
          />
        </Center>
      </Link>

      <Link href={"/shop/orders"}>
        <Center>
          <IconButton
            bg="transparent"
            aria-label={"Orders"}
            icon={
              <Receipt21
                variant={pathname === "/shop/orders" ? "Bulk" : "Outline"}
              />
            }
          />
        </Center>
      </Link>
      <Link href={"/shop/profile"}>
        <Center>
          <IconButton
            bg="transparent"
            aria-label={"Profile"}
            icon={
              <Profile
                variant={pathname === "/shop/profile" ? "Bulk" : "Outline"}
              />
            }
          />
        </Center>
      </Link>
    </Flex>
  );
}
