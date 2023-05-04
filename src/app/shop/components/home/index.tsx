"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ExploreBox from "../explore";
import { LocationTick, PenAdd } from "iconsax-react";
import { exploreData } from "../data";
import { Banner } from "../banner";

import { useEffect, useState } from "react";
import { updateState, reset, UserState } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserQuery } from "@/redux/features/api/authUserSlice";
import UnVerifiedModalContainer from "../auth/verifyEmailModal";


export const HomeContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [test, setTest] = useState(false);
  const [skip, setSkip] = useState(true);
  const data = useGetUserQuery(
    {
      refetchOnMountOrArgChange: true,
    },
    { skip: skip }
  );

  const user = useAppSelector(
    (state: { userDataReducer: UserState }) => state.userDataReducer
  );

  const verified = user?.data?.user?.verified.toString() as string;
  if (typeof window !== "undefined") {
    console.log(verified,'for local')
 if (user?.data?.user && user?.data?.user !== undefined){
    if (user?.data?.user?.verified && user?.data?.user?.verified !== undefined) {
      localStorage.removeItem("quickChopVerified")
    } else {
      localStorage.setItem("quickChopVerified", 'a1fh');
    }}
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("quickShopToken")) {
        setSkip(false);
        if (localStorage.getItem("quickChopVerified") === "a1fh") {
          onOpen();
        }else {
        }
      } else {
        setSkip(true);
      }
    
    }
  }, [onOpen]);

  const banner2Color = useColorModeValue("#1A1A1A", "#FFFFFF");

  return (
    <>
      <UnVerifiedModalContainer isOpen={isOpen} onClose={onClose} />
      <Flex mt="120px" as={"main"} flexWrap={"wrap"} flexDirection={"column"}>
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
              bgImage="./banner1-bg.png"
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
            <Banner
              color={banner2Color}
              bgImage="./banner2-bg.png"
              heading={"Order anywhere"}
              subHeading={
                "No cooking, no hassle. Just tasty food delivered to your door."
              }
              asset={<LocationTick variant="Bulk" size={"150px"} />}
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
