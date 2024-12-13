"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname } from "@/i18n/routing";
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
import Link from "next/link";
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

// export default function Navbar({ translations }: NavbarProps) {
//   const pathname = usePathname();
//   const isArabic = pathname === "ar";
//   return (
//     <DirectionProvider dir="rtl">
//       <NavigationMenu className="mx-auto w-full max-w-base bg-slate-500">
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger>
//               {translations.aboutUs}
//             </NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                 <ListItem href="/about" title={translations.aboutUs}>
//                   Learn more about us and our mission.
//                 </ListItem>
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger>
//               {translations.programsAndPaths}
//             </NavigationMenuTrigger>
//             <NavigationMenuContent>
//               {/* Add content for programs and paths */}
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               {translations.associationNews}
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               {translations.store}
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               {translations.contactUs}
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               {translations.search}
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               {translations.english}
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </DirectionProvider>
//   );
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li className="flex items-center space-x-2 text-gray-700">
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className,
//           )}
//           {...props}
//         >
//           <div>
//             <h4 className="text-sm font-medium leading-none">{title}</h4>
//             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//               {children}
//             </p>
//           </div>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

// ===========================================================
// ===========================================================
// ===========================================================

export default function Navbar({ translations }: NavbarProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const t = useTranslations("HomePage.Navbar");

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
        title: t("aboutUs.megaMenuTitle3"),
        href: `/${locale}/about-motqen`,
        description: t("aboutUs.description3"),
      },
      {
        title: t("aboutUs.megaMenuTitle2"),
        href: `/${locale}/about-motqen`,
        description: t("aboutUs.description2"),
      },
      {
        title: t("aboutUs.megaMenuTitle1"),
        href: `/${locale}/about-motqen`,
        description: t("aboutUs.description1"),
      },
    ],
    programsAndPaths: [
      {
        title: t("programsAndPaths.iqraPath"),
        href: `/${locale}/iqra-path`,
        description: t("programsAndPaths.iqraDescription"),
      },
      {
        title: t("programsAndPaths.ittqanPath"),
        href: `/${locale}/ittqan-path`,
        description: t("programsAndPaths.ittqanDescription"),
      },
      {
        title: t("programsAndPaths.hifzPath"),
        href: `/${locale}/hifz-path`,
        description: t("programsAndPaths.hifzDescription"),
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
              "flex select-none items-center gap-x-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
                      className="ml-1 aspect-square w-5 rounded-md object-cover"
                    />
                  ),
              )}
            </div>
            <div>
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
      <div className="flex items-center justify-between px-8 py-4 md:px-16">
        {/* Left: Logo */}
        <div className="order-2 justify-center lg:order-1 lg:flex-1">
          <Image src={Logo} alt="Logo" className="w-12 object-contain" />
        </div>

        {/* Middle: Navigation Links */}
        <nav className="order-1 hidden lg:order-2 lg:flex lg:flex-1">
          <DirectionProvider dir="rtl">
            <NavigationMenu>
              <NavigationMenuList
                className={`flex space-x-6 ${locale === "en" && "flex-row-reverse"}`}
              >
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-800 hover:text-blue-500">
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
                  <NavigationMenuTrigger className="text-gray-800 hover:text-blue-500">
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
                  <Link href={`/${locale}/contactus`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    >
                      {translations.contactUs}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </DirectionProvider>
        </nav>

        <div className="order-3 flex flex-auto items-center justify-end gap-8">
          {/* Search Box */}
          <SearchBox
            Search={Search}
            locale={locale}
            title={translations.search}
          />

          {/* Language Switch */}
          <LocaleSwitcher />

          {/* Mobile Menu Button */}
          <button
            className="rounded border px-3 py-1 hover:bg-blue-100 lg:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <nav>
          <DirectionProvider dir="rtl">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-800 hover:text-blue-500">
                    {translations.aboutUs}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 top-full mt-2 rounded-md bg-white p-4 shadow-lg">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
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
                  <NavigationMenuTrigger className="text-gray-800 hover:text-blue-500">
                    {translations.programsAndPaths}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
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
                  <Link href={`/${locale}/contactus`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    >
                      {translations.contactUs}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </DirectionProvider>
        </nav>
      )}
    </header>
  );
}
