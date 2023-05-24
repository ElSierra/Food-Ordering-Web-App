import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { UserState } from "@/redux/features/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import {
  usePhotoPostMutation,
  useUpdateInfoMutation,
} from "@/redux/features/api/authUserSlice";
import { DocumentUpload, Trash } from "iconsax-react";

const ProfilePhotoModal = dynamic(() => import("./modal/profilePhotoModal"), {
  ssr: false,
});
export default function RightSide({ user }: { user: UserState }) {
  const [updatePhoto, updatePhotoResponse] = usePhotoPostMutation();
  const [updateInfo, updateInfoResponse] = useUpdateInfoMutation();
  const token = Cookies.get("qs_token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState(user.data?.user?.photo);
  const [picData, setPicData] = useState<string | null>(null);

  const [inputs, setInputs] = useState<{ name: string; phone: string }>({
    name: "",
    phone: "",
  });

  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  function onClosedCrop() {
    setPreview(user.data?.user?.photo);
    setPicData(null);
  }
  function onCrop(pv: any) {
    setPreview(pv);
    setPicData(pv);
    console.log("pv", pv);
  }
  function onUpload() {
    updatePhoto({ photoPreview: picData })
      .unwrap()
      .then((e) => {
        console.log(e);
        toast({
          title: "Success",
          description: `${e.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        console.log("photoPreview", e);
        toast({
          title: "Error",
          description: `${e.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    onClose();
  }

  useEffect(() => {
    if (user.data?.user.photo) {
      setPreview(user.data.user.photo);
    }
    if (updatePhotoResponse.isSuccess) {
      onClose();
    }
  }, [onClose, updatePhotoResponse.isSuccess, user.data?.user.photo]);

  return (
    <>
      <ProfilePhotoModal
        isOpen={isOpen}
        onClose={onClose}
        onClosedCrop={onClosedCrop}
        onCrop={onCrop}
        onUpload={onUpload}
        picData={picData}
      />
      <Flex flexDirection={"column"}>
        <Text fontSize={"22px"}>My Profile</Text>
        <Text color={"rgb(99, 111, 130)"}>Manage your profile settings</Text>
        <Box mt="30px">
          <Text fontSize={"18px"} fontWeight={"bolder"}>
            Edit your Profile
          </Text>
          <HStack>
            <Avatar src={preview || ""} size={"2xl"} />
            <Flex flexDirection={"column"}>
              <Button onClick={onOpen} display={{ base: "none", lg: "flex" }}>
                Change Photo
              </Button>
              <Button mt="10px" display={{ base: "none", lg: "flex" }}>
                Delete Photo
              </Button>
              <IconButton
                display={{ base: "flex", lg: "none" }}
                onClick={onOpen}
                aria-label="update"
                icon={<DocumentUpload color="green" />}
              />
              <IconButton
                display={{ base: "flex", lg: "none" }}
                mt="10px"
                aria-label="update"
                icon={<Trash color="red" />}
              />
            </Flex>
          </HStack>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder={user.data?.user.name}
              w={{ base: "100%", lg: "300px" }}
            />
            <FormLabel>Email</FormLabel>
            <Input
              isDisabled
              value={user.data?.user.email}
              w={{ base: "100%", lg: "300px" }}
            />
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              placeholder={user.data?.user.phone}
              w={{ base: "100%", lg: "300px" }}
            />
          </FormControl>
          <Button
            isLoading={updateInfoResponse.isLoading}
            onClick={() => {
              updateInfo(inputs)
                .unwrap()
                .then((res) => {
                  console.log(res);
                  toast({
                    title: "Success",
                    description: `${res.msg}`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                })
                .catch((e) => {
                  toast({
                    title: "Error",
                    description: `${e.msg}`,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
            w={{ base: "100%", lg: "300px" }}
            mt="10px"
          >
            Update Profile
          </Button>
        </Box>
      </Flex>
    </>
  );
}
