import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";

import { Menu } from "@prisma/client";
import { ToggleOffCircle, ToggleOnCircle } from "iconsax-react";
import OrderFoodModal from "./modal";

import { useUserState } from "@/app/hooks/setGetUser";
import { UserState } from "@/redux/features/authSlice";


export const FoodCard = ({ menu }: { menu: Menu }) => {
  const lineBg = useColorModeValue("#30303023", "#303030");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUserData, setUserDataQuery } = useUserState(false);
  const user: UserState = getUserData();
  const toast = useToast();

  


  return (
    <>
      <OrderFoodModal isOpen={isOpen} onClose={onClose} menu={menu} />
      <Box
        flexDirection={"row"}
        mt="10px"
        mb="10px"
        cursor={"pointer"}
        _hover={{
          backgroundImage: "linear-gradient(to right, #FBB96D46, #00FF8C55);",
        }}
        onClick={() => {
          if (user.data?.user) {
            onOpen();
          } else {
            toast({
              title: "Login",
              description: `Please Login`,
              status: "info",
              duration: 9000,
              isClosable: true,
            });
          }
        }}
        w={{
          baseCard: "100%",
          smCard: "100%",
          mdCard: "320px",
          lgCard: "380px",
          xlCard: "440px",
        }}
        padding={"10px"}
        border={`1px solid ${lineBg}`}
        borderRadius={"2xl"}
      >
        <HStack w="100%" h="100%">
          <Flex w="200px" flexDirection={"column"} gap={"1"}>
            {" "}
            <Text fontWeight={"bolder"}>{menu.name} </Text>
            <HStack>
              <Text fontSize={"14px"} fontWeight={"bolder"}>
                Status:
              </Text>
              <Text fontSize={"14px"}>Available</Text>
              {menu.available ? (
                <ToggleOnCircle color={"#12B76A"} variant="Bulk" />
              ) : (
                <ToggleOffCircle color={"#F04438"} />
              )}
            </HStack>
            <Text fontSize={"14px"}>₦ {menu.price}</Text>
          </Flex>
          <Spacer />
          <Box h="100%">
            <Box position={"relative"} w={{ base: "120px", lg: "150px" }}>
              <Box top={0} left={0} height={"80px"}>
                <Box borderRadius={"md"} padding="10px"></Box>
                <Image
                  src={menu.photo || ""}
                  alt={"test"}
                  style={{ objectFit: "cover", borderRadius: " 10px " }}
                  fill
                />
              </Box>
            </Box>
          </Box>
        </HStack>
      </Box>
    </>
  );
};
