import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset } from "@/redux/features/authSlice";
import Cookies from "js-cookie";

export const UnVerifiedUserPage = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const logOut = () => {
    Cookies.remove("qs_token");
    localStorage.removeItem("quickChopUserEmail");
    dispatch(reset());
    onClose();
  };
  return (
    <Box>
      <Text textAlign={"center"}>Please Verify your Email</Text>
      <Text fontSize={"40px"} textAlign={"center"}>
        {localStorage.getItem("quickChopUserEmail")}
      </Text>
      <Text mt="30px" mb="30px" fontWeight={"extrabold"} textAlign={"center"}>
        OR
      </Text>
      <Center>
        {" "}
        <Button onClick={logOut}>Logout</Button>
      </Center>
    </Box>
  );
};
