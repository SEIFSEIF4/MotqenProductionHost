"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Search from "@/images/search.png";
import Logo from "@/images/logo.png";
import Building from "@/images/building.png";
import userGroup from "@/images/user-group.png";
import News from "@/images/news.png";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import Quran from "@/images/quran.png";
import { useLocale } from "next-intl";
import SearchBox from "./SearchBox";
import { Separator } from "./ui/separator";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const t = useTranslations("HomePage.Navbar");

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const lang: { en: string; ar: string } = {
    en: "العربية",
    ar: "English",
  };

  let nextLocale = null;

  if (locale === "en") nextLocale = "ar";
  else if (locale === "ar") nextLocale = "en";

  const handleChangeLang = () => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale },
    );
  };

  const icons = [
    { src: Building, alt: "Building", title: t("aboutUs.megaMenuTitle1") },
    { src: userGroup, alt: "user group", title: t("aboutUs.megaMenuTitle2") },
    { src: News, alt: "News", title: t("aboutUs.megaMenuTitle3") },
    { src: Quran, alt: "Quran", title: t("programsAndPaths.hifzPath") },
    { src: Quran, alt: "Quran", title: t("programsAndPaths.ittqanPath") },
    { src: Quran, alt: "Quran", title: t("programsAndPaths.iqraPath") },
  ];

  const navbarMegaMenu: {
    aboutUs: { title: string; href: string; description: string }[];
    programsAndPaths: { title: string; href: string; description: string }[];
  } = {
    aboutUs: [
      {
        title: t("aboutUs.megaMenuTitle1"),
        href: `/${locale}/about-motqen`,
        description: t("aboutUs.description1"),
      },
      {
        title: t("aboutUs.megaMenuTitle2"),
        href: `/${locale}/about-motqen`,
        description: t("aboutUs.description2"),
      },
      {
        title: t("aboutUs.megaMenuTitle3"),
        href: `/${locale}/about-motqen`,
        description: t("aboutUs.description3"),
      },
    ],
    programsAndPaths: [
      {
        title: t("programsAndPaths.hifzPath"),
        href: `/${locale}/hifz-path`,
        description: t("programsAndPaths.hifzDescription"),
      },
      {
        title: t("programsAndPaths.ittqanPath"),
        href: `/${locale}/ittqan-path`,
        description: t("programsAndPaths.ittqanDescription"),
      },
      {
        title: t("programsAndPaths.iqraPath"),
        href: `/${locale}/iqra-path`,
        description: t("programsAndPaths.iqraDescription"),
      },
    ],
  };

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              `flex select-none ${locale === "ar" && "flex-row-reverse"} items-center gap-x-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`,
              className,
            )}
            {...props}
          >
            <div>
              {icons.map(
                (obj, idx) =>
                  obj.title === title && (
                    <Image
                      key={obj.title + idx}
                      src={obj.src}
                      alt={obj.alt}
                      className="mx-1 aspect-square w-5 rounded-md object-cover"
                    />
                  ),
              )}
            </div>
            <div className={locale === "ar" ? "text-right" : "text-left"}>
              <h4 className="text-sm font-medium leading-none">{title}</h4>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  return (
    <header className="relative mx-auto w-full max-w-base rounded-b-sm shadow-md">
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-white px-8 py-4 md:px-16">
        {/* Left: Logo */}
        <div className="order-2 flex flex-1 items-start justify-center lg:order-none">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="w-12 object-contain" />
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <NavigationMenu className="hidden lg:flex lg:flex-1">
          <DirectionProvider dir="rtl">
            <NavigationMenuList
              className={`flex space-x-6 ${locale === "ar" && "flex-row-reverse"}`}
            >
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`flex ${locale === "ar" && "flex-row-reverse"} text-gray-800 hover:text-blue-500`}
                >
                  {translations.aboutUs}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[700px]">
                    {navbarMegaMenu.aboutUs.map(
                      ({ title, href, description }) => (
                        <ListItem key={title} title={title} href={href}>
                          {description}
                        </ListItem>
                      ),
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`flex ${locale === "ar" && "flex-row-reverse"} text-gray-800 hover:text-blue-500`}
                >
                  {translations.programsAndPaths}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-3 lg:w-[700px]">
                    {navbarMegaMenu.programsAndPaths.map(
                      ({ title, href, description }) => (
                        <ListItem key={title} title={title} href={href}>
                          {description}
                        </ListItem>
                      ),
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={`/${locale}/news`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                  >
                    {translations.associationNews}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={`/${locale}/store`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                  >
                    {translations.store}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={`/${locale}/contact`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                  >
                    {translations.contactUs}
                  </NavigationMenuLink>
                </Link>
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
            langLabel={lang[locale as "en" | "ar"]}
            handleClick={handleChangeLang}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded p-2 text-xl lg:hidden"
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
                <AccordionItem
                  value="item-1"
                  className="px-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  <AccordionTrigger
                    className={`w-full py-5 ${locale === "ar" && "flex-row-reverse"} text-base text-gray-800`}
                  >
                    {translations.aboutUs}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid w-full gap-3 p-4 text-start md:grid-cols-3">
                      {navbarMegaMenu.aboutUs.map(
                        ({ title, href, description }) => (
                          <ListItem key={title} title={title} href={href}>
                            {description}
                          </ListItem>
                        ),
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <Separator />
                <AccordionItem
                  value="item-2"
                  className="px-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  <AccordionTrigger
                    className={`w-full py-5 ${locale === "ar" && "flex-row-reverse"} text-base text-gray-800`}
                  >
                    {translations.programsAndPaths}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid w-full gap-3 p-4 text-start md:grid-cols-3">
                      {navbarMegaMenu.programsAndPaths.map(
                        ({ title, href, description }) => (
                          <ListItem key={title} title={title} href={href}>
                            {description}
                          </ListItem>
                        ),
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Separator />
              <NavigationMenuItem className="w-full">
                <Link href={`/${locale}/news`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} min-w-full cursor-pointer py-8 text-gray-800`}
                    style={{
                      justifyContent:
                        locale === "ar" ? "flex-end" : "flex-start",
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {translations.associationNews}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <Separator />
              <NavigationMenuItem className="w-full">
                <Link href={`/${locale}/store`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} min-w-full cursor-pointer py-8 text-base text-gray-800`}
                    style={{
                      justifyContent:
                        locale === "ar" ? "flex-end" : "flex-start",
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {translations.store}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <Separator />
              <NavigationMenuItem className="w-full">
                <Link href={`/${locale}/contactus`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} min-w-full cursor-pointer py-8 text-base text-gray-800`}
                    style={{
                      justifyContent:
                        locale === "ar" ? "flex-end" : "flex-start",
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {translations.contactUs}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <Separator />
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} min-w-full cursor-pointer py-8 text-base text-gray-800`}
                  onClick={handleChangeLang}
                  style={{
                    justifyContent: locale === "ar" ? "flex-end" : "flex-start",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  <button type="button">{lang[locale as "en" | "ar"]}</button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </ul>
          </DirectionProvider>
        </NavigationMenu>
      )}
    </header>
  );
}
