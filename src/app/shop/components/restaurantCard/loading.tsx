"use client";

import {
  Box,
  HStack,
  Skeleton,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Restaurant } from "@prisma/client";
import { Clock, Star } from "iconsax-react";

export default function RestaurantCardLoading() {
  const bg = useColorModeValue("#FFFFFF", "rgb(30, 30, 30, 0.5)");
  const borderColor = useColorModeValue(
    "4px solid black",
    "1px solid rgba(255,255,255,0.2)"
  );

  return (
    <Box
      h={"300px"}
      w="100%"
      borderRadius={"20px"}
      _hover={{
        backgroundImage: "linear-gradient(to right, #FBB96D46, #00FF8C55);",
      }}
      cursor="pointer"
      padding="10px"
      backdropFilter={"blur(10px)"}
      bg={bg}
      border={borderColor}
    >
      <Skeleton height="100%" w="100%"  borderRadius={"2xl"} />
    </Box>
  );
}
