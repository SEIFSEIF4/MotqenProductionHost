import ListItem from "./ListItem";

type MegaMenuProps = {
  items: {
    title: string;
    href: string;
    description: string;
    IconSrc: any;
    iconAlt: string;
  }[];
  isMobileMenu: boolean;
};

const MegaMenu = ({ items, isMobileMenu }: MegaMenuProps) => {
  return (
    <ul
      className={`grid w-full p-4 py-8 md:grid-cols-3 ${isMobileMenu && "gap-3 text-start"}`}
    >
      {items.map(({ title, href, description, IconSrc, iconAlt }) => (
        <ListItem
          key={title}
          title={title}
          href={href}
          description={description}
          IconSrc={IconSrc}
          iconAlt={iconAlt}
        />
      ))}
    </ul>
  );
};

export default MegaMenu;
