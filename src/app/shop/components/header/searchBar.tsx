"use client";

import { Text, Button, HStack, Center, useColorModeValue } from "@chakra-ui/react";
import { SearchNormal } from "iconsax-react";

export const SearchBar = () => {
  const searchTextColor = useColorModeValue("#999999", "#F1ECEC");
  const bg = useColorModeValue("#F2F2F2", "#303030");
  const iconColor = useColorModeValue("#0C513F","#D5D5D5")
  return (
    <Center>
      <Button
        bg={bg}
        justifyContent={"left"}
        minW={{
          base: "50px",
          sm: "300px",
          md: "300px",
          lg: "300px",
          xl: "300px",
          xxl: "300px",
          vxl: "300px",
        }}
      >
        <SearchNormal size="18" color= {iconColor} />
        <Text ml={"10px"} fontSize={"xs"} color={searchTextColor}>
          Search Quickchop....
        </Text>
      </Button>
    </Center>
  );
};
