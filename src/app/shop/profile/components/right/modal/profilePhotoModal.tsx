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
}: {
  isOpen: boolean;
  onClose: any;
  onCrop: any;
  onClosedCrop: any;
}) {
  const [file, setFile] = useState<any>();
  const [isLoading, setIsLoading] = useState(Boolean)
  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
    console.log("elem", elem.target.files[0]);
    setFile(elem.target.files[0]);
  }

  const upload = () => {
    if (file) {
      const token = Cookies.get("qs_token");
      const formData = new FormData();
      formData.append("photo", file);

      axios
        .put(`${process.env.NEXT_PUBLIC_BASE_URL}/upload-avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  };
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
          <Button mt="20px" w="100%" onClick={upload}>
            Upload
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
