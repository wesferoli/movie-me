import { movieDBApi } from "@/lib/api";
import { NextResponse } from "next/server";
import { movieDetailsSchema } from "./schema";
import prisma from "@/lib/prisma";
import { MDBMovieDetails, IMovieDetails } from "./types";
import { errorHandler } from "@/middleware/api/errorHandler";
import { posterURL } from "@/utils/constant";
import { IRouteParams } from "../../types";

export async function GET(request: Request, { params }: IRouteParams) {
  try {
    const { id } = params;
    const movie = await movieDBApi
      .get<MDBMovieDetails>(`/movie/${id}`, {
        params: { append_to_response: "credits" },
      })
      .then((resp) => resp.data);

    const filteredMovieDetails = movieDetailsSchema.parse(movie);

    const { _avg: averageRating } = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        movieId: Number(id),
      },
    });

    const movieDetails: IMovieDetails = {
      ...filteredMovieDetails,
      rating: averageRating.rating,
      poster: `${posterURL}${filteredMovieDetails.poster}`,
    };

    return NextResponse.json({ data: movieDetails });
  } catch (error) {
    return errorHandler(error);
  }
}
