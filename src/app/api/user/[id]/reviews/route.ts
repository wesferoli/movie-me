import { MDBMovieDetails } from "@/app/api/movie/[id]/types";
import { IRouteParams } from "@/app/api/types";
import { movieDBApi } from "@/lib/api";
import prisma from "@/lib/prisma";
import { errorHandler } from "@/middleware/api/errorHandler";
import { NextResponse } from "next/server";
import { userReviewsListSchema } from "./schema";

export async function GET(request: Request, { params }: IRouteParams) {
  try {
    const { id: userId } = params;
    if (!userId) throw new Error("Unable to find user");

    const userReviews = await prisma.review.findMany({ where: { userId } });

    await Promise.all(
      userReviews.map(async (review) => {
        const movie = await movieDBApi.get<MDBMovieDetails>(
          `/movie/${review.movieId}`
        );

        Object.assign(review, {
          movieTitle: movie.data.title,
        });

        return review;
      })
    );

    const parsedUserReviews = userReviewsListSchema.parse(userReviews);

    return NextResponse.json({ data: parsedUserReviews });
  } catch (error) {
    return errorHandler(error);
  }
}
