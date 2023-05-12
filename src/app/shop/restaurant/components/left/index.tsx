import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Clock, Star, Star1, ToggleOffCircle, ToggleOnCircle } from "iconsax-react";
import Image from "next/image";
import Tabs from "./tabs";
import { useState } from "react";
import { RestaurantResponse } from "../../../../../../interface/prisma";
import { FoodCard } from "./foodCard";
import OrderFoodModal from "./modal";

export const LeftContainer = ({
  restaurant,
}: {
  restaurant: RestaurantResponse;
}) => {
  const bgColorTime = useColorModeValue("#E0E0E0", "#202020");
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
            zIndex={9}
          >
            <HStack>
              <Clock size={"14px"} />
              <Text fontSize={"14px"}>38-48 mins</Text>
            </HStack>
          </Box>
          <Image
            src={restaurant?.photo}
            alt={"test"}
            style={{ objectFit: "cover", borderRadius: "20px" }}
            fill
          />
        </Box>
      </Box>
      <Flex mt="30px" flexWrap={"wrap"}>
        <Text
          fontWeight={{ base: "bold", lg: "medium" }}
          fontSize={{ base: "15px", lg: "25px" }}
          mr="20px"
        >
          {restaurant?.name}
        </Text>
        <Flex
          height={{ base: "22px", lg: "42px" }}
          justify={"end"}
          alignItems={"center"}
        >
          <Text fontWeight={"bold"} fontSize={"12px"}>
            {restaurant?.rating}%
          </Text>
          <Star1 variant="Bold" size={"16px"} />
          <Text fontSize={"12px"}>({restaurant?.ratingAmount || "0"})</Text>
        </Flex>
        <Spacer />
        <Tabs setTabIndex={setTabIndex} />
      </Flex>
      <Box>
        {restaurant?.category?.map((restaurant) => {
          return <Text key={restaurant.id}>{restaurant.type}</Text>;
        })}
      </Box>
      <Box mt="10px" height={"0.5px"} bg={lineBg}></Box>

      <Flex mt="20px">
        <HStack>
          <Text fontSize={"14px"} fontWeight={"bolder"}>
            Status:
          </Text>
          <Text fontSize={"14px"}>Available</Text>
          {restaurant.available ? (
                <ToggleOnCircle color={"#12B76A"} variant="Bulk" />
              ) : (
                <ToggleOffCircle color={"#F04438"} />
              )}
        </HStack>
        <Spacer />
        <Text color={minText}>Min Order : ₦1,000</Text>
      </Flex>
      <Flex flexWrap={"wrap"} justify={"space-between"}>
      {restaurant?.menu?.map((menu: any) => {
          return <FoodCard key={menu.id} menu={menu}/>;
        })}
      </Flex>
    </Box></>
  );
};
