import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ProfilePhotoModal from "./modal/profilePhotoModal";
import { useEffect, useState } from "react";
import { UserState } from "@/redux/features/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
export default function RightSide({ user }: { user: UserState }) {
  const token = Cookies.get("qs_token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState(user.data?.user?.photo);
  const [file, setFile] = useState<File>();
  function onClosedCrop() {
    setPreview("");
  }
  function onCrop(pv: any) {
    setPreview(pv);
    console.log("pv", pv);

    const formData = new FormData();
    formData.append("photo", pv);

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload-avatar`, formData, {
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
  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 2000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
    console.log("elem", elem.target.files[0]);
    setFile(elem.target.files[0]);
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
      />
      <Flex flexDirection={"column"}>
        <Text fontSize={"22px"}>My Profile</Text>
        <Text color={"rgb(99, 111, 130)"}>Manage your profile settings</Text>
        <Box mt="30px">
          <HStack>
            <Avatar src={preview || ""} size={"2xl"} />
            <Flex flexDirection={"column"}>
              <Button onClick={onOpen}>Change Photo</Button>
              <Button mt="10px">Delete Photo</Button>
            </Flex>
          </HStack>
        </Box>
      </Flex>
    </>
  );
}
