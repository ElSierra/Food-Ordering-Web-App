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
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { UserState } from "@/redux/features/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { usePhotoPostMutation } from "@/redux/features/api/authUserSlice";
import { DocumentUpload, Trash } from "iconsax-react";

const ProfilePhotoModal = dynamic(() => import("./modal/profilePhotoModal"), {
  ssr: false,
});
export default function RightSide({ user }: { user: UserState }) {
  const [updatePhoto, updatePhotoResponse] = usePhotoPostMutation();
  const token = Cookies.get("qs_token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState(user.data?.user?.photo);
  const [picData, setPicData] = useState<string|null>(null);
  function onClosedCrop() {
    setPreview(user.data?.user?.photo);
    setPicData(null)
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
      })
      .catch((e) => {
        console.log("photoPreview", e);
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
        picData = {picData}
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
              <Button onClick={onOpen}  display={{ base: "none", lg: "15%" }}>Change Photo</Button>
              <Button mt="10px"  display={{ base: "none", lg: "15%" }}>Delete Photo</Button>
              <IconButton  onClick={onOpen}  aria-label="update" icon={<DocumentUpload color="green"/>}/>
              <IconButton mt="10px" aria-label="update" icon={<Trash color="red"/>}/>
            </Flex>
          </HStack>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder={user.data?.user.name}  w={{ base: "100%", lg: "300px" }} />
            <FormLabel>Email</FormLabel>
            <Input placeholder={user.data?.user.email} w={{ base: "100%", lg: "300px" }}/>
            <FormLabel>Phone</FormLabel>
            <Input placeholder={user.data?.user.phone} w={{ base: "100%", lg: "300px" }} />
          </FormControl>
          <Button  w={{ base: "100%", lg: "300px" }}  mt="10px">
            Update Profile
          </Button>
        </Box>
      </Flex>
    </>
  );
}
