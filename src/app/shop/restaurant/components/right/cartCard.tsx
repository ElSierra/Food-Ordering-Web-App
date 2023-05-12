import { Box, Flex, IconButton, Spacer, Text, useColorModeValue,  } from "@chakra-ui/react";
import { Trash } from "iconsax-react";
import React from "react";


export default function CartCard({cart}: {cart: {name: string, price: string, photo: string, amount: string}}) {
    const cardBg = useColorModeValue("#FFFFFF54", "black");
    const lineBg = useColorModeValue("#30303023", "#303030");
  return (
    <Box
      bgColor={cardBg}
      borderRadius={"10px"}
      mb="20px"
      w="100%"
      padding={"10px"}
      border={`1px dashed ${lineBg}`}
    >
      <Flex>
        <Text>{cart.name}</Text>
      
        <Spacer />
        <IconButton size={'sm'} bgColor={'#AD160B2F'} aria-label="delete" icon={<Trash size='16px' color="#AD160BDC" variant="Bulk"/>} />
      </Flex>
      <Text>Pack x{cart.amount}</Text>
      <Text>Price</Text>
    </Box>
  );
}