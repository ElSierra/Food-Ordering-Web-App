import { useOrderFoodMutation } from "@/redux/features/api/restaurantUserPutSlice";
import { updateState } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoneyTick, Size, Trash } from "iconsax-react";
import React from "react";

export default function CartCard({
  cart,
  id,
}: {
  cart: { name: string; price: string; photo: string; quantity: string };
  id: number;
}) {
  const cardBg = useColorModeValue("#FFFFFF54", "black");
  const lineBg = useColorModeValue("#30303023", "#303030");
  const dispatch = useAppDispatch();

 
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
        <Text fontSize={'13px'} fontWeight={'bolder'}>{cart.name}</Text>

        <Spacer />
        <IconButton
          size={"sm"}
          bgColor={"#AD160B2F"}
          aria-label="delete"
          icon={<Trash size="16px" color="#AD160BDC" variant="Bulk" />}
          onClick={()=>{
            if (localStorage.getItem("qcCart")) {
              const cartList = [];
              cartList.push(...JSON.parse(localStorage.getItem("qcCart") || ""));
    
              cartList.splice(id, 1);
              localStorage.setItem("qcCart", JSON.stringify(cartList))
              dispatch(updateState(cartList))
            }else {
              
            }
          }}
        />
      </Flex>
      <Box>
     <HStack><Size variant="Bulk" color="green" size={'16px'} /> <Text> x{cart.quantity}</Text></HStack>
      <HStack><MoneyTick variant="Bulk" color="green" size={'16px'}/><Text fontSize={'14px'}>₦{cart.price}</Text></HStack></Box>
    </Box>
  );
}
