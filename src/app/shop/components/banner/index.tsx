import { Box, HStack, Text } from "@chakra-ui/react";

export const Banner = ({
  heading,
  subHeading,
  asset,
  bgImage,
  color,
}: {
  heading: string;
  subHeading: string;
  asset: any;
  bgImage: string;
  color?: string;
}) => {
  return (
    <HStack
      padding="30px"
      borderRadius={"3xl"}
      mt="50px"
      w={{ base: "100%", md: "48%" }}
      minW={{ base: "100%", md: "48%" }}
      h="200px"
      bgColor ={''}
      bgImage={bgImage}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"fit"}
      backgroundSize={"cover"}
    >
      <Box w="60%">
        <Text
          lineHeight={{ base: "20px", md: "25px" }}
          mb="20px"
          as="h1"
          color={color || "white"}
          fontWeight={"bold"}
          fontSize={{ base: "20px", md: "25px" }}
        >
          {heading}
        </Text>
        <Text
          as="p"
          color={color || "white"}
          fontSize={{ base: "15px", md: "18px" }}
        >
          {subHeading}
        </Text>
      </Box>
      <Box w="40%">{asset}</Box>
    </HStack>
  );
};
