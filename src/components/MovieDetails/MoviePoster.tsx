"use client";

import generateRatingStars from "@/utils/rating";
import { Plus } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface IMoviePosterProps {
  posterUrl: string;
  movieRating: number | null;
  movieId: number;
  session: Session | null;
}

function handleNavigation(
  movieId: number,
  router: AppRouterInstance,
  session?: Session | null
) {
  if (session) {
    return router.push(`/movie/${movieId}/review`);
  }
  return signIn("github");
}

export default function MoviePoster({
  posterUrl,
  movieRating,
  movieId,
  session,
}: IMoviePosterProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center md:justify-start">
      <Image
        className="max-w-[160px] md:w-full md:max-w-[200px] xl:max-w-[225px] 2xl:max-w-[250px]"
        alt="Movie image"
        src={posterUrl}
        width={500}
        height={600}
      />
      {!!movieRating && (
        <div className="mt-2 flex items-center justify-center">
          {generateRatingStars(movieRating)}
          <span className="text-center text-sm font-medium lg:text-base">
            - {movieRating.toFixed(2)}
          </span>
        </div>
      )}
      <Button
        onClick={() => handleNavigation(movieId, router, session)}
        icon={
          <Plus className="mr-2 h-4 w-4 text-center text-sm lg:text-base" />
        }
        className="mt-2 min-w-[160px]"
        variant="primary"
      >
        Add review
      </Button>
    </div>
  );
}
