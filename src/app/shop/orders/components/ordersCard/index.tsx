import {
  Flex,
  Spacer,
  Button,
  Box,
  Text,
  useColorModeValue,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import {
  Receipt21,
  Location,
  Status,
  Forward,
  Gps,
  Calculator,
} from "iconsax-react";
import ItemCard from "./itemCard";
import { IOrder } from "../../../../../../interface/prisma";

export const OrdersCard = ({ orderData }: { orderData: IOrder }) => {
  const bg = useColorModeValue("#1D2F05", "#CAFF84");
  const lineBg = useColorModeValue("#30303023", "#303030");
  return (
    <Box
      mt="20px"
      border={`1px dashed ${lineBg}`}
      borderRadius={"md"}
      padding="30px"
    >
      <Flex w="100%" flexDirection={"column"}>
        <Box w="100%">
          <Flex w="100%">
            <Text
              fontWeight={"extrabold"}
              fontSize={{ base: "15px", lg: "25px" }}
            >
              {`Order ID: ${orderData.id}`}
            </Text>
            <Spacer />

            <Flex gap={2} display={{ base: "none", lg: "flex" }}>
              <Button
                colorScheme="teal"
                leftIcon={<Receipt21 size={"16px"} />}
                variant={"outline"}
                size={"sm"}
              >
                Invoice
              </Button>
              <Button
                colorScheme="green"
                leftIcon={<Gps variant="Bulk" size={"16px"} />}
                size={"sm"}
              >
                Track order
              </Button>
            </Flex>
            <Flex gap={2} display={{ base: "flex", lg: "none" }}>
              <IconButton aria-label="invoice" variant={"outline"} size={"sm"}>
                <Receipt21 size={"16px"} />
              </IconButton>
              <IconButton
                aria-label="track"
                bg="#57C5B6"
                color={"white"}
                size={"sm"}
              >
                <Gps variant="Bulk" size={"16px"} />
              </IconButton>
            </Flex>
          </Flex>

          <Box mt="10px" mb="10px">
            <HStack>
              <Text fontSize="14px">{`Order date : ${orderData?.foodOrder[0]?.menu?.createdAt}`}</Text>
              <Box
                borderLeft={`2px solid ${lineBg}`}
                width={"10px"}
                height={"20px"}
              ></Box>
              <HStack>
                <Forward
                  size="18"
                  variant="Bulk"
                  color={
                    orderData.status === "PAID" ||
                    orderData.status === "PREPARING"
                      ? "green"
                      : "#882D17"
                  }
                />
                <Text
                  fontSize="14px"
                  color={
                    orderData.status === "PAID" ||
                    orderData.status === "PREPARING"
                      ? "green"
                      : "#882D17"
                  }
                  fontWeight={"bold"}
                >
                  {orderData.status === "PAID" ||
                  orderData.status === "PREPARING"
                    ? "Preparing Order"
                    : orderData.status === "PENDING"
                    ? "Incomplete Payment"
                    : ""}
                </Text>
              </HStack>
            </HStack>
          </Box>
        </Box>
      </Flex>
      <Box mt="10px" height={"0.5px"} bg={lineBg}></Box>
      <Flex flexDirection={"column"}>
        {orderData?.foodOrder.map((foodOrder) => {
          return (
            <ItemCard
              foodOrder={foodOrder}
              orderData={orderData}
              key={foodOrder.menu.id}
            />
          );
        })}
      </Flex>
      <Box mt="10px" height={"0.5px"} bg={lineBg}></Box>
      <Flex>
        <HStack>
          <Calculator size="32" variant="Bulk" color={bg} />
          <Text>Total : </Text>
        </HStack><Spacer/>
        <Text>₦ {orderData.total.toLocaleString("en-NG")}</Text>
      </Flex>
    </Box>
  );
};
