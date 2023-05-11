"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Spinner,
  Text,
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
import { Restaurant } from "@prisma/client";
import Lottie from "lottie-react";
import animationData from "../assets/food.json";
import animationData2 from "../assets/delivery.json";
import RestaurantCardLoading from "../restaurantCard/loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetRestaurantsQuery } from "@/redux/features/api/restaurantGetSlice";
import "./grid.css";
import Link from "next/link";
import { ArrowSquareUp, ArrowUp } from "iconsax-react";
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
 
  const [restaurantData, setRestaurantData] = useState(restaurantFromServer);
  const { getUserData, setUserDataQuery } = useUserState(skip);
  const user: UserState = getUserData();
  const data = setUserDataQuery();
  const restaurants = useGetRestaurantsQuery({
    start: restaurantData?.length,
    take: 20,
  });

  console.log('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)
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
        ...(restaurants?.data?.restaurant || []),
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

  const url = pathname
  console.log('🌍',url)
    console.log(
      "🚀 ~ file: index.tsx:100 ~ useEffect ~ restaurants.data?.restaurant.length:",
      restaurants.data?.restaurant.length
    );

    if (restaurants.data?.restaurant.length === 0) {
      setHasMore(false);
    }
  }, [onOpen, restaurants.data?.restaurant.length, pathname]);

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
            overflowX="scroll"
            w="100%"
            overflowY={"hidden"}
            scrollSnapType={"x mandatory"}
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
              asset={
                <Center>
                  <Lottie
                    style={{ height: "500px" }}
                    animationData={animationData}
                    size={5}
                  />
                </Center>
              }
            />
            <Banner
              bgImage="./bg1.svg"
              heading={"Welcome to QuickChop"}
              subHeading={
                "No cooking, no hassle. Just tasty food delivered to your door."
              }
              asset={
                <Center>
                  <Lottie
                    style={{ height: "500px" }}
                    animationData={animationData2}
                    size={5}
                  />
                </Center>
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
            endMessage={
              <Box position={"absolute"}  left={"50%"} right={"50%"} bottom={10}>
                {" "}
                <Link href={"shop/#top"} style={{marginTop: '30px'}}>
                <IconButton aria-label="up" icon={<ArrowSquareUp size="32"/>}/></Link>
              </Box>
            }
          >
            {restaurantData
              ? restaurantData.map((restaurant) => {
                  return (
                    <RestaurantCard
                     user = {user}
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
