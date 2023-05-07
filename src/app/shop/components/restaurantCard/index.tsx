"use client";

import { Box, HStack, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { Restaurant } from "@prisma/client";
import { Clock, Star } from "iconsax-react";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
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
      <Box
        bgSize={"cover"}
        borderRadius={"2xl"}
        bgImage={restaurant.photo}
        height={"200px"}
      ></Box>
      <Box mt="15px">
        <HStack>
          <Text fontWeight={"bolder"} fontSize={"md"}>
            {restaurant.name}
          </Text>
          <Spacer />
          <HStack>
            <Star variant="Bulk" />
            <Text>5.00</Text>
          </HStack>
        </HStack>
        <HStack>
          <Clock variant="Bulk" />
          <Text>54-64 mins</Text>
        </HStack>
      </Box>
    </Box>
  );
}
