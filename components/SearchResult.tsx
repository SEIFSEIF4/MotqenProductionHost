import { useContext } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { SearchBoxContext, type SearchBoxContextType } from "./Navbar";

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

const SearchResult = ({
  searchResults,
  currentQuery,
}: {
  searchResults: NewsItem[];
  currentQuery: string;
}) => {
  const searchContext: SearchBoxContextType = useContext(SearchBoxContext);

  if (!searchContext?.setShowSearchBox) {
    throw new Error("SearchBoxContext must be used within a provider");
  }

  return (
    <>
      {searchResults && searchResults.length > 0 && (
        <div className="mt-4 max-h-[500px] w-full space-y-4 overflow-y-auto px-4">
          {searchResults.map((item) => (
            <Link
              href={`/news/${item.slug.current}`}
              key={item.slug.current}
              className="mb-3 flex items-start gap-10 space-x-4 rounded-lg border p-4 hover:bg-gray-50"
              onClick={() => searchContext.setShowSearchBox(false)}
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
          {searchContext.noResultsMessage} &ldquo;{currentQuery}&rdquo;
        </div>
      )}
    </>
  );
};

export default SearchResult;
