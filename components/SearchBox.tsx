import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  MobileMenuContext,
  SearchBoxContext,
  type SearchBoxContextType,
} from "./Navbar";
import SearchBar from "./SearchBar";
import Search from "./icons/Search";

const SearchBox = ({ isOpen }: { isOpen: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setShowMobileMenu: Dispatch<SetStateAction<boolean>> | null =
    useContext(MobileMenuContext);
  const searchContext: SearchBoxContextType = useContext(SearchBoxContext);

  if (!setShowMobileMenu) {
    throw new Error("MobileMenuContext must be used within a provider");
  }

  if (!searchContext?.setShowSearchBox) {
    throw new Error("SearchBoxContext must be used within a provider");
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (params.has("q")) {
      params.delete("q");
      replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Trigger Buttons */}
      <button
        onClick={() => {
          searchContext.setShowSearchBox(!isOpen);
          setShowMobileMenu(false);
        }}
        className="relative items-center gap-2 rounded p-1 py-4 after:absolute after:bottom-0 after:left-1/2 after:h-[6px] after:w-[0%] after:-translate-x-1/2 after:rounded-full after:bg-[#6FA0A7] after:transition-all lg:flex lg:hover:after:w-[97%]"
        aria-label="Search"
      >
        <Search isMobileMenu={false} />
        <span className="hidden lg:block">{searchContext.title}</span>
      </button>

      {/* Search Box */}
      {isOpen && <SearchBar />}
    </>
  );
};

export default SearchBox;
