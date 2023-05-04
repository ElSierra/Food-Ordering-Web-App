import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  useLoginUserMutation,
  useSignUPMutation,
} from "@/redux/features/api/userSlice";
import EnterOTP from "./enterOTP";
import { updateState, reset } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface props {
  authType: string;
  isOpen: boolean;
  onClose: () => void;
}
interface UserAuthInput {
  name: string;
  password: string;
  phone: string;
  email: string;
}

export const AuthPage = ({ isOpen, onClose }: props) => {
  const [authType, setAuthType] = useState("signIn");
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [otpState, setOTPState] = useState(false);
  const [loginUser, response] = useLoginUserMutation();
  const [signUpUser, signUpResponse] = useSignUPMutation();
  const [inputs, setInputs] = useState<UserAuthInput>({
    name: "",
    password: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (authType === "signIn") {
      loginUser(inputs)
        .unwrap()
        .then((e) => {
          localStorage.setItem("quickChopUserEmail", inputs.email);
          setOTPState(true);
          toast({
            title: "OTP",
            description: `${e.msg}`,
            status: "info",
            duration: 9000,
            isClosable: true,
          });
          
          console.log("🚀 ~ file: auth.tsx:49 ~ loginUser ~ e:", e);
        })
        .catch((error) => {
          console.log(error, '73');
     const errorMessage = new Error(e).message
     console.log(errorMessage)
          toast({
            title: "Error",
            description: error.data?.error === undefined ? error.data:`${error.data?.error}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      signUpUser(inputs)
        .unwrap()
        .then((e) => {
          localStorage.setItem("quickChopUserEmail", inputs.email);
          onClose();
          localStorage.setItem("quickShopToken", e.token);
          dispatch(updateState({ data: e }));
          toast({
            title: "Success",
            description: ``,
            status: "info",
            duration: 9000,
            isClosable: true,
          });
          console.log("🚀 ~ file: authPage.tsx:94 ~ .then ~ e:", e);
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Error",
            description: `${
              error.data?.target === "User_email_key"
                ? "User with Email already exists"
                : "Error Occurs"
            }`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };
  const authRender = (signInContent: any, signUpContent: any) => {
    if (authType === "signIn") {
      return signInContent;
    } else {
      return signUpContent;
    }
  };

  return (
    <Box>
      {!otpState ? (
        <FormControl>
          <Flex flexDirection={"column"} gap="10px">
            <Text fontSize={"25px"} fontWeight={"bold"} textAlign={"center"}>
              {authRender("Sign In", "Sign Up")}
            </Text>
            {authRender(
              "",
              <>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={handleChange}
                  name="name"
                  value={inputs.name}
                  type="text"
                  required
                />
              </>
            )}

            <FormLabel>Email address</FormLabel>
            <Input
              onChange={handleChange}
              name="email"
              value={inputs.email}
              type="email"
              required
            />
            <FormHelperText>{"We'll never share your email."}</FormHelperText>
            {authRender(
              "",
              <>
                <FormLabel>Phone</FormLabel>
                <Input
                  onChange={handleChange}
                  name="phone"
                  value={inputs.phone}
                  type="phone"
                  required
                />
              </>
            )}

            <FormLabel>Password</FormLabel>
            <Input
              onChange={handleChange}
              name="password"
              value={inputs.password}
              type="password"
              required
            />
            <Button
              bg="#0c513f"
              color="white"
              mt="30px"
              onClick={handleSubmit}
              type="submit"
              w="100%"
              h="50px"
              isLoading={authRender(
                response.isLoading,
                signUpResponse.isLoading
              )}
            >
              {" "}
              {authRender("Sign In", "Sign Up")}
            </Button>
            {authRender(
              <HStack mt="20px" align={"center"} justify={"center"}>
                <Text color={"#6B7280"}>New to QuickChop?</Text>
                <Button
                  variant={"link"}
                  onClick={() => {
                    setAuthType("signUp");
                  }}
                >
                  Sign Up
                </Button>
              </HStack>,
              <HStack mt="20px" align={"center"} justify={"center"}>
                <Text color={"#6B7280"}>Already Have an account?</Text>
                <Button
                  variant={"link"}
                  onClick={() => {
                    setAuthType("signIn");
                  }}
                >
                  Log in
                </Button>
              </HStack>
            )}
          </Flex>
        </FormControl>
      ) : (
        <EnterOTP onClose={onClose} />
      )}
    </Box>
  );
};
