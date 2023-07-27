import { UserReviewList } from "@/services/controllers/user/types";
import generateRatingStars from "@/utils/rating";
import { Star } from "lucide-react";
import Link from "next/link";

interface MyReviewListProps {
  review: UserReviewList[number];
}

export default function MyReviewList({ review }: MyReviewListProps) {
  return (
    <Link
      href={`/movie/${review.movieId}/review/${review.id}`}
      className="flex items-center justify-between gap-2 py-2"
      key={review.id}
    >
      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
        {review.movieTitle}
      </span>
      <span className="flex items-center drop-shadow-text md:hidden">
        {/* Show on mobile (sm) */}
        <Star className="mr-1 h-[14px] w-[14px] fill-yellow-600 text-yellow-600" />
        {review.rating}
      </span>
      {/* Show on desktop (md >) */}
      <span className="hidden md:flex">
        {generateRatingStars(review.rating)}
      </span>
    </Link>
  );
}
