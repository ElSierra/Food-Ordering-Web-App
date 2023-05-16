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
import animationData2 from "../assets/pay-success.json";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartState, reset } from "@/redux/features/cartSlice";
import CartCard from "./cartCard";
import { Wallet, Wallet1, WalletMoney } from "iconsax-react";
import { useUserState } from "@/app/hooks/setGetUser";
import {
  useOrderFoodMutation,
  usePayFoodMutation,
} from "@/redux/features/api/restaurantUserPutSlice";
import Cookies from "js-cookie";
import { OrderState, resetOrder } from "@/redux/features/orderSlice";
import OrderCard from "./orderCard";
import Link from "next/link";

export default function RightSide() {
  const lineBg = useColorModeValue("#30303023", "#303030");
  const { getUserData } = useUserState();

  const user = getUserData();
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(
    (state: { cartDataReducer: CartState }) => state.cartDataReducer
  );
  const orderState = useAppSelector(
    (state: { orderReducer: OrderState }) => state.orderReducer
  );

  const [orderFood, orderResponse] = useOrderFoodMutation();
  const [payFood, payFoodResponse] = usePayFoodMutation();
  useEffect(() => {
    let nTotal = 0;
    if (cart.data) {
      for (let i = 0; i < cart.data.length; i++) {
        nTotal += Number(cart.data[i]?.quantity) * Number(cart?.data[i]?.price);

        //setSubTotal(Number(cart?.data[i]?.price))
      }
    }
    setSubTotal(nTotal);
  }, [cart.data]);

  const handleOrder = () => {
    orderFood({
      menuList: cart?.data,
      restaurantId: cart?.data[0]?.restaurantId,
    });
  };

  const handlePay = () => {
    payFood({
      orderId: orderState.orderId,
    });
  };

  return (
    <>
      <Flex flexDirection={"column"} width={"100%"}>
        {orderState?.status !== "PAID" ? (
          <>
            {orderState?.status !== "PENDING" ? (
              <Box paddingBottom={'0px'} >
                {cart?.data?.length > 0 && <Text>Your Orders</Text>}
                <Box mt="10px" height={"0.5px"} bg={lineBg} mb="24px"></Box>
                {cart?.data.length > 0 ? (
                  cart.data?.map((cart, idx) => {
                    return <CartCard key={idx} cart={cart} id={idx} />;
                  })
                ) : (
                  <>
                    <Lottie
                      style={{ height: "300px" }}
                      animationData={animationData}
                    />

                    <Text textAlign={"center"}>
                      Your cart is Empty <br /> Add something to your cart
                    </Text>
                  </>
                )}
              </Box>
            ) : (
              <OrderCard cart={cart.data} />
            )}

            {cart?.data?.length > 0 && (
              <Flex
                flexDirection={"column"}
               
                paddingBottom={{ base: "90px", lg: "10px" }}
              >
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
                  <Text fontSize={"13px"}>
                    Sub Total ({cart?.data?.length}):
                  </Text>
                  <Spacer />
                  <Center>
                    <WalletMoney color="green" variant="Bulk" size={"16px"} />
                    <Text fontSize={"13px"}>(₦{subTotal})</Text>
                  </Center>
                </Flex>

                {orderState?.status !== "PENDING" ? (
                  <>
                    {user.data?.user?.balance !== undefined &&
                    user.data?.user?.balance > subTotal ? (
                      <Button
                        isLoading={orderResponse.isLoading}
                        mt="30px"
                        onClick={handleOrder}
                      >
                        Place Order
                      </Button>
                    ) : (
                      <Button mt="30px">Deposit into your account</Button>
                    )}
                  </>
                ) : (
                  <Button
                    mt="30px"
                    isLoading={payFoodResponse.isLoading}
                    onClick={handlePay}
                  >
                    Pay
                  </Button>
                )}
                {orderState?.status !== "PENDING" ? (
                  <Button
                    mt="30px"
                    onClick={() => {
                      localStorage.removeItem("qcCart");
                      dispatch(reset());
                    }}
                  >
                    Clear Cart
                  </Button>
                ) : (
                  <Button
                    mt="30px"
                    onClick={() => {
                      Cookies.remove("qcOrder");
                      dispatch(resetOrder());
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Flex>
            )}
          </>
        ) : (
          <Box>
            <Lottie
              style={{ height: "300px" }}
              animationData={animationData2}
            />

            <Text textAlign={"center"}>Payment Complete</Text>
            <Center mt="20px">
              {" "}
              <Link href={"/shop/orders"}>
                <Button>Track your Food</Button>
              </Link>
            </Center>
          </Box>
        )}
      </Flex>
    </>
  );
}
