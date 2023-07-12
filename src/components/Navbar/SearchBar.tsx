"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { MovieList } from "@/app/api/movie/types";
import MovieSearchList from "./MovieSearchList";

export default function SearchBar() {
  const [showInput, setShowInput] = useState(false);
  const [movieSearch, setMovieSearch] = useState<{
    search: string;
    movieList: MovieList;
  }>({ search: "", movieList: [] });

  const handleSearch = useCallback(
    async (query: string) => {
      if (movieSearch.search) {
        const { data: movieList } = await api
          .get<{ data: MovieList }>("/movie/search", { params: { query } })
          .then((resp) => resp.data);

        setMovieSearch((state) => ({ search: state.search, movieList }));
      } else {
        closeMovieSearch({ search: "", movieList: [] });
      }
    },
    [movieSearch.search]
  );

  function closeMovieSearch(newState?: {
    search: string;
    movieList: MovieList;
  }) {
    setMovieSearch(
      (state) => newState || { search: state.search, movieList: [] }
    );
  }

  useEffect(() => {
    handleSearch(movieSearch.search);
  }, [movieSearch.search, handleSearch]);

  useEffect(() => {
    closeMovieSearch({ search: "", movieList: [] });
  }, [showInput]);

  return (
    <>
      <button
        className="order-1 col-start-1 col-end-2 max-w-fit sm:hidden"
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
            placeholder="Search a title"
            className="h-8 w-full justify-self-center rounded-full px-3 text-black placeholder:text-gray-200"
            onChange={(e) =>
              setMovieSearch((state) => ({
                search: e.target.value,
                movieList: state.movieList,
              }))
            }
            value={movieSearch.search}
            onFocus={() => handleSearch(movieSearch.search)}
          />
        </div>
      )}

      {/* Default search input */}
      <div className="relative col-start-3 col-end-7 hidden justify-center sm:order-2 sm:flex">
        <input
          name="search"
          type="text"
          placeholder="Search a title"
          className="hidden h-8 w-[80%] justify-self-center rounded-full px-4 text-sm text-black placeholder:text-gray-200 sm:inline md:h-10 md:text-base xl:w-2/3"
          onChange={(e) =>
            setMovieSearch((state) => ({
              search: e.target.value,
              movieList: state.movieList,
            }))
          }
          value={movieSearch.search}
          onFocus={() => handleSearch(movieSearch.search)}
          disabled={showInput}
        />
      </div>

      {movieSearch.movieList.length ? (
        <MovieSearchList
          movieList={movieSearch.movieList}
          onClick={() => closeMovieSearch()}
          className="absolute top-20 z-10 max-h-[40vh] w-full justify-self-center sm:top-10 sm:w-[50%] md:top-14 lg:w-[40%]"
        />
      ) : null}
    </>
  );
}
