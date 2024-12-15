import { useLocale } from "next-intl";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import MegaMenu from "./MegaMenu";

const NavbarMenuItem = ({
  translations,
  navbarMegaMenu,
}: {
  translations: string;
  navbarMegaMenu: {
    title: string;
    href: string;
    description: string;
    IconSrc: any;
    iconAlt: string;
  }[];
}) => {
  const locale = useLocale();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`flex ${locale === "ar" && "flex-row-reverse"} text-base hover:text-blue-500`}
      >
        {translations}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="flex justify-end px-8">
        <MegaMenu items={navbarMegaMenu} isMobileMenu={false} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavbarMenuItem;
