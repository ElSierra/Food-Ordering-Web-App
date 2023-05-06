"use client";

import { Text, Button, HStack, Center, useColorModeValue } from "@chakra-ui/react";
import { SearchNormal } from "iconsax-react";

export const SearchBar = () => {
  const searchTextColor = useColorModeValue("#979797", "#F1ECEC");
  const bg = useColorModeValue("#F2F2F2", "#303030");
  const iconColor = useColorModeValue("#0C513F","#D5D5D5")
  const border= useColorModeValue("#303030", "#F7F6F6");
  
  return (
    <Center  display={{base: "block", lg: "none"}} mb='30px'>
      <Button
        bg={bg}
        justifyContent={"center"}
        w='100%'
        h='45px'
        border={`1px solid ${border}`}
      >
        <SearchNormal size="18" color= {iconColor} />
        <Text ml={"10px"} fontSize={"xs"}color={searchTextColor}>
          Search Quickchop....
        </Text>
      </Button>
    </Center>
  );
};
