"use client";

import { useState } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Link } from "next-view-transitions";
import Image from "next/image";
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

import Search from "@/images/search.png";
import Logo from "@/images/logo.png";
import Building from "@/images/building.png";
import userGroup from "@/images/user-group.png";
import News from "@/images/news.png";
import Quran from "@/images/quran.png";

type NavbarProps = {
  translations: {
    aboutUs: string;
    programsAndPaths: string;
    associationNews: string;
    store: string;
    contactUs: string;
    search: string;
    english: string;
  };
};

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
      IconSrc: any;
      iconAlt: string;
    }[];
    programsAndPaths: {
      title: string;
      href: string;
      description: string;
      IconSrc: any;
      iconAlt: string;
    }[];
  };

  const navbarMegaMenu: NavbarMegaMenu = {
    aboutUs: [
      {
        title: t("aboutUs.megaMenuTitle1"),
        href: `/about-motqen`,
        description: t("aboutUs.description1"),
        IconSrc: Building,
        iconAlt: "Building",
      },
      {
        title: t("aboutUs.megaMenuTitle2"),
        href: `/members`,
        description: t("aboutUs.description2"),
        IconSrc: userGroup,
        iconAlt: "User Group",
      },
      {
        title: t("aboutUs.megaMenuTitle3"),
        href: `/about-motqen`,
        description: t("aboutUs.description3"),
        IconSrc: News,
        iconAlt: "News",
      },
    ],
    programsAndPaths: [
      {
        title: t("programsAndPaths.hifzPath"),
        href: `/hifz-path`,
        description: t("programsAndPaths.hifzDescription"),
        IconSrc: Quran,
        iconAlt: "Quran",
      },
      {
        title: t("programsAndPaths.ittqanPath"),
        href: `/ittqan-path`,
        description: t("programsAndPaths.ittqanDescription"),
        IconSrc: Quran,
        iconAlt: "Quran",
      },
      {
        title: t("programsAndPaths.iqraPath"),
        href: `/iqra-path`,
        description: t("programsAndPaths.iqraDescription"),
        IconSrc: Quran,
        iconAlt: "Quran",
      },
    ],
  };

  return (
    <header className="relative w-full bg-white shadow-sm">
      {/* Top Navbar */}
      <div className="relative mx-auto flex max-w-base items-center justify-between gap-0 px-8 py-4 md:px-16 lg:gap-6 xl:gap-8">
        {/* Left: Logo */}
        <div className="order-2 flex items-start justify-center lg:order-none">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="w-12 object-contain" />
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
              />
              <NavbarMenuItem
                translations={translations.programsAndPaths}
                navbarMegaMenu={navbarMegaMenu.programsAndPaths}
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
                  title={translations.store}
                  href={`/store`}
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

        <div className="order-3 flex items-center justify-end gap-8 lg:flex-auto">
          {/* Search Box */}
          <SearchBox
            Search={Search}
            locale={locale}
            title={translations.search}
            isOpen={showSearchBox}
            setIsOpen={setShowSearchBox}
            setShowMobileMenu={setShowMobileMenu}
          />

          {/* Language Switch */}
          <LocaleSwitcher
            langLabel={translations.english}
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
              <NavigationMenuItem className="w-full">
                <NavbarLink
                  title={translations.associationNews}
                  href={`/news`}
                  isMobileMenu={true}
                />
              </NavigationMenuItem>
              <Separator />
              <NavigationMenuItem className="w-full">
                <NavbarLink
                  title={translations.store}
                  href={`/store`}
                  isMobileMenu={true}
                />
              </NavigationMenuItem>
              <Separator />
              <NavigationMenuItem className="w-full">
                <NavbarLink
                  title={translations.contactUs}
                  href={`/contact`}
                  isMobileMenu={true}
                />
              </NavigationMenuItem>
              <Separator />
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} min-w-full cursor-pointer py-8 text-base text-gray-800`}
                  onClick={switchLocale}
                  style={{
                    justifyContent: locale === "ar" ? "flex-end" : "flex-start",
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
  );
}
