"use client";

import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export const QuickChopButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  //   const bg = useColorModeValue("red.500", "red.200");
  //   const color = useColorModeValue("white", "gray.800");
  //   const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      variant={"solid"}
      _hover={{ backgroundColor: "rgb(0, 101, 56)" }}
      color={"white"}
      bgColor={"black"}
      borderRadius={"full"}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
