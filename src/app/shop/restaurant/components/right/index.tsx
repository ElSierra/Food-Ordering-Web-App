import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import animationData from "../assets/cart.json";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CartState,
  cartDataReducer,
  reset,
  updateState,
} from "@/redux/features/cartSlice";
import CartCard from "./cartCard";
import { Wallet, Wallet1, WalletMoney } from "iconsax-react";
import { useUserState } from "@/app/hooks/setGetUser";

export default function RightSide() {
  const lineBg = useColorModeValue("#30303023", "#303030");
  const { getUserData } = useUserState();

  const user = getUserData();
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(
    (state: { cartDataReducer: CartState }) => state.cartDataReducer
  );

  useEffect(() => {
    let nTotal = 0;
    if (cart.data) {
      for (let i = 0; i < cart.data.length; i++) {
        nTotal += Number(cart.data[i]?.amount) * Number(cart?.data[i]?.price);

        //setSubTotal(Number(cart?.data[i]?.price))
      }
    }
    setSubTotal(nTotal);
  }, [cart.data]);

  return (
    <>
      <Flex flexDirection={"column"}>
      {cart?.data?.length > 0 &&<Text>Your Orders</Text>}
        <Box mt="10px" height={"0.5px"} bg={lineBg} mb="24px"></Box>
        {cart?.data.length > 0 ? (
          cart.data?.map((cart, idx) => {
            return <CartCard key={idx} cart={cart} id={idx} />;
          })
        ) : (
          <>
            <Lottie style={{ height: "300px" }} animationData={animationData} />

            <Text textAlign={"center"}>
              Your cart is Empty <br /> Add something to your cart
            </Text>
          </>
        )}
        {cart?.data?.length > 0 && (
          <>
            <Box mt="10px" height={"0.5px"} bg={lineBg}></Box>
            <Flex mt="20px">
              <Text fontSize={"13px"}>Wallet Balance:</Text>
              <Spacer />
              <Center>
                <WalletMoney color="green" variant="Bulk" size={"16px"} />
                <Text fontSize={"13px"}>(₦{user.data?.user?.balance})</Text>
              </Center>
            </Flex>
            <Box mt="10px" height={"0.5px"} bg={lineBg}></Box>
            <Flex mt="20px">
              <Text fontSize={"13px"}>Sub Total ({cart?.data?.length}):</Text>
              <Spacer />
              <Center>
                <WalletMoney color="green" variant="Bulk" size={"16px"} />
                <Text fontSize={"13px"}>(₦{subTotal})</Text>
              </Center>
            </Flex>
            {user.data?.user?.balance !== undefined &&
            user.data?.user?.balance > subTotal ? (
              <Button mt="30px">Place Order</Button>
            ) : (
              <Button mt="30px">Deposit into your account</Button>
            )}

            <Button
              mt="30px"
              onClick={() => {
                localStorage.removeItem("qcCart");
                dispatch(reset());
              }}
            >
              Clear Cart
            </Button>
          </>
        )}
      </Flex>
    </>
  );
}
