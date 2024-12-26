"use client";

import { Dispatch, SetStateAction } from "react";
import { useLocale } from "next-intl";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { client } from "@/sanity/lib/client";
import { Link } from "next-view-transitions";
import Image from "next/image";

interface SearchBarProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  Search: any;
  title: string;
  loadingTitle: string;
  noResultsMessage: string;
}

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

const SearchBar = ({
  setIsOpen,
  Search,
  title,
  loadingTitle,
  noResultsMessage,
}: SearchBarProps) => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentQuery = searchParams.get("query")?.toString() || "";

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
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

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
          onClick={() => setIsOpen(false)}
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
              placeholder={`${title}...`}
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
            {isLoading ? loadingTitle : title}
          </button>
        </form>

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && (
          <div className="mt-4 max-h-[500px] w-full space-y-4 overflow-y-auto px-4">
            {searchResults.map((item: NewsItem) => (
              <Link
                href={`/news/${item.slug.current}`}
                key={item.slug.current}
                className="mb-3 flex items-start gap-10 space-x-4 rounded-lg border p-4 hover:bg-gray-50"
              >
                {item.image?.asset?.url && (
                  <Image
                    src={item.image.asset.url}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                )}
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {searchResults && searchResults.length === 0 && currentQuery && (
          <div className="mt-4 w-full p-4 text-center text-gray-500">
            {noResultsMessage} &ldquo;{currentQuery}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
