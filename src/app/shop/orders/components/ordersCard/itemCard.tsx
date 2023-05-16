import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { Menu } from "@prisma/client";
import Image from "next/image";
import { IOrder } from "../../../../../../interface/prisma";

export default function ItemCard({
  foodOrder,
  orderData,
}: {
  foodOrder: { menu: Menu; quantity: number };
  orderData: IOrder;
}) {
  return (
    <Flex w="100%" mt="20px">
      <Flex
        height={"80px"}
        position={"relative"}
        w="80px"
        mr={{ base: "10px", lg: "30px" }}
      >
        <Box
          position={"absolute"}
          top={0}
          left={0}
          cursor="pointer"
          width={"100%"}
          height={"100%"}
        >
          <Image
            src={foodOrder?.menu?.photo || ""}
            alt={""}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            fill
          />
        </Box>
      </Flex>
      <Center>
        <Box>
          <Text fontSize={"14px"}>{foodOrder?.menu?.name}</Text>
          <Text fontSize={"14px"}>{orderData.restaurant.name}</Text>
        </Box>
      </Center>
      <Spacer />
      <Center>
        <Box>
          <Text fontSize={"14px"} textAlign={"right"}>
            {foodOrder?.menu?.price.toLocaleString("en-NG")}
          </Text>
          <Text
            fontSize={"14px"}
            textAlign={"right"}
          >{`X${foodOrder?.quantity}`}</Text>
        </Box>
      </Center>
    </Flex>
  );
}
