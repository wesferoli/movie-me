import { Star, StarHalf } from "lucide-react";
import { ReactElement } from "react";

export default function generateRatingStars(rating: number) {
  const ratingStars: ReactElement[] = [];

  for (let i = 0; i < rating; i++) {
    if (rating - i >= 1) {
      ratingStars.push(
        <Star
          className="mr-0.5 h-5 w-5 fill-yellow-600 text-yellow-600"
          key={i}
          data-testid="full-star"
        />
      );
    } else {
      ratingStars.push(
        <StarHalf
          className="mr-1 h-5 w-5 fill-yellow-600 text-yellow-600"
          key={i}
          data-testid="half-star"
        />
      );
    }
  }

  return ratingStars;
}
