import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { CloseCircle, CloseSquare, SearchNormal } from "iconsax-react";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const bg = useColorModeValue("#FFFFFF", "#000000");
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount
    >
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
        padding={"20px 20px 50px 20px"}
        borderRadius={"3xl"}
        maxW={{ base: "90%", xl: "40%" }}
      >
        <Flex justify={"end"}>
          <Box
            color="red"
            cursor={"pointer"}
            _hover={{ color: "red.200" }}
            onClick={onClose}
          >
            <CloseSquare size="40" variant="Bulk" />
          </Box>
        </Flex>
        <ModalBody>
          <InputGroup>
            <InputLeftElement>
              <SearchNormal />
            </InputLeftElement>
            <Input
              bg={bg}
              justifyContent={"left"}
              placeholder="Search Quickchop"
              minW={{
                base: "50px",
                sm: "300px",
                md: "300px",
                lg: "300px",
                xl: "300px",
                xxl: "300px",
                vxl: "300px",
              }}
            />
          </InputGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
