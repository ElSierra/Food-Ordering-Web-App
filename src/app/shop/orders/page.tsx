import { notFound } from "next/navigation";

import Home from "./home";
import { prisma } from "../../../../lib/prisma";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function Restaurant({
  params,
}: {
  params: { id: string };
}) {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("qs_token");
  let userData: any;
  if (token) {
    try {
      const user = jwt.verify(token?.value, process.env.SECRET || "");
      userData = user;
    } catch (e) {}
  }
  const orders = async () => {
    try {
      if (userData?.id) {
        const order = await prisma.orders.findMany({
          where: {
            userId: userData.id,
          },
          include: {
            rider: {
              select: {
                name: true,
                location: true,
                phone: true,
                photo: true,
              },
            },
            restaurant: {
              select: {
                name: true
              }
            },
            foodOrder: {
              select: {
                menu: true,
                quantity: true,
              },
            },
          },
        });
        return order;
      }
      return []
    } catch (e) {
      return notFound()
    }
  };

  const orderData: any = await orders();
  console.log("🚀 ~ file: page.tsx:61 ~ orderData:", orderData)
  console.log("🚀 ~ file: page.tsx:61 ~ userData:", orderData)

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
      <Home orderData = {orderData}/>
    </main>
  );
}
