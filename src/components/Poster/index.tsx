import Image from "next/image";
import Link from "next/link";

export interface IPosterProps {
  posterUrl: string;
  title: string;
  releaseYear: string;
  movieId: number;
}

export default function Poster({
  posterUrl,
  title,
  releaseYear,
  movieId,
}: IPosterProps) {
  return (
    <div className="relative w-max shadow-poster">
      <Link href={`/movie/${movieId}`}>
        <Image
          className="min-w-[160px] max-w-[210px] md:max-w-[230px]"
          alt={title}
          src={posterUrl}
          width={230}
          height={345}
        />
        <div className="absolute bottom-0 h-full w-full bg-gradientYellow transition delay-100 ease-in-out hover:opacity-100 md:opacity-0">
          <div className="absolute bottom-4 left-3 right-3">
            <h1 className="text-base font-bold drop-shadow-text lg:text-lg">
              {title}
            </h1>
            <p className="text-xs font-semibold text-zinc-300 drop-shadow-text lg:text-sm">
              {releaseYear}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
