"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Restaurant } from "@prisma/client";
import {
  ArrowSquareRight,
  Clock,
  Dislike,
  Like,
  Like1,
  Star,
} from "iconsax-react";
import Image from "next/image";

import "./loadImage.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";
import { useRateRestaurantQuery } from "@/redux/features/api/restaurantUserPutSlice";
import { useUserState } from "@/app/hooks/setGetUser";
import { UserState } from "@/redux/features/authSlice";
import { RestaurantResponse } from "../../../../../interface/prisma";

export default function RestaurantCard({
  restaurant,
  user,
}: {
  restaurant: Restaurant;
  user: UserState;
}) {
  const bg = useColorModeValue("#FFFFFF", "rgb(30, 30, 30, 0.5)");
  const borderColor = useColorModeValue(
    "4px solid black",
    "1px solid rgba(255,255,255,0.2)"
  );
  const [like, setLike] = useState(false);
  const [skip, setSkip] = useState(true);

  const rateRestaurant = useRateRestaurantQuery(
    { restaurant: restaurant.id, like },
    { skip: skip }
  );

  const disableButton =
    user.data?.user?.like?.some((obj) => obj.restaurantId === restaurant.id) ||
    user.data?.user?.dislike?.some((obj) => obj.restaurantId === restaurant.id);
  const handleLike = () => {
    setLike(true);
    setSkip(false);
  };
  const handleDisLike = () => {
    setSkip(false);
    setLike(false);
  };
  return (
    <Box
      h={"350px"}
      w="100%"
      borderRadius={"20px"}
      _hover={{
        backgroundImage: "linear-gradient(to right, #FBB96D46, #00FF8C55);",
      }}
      padding="10px"
      backdropFilter={"blur(10px)"}
      bg={bg}
      border={borderColor}
    >
      <Box height={"200px"} position={"relative"}>
        <Link href={`shop/restaurant/${restaurant.id}`}>
          <Box
            position={"absolute"}
            top={0}
            left={0}
            cursor="pointer"
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
        </Link>
      </Box>
      <Flex mt="15px" flexDirection={"column"} justifyContent={'space-evenly'}>
        <Flex flexDirection={"column"} gap={1}>
          <HStack>
            <Text fontWeight={"bolder"} fontSize={"md"}>
              {restaurant.name}
            </Text>
            <Spacer />
            <HStack width={'80px'}>
              <Star
                variant={"Bulk"}
                size={"20px"}
                cursor="pointer"
                onClick={() => {}}
              />
              <Text fontSize={"12px"}>
                {rateRestaurant.data?.msg?.toString() || restaurant.rating} (
                {restaurant.ratingAmount})%
              </Text>
            </HStack>
          </HStack>
          <HStack>
            <Clock variant="Bulk" size={"20px"} />
            <Text fontSize={"12px"}>54-64 mins</Text>
          </HStack>

          <Flex>
            {user.data?.user && (
              <HStack>
                <IconButton
                  bg={"#12B76A"}
                  size={"xs"}
                  isDisabled={disableButton}
                  aria-label="like"
                  _hover={{ bg: "#0B7946" }}
                  onClick={handleLike}
                  icon={<Like1 size={"16px"} color="white" />}
                />
                <IconButton
                  bg={"#F04438"}
                  isDisabled={disableButton}
                  size={"xs"}
                  onClick={handleDisLike}
                  _hover={{ bg: "#82251E" }}
                  aria-label="dislike"
                  icon={<Dislike size={"16px"} color="white" />}
                />
              </HStack>
            )}
            <Spacer />
          </Flex>
        </Flex>
        <Spacer />
        <Flex position={'absolute'} bottom={0} right={0} padding={'20px'} zIndex={9}>
          <Spacer />
          <Link href={`shop/restaurant/${restaurant.id}`}>
            <ArrowSquareRight color={"#09B766"} size={"30px"} variant="Bulk" />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
