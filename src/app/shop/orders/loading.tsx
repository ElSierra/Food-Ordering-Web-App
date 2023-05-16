"use client";

import { Box, Flex, Skeleton, useColorModeValue } from "@chakra-ui/react";

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
      {[1,2,3].map((order, idx) => {
        return <Skeleton mt="20px" height={'600px'} w='100%' borderRadius={'md'} key={idx}/>;
      })}
    </Flex>
    </main>
  );
}
