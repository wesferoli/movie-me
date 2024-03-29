import { IRouteParams } from "@/app/api/types";
import MoviePoster from "@/components/MovieDetails/MoviePoster";
import { ReviewController } from "@/services/controllers/review";
import generateRatingStars from "@/utils/rating";
import { Star } from "lucide-react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserReviewActions from "./UserReviewActions";
import { deleteReview } from "@/services/actions";

type ReviewDetailParams = {
  params: { reviewId: string };
} & IRouteParams;

export default async function ReviewDetail({ params }: ReviewDetailParams) {
  const session = await getServerSession(authOptions);
  const review = await ReviewController.find(params.reviewId).then(
    (resp) => resp.data
  );

  const userSessionId = session?.user?.id as string;
  const isUserReview = review.user.id === userSessionId;

  return (
    <div className="mx-4 my-8 max-w-[1136px] flex-grow rounded-lg border border-yellow-500 bg-neutral-700 p-2 sm:mx-10 sm:p-4 md:mx-10 md:p-10 lg:mx-24 lg:my-10 lg:p-10 xl:p-16">
      <div className="divide-y divide-yellow-500 md:flex md:gap-4 md:divide-none lg:gap-6">
        <section className="flex flex-col items-center md:w-1/4">
          <MoviePoster
            movieId={Number(params.id)}
            poster={review.movie.poster}
            session={session}
          />
          {isUserReview && (
            <UserReviewActions reviewId={params.reviewId} movieId={params.id} />
          )}
        </section>
        <section className="mt-2 w-full divide-y divide-yellow-500 md:mt-0">
          <div className="py-2 md:py-0 md:pb-2">
            <h1 className="text-center text-2xl font-bold text-yellow-500 drop-shadow-text md:text-left lg:text-3xl xl:text-4xl">
              {review.title}
            </h1>
            <div className="mt-1 flex items-center justify-between md:mt-2">
              <div className="flex items-center">
                <Image
                  alt="Reviewer image"
                  src={review.user.avatarUrl}
                  width={50}
                  height={50}
                  className="mr-1 h-7 w-7 rounded-full md:h-8 md:w-8"
                />
                <span className="text-sm text-zinc-400">
                  by {review.user.name}
                </span>
              </div>
              <div>
                <span className="flex items-center drop-shadow-text sm:hidden">
                  {/* Show on mobile (root) */}
                  <Star className="mr-1 h-[14px] w-[14px] fill-yellow-600 text-yellow-600" />
                  {review.rating}
                </span>
                {/* Show on desktop (sm >) */}
                <span className="hidden sm:flex">
                  {generateRatingStars(review.rating)}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(review.description),
              }}
            ></span>
          </div>
        </section>
      </div>
    </div>
  );
}
