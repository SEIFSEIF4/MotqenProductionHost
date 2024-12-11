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
import Translate from "@/images/translate.png";
import Search from "@/images/search.png";
import Logo from "@/images/logo.png";
import { navbarMegaMenu } from "@/constant/common";

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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="flex items-center space-x-2 text-gray-700">
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

// ===========================================================
// ===========================================================
// ===========================================================

export default function Navbar({ translations }: NavbarProps) {
  const pathname = usePathname();
  const isArabic = pathname === "ar";
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  console.log(pathname); // "/"

  return (
    <header className="shadow-md">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        {/* Left: Logo */}
        <div>
          <Image src={Logo} alt="Logo" className="w-12 object-contain" />
        </div>

        {/* Middle: Navigation Links */}
        <nav className="hidden md:flex md:flex-1">
          <DirectionProvider dir="rtl">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-800 hover:text-blue-500">
                    {translations.aboutUs}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 top-full mt-2 rounded-md bg-white p-4 shadow-lg">
                    <ul className="flex space-x-6">
                      <li className="flex items-center space-x-2 text-gray-700">
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
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-800 hover:text-blue-500">
                    {translations.programsAndPaths}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* Add content for programs and paths */}
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    href={`/news`}
                  >
                    {translations.associationNews}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    href={`/store`}
                  >
                    {translations.store}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-800 hover:text-blue-500`}
                    href={`/contactus`}
                  >
                    {translations.contactUs}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </DirectionProvider>
        </nav>

        {/* Right: Search & Language */}
        <div className="flex w-40 items-center justify-between space-x-4">
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

            <button className="rounded p-1 hover:text-blue-500">بحث</button>
          </div>

          {/* Language Switch */}
          {isArabic ? (
            <Link href={`/en`}>
              <Image
                src={Translate}
                alt="Translate"
                className="inline-block aspect-square w-5 rounded-md object-cover"
              />

              <button className="rounded p-1 hover:text-blue-500">
                English
              </button>
            </Link>
          ) : (
            <Link href={`/ar`}>
              <Image
                src={Translate}
                alt="Translate"
                className="inline-block aspect-square w-5 rounded-md object-cover"
              />

              <button className="rounded p-1 hover:text-blue-500">
                العربية
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="rounded border px-3 py-1 hover:bg-blue-100 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Submenu */}
      <div className="hidden bg-white px-6 py-3 md:flex">
        <ul className="flex space-x-6">
          <li className="flex items-center space-x-2 text-gray-700">
            <span className="material-icons">gavel</span>
            <span>الحوكمة</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <span className="material-icons">group</span>
            <span>أعضاء مجلس الإدارة</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <span className="material-icons">foundation</span>
            <span>تأسيس الجمعية</span>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="bg-white p-4 shadow-md md:hidden">
          <ul className="space-y-4">
            <li>
              <a href="#" className="block text-gray-800 hover:text-blue-500">
                عن متقن
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-800 hover:text-blue-500">
                برامج ومسارات
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-800 hover:text-blue-500">
                متجر التبرعات
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-800 hover:text-blue-500">
                أخبار الجمعية
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-800 hover:text-blue-500">
                تواصل معنا
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
