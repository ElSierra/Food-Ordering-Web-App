import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { Menu } from "@prisma/client";
import Image from "next/image";
import { updateState, reset } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";

import IncDecButton from "./incDecButton";
import { useState } from "react";
export default function ModalBodyCard({
  menu,
  onClose,
}: {
  menu: Menu;
  onClose: any;
}) {
  const [orderAmount, setOrderAmount] = useState(1);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  console.log(
    "🚀 ~ file: modalBodyCard.tsx:14 ~ ModalBodyCard ~ pathname:",
    pathname.split("/")[3]
  );

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
                id: menu.id,
                name: menu.name,
                price: menu.price,
                photo: menu.photo,
                quantity: orderAmount,
                restaurantId: pathname.split("/")[3],
              });
              localStorage.setItem("qcCart", JSON.stringify(cartList));
              dispatch(updateState(cartList));
              onClose();
            } else {
              const cartList = [];
              cartList.push({
                id: menu.id,
                name: menu.name,
                price: menu.price,
                photo: menu.photo,
                quantity: orderAmount,
                restaurantId: pathname.split("/")[3],
              });
              localStorage.setItem("qcCart", JSON.stringify(cartList));
              dispatch(updateState(cartList));
              onClose();
            }
          }}
          w="50%"
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
