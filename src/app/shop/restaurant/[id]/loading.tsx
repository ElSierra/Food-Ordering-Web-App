"use client";

import { Box, Flex, Skeleton, useColorModeValue } from "@chakra-ui/react";
import RightSide from "../components/right";

export default function Loading() {
  const rightBorder = useColorModeValue("#30303023", "#303030");
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <Flex
        mt={{ base: "120px", lg: "120px" }}
        flexDirection={"column"}
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
          {[1, 2, 3].map((order, idx) => {
            return <Skeleton mt="20px" height={"600px"} w="100%" key={idx} />;
          })}
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
          <RightSide />
        </Box>
      </Box>
      </Flex>
    </main>
  );
}
