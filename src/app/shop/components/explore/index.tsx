"use client";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Icon } from "iconsax-react";
import React from "react";

interface props {
  Icon: JSX.Element;
  text: string;
  bg: string;
  borderColor: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export default function ExploreBox({
  Icon,
  text,
  bg,
  onClick,
  borderColor,
}: props) {
  return (
    <Flex
     
      minW="130px"
      minH="130px"
      onClick={onClick}
      bg={bg}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"2xl"}
      cursor={"pointer"}
      _hover={{ border: `2px solid ${borderColor}` }}
    >
      <Box>
        <Flex alignItems={"center"} justifyContent={"center"}>
          {Icon}
        </Flex>
        <Text fontSize={"14px"} mt="10px">
          {text}
        </Text>
      </Box>
    </Flex>
  );
}
