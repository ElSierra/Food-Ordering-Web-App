import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { Menu } from "@prisma/client";
import Image from "next/image";
import { updateState, reset } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import IncDecButton from "./incDecButton";
import { useState } from "react";
export default function ModalBodyCard({ menu }: { menu: Menu }) {
  const [orderAmount, setOrderAmount] = useState(1);
  const dispatch = useAppDispatch();
  return (


    <Box w="100%">
      <Box height={"300px"} position={"relative"} w="100%">
        <Box
          position={"absolute"}
          top={0}
          left={0}
          cursor="pointer"
          width={"100%"}
          height={"100%"}
        >
          <Image
            src={`${menu.photo}`}
            alt={menu.name}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            fill
          />
        </Box>
      </Box>
      <Flex mt="10px">
        <Text fontWeight={"medium"} fontSize={"l"}>
          {menu.name}
        </Text>
        <Spacer />
        <Text fontWeight={"bold"} fontSize={"xl"}>
          ₦ {menu.price}
        </Text>
        <Center>
          <Text fontSize={"sm"}>per potion</Text>
        </Center>
      </Flex>

      <Flex
        pl="15px"
        pr="15px"
        mt="10px"
        w="100%"
        position="absolute"
        bottom={4}
        left={0}
        justify={"space-between"}
        right={0}
      >
        <IncDecButton
          orderAmount={orderAmount}
          setOrderAmount={setOrderAmount}
        />

        <Button
          onClick={() => {
            if (localStorage.getItem("qcCart")) {
              const cartList = [];
              cartList.push(
                ...JSON.parse(localStorage.getItem("qcCart") || "")
              );
              cartList.push({
                name: menu.name,
                price: menu.price,
                photo: menu.photo,
              });
              localStorage.setItem("qcCart", JSON.stringify(cartList));
              dispatch(updateState(cartList))
            } else {
              const cartList = [];
              cartList.push({
                name: menu.name,
                price: menu.price,
                photo: menu.photo,
                amount: orderAmount,
              });
              localStorage.setItem("qcCart", JSON.stringify(cartList));
              dispatch(updateState(cartList))
            }
          }}
          w="80%"
          _hover={{ bgColor: "#065B33" }}
          color={"white"}
          bgColor={"#12B76A"}
        >
          Add ({orderAmount}) to cart
        </Button>
      </Flex>
    </Box>
  );
}
