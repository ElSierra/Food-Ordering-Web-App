"use client";

import { Box, HStack, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { Restaurant } from "@prisma/client";
import { Clock, Star } from "iconsax-react";
import Image from "next/image";


import "./loadImage.css";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <Box
      h={"330px"}
      w="100%"
      onClick={() => router.push(`shop/restaurant/${restaurant.id}`)}
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
      <Box height={"200px"} position={"relative"}>
        <Box
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
        >
          <Image
            src={`${restaurant.photo}`}
            alt={restaurant.name}
            placeholder="blur"
            blurDataURL={restaurant.loadingImage}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            fill
           
          />
        </Box>
      </Box>
      <Box mt="15px">
        <HStack>
          <Text fontWeight={"bolder"} fontSize={"md"}>
            {restaurant.name}
          </Text>
          <Spacer />
          <HStack>
            <Star variant="Bulk" size={'20px'} />
            <Text>5.00</Text>
          </HStack>
        </HStack>
        <HStack>
          <Clock variant="Bulk" size={'20px'} />
          <Text>54-64 mins</Text>
        </HStack>
      </Box>
    </Box>
  );
}
