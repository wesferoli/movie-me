import { errorHandler } from "@/middleware/api/errorHandler";
import { IRouteParams } from "../../types";
import prisma from "@/lib/prisma";
import { reviewSchema } from "./schema";
import { NextResponse } from "next/server";
import { movieDBApi } from "@/lib/api";
import { MDBMovieDetails } from "../../movie/[id]/types";
import { getPlaceholderImage } from "@/utils/transformImage";

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

    return NextResponse.json({ data: filteredReview });
  } catch (error) {
    return errorHandler(error);
  }
}
