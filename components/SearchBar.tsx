"use client";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { client } from "@/sanity/lib/client";
import SearchResult from "@/components/SearchResult";
import { SearchBoxContext, type SearchBoxContextType } from "./Navbar";
import Search from "./icons/Search";

interface NewsItem {
  title: string;
  slug: { current: string };
  image: {
    asset: {
      url: string;
    };
  };
  shortDescription: string;
}

const SearchBar = () => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchContext: SearchBoxContextType = useContext(SearchBoxContext);

  if (!searchContext?.setShowSearchBox) {
    throw new Error("SearchBoxContext must be used within a provider");
  }

  const currentQuery = searchParams.get("q")?.toString() || "";

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["newsSearch", currentQuery],
    queryFn: async () => {
      if (!currentQuery) return [];

      const query = `*[_type == "news" && title match $searchQuery] | order(title desc)[0...10] {
        title,
        slug,
        shortDescription,
        image {
          asset-> {
            url
          }
        }
      }`;

      const params = {
        searchQuery: `*${currentQuery}*`,
      };

      return client.fetch<NewsItem[]>(query, params);
    },
    enabled: currentQuery.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const debouncedSearch = debounce((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleSearch = (term: string) => {
    debouncedSearch(term);
  };

  return (
    <div className="absolute left-1/2 top-full z-50 mx-auto w-full min-w-full max-w-base -translate-x-1/2 transform border border-gray-200 bg-white p-1 shadow-lg md:w-[70%] lg:mt-2 lg:w-[50%] lg:rounded-lg">
      <span
        className={`absolute ${
          locale === "ar" ? "left-[175px]" : "right-[175px]"
        } top-[-20px] m-0 hidden border-x-[19px] border-y-[11px] border-solid border-transparent border-b-white p-0 lg:inline`}
      />
      <div className="relative flex flex-col items-end lg:px-24">
        <button
          className="hidden pt-8 text-2xl text-gray-600 hover:text-gray-900 lg:block"
          onClick={() => searchContext.setShowSearchBox(false)}
        >
          &times;
        </button>

        <form
          className="relative flex w-full flex-col items-center px-4 py-8 lg:flex-row lg:space-x-8 lg:p-4 lg:pb-8 lg:pt-6 rtl:space-x-reverse"
          onSubmit={(e) => e.preventDefault()}
        >
          <div
            className={`relative ${
              locale === "ar" ? "left-1" : "right-1"
            } flex w-full items-center -space-x-4 pb-4 lg:-space-x-8 lg:py-6 rtl:space-x-reverse`}
          >
            <div
              className={`relative ${
                locale === "ar" ? "right-4 lg:right-0" : "left-4 lg:left-0"
              } z-50 inline-block aspect-square w-5 rounded-md object-cover`}
              aria-label="Search"
            >
              <Search isMobileMenu={true} />
            </div>
            <input
              type="text"
              placeholder={`${searchContext.title}...`}
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={currentQuery}
              className="w-full flex-grow rounded-md border border-gray-300 px-12 py-2 focus:outline-none focus:ring-2 focus:ring-[#6FA0A7]"
            />
            <button
              type="reset"
              className={`relative ${
                locale === "ar" ? "left-4 lg:left-0" : "right-4 lg:right-0"
              } text-3xl text-gray-600 hover:text-gray-900`}
              onClick={() => handleSearch("")}
            >
              &times;
            </button>
          </div>
          <button
            type="submit"
            className={`w-full rounded-md bg-[#165C67] px-4 py-2 text-white ${isLoading ? "lg:w-[150px]" : "lg:w-fit"}`}
            disabled={isLoading}
          >
            {isLoading ? searchContext.loadingTitle : searchContext.title}
          </button>
        </form>

        {/* Search Results */}
        <SearchResult
          searchResults={searchResults || []}
          currentQuery={currentQuery}
        />
      </div>
    </div>
  );
};

export default SearchBar;
