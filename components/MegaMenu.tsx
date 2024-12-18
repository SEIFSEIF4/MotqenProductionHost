import ListItem from "./ListItem";

type MegaMenuProps = {
  items: {
    title: string;
    href: string;
    description: string;
    Icon: any;
  }[];
  isMobileMenu: boolean;
};

const MegaMenu = ({ items, isMobileMenu }: MegaMenuProps) => {
  return (
    <ul
      className={`grid w-full p-4 py-8 md:grid-cols-3 ${isMobileMenu && "gap-3 text-start"}`}
    >
      {items.map(({ title, href, description, Icon }) => (
        <ListItem
          key={title}
          title={title}
          href={href}
          description={description}
          Icon={Icon}
        />
      ))}
    </ul>
  );
};

export default MegaMenu;
