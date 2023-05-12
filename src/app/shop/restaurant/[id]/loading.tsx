"use client";

import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import RightSide from "../components/right";


export default function Loading() {
  const rightBorder = useColorModeValue("#30303023", "#303030");
  return (
    <Flex
      mt={{ base: "80px", lg: "80px" }}
     
      as={"main"}
      h="100vh"

    >
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
        borderRight={{ base: "", lg: `1px solid ${rightBorder}` }}
      >
      
      </Box>
      <Box
        overflow={"auto"}
        position={"fixed"}
        right={"6%"}
        w={{ base: "0%", lg: "25%" }}
        flexDirection={"column"}
        display={{ base: "none", lg: "flex" }}
      >
        <RightSide />
      </Box>
    </Flex>
  );
}
