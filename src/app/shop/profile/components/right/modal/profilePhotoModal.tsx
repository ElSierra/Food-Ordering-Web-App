import {
  Box,
  Modal,
  ModalBody,
  Text,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ImageCrop } from "./imageCrop";
import { File } from "buffer";
import axios from "axios";
import Cookies from "js-cookie";
export default function ProfilePhotoModal({
  isOpen,
  onClose,
  onCrop,
  onClosedCrop,
  onUpload,
  picData,
  
}: {
  isOpen: boolean;
  onClose: any;
  onCrop: any;
  onClosedCrop: any;
  onUpload: () => void;
  picData: string | null,
 
}) {

  const toast = useToast();

  const [fileExists, setFileExists] = useState<File>()
  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 2000000) {
      toast({
        title: "Maximum file size of 2MB",
        description: `File Size Limit`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      elem.target.value = "";
    }
    setFileExists(elem.target.files[0])
  }

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
        padding={"50px 20px 50px 20px"}
        borderRadius={"3xl"}
        maxW={{ base: "90%", xl: "40%" }}
      >
        <ModalBody>
          <Center>
            <ImageCrop
              onCrop={onCrop}
              onClosedCrop={onClosedCrop}
              onBeforeFileLoad={onBeforeFileLoad}
            />
          </Center>
          <Button
          isDisabled={picData? false: true}
            mt="20px"
            w="100%"
            onClick={(e) => {
              onUpload();
            }}
          >
            Upload
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
