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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
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

export default function Navbar({ translations }: NavbarProps) {
  const pathname = usePathname();
  const isArabic = pathname === "ar";
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  console.log(pathname); // "/"

  const t = useTranslations("HomePage.Navbar");

  const icons = [
    { src: Building, alt: "Building" },
    { src: userGroup, alt: "user group" },
    { src: News, alt: "News" },
  ];

  const navbarMegaMenu: {
    aboutUs: { title: string; href: string; description: string }[];
    programsAndPaths: { title: string; href: string; description: string }[];
  } = {
    aboutUs: [
      {
        title: t("aboutUs.megaMenuTitle1"),
        href: "/about-motqen",
        description: t("aboutUs.description1"),
      },
      {
        title: t("aboutUs.megaMenuTitle2"),
        href: "/about-motqen",
        description: t("aboutUs.description2"),
      },
      {
        title: t("aboutUs.megaMenuTitle3"),
        href: "/about-motqen",
        description: t("aboutUs.description3"),
      },
    ],
    programsAndPaths: [
      {
        title: t("programsAndPaths.megaMenuTitle1"),
        href: "/members",
        description: t("programsAndPaths.description1"),
      },
      {
        title: t("programsAndPaths.megaMenuTitle2"),
        href: "/members",
        description: t("programsAndPaths.description2"),
      },
      {
        title: t("programsAndPaths.megaMenuTitle3"),
        href: "/members",
        description: t("programsAndPaths.description3"),
      },
    ],
  };

  return (
    <header className="shadow-md">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        {/* Left: Logo */}
        <div className="order-2 justify-center lg:order-1 lg:flex-1">
          <Image src={Logo} alt="Logo" className="w-12 object-contain" />
        </div>

        {/* Middle: Navigation Links */}
        <nav className="order-1 hidden lg:order-2 lg:flex lg:flex-1">
          <DirectionProvider dir="rtl">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-800 hover:text-blue-500">
                    {translations.aboutUs}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 top-full mt-2 rounded-md bg-white p-4 shadow-lg">
                    {/* grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] */}
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                      {navbarMegaMenu.aboutUs.map(
                        ({ title, href, description }) => (
                          <ListItem key={title} title={title} href={href}>
                            {description}
                          </ListItem>
                        ),
                      )}

                      {/* <li className="flex items-center space-x-2 text-gray-700">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <span className="material-icons">foundation</span>
                            <div>
                              <h4 className="font-bold">تأسيس الجمعية</h4>
                              <p className="text-sm">مسار يتكون من قسمين</p>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li className="flex items-center space-x-2 text-gray-700">
                        <span className="material-icons">group</span>
                        <div>
                          <h4 className="font-bold">أعضاء مجلس الإدارة</h4>
                          <p className="text-sm">مسار يتكون من قسم واحد</p>
                        </div>
                      </li>
                      <li className="flex items-center space-x-2 text-gray-700">
                        <span className="material-icons">gavel</span>
                        <div>
                          <h4 className="font-bold">الحوكمة</h4>
                          <p className="text-sm">مسار يتكون من قسم واحد</p>
                        </div>
                      </li> */}
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
                  <Link href={`/news`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    >
                      {translations.associationNews}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/store`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    >
                      {translations.store}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/contactus`} legacyBehavior passHref>
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

        {/* Right: Search & Language */}
        <div className="order-3 flex flex-auto items-center justify-end space-x-4">
          {/* Search Box */}
          <div className="relative">
            {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
            <input
              type="text"
              placeholder="بحث"
              className="rounded-full border bg-gray-50 py-2 pl-10 pr-3 focus:outline-none focus:ring focus:ring-blue-300"
            /> */}
            <Image
              src={Search}
              alt="Search"
              className="inline-block aspect-square w-5 rounded-md object-cover"
            />

            <button className="hidden rounded p-1 hover:text-blue-500 lg:inline-block">
              {translations.search}
            </button>
          </div>

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
                  <Link href={`/news`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    >
                      {translations.associationNews}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/store`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    >
                      {translations.store}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href={`/contactus`} legacyBehavior passHref>
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
