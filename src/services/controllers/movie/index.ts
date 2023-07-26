import {
  IMDBMovieList,
  IMovieDetails,
  MDBMovieDetails,
  MovieList,
} from "@/services/controllers/movie/types";
import { reviewListSchema } from "@/app/api/review/schema";
import { ReviewList } from "@/app/api/review/types";
import { movieDBApi } from "@/lib/api";
import prisma from "@/lib/prisma";
import { errorHandler } from "@/middleware/api/errorHandler";
import { getPlaceholderImage } from "@/utils/transformImage";
import { movieDetailsSchema, movieListSchema } from "./schema";

export const MovieController = {
  listPopular: async (config?: RequestInit) => {
    try {
      const popularMovies: IMDBMovieList = await movieDBApi.get(
        "/movie/popular",
        config
      );
      if (!popularMovies) {
        throw new Error("Unable to list movies.");
      }

      const filterMovies: MovieList = movieListSchema.parse(
        popularMovies.results
      );

      // Add valid poster url and blur data
      await Promise.all(
        filterMovies.map(async (movie) => {
          const poster = await getPlaceholderImage(movie.poster);

          Object.assign(movie, {
            poster,
          });
        })
      ).then((value) => value);

      const response = { data: filterMovies };

      return response;
    } catch (err) {
      throw errorHandler(err);
    }
  },

  find: async (movieId: string, config?: RequestInit) => {
    try {
      const movie: MDBMovieDetails = await movieDBApi.get(
        `/movie/${movieId}?append_to_response=credits`,
        config
      );

      const filteredMovieDetails = movieDetailsSchema.parse(movie);
      const poster = await getPlaceholderImage(filteredMovieDetails.poster);

      const { _avg: averageRating } = await prisma.review.aggregate({
        _avg: {
          rating: true,
        },
        where: {
          movieId: Number(movieId),
        },
      });

      const movieDetails: IMovieDetails = {
        ...filteredMovieDetails,
        rating: averageRating.rating,
        poster,
      };

      const response = { data: movieDetails };

      return response;
    } catch (err) {
      throw errorHandler(err);
    }
  },

  listReviews: async (movieId: string) => {
    try {
      const movieReview = await prisma.review.findMany({
        where: { movieId: Number(movieId) },
        include: { user: true },
      });

      const filteredMovieReviews: ReviewList =
        reviewListSchema.parse(movieReview);

      const response = { data: filteredMovieReviews };

      return response;
    } catch (err) {
      throw errorHandler(err);
    }
  },
};
