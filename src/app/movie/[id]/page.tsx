import { IMovieDetails } from "@/app/api/movie/[id]/types";
import { IRouteParams } from "@/app/api/types";
import { api } from "@/lib/api";
import Image from "next/image";
import { Plus, Star, StarHalf } from "lucide-react";
import { ReactElement } from "react";
import Link from "next/link";

function generateRatingStars(rating: number) {
  const ratingStars: ReactElement[] = [];

  for (let i = 0; i < rating; i++) {
    if (rating - i >= 1) {
      ratingStars.push(
        <Star className="mr-0.5 h-5 w-5 fill-yellow-600 text-yellow-600" />
      );
    } else {
      ratingStars.push(
        <StarHalf className="mr-1 h-5 w-5 fill-yellow-600 text-yellow-600" />
      );
    }
  }

  return ratingStars;
}

export default async function MovieDetails({ params }: IRouteParams) {
  const { id } = params;
  const { data: movie } = await api
    .get<{ data: IMovieDetails }>(`/movie/${params.id}`)
    .then((resp) => resp.data);

  const rating = 5;

  return (
    <div className="mx-4 my-8 rounded-lg border border-yellow-500 bg-neutral-700 p-2">
      {/* Movie poster */}
      <section className="flex flex-col items-center justify-center border-b-2 border-yellow-500 pb-3">
        <Image
          className="max-w-[160px]"
          alt="Movie image"
          src={movie.poster}
          width={500}
          height={600}
        />
        <div className="mt-2 flex items-center justify-center">
          {generateRatingStars(rating)}
          <span className="text-center text-sm font-medium">
            - {rating.toFixed(2)}
          </span>
        </div>
        <Link
          href=""
          className="mt-2 flex min-w-[160px] items-center justify-center rounded-full border border-black bg-yellow-600 p-2 text-center font-medium text-black"
        >
          <Plus className="mr-2 h-4 w-4 text-center text-sm" /> Add review
        </Link>
      </section>
      {/* Movie details */}
      <section className="my-3 space-y-2 divide-y divide-yellow-400">
        {/* Title and genres */}
        <div>
          <h1 className="text-center text-2xl font-bold text-yellow-500 drop-shadow-text">
            {movie.title}
          </h1>
          <div className="mt-2 flex items-center justify-center divide-x divide-yellow-400 text-xs font-semibold drop-shadow-text">
            <span className="pr-2">{movie.releaseYear}</span>
            <span className="pl-2">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </span>
          </div>
        </div>
        {/* Description */}
        <div className="pt-2">
          <p className="text-sm text-neutral-50 drop-shadow-text">
            {movie.overview}
          </p>
        </div>
        {/* Cast and crew */}
        <div className="space-y-1 pt-2 drop-shadow-text">
          <div className="space-y-1">
            <b className="font-semibold text-yellow-600">Cast</b>
            <p className="text-sm text-neutral-50">
              {movie.cast.map((cast) => cast.name).join(", ")}
            </p>
          </div>
          <div className="space-y-1">
            <b className="font-semibold text-yellow-600">Crew</b>
            <p className="text-sm text-neutral-50">
              {movie.crew.map((crew) => crew.name).join(", ")}
            </p>
          </div>
        </div>
      </section>
      {/* Reviews list */}
      <section className="border-t-2 border-yellow-500 pt-2">
        <h2 className="border-b border-yellow-400 pb-2 text-xl font-bold text-yellow-500 drop-shadow-text">
          Reviews
        </h2>
        <div className="mt-2">
          <Link href="">
            <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-yellow-500 px-1 py-2 text-sm">
              <Image
                src="https://avatars.githubusercontent.com/wesferoli.png"
                alt="Reviewer image"
                height={50}
                width={50}
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden font-semibold text-yellow-600 drop-shadow-text">
                Wesley Ferreira
              </span>
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap drop-shadow-text">
                Simplesmente o maior filme que eu ainda não assisti.
              </span>
              <span className="flex items-center drop-shadow-text">
                3.5{" "}
                <Star className="ml-1 h-[14px] w-[14px] fill-yellow-600 text-yellow-600" />
              </span>
              <span className="hidden">{generateRatingStars(3.2)}</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
