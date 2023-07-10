import { errorHandler } from "@/middleware/api/errorHandler";
import { IRouteParams } from "../../types";
import prisma from "@/lib/prisma";
import { getMovieDetails } from "@/services/api/movie";
import { reviewSchema } from "./schema";
import { NextResponse } from "next/server";
import { movieDBApi } from "@/lib/api";
import { MDBMovieDetails } from "../../movie/[id]/types";
import { posterURL } from "@/utils/constant";

export async function GET(request: Request, { params }: IRouteParams) {
  try {
    const { id } = params;

    const review = await prisma.review.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!review) {
      throw new Error("Review not found");
    }

    const { data: movie } = await movieDBApi.get<MDBMovieDetails>(
      `/movie/${review.movieId}`
    );
    if (!movie) {
      throw new Error("Movie not found");
    }

    Object.assign(review, {
      movie: {
        poster: `${posterURL}${movie.poster_path}`,
        title: movie.title,
        releaseDate: movie.release_date,
        genres: movie.genres,
      },
    });

    const filteredReview = reviewSchema.parse(review);

    return NextResponse.json({ data: filteredReview });
  } catch (error) {
    return errorHandler(error);
  }
}
