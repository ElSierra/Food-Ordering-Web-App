import { useVerifyOTPMutation } from "@/redux/features/api/userSlice";
import {
  Box,
  Center,
  Flex,
  Input,
  Spinner,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { updateState, reset } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Cookies from "js-cookie";
import OTPInput from "react-otp-input";

export default function EnterOTP({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [verifyOTP, response] = useVerifyOTPMutation();
  console.log("🚀 ~ file: enterOTP.tsx:13 ~ EnterOTP ~ response:", response);
  const [otp, setOtp] = useState("");
  const bg = useColorModeValue("#37373744", "#353131");

  console.log(otp);

  useEffect(() => {
    if (otp.length === 4) {
      verifyOTP({
        email: localStorage.getItem("quickChopUserEmail"),
        otp: otp,
      })
        .unwrap()
        .then((response) => {
          console.log(
            "🚀 ~ file: enterOTP.tsx:24 ~ useEffect ~ response:",
            response
          );

          Cookies.set("qs_token", response.token, { expires: 7 });
          dispatch(updateState({ data: response }));
          onClose();
        })
        .catch((e) => {
          console.log(
            "🚀 ~ file: enterOTP.tsx:24 ~ useEffect ~ error:",
            e.data?.msg
          );
          toast({
            title: "Error",
            description: e.data?.msg,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  }, [otp,dispatch,onClose,toast,verifyOTP]);

  return (
    <Flex gap="20px">
      {response.isLoading ? (
        <Flex padding="30px" w="100%" align={"center"} justify={"center"}>
          <Spinner thickness="4px" size="lg" />{" "}
        </Flex>
      ) : (
        <>
          {/* {[1, 2, 3, 4].map((digit, idx) => {
            return (
              <Input
                key={idx}
                autoComplete="one-time-code"
                maxLength={4}
                textAlign={"center"}
                pattern="\d{1}"
                fontSize={"50px"}
                height={"100px"}
                width={"100%"}
                name={idx.toString()}
                onChange={(e)=>{setOtp(e.target.name)}}
                value={otp}
              />
            );
          })} */}
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<div style={{ minWidth: "20px" }}></div>}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: "100%",
                  backgroundColor: bg,
                  textAlign: "center",
                  fontSize: "60px",
                  height: "100px",
                  borderRadius: "10px",
                }}
                type="number"
              />
            )}
          />
        </>
      )}
    </Flex>
  );
}
