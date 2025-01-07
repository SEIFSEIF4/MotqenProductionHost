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
  // Dynamically determine the grid column class
  const gridColsClass =
    items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <ul
      className={`grid w-full p-4 py-8 ${gridColsClass} ${isMobileMenu && "gap-3 text-start"}`}
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
