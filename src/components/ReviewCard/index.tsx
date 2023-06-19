import generateRatingStars from "@/utils/rating";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IReviewCardProps {
  reviewId: string;
  movieId: number;
  userAvatar: string;
  userName: string;
  title: string;
  rating: number;
}

export default function ReviewCard({
  reviewId,
  movieId,
  userAvatar,
  userName,
  title,
  rating,
}: IReviewCardProps) {
  return (
    <Link href={`/movie/${movieId}/review/${reviewId}`}>
      <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-yellow-500 px-1 py-2 text-sm md:px-3 lg:text-base">
        <div className="flex items-center">
          <Image
            src={userAvatar}
            alt="Reviewer image"
            height={50}
            width={50}
            className="h-8 w-8 rounded-full"
          />
          <span className="ml-2 hidden overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold text-yellow-600 drop-shadow-text md:inline">
            {userName}
          </span>
        </div>

        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap drop-shadow-text">
          {title}
        </span>
        <span className="flex items-center drop-shadow-text md:hidden">
          {/* Show on mobile (sm) */}
          <Star className="mr-1 h-[14px] w-[14px] fill-yellow-600 text-yellow-600" />
          {rating}
        </span>
        {/* Show on desktop (md >) */}
        <span className="hidden md:flex">{generateRatingStars(rating)}</span>
      </div>
    </Link>
  );
}
