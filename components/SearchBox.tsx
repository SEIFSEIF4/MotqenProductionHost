import Image from "next/image";
import { useState } from "react";

const SearchBox = ({
  Search,
  locale,
  title,
  isOpen,
  setIsOpen,
  setShowMobileMenu,
}: {
  Search: any;
  locale: string;
  title: string;
  isOpen: boolean;
  setIsOpen: any;
  setShowMobileMenu: any;
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      {/* Trigger Buttons */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowMobileMenu(false);
        }}
        className="items-center gap-2 rounded p-1 hover:text-blue-500 lg:flex"
      >
        <Image
          src={Search}
          alt="Search"
          className="inline-block aspect-square w-5 rounded-md object-cover"
        />
        <span className="hidden lg:block">{title}</span>
      </button>

      {/* Search Box */}
      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 mx-auto mt-2 w-full min-w-full max-w-base -translate-x-1/2 transform rounded-lg border border-gray-200 bg-white p-1 shadow-lg md:w-[70%] lg:w-[50%]">
          <div className="relative flex flex-col items-end lg:px-24">
            {/* Close Button */}
            <button
              className="hidden pt-8 text-2xl text-gray-600 hover:text-gray-900 lg:block"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

            <div className="relative flex w-full flex-col items-center px-4 py-8 lg:flex-row lg:space-x-8 lg:p-4 lg:pb-8 lg:pt-6 rtl:space-x-reverse">
              <div
                className={`relative ${locale === "ar" ? "left-1" : "right-1"} flex w-full items-center -space-x-4 pb-4 lg:-space-x-8 lg:py-6 rtl:space-x-reverse`}
              >
                <Image
                  src={Search}
                  alt="Search"
                  className={`relative ${locale === "ar" ? "right-4 lg:right-0" : "left-4 lg:left-0"} z-50 inline-block aspect-square w-5 rounded-md object-cover`}
                />
                <input
                  type="text"
                  placeholder={`${title}...`}
                  onChange={(e) => setSearchValue((prev) => e.target.value)}
                  value={searchValue}
                  className="w-full flex-grow rounded-md border border-gray-300 px-12 py-2 focus:outline-none focus:ring-2 focus:ring-[#6FA0A7]"
                />
                <button
                  type="reset"
                  className={`relative ${locale === "ar" ? "left-4 lg:left-0" : "right-4 lg:right-0"} text-2xl text-gray-600 hover:text-gray-900`}
                  onClick={() => setSearchValue("")}
                >
                  &times;
                </button>
              </div>
              <button className="w-full rounded-md bg-[#165C67] px-4 py-2 text-white lg:w-fit">
                {title}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBox;
