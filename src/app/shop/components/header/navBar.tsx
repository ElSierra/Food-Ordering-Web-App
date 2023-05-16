"use client";

import {
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Spacer,
  useColorModeValue,
  useMediaQuery,
  HStack,
  IconButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";

import Logo from "../assets/logo-v2.svg";
import Image from "next/image";

import { SearchBar } from "./searchBar";
import { AuthMenu } from "../auth/authMenu";
import { useUserState } from "@/app/hooks/setGetUser";
import { ArrowDown2, BagHappy, WalletMoney } from "iconsax-react";
import { MobileSearchBar } from "./mobileSearchBar";
import SearchModal from "../search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightSide from "../../restaurant/components/right";
import { useRef } from "react";
import { CartDrawer } from "./cartDrawer";

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
  const bg = useColorModeValue("#FFFFFF", "#000000");
  const { getUserData } = useUserState();

  const pathname = usePathname();
  const user = getUserData();
  console.log("header", pathname.split("/").length);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const btnRef = useRef(null);

  function formatCompactNumber(number: number) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
  }
  return (
    <>
      <CartDrawer
        isOpen={isOpenDrawer}
        onClose={onCloseDrawer}
        btnRef={btnRef}
      />
      <SearchModal isOpen={isOpen} onClose={onClose} />
      <Box
        as="nav"
        position="fixed"
        display={"block"}
        w="100%"
        padding={0}
        zIndex={"10"}
        bg={bg}
        borderBottom={`1px solid ${borderBottom}`}
      >
        <Flex
          pl={{ base: "20px", sm: "20px", md: "20px", lg: "80px" }}
          pr={{ base: "20px", sm: "20px", md: "20px", lg: "80px" }}
          pt={{ base: "10px", sm: "20px", md: "15px" }}
          pb={{ base: "10px", sm: "20px", md: "15px" }}
          borderBottom={{ base: ``, lg: "1px solid ${borderBottom}" }}
          height={"fit-content"}

          // borderEndStartRadius={'20px'}

          // borderEndEndRadius={'20px'}
        >
          <Link href={"/shop"}>
            <Box>
              <Image width={80} src={Logo} alt="Quick-chop" />
            </Box>
          </Link>

          <>
            <Spacer />
            {pathname.split("/").length === 4 &&
            pathname.split("/")[2] === "restaurant" ? null : (
              <SearchBar onOpen={onOpen} />
            )}
          </>
          <Spacer />
          {user.data?.user && (
            <Center>
              <HStack mr={{ base: "10px", lg: "20px" }}>
                <WalletMoney variant="Bulk" size={"20px"} />
                <Text fontWeight={"bolder"}>
                  ₦ {formatCompactNumber(user.data?.user?.balance || 0)}{" "}
                </Text>
                <ArrowDown2 size="15px" style={{ marginLeft: "2px" }} />
              </HStack>
              <Button ref={btnRef} colorScheme="teal" onClick={onOpenDrawer}>
                <HStack>
                  <BagHappy variant="Bulk" size={"20px"} />{" "}
                  <ArrowDown2 size="15px" style={{ marginLeft: "2px" }} />
                </HStack>
              </Button>
            </Center>
          )}
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
        {pathname.split("/").length === 2 &&
        pathname.split("/")[1] === "shop" ? (
          <MobileSearchBar onOpen={onOpen} />
        ) : null}{" "}
      </Box>
    </>
  );
}
