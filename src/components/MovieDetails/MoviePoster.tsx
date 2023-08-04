"use client";

import generateRatingStars from "@/utils/rating";
import { Plus } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { redirect } from "next/navigation";

interface IMoviePosterProps {
  poster: {
    src: string | null;
    base64: string;
  };
  movieRating?: number | null;
  movieId: number;
  session: Session | null;
}

export default function MoviePoster({
  poster,
  movieRating,
  movieId,
  session,
}: IMoviePosterProps) {
  const router = useRouter();

  function handleNavigation(session: Session | null, movieId: number) {
    if (!session) {
      signIn("github");
    } else {
      router.push(`/movie/${movieId}/review`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center md:justify-start">
      <Image
        className="max-w-[160px] shadow-poster md:w-full md:max-w-[200px] xl:max-w-[225px] 2xl:max-w-[250px]"
        alt="Movie image"
        src={poster?.src || "/default-image.png"}
        placeholder="blur"
        blurDataURL={poster.base64}
        width={225}
        height={340}
      />
      {!!movieRating && (
        <div className="mt-2 flex items-center justify-center">
          {generateRatingStars(movieRating)}
          <span className="ml-1 text-center text-sm font-medium lg:text-base">
            {movieRating.toFixed(2)}
          </span>
        </div>
      )}
      <Button
        onClick={() => handleNavigation(session, movieId)}
        icon={
          <Plus className="mr-2 h-4 w-4 text-center text-sm lg:text-base" />
        }
        className="mt-2 min-w-[160px]"
        variant="primary"
      >
        Adicionar review
      </Button>
    </div>
  );
}
