"use client";

import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import React from "react";
import { LeftContainer } from "../components/left";
import RightSide from "../components/right";
import { RestaurantResponse } from "../../../../../interface/prisma";

export default function Home({
  restaurant,
  params,
}: {
  restaurant: RestaurantResponse;
  params: {
    id: string
  }
}) {
  const rightBorder = useColorModeValue("#30303023", "#303030");
  const bg = useColorModeValue("#FFFFFF54", "black");
  const lineBg = useColorModeValue("#30303023", "#303030");
  return (
    <Flex mt={{ base: "80px", lg: "80px" }} as={"main"} h="100vh">
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
        <LeftContainer restaurant={restaurant} />
      </Box>
      <Box>
        <Box
          overflowY={"scroll"}
          position={"fixed"}
          overflowX={"hidden"}
          top={20}
          mb='30px'
          pb='200px'
          bottom={0}
          right={"6%"}
          w={{ base: "0%", lg: "25%" }}
          flexDirection={"column"}
          display={{ base: "none", lg: "flex" }}
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
          <RightSide params ={params} />
        </Box>
      </Box>
    </Flex>
  );
}
