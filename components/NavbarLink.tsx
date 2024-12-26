import { Link } from "next-view-transitions";
import { useLocale } from "next-intl";

const NavbarLink = ({
  title,
  href,
  isMobileMenu,
  isExternal = false,
}: {
  title: string;
  href: string;
  isMobileMenu: boolean;
  isExternal?: boolean;
}) => {
  const locale = useLocale();

  return (
    <>
      {isExternal ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          className={
            isMobileMenu
              ? `group inline-flex h-9 w-max min-w-full items-center rounded-md bg-white px-2 py-8 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 xl:px-4 ${locale === "ar" ? "justify-end" : "justify-start"} text-gray-800`
              : `group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-2 py-8 text-lg font-medium transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[6px] after:w-[0%] after:-translate-x-1/2 after:rounded-full after:bg-[#6FA0A7] after:transition-all hover:bg-accent hover:text-accent-foreground hover:after:w-[80%] focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 xl:px-4`
          }
        >
          {title}
        </a>
      ) : (
        <Link
          href={`/${locale}${href}`}
          className={
            isMobileMenu
              ? `group inline-flex h-9 w-max min-w-full items-center rounded-md bg-white px-2 py-8 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 xl:px-4 ${locale === "ar" ? "justify-end" : "justify-start"} text-gray-800`
              : `group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-2 py-8 text-lg font-medium transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[6px] after:w-[0%] after:-translate-x-1/2 after:rounded-full after:bg-[#6FA0A7] after:transition-all hover:bg-accent hover:text-accent-foreground hover:after:w-[80%] focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 xl:px-4`
          }
        >
          {title}
        </Link>
      )}
    </>
  );
};

export default NavbarLink;
