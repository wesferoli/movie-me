import {
  IMDBMovieList,
  IMovieDetails,
  MDBMovieDetails,
  MovieList,
} from "@/services/controllers/movie/types";
import { movieDBApi } from "@/lib/api";
import prisma from "@/lib/prisma";
import { errorHandler } from "@/middleware/api/errorHandler";
import { getPlaceholderImage } from "@/utils/transformImage";
import { movieDetailsSchema, movieListSchema } from "./schema";
import { reviewListSchema } from "../review/schema";
import { cache } from "react";

import "server-only";

export const MovieController = {
  listPopular: cache(async (config?: RequestInit) => {
    try {
      const oneDay = 86400;
      const popularMovies: IMDBMovieList = await movieDBApi.get(
        "/movie/popular",
        { ...config, next: { revalidate: oneDay } }
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
  }),

  find: cache(async (movieId: string, config?: RequestInit) => {
    try {
      const movie: MDBMovieDetails = await movieDBApi.get(
        `/movie/${movieId}`,
        config,
        ["append_to_response=credits"]
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
  }),

  listReviews: cache(async (movieId: string) => {
    try {
      const movieReview = await prisma.review.findMany({
        where: { movieId: Number(movieId) },
        include: { user: true },
      });

      const filteredMovieReviews = reviewListSchema.parse(movieReview);

      const response = { data: filteredMovieReviews };

      return response;
    } catch (err) {
      throw errorHandler(err);
    }
  }),

  search: cache(async (query: string) => {
    try {
      const movieList: IMDBMovieList = await movieDBApi.get(
        "/search/movie",
        {},
        [`query=${query}`]
      );

      const filterMovies: MovieList = movieListSchema.parse(movieList.results);

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
  }),
};
