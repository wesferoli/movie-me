import {
  IMovieDetailsCast,
  IMovieDetailsCrew,
  IMovieDetailsGenres,
} from "@/services/controllers/movie/types";

interface IMovieInfoProps {
  title: string;
  releaseYear: string | null;
  genres: IMovieDetailsGenres;
  overview: string;
  cast: IMovieDetailsCast;
  crew: IMovieDetailsCrew;
}

export default function MovieInfo({
  title,
  releaseYear,
  genres,
  overview,
  cast,
  crew,
}: IMovieInfoProps) {
  return (
    <div className="space-y-2 divide-y divide-yellow-400 md:space-y-3">
      {/* Title and genres */}
      <div>
        <h1 className="text-center text-2xl font-bold text-yellow-500 drop-shadow-text md:text-left lg:text-3xl xl:text-4xl">
          {title}
        </h1>
        <div className="mt-2 flex items-center justify-center divide-x divide-yellow-400 text-xs font-semibold drop-shadow-text md:mt-1 md:justify-start md:text-sm">
          <span className="pr-2">{releaseYear}</span>
          <span className="pl-2">
            {genres.map((genre) => genre.name).join(", ")}
          </span>
        </div>
      </div>
      {/* Description */}
      <div className="pt-2 md:pt-3">
        <p className="text-sm text-neutral-50 drop-shadow-text lg:text-base">
          {overview}
        </p>
      </div>
      {/* Cast and crew */}
      <div className="space-y-1 pt-2 drop-shadow-text md:pt-3">
        <div className="space-y-1">
          <b className="font-semibold text-yellow-600">Elenco</b>
          <p className="text-sm text-neutral-50 lg:text-base">
            {cast.map((cast) => cast.name).join(", ")}
          </p>
        </div>
        <div className="space-y-1">
          <b className="font-semibold text-yellow-600">Equipe</b>
          <p className="text-sm text-neutral-50 lg:text-base">
            {crew.map((crew) => crew.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
