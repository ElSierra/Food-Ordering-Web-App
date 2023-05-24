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
}: {
  isOpen: boolean;
  onClose: any;
  onCrop: any;
  onClosedCrop: any;
  onUpload: () => void;
}) {
  const [file, setFile] = useState<any>();
  const [isLoading, setIsLoading] = useState(Boolean);
  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
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
            mt="20px"
            w="100%"
            onClick={(e) => {
              onUpload()
            }}
          >
            Upload
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
