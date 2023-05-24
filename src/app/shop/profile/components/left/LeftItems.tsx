import { Button, IconButton } from "@chakra-ui/react";
import { ProfileCircle } from "iconsax-react";
import Link from "next/link";

export const MobileLeft = ({
  route = "",
  icon,
}: {
  route: string;
  icon: JSX.Element;
}) => {
  return (
    <Link href={`/shop/profile/${route}`}>
      <IconButton
        display={{ base: "flex", lg: "none" }}
        aria-label={route === "" ? "profile" : route}
        icon={icon}
      />{" "}
    </Link>
  );
};

export const DesktopLeft = ({
  name,
  pathname,
  buttonTextColor,
  buttonBg,
  route
}: {
  name: string;
  route: string;
  pathname: string;
  buttonTextColor: string;
  buttonBg: string;
}) => {
  return (
    <Link href={`/shop/profile/${route}`}>
      <Button
        display={{ base: "none", lg: "block" }}
        bg={pathname !== "/shop/profile/wallet" ? "none" : buttonBg}
        mt="10px"
        w="100%"
        color={
          pathname !== "/shop/profile/wallet"
            ? "rgb(99, 111, 130)"
            : buttonTextColor
        }
        size={"sm"}
        justifyContent={"left"}
      >
        {name}
      </Button>
    </Link>
  );
};
