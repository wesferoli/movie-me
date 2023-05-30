import Image from "next/image";
import Link from "next/link";

interface IPosterProps {
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
    <div className="relative w-max shadow-[0_0_15px_-3px] shadow-yellow-500">
      <Link href={`/movie/${movieId}`}>
        <Image
          className="min-w-[160px] max-w-[210px] md:max-w-[230px]"
          alt={title}
          src={posterUrl}
          width={500}
          height={750}
        />
        <div className="absolute bottom-0 h-full w-full transition delay-100 ease-in-out hover:opacity-100 md:opacity-0">
          <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[rgba(248,217,139,1)] to-[rgba(0,0,0,0)]">
            <div className="absolute bottom-4 left-3 right-3">
              <h1 className="text-base font-bold text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.75)] lg:text-lg">
                {title}
              </h1>
              <p className="text-xs font-semibold text-zinc-300 drop-shadow-[0_0_5px_rgba(0,0,0,0.75)] lg:text-sm">
                {releaseYear}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
