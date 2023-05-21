import { Restaurant } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { HomeContainer } from "./components/home";

export default async function Home() {
 
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
      <HomeContainer restaurant={[]} isLoadingPage={true} userId="" />
    </main>
  );
}
