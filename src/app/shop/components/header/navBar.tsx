"use client";

import {
  Avatar,
  Box,
  Center,
  Flex,
  Modal,
  Spacer,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import Logo from "../assets/logo-v2.svg";
import Image from "next/image";
import ModalContainer from "../auth/modalContainer";
import { AuthPage } from "../auth/authPage";
import { SearchBar } from "./searchBar";
import { AuthMenu } from "../auth/authMenu";
import { useEffect } from "react";
import { useGetUserQuery } from "@/redux/features/api/authUserSlice";



export default function NavBar() {

 
  // const {
  //   data: userData,
  //   isLoading: isGetLoading,
  //   isSuccess: isGetSuccess,
  //   isError: isGetError,
  //   error: getError,
  // } = useGetUserQuery({ refetchOnMountOrArgChange: false });
  // console.log("🚀 ~ file: navBar.tsx:39 ~ NavBar ~ userData:", {userData, isGetError,isGetLoading,getError});
  // console.log("🚀 ~ file: navBar.tsx:39 ~ NavBar ~ getError:", getError);

  const borderBottom = useColorModeValue("#F7F6F6", "#303030");
  const bg = useColorModeValue("#FFFFFF", "#1A1A1A");

  return (
    <Box
      as="nav"
      position="fixed"
      display={"block"}
      w="100%"
      padding={0}
      zIndex={"10"}
      bg={bg}
    >
      <Flex
        pl={{ base: "20px", sm: "20px", md: "20px", lg: "80px" }}
        pr={{ base: "20px", sm: "20px", md: "20px", lg: "80px" }}
        pt={{ base: "10px", sm: "20px", md: "15px" }}
        pb={{ base: "10px", sm: "20px", md: "15px" }}
        borderBottom={`1px solid ${borderBottom}`}
        height={"fit-content"}

        // borderEndStartRadius={'20px'}

        // borderEndEndRadius={'20px'}
      >
        <Box>
          <Image width={80} src={Logo} alt="Quick-chop" />
        </Box>

        <Spacer />
        <SearchBar />
        <Center
          ml={{
            base: "30px",
            sm: "30px",
            md: "50px",
            lg: "50px",
            xl: "50px",
            xxl: "50px",
            vxl: "60px",
          }}
        >
          <AuthMenu
            // userData={userData}
            // isGetLoading={isGetLoading}
            //isLoggedIn={false}
          />
        </Center>
      </Flex>
    </Box>
  );
}
