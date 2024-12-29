import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { MobileMenuContext } from "./Navbar";
import SearchBar from "./SearchBar";

const SearchBox = ({
  Search,
  title,
  loadingTitle,
  noResultsMessage,
  isOpen,
  setIsOpen,
}: {
  Search: any;
  title: string;
  loadingTitle: string;
  noResultsMessage: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const setShowMobileMenu: Dispatch<SetStateAction<boolean>> | null =
    useContext(MobileMenuContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  if (!setShowMobileMenu) {
    throw new Error("MobileMenuContext must be used within a provider");
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (params.has("query")) {
      params.delete("query");
      replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  return (
    <>
      {/* Trigger Buttons */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowMobileMenu(false);
        }}
        className="relative items-center gap-2 rounded p-1 py-4 after:absolute after:bottom-0 after:left-1/2 after:h-[6px] after:w-[0%] after:-translate-x-1/2 after:rounded-full after:bg-[#6FA0A7] after:transition-all lg:flex lg:hover:after:w-[97%]"
        aria-label="Search"
      >
        <Search isMobileMenu={false} />
        <span className="hidden lg:block">{title}</span>
      </button>

      {/* Search Box */}
      {isOpen && (
        <SearchBar
          setIsOpen={setIsOpen}
          Search={Search}
          title={title}
          loadingTitle={loadingTitle}
          noResultsMessage={noResultsMessage}
        />
      )}
    </>
  );
};

export default SearchBox;
