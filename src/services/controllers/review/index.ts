import { movieDBApi } from "@/lib/api";
import prisma from "@/lib/prisma";
import { MDBMovieDetails } from "../movie/types";
import { getPlaceholderImage } from "@/utils/transformImage";
import { reviewListSchema, reviewSchema } from "./schema";
import { errorHandler } from "@/middleware/api/errorHandler";
import { ReviewList } from "./types";

import "server-only";
import { cache } from "react";

export const ReviewController = {
  find: cache(async (id: string) => {
    try {
      const review = await prisma.review.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!review) {
        throw new Error("Review not found");
      }

      const movie: MDBMovieDetails = await movieDBApi.get(
        `/movie/${review.movieId}`
      );
      if (!movie) {
        throw new Error("Movie not found");
      }

      const poster = await getPlaceholderImage({
        src: movie.poster_path,
        base64: "",
      });
      Object.assign(review, {
        movie: {
          poster: poster,
          title: movie.title,
          releaseDate: movie.release_date,
          genres: movie.genres,
        },
      });

      const filteredReview = reviewSchema.parse(review);

      const response = { data: filteredReview };

      return response;
    } catch (err) {
      throw errorHandler(err);
    }
  }),

  listAll: async () => {
    try {
      const reviews = await prisma.review.findMany({ include: { user: true } });

      const filteredReviews: ReviewList = reviewListSchema.parse(reviews);

      const response = { data: filteredReviews };

      return response;
    } catch (err) {
      throw errorHandler(err);
    }
  },
};
