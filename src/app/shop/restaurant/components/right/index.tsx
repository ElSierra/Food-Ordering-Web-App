import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React from "react";
import animationData from "../assets/cart.json";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartState, cartDataReducer } from "@/redux/features/cartSlice";
import CartCard from "./cartCard";

export default function RightSide() {
  const lineBg = useColorModeValue("#30303023", "#303030");

  const cart = useAppSelector(
    (state: { cartDataReducer: CartState }) => state.cartDataReducer
  );
  return (
    <>
   
    <Center flexDirection={"column"}>
      {cart.data?.length > 0 ? (
      
        cart.data?.map((cart, idx) => {
          return <CartCard key={idx} cart= {cart}/>;
        })
      ) : (
        <>
          <Lottie style={{ height: "300px" }} animationData={animationData} />

          <Text textAlign={"center"}>
            Your cart is Empty <br /> Add something to your cart
          </Text>
        </>
      )}
    </Center></>
  );
}
