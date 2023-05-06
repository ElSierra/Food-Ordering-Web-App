"use client";
import Lottie from "lottie-react";
import animationData from "./components/not-found.json";
import { Center, Text } from "@chakra-ui/react";
export default function Error({ error }: { error: Error }) {
  return (
    <Center h="100vh" flexDirection={"column"}>
      <Lottie
        style={{ height: "500px" }}
        animationData={animationData}
        size={5}
      />
      <Text fontWeight={""} fontSize={"50px"}>
        404 Page Not Found
      </Text>
    </Center>
  );

  {
    /* <Lottie animationData={animationData} size={1} /></Box> */
  }
}
