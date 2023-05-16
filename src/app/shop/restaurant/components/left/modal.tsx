import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { Menu } from "@prisma/client";
import React, { useState } from "react";
import ModalBodyCard from "./modalBodyCard";
import IncDecButton from "./incDecButton";

export default function OrderFoodModal({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: any;
  menu: Menu;
}) {
  const bg = useColorModeValue("#FFFFFF", "#000000");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <Box
          minW={"100vw"}
          height={"100vh"}
          backdropFilter={"blur(10px)"}
          bg={"rgb(30, 30, 30, 0.5)"}
        ></Box>
      </ModalOverlay>
      <ModalContent
        bg={bg}
        h={{ base: "60%", xl: "70%" }}
        paddingTop={"12px"}
        borderRadius={"3xl"}
        maxW={{ base: "90%", xl: "40%" }}
      >
        <ModalBody>
          <ModalBodyCard menu={menu} onClose = {onClose}/>
        </ModalBody>
        
      </ModalContent>
    </Modal>
  );
}
