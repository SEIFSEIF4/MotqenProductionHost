import { useLocale } from "next-intl";

import MegaMenu from "./MegaMenu";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const NavbarAccordionItem = ({
  title,
  translations,
  navbarMegaMenu,
}: {
  title: string;
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
    <AccordionItem
      value={title}
      className="px-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    >
      <AccordionTrigger
        className={`w-full py-5 ${locale === "ar" && "flex-row-reverse"} text-base text-gray-800`}
      >
        {translations}
      </AccordionTrigger>
      <AccordionContent>
        <MegaMenu items={navbarMegaMenu} isMobileMenu={true} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavbarAccordionItem;
