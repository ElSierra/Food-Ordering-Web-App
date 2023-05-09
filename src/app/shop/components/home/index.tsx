"use client";

import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  chakra,
  shouldForwardProp,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ExploreBox from "../explore";

import { exploreData } from "../data";
import { Banner } from "../banner";

import { useEffect, useState } from "react";
import { UserState } from "@/redux/features/authSlice";

import UnVerifiedModalContainer from "../auth/verifyEmailModal";
import { useUserState } from "@/app/hooks/setGetUser";
import Cookies from "js-cookie";
import Image from "next/image";
import QuickChop from "../assets/quickchop.svg";
import RestaurantCard from "../restaurantCard";
import { motion, isValidMotionProp } from "framer-motion";
import { Restaurant } from "@prisma/client";
import RestaurantCardLoading from "../restaurantCard/loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetRestaurantsQuery } from "@/redux/features/api/restaurantGetSlice";
import "./grid.css";

export const HomeContainer = ({
  restaurant: restaurantFromServer,
  isLoadingPage,
}: {
  restaurant: Restaurant[];
  isLoadingPage: Boolean;
}) => {
  console.log("here");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [skip, setSkip] = useState(true);

  const [restaurantData, setRestaurantData] = useState(restaurantFromServer);
  const { getUserData, setUserDataQuery } = useUserState(skip);
  const user: UserState = getUserData();
  const data = setUserDataQuery();
  const restaurants = useGetRestaurantsQuery({
    start: restaurantData?.length,
    take: 20,
  });
  console.log(restaurants);

  const verified = user?.data?.user?.verified.toString() as string;
  if (typeof window !== "undefined") {
    localStorage.removeItem("chakra-ui-color-mode");
    console.log(verified, "for local");
    if (user?.data?.user && user?.data?.user !== undefined) {
      if (
        user?.data?.user?.verified &&
        user?.data?.user?.verified !== undefined
      ) {
        localStorage.removeItem("quickChopVerified");
      } else {
        localStorage.setItem("quickChopVerified", "a1fh");
      }
    }
  }
  console.log("hh", restaurants.data);
  const getMoreRestaurants = () => {
    if (restaurants.data) {
      setRestaurantData((restShop) => [
        ...restShop,
        ...restaurants.data.restaurant,
      ]);
    }
  };

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (Cookies.get("qs_token")) {
        console.log(Cookies.get("qs_token"));
        setSkip(false);
        if (localStorage.getItem("quickChopVerified") === "a1fh") {
          onOpen();
        } else {
        }
      } else {
        setSkip(true);
      }
    }

    console.log("🚀 ~ file: index.tsx:100 ~ useEffect ~ restaurants.data?.restaurant.length:", restaurants.data?.restaurant.length)

    if (restaurants.data?.restaurant.length === 0){
    
      setHasMore(false)
          }
  }, [onOpen, restaurants.data?.restaurant.length ]);

  const banner2Color = useColorModeValue("#1A1A1A", "#FFFFFF");

  return (
    <>
      <UnVerifiedModalContainer isOpen={isOpen} onClose={onClose} />

      <Flex
        mt={{ base: "180px", lg: "120px" }}
        mb={{ base: "100px", lg: "80px" }}
        as={"main"}
        flexWrap={"wrap"}
        flexDirection={"column"}
      >
        <Box id="explore" as={"section"} w="100%">
          <Text fontWeight={"medium"} fontSize={"2xl"}>
            Explore Categories{" "}
          </Text>
          <Box
            mt={"20px"}
            overflowX="auto"
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
          >
            <Flex gap={"20px"}>
              {exploreData.map((data, index) => {
                return (
                  <ExploreBox
                    key={index}
                    Icon={data.icon}
                    text={data.text}
                    bg={data.bg}
                    borderColor={data.borderColor}
                    onClick={(e) => {
                      console.log(e);
                    }}
                  />
                );
              })}
            </Flex>
          </Box>
        </Box>
        <Box as={"section"} w="100%">
          <Flex
            gap={"20px"}
            justify={"space-between"}
            overflowX="auto"
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
          >
            <Banner
              color={"black"}
              bgImage="./bg2.svg"
              heading={"Order anywhere"}
              subHeading={"No location we no fit reach."}
              asset={<Image width={150} src={QuickChop} alt={"Quick Chop"} />}
            />
            <Banner
              bgImage="./bg1.svg"
              heading={"Welcome to QuickChop"}
              subHeading={
                "No cooking, no hassle. Just tasty food delivered to your door."
              }
              asset={
                <video controls={false} muted autoPlay loop>
                  <source src="./vi.webm" type="video/webm" />
                </video>
              }
            />
          </Flex>
        </Box>
        <div
          style={{ display: !isLoadingPage ? "none" : "grid" }}
          className="grid"
        >
          {isLoadingPage
            ? [0, 1, 2, 3, 4].map((loading, idx) => {
                return <RestaurantCardLoading key={idx} />;
              })
            : null}
        </div>

        {restaurantData && restaurantData.length > 0 ? (
          <InfiniteScroll
            className="grid"
            style={{ marginTop: "60px" }}
            dataLength={restaurantData?.length}
            next={getMoreRestaurants}
            hasMore={hasMore}
            loader={
              <Box position={"absolute"} left={"50%"} right={"50%"} bottom={20}>
                {" "}
                <Spinner thickness="4px" size={{ base: "sm", md: "md" }} />
              </Box>
            }
            endMessage={ <Box position={"absolute"} left={"50%"} right={"50%"} bottom={20}>
            {" "}
           <Text>😉</Text>
          </Box>}
          >
            {restaurantData
              ? restaurantData.map((restaurant) => {
                  return (
                    <RestaurantCard
                      restaurant={restaurant}
                      key={restaurant.id}
                    />
                  );
                })
              : null}
          </InfiniteScroll>
        ) : null}
      </Flex>
    </>
  );
};
