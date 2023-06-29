import { IRouteParams } from "@/app/api/types";
import { api } from "@/lib/api";
import MovieInfo from "@/components/MovieDetails/MovieInfo";
import MoviePoster from "@/components/MovieDetails/MoviePoster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ReviewsList from "@/components/MovieDetails/ReviewsList";
import { ReviewList } from "@/app/api/review/types";
import { getMovieDetails } from "@/services/api/movie";

export default async function MovieDetails({ params }: IRouteParams) {
  const session = await getServerSession(authOptions);

  const { data: movie } = await getMovieDetails(params.id);
  const { data: movieReviews } = await api
    .get<{ data: ReviewList }>(`/movie/${params.id}/review`)
    .then((resp) => resp.data);

  return (
    <div className="mx-4 my-8 max-w-[1136px] rounded-lg border border-yellow-500 bg-neutral-700 p-2 md:mx-10 md:grid md:grid-cols-12 md:gap-x-4 md:p-4 lg:mx-24 lg:my-10 lg:p-10 xl:gap-x-8 xl:p-16">
      {/* Movie poster */}
      <section className="border-b-2 border-yellow-500 pb-3 md:col-span-3 md:border-none md:pb-4">
        <MoviePoster
          movieId={movie.id}
          posterUrl={movie.poster}
          movieRating={movie.rating}
          session={session}
        />
      </section>
      {/* Movie details */}
      <section className="my-3 md:col-span-9 md:mb-4 md:mt-0">
        <MovieInfo
          title={movie.title}
          overview={movie.overview}
          releaseYear={movie.releaseYear}
          genres={movie.genres}
          cast={movie.cast}
          crew={movie.crew}
        />
      </section>
      {/* Reviews list */}
      <section className="border-t-2 border-yellow-500 pt-2 md:col-span-12 md:pt-3">
        <h2 className="border-b border-yellow-400 pb-2 text-xl font-bold text-yellow-500 drop-shadow-text md:pb-3 lg:text-2xl">
          Reviews
        </h2>
        <ReviewsList
          movieId={movie.id}
          movieReviews={movieReviews}
          className="mt-2"
        />
      </section>
    </div>
  );
}
