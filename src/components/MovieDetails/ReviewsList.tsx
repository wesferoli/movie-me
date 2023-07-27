import { ReviewList } from "@/services/controllers/review/types";
import ReviewCard from "../ReviewCard";
import Link from "next/link";

export interface IReviewsListProps {
  movieId: number;
  movieReviews: ReviewList;
  className?: string;
}

export default function ReviewsList({
  className,
  movieId,
  movieReviews,
}: IReviewsListProps) {
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
              data-testid="review-card"
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
