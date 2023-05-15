import { useOrderFoodMutation } from "@/redux/features/api/restaurantUserPutSlice";
import { updateState } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArchiveAdd, MoneyTick, Size, TickSquare, Trash } from "iconsax-react";
import React from "react";

export default function OrderCard({
  cart,
}: {
  cart: { name: string; price: string; photo: string; quantity: string }[];
}) {
  const cardBg = useColorModeValue("#FFFFFF54", "black");
  const lineBg = useColorModeValue("#30303023", "#303030");
  const dispatch = useAppDispatch();

  return (
    <Box
      bgColor={cardBg}
      borderRadius={"10px"}
      mb="20px"
      mt='30px'
      w="100%"
      padding={"10px"}
      border={`1px dashed ${lineBg}`}
    >
      <Flex flexDirection={"column"}>
        {cart.map(({ name, price, quantity }, idx) => {
          return (
            <Flex key={idx}>
              <HStack>
                <ArchiveAdd variant="Bulk" color="green" />
                <Text fontSize={"25px"} fontWeight={"bolder"}>
                  {name}
                </Text>
              </HStack>
              <Spacer />
              <HStack>
              <Text fontSize={"25px"} fontWeight={"bolder"}>
                  X{quantity}
                </Text>
              <TickSquare variant="Bulk" color="green" /></HStack>
            </Flex>
          );
        })}

        <Spacer />
      </Flex>
    </Box>
  );
}
