import { Link } from "next-view-transitions";
import { useLocale } from "next-intl";

const NavbarLink = ({
  title,
  href,
  isMobileMenu,
}: {
  title: string;
  href: string;
  isMobileMenu: boolean;
}) => {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}${href}`}
      className={
        isMobileMenu
          ? `group inline-flex h-9 w-max min-w-full items-center rounded-md bg-background px-4 py-8 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${locale === "ar" ? "justify-end" : "justify-start"} text-gray-800`
          : `group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground hover:text-blue-500 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`
      }
    >
      {title}
    </Link>
  );
};

export default NavbarLink;
