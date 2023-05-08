"use client";

import { Center, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { BagHappy, Home, Profile, Setting2 } from "iconsax-react";
import React from "react";

export default function BottomBar() {
  const bg = useColorModeValue("#FFFFFF", "#000000");
  return (
    <Flex
      w="100%"
      position={"fixed"}
      bottom={0}
      display={{ base: "flex", lg: "none" }}
      bgColor={bg}
      align={"center"}
      justify={'space-evenly'}
      flexDirection={'row'}
      
      pt='10px'
      pb='10px'
    >
      <Center>
        <IconButton bg='transparent' aria-label={"Home"} icon={<Home />} />
      </Center>
      <Center>
        <IconButton bg='transparent' aria-label={"Home"} icon={<BagHappy />} />
      </Center>
      <Center>
        <IconButton bg='transparent' aria-label={"Home"} icon={<Profile />} />
      </Center>
      <Center>
        <IconButton bg='transparent' aria-label={"Home"} icon={<Setting2 />} />
      </Center>
      
     
     
    </Flex>
  );
}
