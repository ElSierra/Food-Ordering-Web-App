import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { Restaurant } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export const RestaurantsCardSearch = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  const router = useRouter();

  Router.events.on("routeChangeStart", (url)=>{
    console.log('route change start')
  })
  const bg = useColorModeValue("#FFFFFF", "rgb(30, 30, 30, 0.5)");
  return (
    <Button
      onClick={() => router.push(`/restaurant/${restaurant.id}`)}
      alignContent={"left"}
      mb="10px"
      justifyContent={"left"}
      height={"60px"}
      padding={"10px"}
      w="100%"
      bg={bg}
      borderRadius={"base"}
    >
      <HStack>
        {" "}
        <Box height={"40px"} position={"relative"}>
          <Box top={0} left={0} width={"40px"} height={"40px"}>
            <Image
              src={`${restaurant.photo}`}
              alt={restaurant.name}
              placeholder="blur"
              blurDataURL={restaurant.loadingImage}
              style={{ objectFit: "cover", borderRadius: "10px" }}
              fill
            />
          </Box>
        </Box>
        <Box pl={"30px"}>
          <Text textAlign={"left"}>{restaurant.name}</Text>
          <Text textAlign={"left"}></Text>
        </Box>
      </HStack>
    </Button>
  );
};
