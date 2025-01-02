"use client";

import { useState, createContext, Dispatch, SetStateAction } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Link } from "next-view-transitions";
import { useTranslations, useLocale } from "next-intl";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Accordion } from "@/components/ui/accordion";
import LocaleSwitcher from "./LocaleSwitcher";
import SearchBox from "./SearchBox";
import { Separator } from "./ui/separator";
import NavbarLink from "./NavbarLink";
import NavbarAccordionItem from "./NavbarAccordionItem";
import NavbarMenuItem from "./NavbarMenuItem";

import Search from "./icons/Search";
import Logo from "./icons/HeaderLogo";
import Building from "./icons/Building";
import userGroup from "./icons/UserGroup";
import News from "./icons/News";
import Quran from "./icons/QuranNotFill";

type NavbarProps = {
  translations: {
    aboutUs: string;
    programsAndPaths: string;
    associationNews: string;
    store: string;
    contactUs: string;
    search: string;
    searchLoading: string;
    noResultsMessage: string;
    english: string;
    langAriaLabel: string;
  };
};

type MobileMenuContextType = Dispatch<SetStateAction<boolean>> | null;

export const MobileMenuContext = createContext<MobileMenuContextType>(null);

export default function Navbar({ translations }: NavbarProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const t = useTranslations("HomePage.Navbar");

  const switchLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale },
    );
  };

  type NavbarMegaMenu = {
    aboutUs: {
      title: string;
      href: string;
      description: string;
      Icon: any;
    }[];
    programsAndPaths: {
      title: string;
      href: string;
      description: string;
      Icon: any;
    }[];
  };

  const navbarMegaMenu: NavbarMegaMenu = {
    aboutUs: [
      {
        title: t("aboutUs.megaMenuTitle1"),
        href: `/about-motqen`,
        description: t("aboutUs.description1"),
        Icon: Building,
      },
      {
        title: t("aboutUs.megaMenuTitle2"),
        href: `/members`,
        description: t("aboutUs.description2"),
        Icon: userGroup,
      },
      {
        title: t("aboutUs.megaMenuTitle3"),
        href: `/governance`,
        description: t("aboutUs.description3"),
        Icon: News,
      },
    ],
    programsAndPaths: [
      {
        title: t("programsAndPaths.hifzPath"),
        href: `/hifz-path`,
        description: t("programsAndPaths.hifzDescription"),
        Icon: Quran,
      },
      {
        title: t("programsAndPaths.ittqanPath"),
        href: `/ittqan-path`,
        description: t("programsAndPaths.ittqanDescription"),
        Icon: Quran,
      },
      {
        title: t("programsAndPaths.iqraPath"),
        href: `/iqra-path`,
        description: t("programsAndPaths.iqraDescription"),
        Icon: Quran,
      },
    ],
  };

  return (
    <MobileMenuContext.Provider value={setShowMobileMenu}>
      <header className="fixed left-0 top-0 z-[100] w-full bg-white shadow-sm">
        {/* Top Navbar */}
        <div className="relative mx-auto flex max-w-base items-center justify-between gap-0 px-8 py-4 text-lg font-medium md:px-16 lg:gap-2 xl:gap-8">
          {/* Left: Logo */}
          <div className="order-2 flex items-start justify-center lg:order-none">
            <Link href={`/${locale}`} aria-label="logo">
              <Logo />
            </Link>
          </div>

          {/* Middle: Navigation Links */}
          <NavigationMenu className="hidden lg:flex lg:flex-1">
            <DirectionProvider dir="rtl">
              <NavigationMenuList
                className={`flex ${locale === "ar" && "flex-row-reverse"} text-gray-800`}
              >
                <NavbarMenuItem
                  translations={translations.aboutUs}
                  navbarMegaMenu={navbarMegaMenu.aboutUs}
                  isFirst={true}
                />
                <NavbarMenuItem
                  translations={translations.programsAndPaths}
                  navbarMegaMenu={navbarMegaMenu.programsAndPaths}
                  isFirst={false}
                />
                <NavigationMenuItem>
                  <NavbarLink
                    title={translations.associationNews}
                    href={`/news`}
                    isMobileMenu={false}
                  />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavbarLink
                    isExternal
                    title={translations.store}
                    href={`https://store.motqen.sa`}
                    isMobileMenu={false}
                  />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavbarLink
                    title={translations.contactUs}
                    href={`/contact`}
                    isMobileMenu={false}
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </DirectionProvider>
          </NavigationMenu>

          <div className="order-3 flex items-center justify-end gap-1 lg:flex-auto xl:gap-8">
            {/* Search Box */}
            <SearchBox
              Search={Search}
              title={translations.search}
              loadingTitle={translations.searchLoading}
              noResultsMessage={translations.noResultsMessage}
              isOpen={showSearchBox}
              setIsOpen={setShowSearchBox}
            />

            {/* Language Switch */}
            <LocaleSwitcher
              langLabel={translations.english}
              langAriaLabel={translations.langAriaLabel}
              handleClick={switchLocale}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded p-2 text-xl lg:hidden"
            aria-label="Toggle Menu"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setShowSearchBox(false);
            }}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <NavigationMenu className="absolute left-1/2 min-w-full -translate-x-1/2 bg-white p-4 lg:hidden">
            <DirectionProvider dir="rtl">
              <ul
                className={`has group flex w-full flex-1 list-none flex-col items-end`}
              >
                <Accordion type="single" collapsible className="w-full">
                  <Separator />
                  <NavbarAccordionItem
                    title="aboutUs"
                    translations={translations.aboutUs}
                    navbarMegaMenu={navbarMegaMenu.aboutUs}
                  />
                  <Separator />
                  <NavbarAccordionItem
                    title="programsAndPaths"
                    translations={translations.programsAndPaths}
                    navbarMegaMenu={navbarMegaMenu.programsAndPaths}
                  />
                </Accordion>
                <Separator />
                <NavigationMenuItem
                  className="w-full"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <NavbarLink
                    title={translations.associationNews}
                    href={`/news`}
                    isMobileMenu={true}
                  />
                </NavigationMenuItem>
                <Separator />
                <NavigationMenuItem
                  className="w-full"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <NavbarLink
                    isExternal
                    title={translations.store}
                    href={`https://store.motqen.sa`}
                    isMobileMenu={true}
                  />
                </NavigationMenuItem>
                <Separator />
                <NavigationMenuItem
                  className="w-full"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <NavbarLink
                    title={translations.contactUs}
                    href={`/contact`}
                    isMobileMenu={true}
                  />
                </NavigationMenuItem>
                <Separator />
                <NavigationMenuItem
                  className="w-full"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} min-w-full cursor-pointer bg-white py-8 text-base text-gray-800`}
                    onClick={switchLocale}
                    style={{
                      justifyContent:
                        locale === "ar" ? "flex-end" : "flex-start",
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    <button type="button">{translations.english}</button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </ul>
            </DirectionProvider>
          </NavigationMenu>
        )}
      </header>
    </MobileMenuContext.Provider>
  );
}
