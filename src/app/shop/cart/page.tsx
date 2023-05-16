"use client";

import { useUserState } from "@/app/hooks/setGetUser";
import RightSide from "../restaurant/components/right";
import { Box } from "@chakra-ui/react";
export default function Cart() {
  const { getUserData, setUserDataQuery } = useUserState(false);
  const user = getUserData();
  return (
    <Box pl={"5%"} pr="5%" paddingTop={"100px"} paddingBottom={"300px"}>
      <RightSide />
    </Box>
  );
}
