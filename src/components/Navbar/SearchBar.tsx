"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      <button
        className="max-w-fit sm:hidden"
        onClick={() => setShowInput(!showInput)}
      >
        <Search className="h-6 w-6 text-gray-400" />
      </button>
      {/* Mobile search input */}
      {showInput && (
        <div className="absolute top-[100%] z-10 w-full items-center justify-center bg-yellow-500 px-4 py-1 text-sm sm:hidden">
          <input
            name="search"
            type="text"
            placeholder="Find by title or category"
            className="h-8 w-full justify-self-center rounded-full px-3 text-black placeholder:text-gray-200"
          />
        </div>
      )}

      {/* Default search input */}
      <div className="col-start-3 col-end-7 flex justify-center">
        <input
          name="search"
          type="text"
          placeholder="Find by title or category"
          className="hidden h-8 w-[80%] justify-self-center rounded-full px-4 text-sm text-black placeholder:text-gray-200 sm:inline md:h-10 md:text-base xl:w-2/3"
        />
      </div>
    </>
  );
}
