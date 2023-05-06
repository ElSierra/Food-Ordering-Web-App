import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./chakra/provider";
import { Providers as ReduxProvider } from "@/redux/provider";
import "./index.css";

const plusJakaraSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Quick Chop | Home",
  description:
    "Quickchop is your go-to online food delivery service, offering a wide selection of tasty dishes from your favorite restaurants. Browse our menu, choose your favorite meals, and enjoy fast delivery right to your doorstep. With Quickchop, satisfying your cravings has never been easier.",
  keywords:
    "food delivery, online ordering, fast delivery, restaurant delivery, online food ordering, order food online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakaraSans.className}>
        <ReduxProvider>
          {" "}
          <Providers>{children}</Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
