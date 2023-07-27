import { movieDBApi } from "@/lib/api";
import prisma from "@/lib/prisma";
import { errorHandler } from "@/middleware/api/errorHandler";
import { MDBMovieDetails } from "../movie/types";
import { userReviewsListSchema } from "@/services/controllers/user/schema";
import { cache } from "react";

export const UserController = {
  listReviews: cache(async (userId: string) => {
    try {
      const userReviews = await prisma.review.findMany({ where: { userId } });

      await Promise.all(
        userReviews.map(async (review) => {
          const movie: MDBMovieDetails = await movieDBApi.get(
            `/movie/${review.movieId}`
          );

          Object.assign(review, {
            movieTitle: movie.title,
          });

          return review;
        })
      );

      const parsedUserReviews = userReviewsListSchema.parse(userReviews);

      const response = { data: parsedUserReviews };

      return response;
    } catch (err) {
      throw errorHandler(err);
    }
  }),
};
