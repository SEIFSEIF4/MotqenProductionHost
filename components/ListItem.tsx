import { useContext, SetStateAction, Dispatch } from "react";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useLocale } from "next-intl";
import { MobileMenuContext } from "./Navbar";

type ListItemProps = {
  className?: string;
  title: string;
  href: string;
  description: string;
  Icon: any;
};

const ListItem = ({
  className,
  title,
  href,
  description,
  Icon,
}: ListItemProps) => {
  const locale = useLocale();
  const setShowMobileMenu: Dispatch<SetStateAction<boolean>> | null =
    useContext(MobileMenuContext);

  if (!setShowMobileMenu) {
    throw new Error("MobileMenuContext must be used within a provider");
  }

  return (
    <li>
      <Link
        href={`/${locale}${href}`}
        className="w-full"
        onClick={() => setShowMobileMenu(false)}
      >
        <div
          className={cn(
            `flex select-none ${
              locale === "ar" && "flex-row-reverse"
            } items-center gap-x-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`,
            className,
          )}
        >
          <div className="mx-1">
            <Icon />
          </div>
          <div className={locale === "ar" ? "text-right" : "text-left"}>
            <h4 className="text-base font-medium leading-none">{title}</h4>
            <p className="line-clamp-2 text-base leading-snug text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
