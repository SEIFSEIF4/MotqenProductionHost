import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useLocale } from "next-intl";

type ListItemProps = {
  className?: string;
  title: string;
  href: string;
  description: string;
  IconSrc: any;
  iconAlt: string;
};

const ListItem = ({
  className,
  title,
  href,
  description,
  IconSrc,
  iconAlt,
}: ListItemProps) => {
  const locale = useLocale();

  return (
    <li>
      <Link href={`/${locale}${href}`} className="w-full">
        <div
          className={cn(
            `flex select-none ${
              locale === "ar" && "flex-row-reverse"
            } items-center gap-x-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`,
            className,
          )}
        >
          <div>
            <Image
              src={IconSrc}
              alt={iconAlt}
              className="mx-1 aspect-square w-5 rounded-md object-cover"
            />
          </div>
          <div className={locale === "ar" ? "text-right" : "text-left"}>
            <h4 className="text-sm font-medium leading-none">{title}</h4>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
