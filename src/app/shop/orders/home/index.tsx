"use client";

import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { OrdersCard } from "../components/ordersCard";
import { IOrder, Order } from "../../../../../interface/prisma";
import { useUserState } from "@/app/hooks/setGetUser";

export default function Home({ orderData }: { orderData: IOrder[] }) {
  const rightBorder = useColorModeValue("#30303023", "#303030");
  const bg = useColorModeValue("#FFFFFF54", "black");
  const lineBg = useColorModeValue("#30303023", "#303030");
  const { getUserData, setUserDataQuery } = useUserState(false);
  const user = getUserData();
  return (
    <Flex
      mt={{ base: "60px", lg: "100px" }}
      flexDirection={"column"}
      as={"main"}
      h="100vh"
    >
      <Box paddingBottom={'500px'}>
      {orderData.map((order) => {
        return <OrdersCard orderData = {order} key={order.id} />;
      })}</Box>
    </Flex>
  );
}
