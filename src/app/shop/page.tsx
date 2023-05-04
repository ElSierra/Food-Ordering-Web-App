import { HomeContainer } from "./components/home";
import { Box, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    
    >
     
        <HomeContainer />
    
    </main>
  );
}
