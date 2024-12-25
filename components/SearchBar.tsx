"use client";

import { Dispatch, SetStateAction } from "react";
import { useLocale } from "next-intl";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = ({
  setIsOpen,
  Search,
  title,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  Search: any;
  title: string;
}) => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="absolute left-1/2 top-full z-50 mx-auto w-full min-w-full max-w-base -translate-x-1/2 transform border border-gray-200 bg-white p-1 shadow-lg md:w-[70%] lg:mt-2 lg:w-[50%] lg:rounded-lg">
      <span
        className={`absolute ${locale === "ar" ? "left-[175px]" : "right-[175px]"} top-[-20px] m-0 hidden border-x-[19px] border-y-[11px] border-solid border-transparent border-b-white p-0 lg:inline`}
      />
      <div className="relative flex flex-col items-end lg:px-24">
        {/* Close Button */}
        <button
          className="hidden pt-8 text-2xl text-gray-600 hover:text-gray-900 lg:block"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <form
          className="relative flex w-full flex-col items-center px-4 py-8 lg:flex-row lg:space-x-8 lg:p-4 lg:pb-8 lg:pt-6 rtl:space-x-reverse"
          onSubmit={(e) => e.preventDefault()}
        >
          <div
            className={`relative ${locale === "ar" ? "left-1" : "right-1"} flex w-full items-center -space-x-4 pb-4 lg:-space-x-8 lg:py-6 rtl:space-x-reverse`}
          >
            <div
              className={`relative ${locale === "ar" ? "right-4 lg:right-0" : "left-4 lg:left-0"} z-50 inline-block aspect-square w-5 rounded-md object-cover`}
              aria-label="Search"
            >
              <Search isMobileMenu={true} />
            </div>
            <input
              type="text"
              placeholder={`${title}...`}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get("query")?.toString()}
              className="w-full flex-grow rounded-md border border-gray-300 px-12 py-2 focus:outline-none focus:ring-2 focus:ring-[#6FA0A7]"
            />
            <button
              type="reset"
              className={`relative ${locale === "ar" ? "left-4 lg:left-0" : "right-4 lg:right-0"} text-3xl text-gray-600 hover:text-gray-900`}
              onClick={() => {
                handleSearch("");
              }}
            >
              &times;
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#165C67] px-4 py-2 text-white lg:w-fit"
            onClick={() => {
              console.log("Don't try to touch me, baka hentai");
            }}
          >
            {title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
