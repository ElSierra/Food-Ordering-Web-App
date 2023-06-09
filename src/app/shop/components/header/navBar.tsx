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
import {
  Alarm,
  ArrowDown2,
  BagHappy,
  Money2,
  MoneyChange,
  Receipt21,
  Timer,
  WalletMoney,
} from "iconsax-react";
import { MobileSearchBar } from "./mobileSearchBar";
import SearchModal from "../search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightSide from "../../restaurant/components/right";
import { useRef } from "react";
import { CartDrawer } from "./cartDrawer";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hooks";
import { CartState } from "@/redux/features/cartSlice";

const DynamicCartDrawer = dynamic(
  () =>
    import("./cartDrawer").then((Drawer) => {
      return Drawer.CartDrawer;
    }),
  {}
);

export default function NavBar() {
  const cart = useAppSelector(
    (state: { cartDataReducer: CartState }) => state.cartDataReducer
  );

  const borderBottom = useColorModeValue("#F7F6F6", "#303030");
  const bg = useColorModeValue("#FFFFFF", "#000000");
  const { getUserData } = useUserState();

  const pathname = usePathname();
  const user = getUserData();
  console.log("user data", user.data?.user.orders);
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
      <DynamicCartDrawer
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
              <Button
                ref={btnRef}
                display={{ base: "none", lg: "inline-block" }}
                colorScheme="teal"
                onClick={onOpenDrawer}
              >
                <HStack>
                  <BagHappy variant="Bulk" size={"20px"} />{" "}
                  <Text>{cart.data?.length}</Text>
                  <ArrowDown2 size="15px" style={{ marginLeft: "2px" }} />
                </HStack>
              </Button>
              <Link href={"/shop/orders"}>
                {" "}
                <Button
                  ml="20px"
                  display={{ base: "none", lg: "inline-block" }}
                  colorScheme="teal"
                >
                  <HStack>
                    <Receipt21 variant="Bulk" size={"20px"} />{" "}
                    <Text>{user.data?.user?.orders?.length} </Text>
                    <Center
                      className="animate__animated animate__infinite animate__jello "
                      height={"20px"}
                      width="20px"
                      borderRadius={"full"}
                    >
                      {user.data?.user?.orders[0] ? user.data?.user?.orders[0]?.status === "PENDING" ? (
                        <Box
                          width={"fit-content"}
                          padding={"2px"}
                          borderRadius={"sm"}
                          bgColor={"green"}
                        >
                          <Text color={"white"} fontWeight={"extrabold"} textColor={''} fontSize={'20px'}>
                            ₦
                          </Text>
                          <Text
                            position={"absolute"}
                            zIndex={9}
                            top={0}
                            left={1}
                            color={"white"}
                            fontWeight={"extrabold"}
                          >
                            ₦
                          </Text>
                        </Box>
                      ) : (
                        <Alarm variant="Bulk" size={"20px"} />
                      ): null}
                    </Center>
                  </HStack>
                </Button>
              </Link>
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
            <AuthMenu />
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
