"use client";
import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("shop");
  }, [router]);
  return (
    <Center height={"100vh"} width={"100vw"}>
      <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Spinner />
        <Text textAlign={'center'}>Redirecting to shop</Text>
      </Flex>
    </Center>
  );
}
