import {
  Box,
  
  Modal,
  ModalBody,
 
  ModalContent,
  
  ModalOverlay,
  Flex,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,

  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {CloseSquare, SearchNormal } from "iconsax-react";
import { RestaurantsCardSearch } from "./searchCard";
import { useGetRestaurantsQuery } from "@/redux/features/api/restaurantGetSlice";
import { useDebounce } from "./searchdeBounce";



export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const bg = useColorModeValue("#FFFFFF", "#000000");

  const [searchParam, setSearchParam] = useState("");
  const [skip, setSkip] = useState(true);
  const debounceValue = useDebounce(searchParam, 1000);
  const restaurants = useGetRestaurantsQuery(
    {
      name: debounceValue,
      start: 0,
      take: 20,
    },
    { skip: skip }
  );

 

  useEffect(() => {
    console.log(restaurants.data, "for search");
    if (debounceValue.length <= 0) {
      setSkip(true);
    } else {
      setSkip(false);
    }
   
  }, [debounceValue, restaurants]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount
    >
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
        padding={"20px 20px 50px 20px"}
        borderRadius={"3xl"}
        maxW={{ base: "90%", xl: "40%" }}
      >
        <Flex justify={"end"}>
          <Box
            color="red"
            cursor={"pointer"}
            _hover={{ color: "red.200" }}
            onClick={onClose}
          >
            <CloseSquare size="40" variant="Bulk" />
          </Box>
        </Flex>
        <ModalBody>
          <InputGroup>
            <InputLeftElement>
              <SearchNormal />
            </InputLeftElement>
            <Input
              bg={bg}
              justifyContent={"left"}
              value={searchParam}
              placeholder="Search Quickchop"
              onChange={handleChange}
              minW={{
                base: "50px",
                sm: "300px",
                md: "300px",
                lg: "300px",
                xl: "300px",
                xxl: "300px",
                vxl: "300px",
              }}
            />
          </InputGroup>
          <Box mt="30px">
            {restaurants.isSuccess ? (
              restaurants.data?.restaurant.map((restaurants) => {
                console.log("er knkk");
                return (
                  <RestaurantsCardSearch
                    key={restaurants.id}
                    restaurant={restaurants}
                  />
                );
              })
            ) : restaurants.isFetching || restaurants.isLoading ? (
              <Flex flexDirection={'column'}>
                <Skeleton  mb='10px' height="60px" />
                <Skeleton  mb='10px' height="60px" />
                <Skeleton  mb='10px' height="60px" />
                <Skeleton  mb='10px' height="60px" />
                <Skeleton  mb='10px' height="60px" />
              </Flex>
            ) : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
