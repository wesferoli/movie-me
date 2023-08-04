"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { MovieList } from "@/services/controllers/movie/types";
import MovieSearchList from "./MovieSearchList";

export default function SearchBar() {
  const [showInput, setShowInput] = useState(false);
  const [movieSearch, setMovieSearch] = useState<{
    search: string;
    movieList: MovieList;
  }>({ search: "", movieList: [] });

  const handleSearch = useCallback(async (query: string) => {
    if (query) {
      const movieList: MovieList = await api
        .get(`/movie/search?query=${query}`)
        .then((resp) => resp.data);

      setMovieSearch((state) => ({ search: state.search, movieList }));
    } else {
      closeMovieSearch({ search: "", movieList: [] });
    }
  }, []);

  function closeMovieSearch(newState?: {
    search: string;
    movieList: MovieList;
  }) {
    const closeMovieDelayFn = setTimeout(() => {
      setMovieSearch(
        (state) => newState || { search: state.search, movieList: [] }
      );
    }, 500);

    return () => clearTimeout(closeMovieDelayFn);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setMovieSearch((state) => ({
      search: event.target.value,
      movieList: state.movieList,
    }));
  }

  useEffect(() => {
    const searchDelayFn = setTimeout(() => {
      handleSearch(movieSearch.search);
    }, 500);

    return () => clearTimeout(searchDelayFn);
  }, [movieSearch.search, handleSearch]);

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
            placeholder="Procure um título"
            className="h-8 w-full justify-self-center rounded-full px-3 text-black placeholder:text-gray-200 focus:border-2 focus:border-gray-200 focus:outline-none"
            onChange={onChange}
            onBlur={() => closeMovieSearch()}
            value={movieSearch.search}
          />
        </div>
      )}

      {/* Default search input */}
      <div className="relative col-start-3 col-end-7 hidden justify-center sm:order-2 sm:flex">
        <input
          name="search"
          type="text"
          placeholder="Procure um título"
          className="hidden h-8 w-[80%] justify-self-center rounded-full px-4 text-sm text-black placeholder:text-gray-200 focus:border-2 focus:border-gray-200 focus:outline-none sm:inline md:h-10 md:text-base xl:w-2/3"
          onChange={onChange}
          onBlur={() => closeMovieSearch()}
          value={movieSearch.search}
          disabled={showInput}
        />
      </div>

      {movieSearch.movieList.length ? (
        <MovieSearchList
          movieList={movieSearch.movieList}
          className="absolute top-20 z-10 max-h-[40vh] w-full justify-self-center sm:top-10 sm:w-[50%] md:top-14 lg:w-[40%]"
        />
      ) : null}
    </>
  );
}
