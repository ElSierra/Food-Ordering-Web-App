import {
    Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import RightSide from "./cart";

export const CartDrawer = ({
  isOpen,
  onClose,
  btnRef,
}: {
  isOpen: boolean;
  onClose: any;
  btnRef: any;
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
       
      <DrawerOverlay >
      <Box
          minW={"100vw"}
          height={"100vh"}
          backdropFilter={"blur(10px)"}
          bg={"rgb(30, 30, 30, 0.5)"}
        ></Box>

      </DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart</DrawerHeader>

        <DrawerBody>
         <RightSide/>
        </DrawerBody>

        
      </DrawerContent>
    </Drawer>
  );
};
