import { notFound } from "next/navigation";
import { RestaurantResponse } from "../../../../../interface/prisma";
import { prisma } from "../../../../../lib/prisma";
import Home from "../home";

export default async function Restaurant({
  params,
}: {
  params: { id: string };
}) {
  const fetchRestaurants = async () => {
    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          id: params.id,
        },
        include: {
          menu: true,
        },
      });
      return restaurant;
    } catch (e) {
      console.log(e);
      notFound();
    }
  };

  const restaurant: any = await fetchRestaurants();

  return (
    <main
      className="animate__animated animate__flash"
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <Home restaurant={restaurant} params={params} />
    </main>
  );
}
