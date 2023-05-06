"use client";

import {
  Text,
  Button,
  HStack,
  Center,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { SearchNormal } from "iconsax-react";

export const MobileSearchBar = () => {
  const searchTextColor = useColorModeValue("#979797", "#F1ECEC");
  const bg = useColorModeValue("#F2F2F2", "#303030");
  const iconColor = useColorModeValue("#0C513F", "#D5D5D5");
  const border = useColorModeValue("#303030", "#F7F6F6");

  return (
    <Box
   
      w="100%"
      h="fit"
      padding={'0px 20px 20px 20px'}

      display={{base: "block", lg: "none"}}
      bgColor={"black"}
    >
      <Center>
        {" "}
        <Button
          bg={bg}
          justifyContent={"center"}
          w="80%"
         
          border={`1px solid ${border}`}
        >
          <SearchNormal size="18" color={iconColor} />
          <Text ml={"10px"} fontSize={"xs"} color={searchTextColor}>
            Search Quickchop....
          </Text>
        </Button>
      </Center>
    </Box>
  );
};
