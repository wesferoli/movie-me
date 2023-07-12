import { MovieList } from "@/app/api/movie/types";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "public/default-image.png";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface MovieSearchListProps extends ComponentProps<"div"> {
  movieList: MovieList;
}

export default function MovieSearchList({
  movieList,
  ...rest
}: MovieSearchListProps) {
  return (
    <div
      {...rest}
      className={twMerge([
        "divide-y overflow-y-scroll rounded-b-md border border-t-0 border-zinc-400 bg-neutral-700 px-4 sm:rounded-lg sm:border-t",
        rest.className,
      ])}
    >
      {movieList.map((movie) => {
        return (
          <Link
            href={`/movie/${movie.id}`}
            className="m-2 flex items-center border-yellow-400 pt-2 drop-shadow-text"
            key={movie.id}
          >
            <Image
              alt={movie.title}
              src={movie.poster.src || "/default-image.png"}
              width={100}
              height={150}
              placeholder="blur"
              blurDataURL={movie.poster.base64 || "/default-image.png"}
              className="mr-3 w-[50px] rounded-[4px] lg:w-[65px]"
            />
            <div>
              <span className="block text-sm font-bold text-neutral-50 lg:text-base">
                {movie.title}
              </span>
              <span className="block text-xs font-semibold text-zinc-300 lg:text-sm">
                {movie.releaseYear}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
