import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { Add, Minus } from "iconsax-react";

export default function IncDecButton({
  setOrderAmount,
  orderAmount,
}: {
  setOrderAmount: any;
  orderAmount: number;
}) {
  return (
    <HStack>
      <IconButton
      bgColor={'#FD2F246D'}
      _hover={{bgColor: "#AD160BDC"}}
      aria-label="decrease"
        onClick={() => {
          if (orderAmount <= 1) {
          } else {
            setOrderAmount(orderAmount - 1);
          }
        }}
      >
        <Minus />
      </IconButton>
      <Text>{orderAmount}</Text>
      <IconButton bgColor={'#13E684B6'}  _hover={{bgColor: "#105B38B6"}} aria-label="increase" onClick={() => {
          if (orderAmount >= 10) {
          } else {
            setOrderAmount(orderAmount + 1);
          }
        }}>
        <Add />
      </IconButton>
    </HStack>
  );
}
