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
  isFirst,
}: {
  translations: string;
  navbarMegaMenu: {
    title: string;
    href: string;
    description: string;
    Icon: any;
  }[];
  isFirst: boolean;
}) => {
  const locale = useLocale();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`flex ${locale === "ar" && "flex-row-reverse"} relative bg-white px-2 py-8 text-lg after:absolute after:bottom-0 after:left-1/2 after:h-[6px] after:w-[0%] after:-translate-x-1/2 after:rounded-full after:bg-[#6FA0A7] after:transition-all hover:after:w-[80%] xl:px-4`}
      >
        {translations}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="flex justify-end px-8">
        <span
          className={`absolute ${isFirst ? (locale === "ar" ? "right-[170px]" : "left-[190px]") : locale === "ar" ? "right-[300px]" : "left-[370px]"} top-[-19px] m-0 hidden border-x-[18px] border-y-[10px] border-solid border-transparent border-b-white p-0 lg:inline`}
        />
        <MegaMenu items={navbarMegaMenu} isMobileMenu={false} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavbarMenuItem;
