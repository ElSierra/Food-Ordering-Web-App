import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
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

const ProfilePhotoModal = dynamic(() => import("./modal/profilePhotoModal"), {
  ssr: false,
});
export default function RightSide({ user }: { user: UserState }) {
  const [updatePhoto, updatePhotoResponse] = usePhotoPostMutation();
  const token = Cookies.get("qs_token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState(user.data?.user?.photo);
  const [picData, setPicData] = useState('');
  function onClosedCrop() {
    setPreview("");
  }
  function onCrop(pv: any) {
    setPreview(pv);
    setPicData(pv)
    console.log("pv", pv);
 
  }
  function onUpload(){
    updatePhoto({ photoPreview: picData }).unwrap().then((e)=>{console.log(e)}).catch((e)=>{
      console.log('photoPreview', e)
    });
  }


  useEffect(() => {
    if (user.data?.user.photo) {
      setPreview(user.data.user.photo);
    }
  }, [user.data?.user?.photo]);

  return (
    <>
      <ProfilePhotoModal
        isOpen={isOpen}
        onClose={onClose}
        onClosedCrop={onClosedCrop}
        onCrop={onCrop}
        onUpload = {onUpload}
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
              <Button onClick={onOpen}>Change Photo</Button>
              <Button mt="10px">Delete Photo</Button>
            </Flex>
          </HStack>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder={user.data?.user.name} w="300px" />
            <FormLabel>Email</FormLabel>
            <Input placeholder={user.data?.user.email} w="300px" />
            <FormLabel>Phone</FormLabel>
            <Input placeholder={user.data?.user.phone} w="300px" />
          </FormControl>
          <Button w="300px" mt="10px">
            Update Profile
          </Button>
        </Box>
      </Flex>
    </>
  );
}
