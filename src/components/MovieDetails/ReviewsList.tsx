import { api } from "@/lib/api";
import ReviewCard from "../ReviewCard";
import { ReviewList } from "@/app/api/review/types";
import Link from "next/link";
import { use } from "react";

interface IReviewsListProps {
  className?: string;
  movieId: number;
}

export default async function ReviewsList({
  className,
  movieId,
}: IReviewsListProps) {
  const { data: movieReviews } = await api
    .get<{ data: ReviewList }>(`/movie/${movieId}/review`)
    .then((resp) => resp.data);

  return (
    <div className={className}>
      {movieReviews.length > 0 ? (
        <>
          {movieReviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewId={review.id}
              movieId={movieId}
              userAvatar={review.user.avatarUrl}
              userName={review.user.name}
              rating={review.rating}
              title={review.title}
            />
          ))}
        </>
      ) : (
        <span className="drop-shadow-text">
          No reviews were made yet.{" "}
          <Link
            href={`/movie/${movieId}/review`}
            className="font-semibold text-yellow-600"
          >
            Add one yourself
          </Link>
          !
        </span>
      )}
    </div>
  );
}
