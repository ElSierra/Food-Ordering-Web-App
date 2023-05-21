"use client";

import { Box, Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import LeftSide from "../components/left";
import RightSide from "../components/right";
import { useUserState } from "@/app/hooks/setGetUser";


export const Home = () => {
  const { getUserData, setUserDataQuery } = useUserState(false);
  const user = getUserData();
  return (
    <Flex mt={{ base: "80px", lg: "80px" }} ml="15%" as={"main"} h="100vh">
      <Box
        h="100vh"
        overflow={"auto"}
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
        w={{ base: "100%", lg: "70%" }}
        pl="20px"
        pt="20px"
        pr="20px"
      >
        <RightSide user ={user}/>
      </Box>
    </Flex>
  );
};
