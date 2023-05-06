import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  useDisclosure,
  Spinner,
  Box,
  Center,
} from "@chakra-ui/react";
import { Login, LoginCurve, Logout } from "iconsax-react";
import ModalContainer from "./modalContainer";
import { AuthPage } from "./authPage";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { updateState, reset, UserState } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { useLogOutQuery } from "@/redux/features/api/authUserSlice";
import Cookies from 'js-cookie'

export const AuthMenu = () => {
  const user = useAppSelector(
    (state: { userDataReducer: UserState }) => state.userDataReducer
  );
  console.log("🚀 ~ file: authMenu.tsx:25 ~ AuthMenu ~ user:", user);

  const dispatch = useAppDispatch();
  //console.log("🚀 ~ file: authMenu.tsx:25 ~ userData:", userData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [skip, setSkip] = useState(true);
  const data = useLogOutQuery(
    {
      refetchOnMountOrArgChange: true,
    },
    { skip: skip }
  );
  if (data.isSuccess){
    Cookies.remove('qs_token')
    localStorage.removeItem("quickChopUserEmail");
  };

  
  const logOut = () => {
    console.log('here44')
    setSkip(false);
    dispatch(reset());

    //localStorage.removeItem("quickShopToken");
  };

  return (
    <Menu>
      <MenuButton>
        <Box>
          <Avatar
            src={user?.data?.user?.photo || undefined}
            size={"md"}
            name={user?.data?.user?.name || ""}
            display={user.loading ? "none" : "block"}
            pointerEvents={"none"}
            placeholder="./default.avif"
          />
          <Center>
            <Spinner
              display={user.loading ? "block" : "none"}
              zIndex={1}
              position={"absolute"}
              color="blue"
              thickness="4px"
              size={"lg"}
            />
          </Center>
        </Box>
      </MenuButton>
      <MenuList minWidth={"10px"} padding={"2px"}>
        <MenuItem
          padding={"20px"}
          borderTop={0}
          borderBottom={0}
          _active={{ backgroundColor: "transparent" }}
          _hover={{ backgroundColor: "transparent" }}
          icon={user.data ? <Logout /> : <LoginCurve />}
          onClick={user.data ? logOut : onOpen}
        >
          {user.data ? "Logout" : "Login"}
        </MenuItem>
      </MenuList>
      <ModalContainer isOpen={isOpen} onClose={onClose} />
    </Menu>
  );
};
