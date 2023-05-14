import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Skeleton,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Clock, Star, Star1, ToggleOffCircle, ToggleOnCircle } from "iconsax-react";
import Image from "next/image";

import { useState } from "react";
import { RestaurantResponse } from "../../../../../../interface/prisma";


export const LeftContainer = (

) => {
  const bgColorTime = useColorModeValue("#E0E0E08C", "#20202069");
  const [tabIndex, setTabIndex] = useState(0);
  console.log("🚀 ~ file: index.tsx:17 ~ LeftContainer ~ tabIndex:", tabIndex);
  const handleChange = (e: any) => {
    setTabIndex(Number(e.target.value));
  };
  const lineBg = useColorModeValue("#30303023", "#303030");
  const minText = useColorModeValue("#0A5B35", "#12B76A");
  const { isOpen, onOpen, onClose } = useDisclosure();



  return (
    <>
  
    <Box height={"100%"} mb={'300px'} >
      <Box height={{ base: "150px", lg: "250px" }} position={"relative"}>
        <Box
          position={"absolute"}
          
          top={0}
          left={0}
          width={"100%"}
          height={{ base: "150px", lg: "250px" }}
        >
          <Box
            borderRadius={"md"}
            bgColor={bgColorTime}
            padding="10px"
            position={"absolute"}
            left={3}
            bottom={3}
            backdropFilter={"blur(10px)"}
            zIndex={9}
          >
            <HStack>
              <Clock size={"14px"} />
              <Text fontSize={"14px"}>38-48 mins</Text>
            </HStack>
          </Box>
          <Skeleton/>
        </Box>
      </Box>
      <Flex mt="30px" flexWrap={"wrap"}>
       <Skeleton/>
      </Flex>
    
      <Box mt="10px" height={"0.5px"} bg={lineBg}></Box>

      
      <Flex flexWrap={"wrap"} justify={"space-between"}>
      {[1,2,3,4].map((a, idx) => {
          return <Skeleton key={idx}/>;
        })}
      </Flex>
    </Box></>
  );
};
