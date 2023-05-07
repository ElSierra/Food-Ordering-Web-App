import { Restaurant } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { HomeContainer } from "./components/home";



export default async function Home() {
  const fetchRestaurants = async () => {
    const restaurant = await prisma.restaurant.findMany({
      skip: 0,
      take: 20,
    });
    return restaurant;
  };




  console.log(await fetchRestaurants());
  const restaurants: Restaurant[] = await fetchRestaurants();
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
      <HomeContainer restaurant={restaurants} isLoadingPage={false} />
    </main>
  );
}

