"use client";

import { useVerifyOTPMutation } from "@/redux/features/api/userSlice";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { updateState, reset } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function EnterOTP({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [verifyOTP, response] = useVerifyOTPMutation();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp({
      ...otp,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const allNumber = otp[1] + otp[2] + otp[3] + otp[4];
    if (allNumber.length === 4) {
      verifyOTP({
        email: localStorage.getItem("quickChopUserEmail"),
        otp: allNumber,
      })
        .unwrap()
        .then((response) => {
          console.log(
            "🚀 ~ file: enterOTP.tsx:24 ~ useEffect ~ response:",
            response
          );
          localStorage.setItem("quickShopToken", response.token);
          dispatch(updateState({data: response}));
          onClose();
        })
        .catch((e) => {
          console.log("🚀 ~ file: enterOTP.tsx:24 ~ useEffect ~ error:", e);
        });
    }
    console.log(
      "🚀 ~ file: enterOTP.tsx:17 ~ useEffect ~ allNumber:",
      allNumber.length
    );
  }, [otp]);

  return (
    <Flex gap="20px">
      <Input
        maxLength={1}
        textAlign={"center"}
        fontSize={"50px"}
        height={"100px"}
        width={"100%"}
        onChange={handleChange}
        name="1"
        value={otp[1]}
      />
      <Input
        maxLength={1}
        onChange={handleChange}
        textAlign={"center"}
        fontSize={"50px"}
        height={"100px"}
        width={"100%"}
        name="2"
        value={otp[2]}
      />{" "}
      <Input
        maxLength={1}
        textAlign={"center"}
        onChange={handleChange}
        fontSize={"50px"}
        height={"100px"}
        width={"100%"}
        name="3"
        value={otp[3]}
      />{" "}
      <Input
        maxLength={1}
        textAlign={"center"}
        onChange={handleChange}
        fontSize={"50px"}
        height={"100px"}
        width={"100%"}
        name="4"
        value={otp[4]}
      />
    </Flex>
  );
}
